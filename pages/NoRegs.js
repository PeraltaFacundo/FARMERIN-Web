import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase2';
import StickyTable from 'react-sticky-table-thead';
import { Table } from 'react-bootstrap';
import { Contenedor } from '../components/ui/Elementos';
import { FaSort } from 'react-icons/fa';

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { firebase, tamboSel } = useContext(FirebaseContext);
  const [matchedAnimals, setMatchedAnimals] = useState([]);

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
                  checkAnimals(parsedData);
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

    const checkAnimals = async (parsedData) => {
      const updatedData = await Promise.all(
        parsedData.map(async (item) => {
          const erp = item.RFID; // Asume que el RFID está en una columna llamada 'RFID'
          console.log('Verificando ERP: ${erp} para tamboId: ${tamboSel.id}');
          const querySnapshot = await firebase.db.collection('animal')
            .where('erp', '==', erp)
            .where('idtambo', '==', tamboSel.id)
            .get();

          if (!querySnapshot.empty) {
            const animalData = querySnapshot.docs[0].data();
            console.log('Datos encontrados para ERP ${erp}:', animalData);
            return {
              eRP: erp,
              RP: animalData.rp || 'N/A',
              'EST. PRO': animalData.estpro || 'N/A',
              'EST. REP': animalData.estrep || 'N/A',
            };
          } else {
            console.log('No se encontraron datos para ERP ${erp} en tamboId ${tamboSel.id}');
            return {
              eRP: erp,
              RP: 'No Registrada',
              'EST. PRO': 'No Registrada',
              'EST. REP': 'No Registrada',
            };
          }
        })
      );
      setMatchedAnimals(updatedData);
    };

    obtenerNoReg();
  }, [tamboSel, firebase]);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(matchedAnimals);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NoRegs');
    XLSX.writeFile(wb, 'NoRegs.xlsx');
  };

  //states de ordenamiento
  const [orderERP, guardarOrderRp] = useState('asc');

  const handleClickRP = e => {
    e.preventDefault();
    if (orderERP === 'asc') {
      const a = matchedAnimals.sort((a, b) => (a.RP < b.RP) ? 1 : -1);
      guardarOrderRp('desc');
      setMatchedAnimals([...a]);
    } else {
      const b = matchedAnimals.sort((a, b) => (a.RP > b.RP) ? 1 : -1);
      guardarOrderRp('asc');
      setMatchedAnimals([...b]);
    }
  };

  return (
    <Layout titulo="Herramientas">
      <div className="listaNoRegs">
        <h1 className="tituloNoRegs">Lista de animales no registrados</h1>
        <button className="excelNoRegs" onClick={handleDownload}>Excel</button>
      </div>
      <Contenedor>
        <StickyTable height={450}>
          {matchedAnimals.length === 0 ? (
            <p>No hay datos de no Registradas disponibles</p>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th onClick={handleClickRP}>eRP  <FaSort size={15} /></th>
                  <th onClick={handleClickRP}>RP  <FaSort size={15} /></th>
                  <th onClick={handleClickRP}>EST. PRO  <FaSort size={15} /></th>
                  <th onClick={handleClickRP}>EST. REP  <FaSort size={15} /></th>
                </tr>
              </thead>
              <tbody>
                {matchedAnimals.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </StickyTable>
      </Contenedor>
    </Layout>
  );
}

export default NoRegs;