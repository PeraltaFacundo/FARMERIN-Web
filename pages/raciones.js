import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase2';

function Grafico() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animalesAusentes, setAnimalesAusentes] = useState([]);
  const [animalesNuncaPaso, setAnimalesNuncaPaso] = useState([]);
  const [animalesNoLeyo, setAnimalesNoLeyo] = useState([]);
  const { firebase, tamboSel } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerRaciones = async () => {
      try {
        if (tamboSel) {
          const docSnapshot = await firebase.db.collection('tambo').doc(tamboSel.id).get();
          if (docSnapshot.exists) {
            const racionesURL = docSnapshot.data().raciones;

            if (racionesURL) {
              try {
                const response = await axios.get(racionesURL);
                const parser = new DOMParser();
                const doc = parser.parseFromString(response.data, 'text/html');
                const table = doc.querySelector('table');

                if (table) {
                  const parsedData = tableToDataFrame(table);
                  setData(parsedData);
                } else {
                  console.error('No se encontró la tabla en los datos obtenidos');
                }
              } catch (error) {
                console.error('Error al obtener los datos de raciones:', error);
              }
            } else {
              console.error("El campo raciones no contiene una URL válida");
            }
          } else {
            console.log("El documento no existe");
          }
        }
      } catch (error) {
        console.error("Error al obtener el campo raciones:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerRaciones();
  }, [tamboSel, firebase]);

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const ausentes = data.filter(row => parseInt(row.DiasAusente) >= 2);
      setAnimalesAusentes(ausentes);

      const nuncapaso = data.filter(row => parseInt(row.DiasAusente) === -1);
      setAnimalesNuncaPaso(nuncapaso);

      const noleyo = data.filter(row => parseInt(row.DiasAusente) === 1);
      setAnimalesNoLeyo(noleyo);
    }
  }, [data]);

  function tableToDataFrame(table) {
    const rows = table.querySelectorAll('tr');
    const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent.trim());

    return Array.from(rows).slice(1).map(row => {
      const cells = row.querySelectorAll('td');
      const obj = {};
      cells.forEach((cell, i) => {
        obj[headers[i]] = cell.textContent.trim();
      });
      return obj;
    });
  }

  const descargarExcel = () => {
    const wb = XLSX.utils.book_new();

    // Hoja de trabajo para animales ausentes
    const wsAusentes = XLSX.utils.json_to_sheet(animalesAusentes);
    XLSX.utils.book_append_sheet(wb, wsAusentes, 'Animales Ausentes');

    // Hoja de trabajo para animales que nunca pasaron
    const wsNuncaPaso = XLSX.utils.json_to_sheet(animalesNuncaPaso);
    XLSX.utils.book_append_sheet(wb, wsNuncaPaso, 'Animales que Nunca Pasaron');

    // Hoja de trabajo para animales que no leyó
    const wsNoLeyo = XLSX.utils.json_to_sheet(animalesNoLeyo);
    XLSX.utils.book_append_sheet(wb, wsNoLeyo, 'Animales que No Leyó');

    // Generar el archivo Excel y descargarlo
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const fechaActual = new Date().toISOString().slice(0, 10);
    const nombreArchivo = `Animales_${fechaActual}.xlsx`;

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), nombreArchivo);
  };

  const s2ab = s => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <Layout titulo="Herramientas">
      <div className="containerGrafico">
        <div className="chartContainer">
          {loading ? (
            <div className="loaderContainer">
              <div className="loaderGrafico">
                <div className="innerContent">
                  <h1 className="imagenLogo"></h1>
                </div>
              </div>
              <h2 className="textoLoader">OBTENIENDO INFORMACION</h2>
            </div>
          ) : (
            data.length > 0 ? (
              <TamboChart tambo={{ name: tamboSel?.nombre, data }} animalesAusentes={animalesAusentes} animalesNuncaPaso={animalesNuncaPaso} animalesNoLeyo={animalesNoLeyo} descargarExcel={descargarExcel} />
            ) : (
              <div className="noDataContainer">
                <img src='/VacaGrafico.jpg' alt="Imagen de Vaca" />
                <h2 className='TextoFoto'>¡LOS REGISTROS NO ESTAN DISPONIBLES!</h2>
              </div>
            )
          )}
        </div>
        {!loading && (
          <div className="listContainer">
            {/* Lista de Animales Ausentes */}
            {animalesAusentes.length > 0 ? (
              <AnimalesAusentesList animales={animalesAusentes} />
            ) : (
              <div className="mensajeVacio">NO SE ENCONTRARON RESULTADOS PARA ANIMALES AUSENTES.</div>
            )}
            {/* Lista de Animales que No Leyo */}
            {animalesNoLeyo.length > 0 ? (
              <AnimalesNoLeyoList animales={animalesNoLeyo} />
            ) : (
              <div className="mensajeVacio">NO SE ENCONTRARON RESULTADOS PARA ANIMALES QUE NO SE LEYERON.</div>
            )}
            {/* Lista de Animales que Nunca Pasaron */}
            {animalesNuncaPaso.length > 0 ? (
              <AnimalesNuncaPasoList animales={animalesNuncaPaso} />
            ) : (
              <div className="mensajeVacio">NO SE ENCONTRARON RESULTADOS PARA ANIMALES QUE NUNCA SE LEYERON.</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function TamboChart({ tambo, animalesAusentes, animalesNuncaPaso, animalesNoLeyo, descargarExcel }) {
  if (!tambo.data) {
    return (
      <div className="tamboChart">
        <h2><span className="titulo-grande">{tambo.name} - Animales En Ordeñe</span></h2>
        <img src="/VacaGrafico.jpeg" alt="Not Found" />
        <h2 className='TextoFoto'>LOS REGISTROS NO ESTAN DISPONIBLES</h2>
      </div>
    );
  }

  const contarPorNumero = (data, columna, numero) => {
    return data.filter(row => row[columna] === String(numero)).length;
  };

  const contarPorNumeroMayor = (data, columna, numero) => {
    return data.filter(row => parseInt(row[columna]) >= numero).length;
  };

  const cantidadDiasAusentem1 = contarPorNumero(tambo.data, 'DiasAusente', -1);
  const cantidadDiasAusente0 = contarPorNumero(tambo.data, 'DiasAusente', 0);
  const cantidadDiasAusente1 = contarPorNumero(tambo.data, 'DiasAusente', 1);
  const cantidadDiasAusentemayor = contarPorNumeroMayor(tambo.data, 'DiasAusente', 2);

  const valores = [cantidadDiasAusentem1, cantidadDiasAusente1, cantidadDiasAusentemayor, cantidadDiasAusente0];
  const nombres = ['NUNCA SE LEYO', 'NO SE LEYO', 'AUSENTE', 'SE LEYO'];
  const colores = ['pink', 'red', 'blue', 'green'];

  const valoresFiltrados = valores.filter(valor => valor !== 0);
  const nombresFiltrados = nombres.filter((_, i) => valores[i] !== 0);
  const coloresFiltrados = colores.filter((_, i) => valores[i] !== 0);

  const chartData = {
    labels: nombresFiltrados,
    datasets: [
      {
        data: valoresFiltrados,
        backgroundColor: coloresFiltrados,
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="tamboChart">
      <h2><span className="titulo-grande">{tambo.name} - Animales En Ordeñe</span></h2>
      <Pie data={chartData} options={chartOptions} />
      <div className="descargarExcelContainer">
        <button onClick={descargarExcel}>Descargar Excel</button>
      </div>
    </div>
  );
}

function AnimalesAusentesList({ animales }) {
  if (animales.length === 0) {
    return <div className="loaderGrafico" />;
  }

  return (
    <div className="AnimalesFormulario">
      <h2>Lista de animales ausentes</h2>
      <table className="tablaDeAnimales">
        <thead>
          <tr>
            <th>RP</th>
            <th>eRP</th>
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID || 'eRP desconocido'}</td>
              <td>{animal.DiasAusente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnimalesNuncaPasoList({ animales }) {
  if (animales.length === 0) {
    return <div className="loaderGrafico" />;
  }

  return (
    <div className="AnimalesFormulario">
      <h2>Lista de animales que nunca se leyó</h2>
      <table className="tablaDeAnimales">
        <thead>
          <tr>
            <th>RP</th>
            <th>eRP</th>
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID || 'eRP desconocido'}</td>
              <td>{animal.DiasAusente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnimalesNoLeyoList({ animales }) {
  if (animales.length === 0) {
    return <div className="loaderGrafico" />;
  }

  return (
    <div className="AnimalesFormulario">
      <h2>Lista de animales que no se leyó</h2>
      <table className="tablaDeAnimales">
        <thead>
          <tr>
            <th>RP</th>
            <th>eRP</th>
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID || 'eRP desconocido'}</td>
              <td>{animal.DiasAusente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grafico;
