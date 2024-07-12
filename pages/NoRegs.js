import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase2';

const tableToDataFrame = (table) => {
  const rows = Array.from(table.querySelectorAll('tr'));
  const headers = Array.from(rows[0].querySelectorAll('th')).map(th => th.textContent);
  const data = rows.slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td'));
    return headers.reduce((acc, header, index) => {
      acc[header] = cells[index].textContent;
      return acc;
    }, {});
  });
  return data;
};

function NoRegs() {
  const [data, setData] = useState([]); // Inicializa data como array
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const { firebase, tamboSel } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerNoReg = async () => {
      try {
        if (tamboSel) {
          const docSnapshot = await firebase.db.collection('tambo').doc(tamboSel.id).get();
          if (docSnapshot.exists) {
            const noregURL = docSnapshot.data().noreg;

            if (noregURL) {
              try {
                const response = await axios.get(noregURL);
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
                console.error('Error al obtener los datos de no registradas:', error);
              }
            } else {
              console.error("El campo no registradas no contiene una URL válida");
            }
          } else {
            console.log("El documento no existe");
          }
        }
      } catch (error) {
        console.error("Error al obtener el campo no registradas:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerNoReg();
  }, [tamboSel, firebase]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <Layout>
      <h1>NOREG</h1>
      {data.length === 0 ? (
        <p>No hay datos de no Registradas disponibles</p>
      ) : (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default NoRegs;
