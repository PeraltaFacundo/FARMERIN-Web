import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase2';

// Función para convertir datos a formato Excel
const convertToExcel = (data) => {
  const header = Object.keys(data[0]).join('\t') + '\n';
  const body = data.map(item => Object.values(item).join('\t')).join('\n');
  return header + body;
};

function Grafico() {
  const [data, setData] = useState([]); // Inicializa data como array
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
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
      // Filtrar y recopilar animales ausentes
      const ausentes = data.filter(row => parseInt(row.DiasAusente) >= 2);
      setAnimalesAusentes(ausentes);

      // Filtrar y recopilar animales "Nunca Paso"
      const nuncapaso = data.filter(row => parseInt(row.DiasAusente) === -1);
      setAnimalesNuncaPaso(nuncapaso);

      // Filtrar y recopilar animales "No Leyo"
      const noleyo = data.filter(row => parseInt(row.DiasAusente) === 1);
      setAnimalesNoLeyo(noleyo);
    }
  }, [data]);

  const descargarExcel = () => {
    if (data.length > 0) {
      const dataExport = data.map(animal => ({
        RP: animal.RP || 'RP desconocido',
        eRP: animal.RFID.replace(/⛔/g, '') || 'eRP desconocido', // Elimina caracteres especiales como ⛔
        DiasAusente: animal.DiasAusente
      }));

      // Crear archivo de Excel
      const blob = new Blob([convertToExcel(dataExport)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'raciones.xlsx';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error('No hay datos para exportar');
    }
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
              <TamboChart tambo={{ name: tamboSel?.nombre, data }} descargarExcel={descargarExcel} />
            ) : (
              <div className="divRaciones">
              <h1 className="tituloRacionesAviso">Aviso </h1>
              <h2 className="tituloRacionesAviso">No se pudo conectar con el Grafico de Ingreso</h2>
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
              <div className="mensajeVacio"></div>
            )}
            {/* Lista de Animales que No Leyo */}
            {animalesNoLeyo.length > 0 ? (
              <AnimalesNoLeyoList animales={animalesNoLeyo} />
            ) : (
              <div className="mensajeVacio"></div>
            )}
            {/* Lista de Animales que Nunca Pasaron */}
            {animalesNuncaPaso.length > 0 ? (
              <AnimalesNuncaPasoList animales={animalesNuncaPaso} />
            ) : (
              <div className="mensajeVacio"></div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function tableToDataFrame(table) {
  // Convierte una tabla HTML a un array de objetos
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

function TamboChart({ tambo, descargarExcel }) {
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

  const valoresFiltrados = valores.filter(val => val !== 0);
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

  return (
    <div className="tamboChart">
    <div className="chartHeader">
      <h2 className="tituloNoRegs">{tambo.name} - Animales En Ordeñe</h2>
      <button onClick={descargarExcel} className="excelRaciones">Excel</button>
    </div>
    <Pie data={chartData} />
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
            <th>eRP</th> {/* Cambiado de RFID a eRP */}
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID.replace(/⛔/g, '') || 'eRP desconocido'}</td> {/* Eliminar caracteres especiales como ⛔ */}
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
            <th>eRP</th> {/* Cambiado de RFID a eRP */}
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID.replace(/⛔/g, '') || 'eRP desconocido'}</td> {/* Eliminar caracteres especiales como ⛔ */}
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
            <th>eRP</th> {/* Cambiado de RFID a eRP */}
            <th>Días Ausente</th>
          </tr>
        </thead>
        <tbody>
          {animales.map((animal, index) => (
            <tr key={index}>
              <td>{animal.RP || 'RP desconocido'}</td>
              <td>{animal.RFID.replace(/⛔/g, '') || 'eRP desconocido'}</td> {/* Eliminar caracteres especiales como ⛔ */}
              <td>{animal.DiasAusente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grafico;
