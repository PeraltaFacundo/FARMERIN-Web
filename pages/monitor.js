import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/layout';
import { FirebaseContext } from '../firebase2';

const Monitor = () => {
  const { firebase, tamboSel } = useContext(FirebaseContext);
  const [tamboLink, setTamboLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [linkValido, setLinkValido] = useState(true);

  useEffect(() => {
    const obtenerEnlaceMonitor = async () => {
      try {
        if (tamboSel) {
          const docSnapshot = await firebase.db.collection('tambo').doc(tamboSel.id).get();
          if (docSnapshot.exists) {
            const linkValue = docSnapshot.data().monitor;
            setTamboLink(linkValue);
            const testLink = new Image();
            testLink.onload = () => {
              setLinkValido(true);
            };
            testLink.onerror = () => {
              setLinkValido(false);
            };
            testLink.src = linkValue;
          } else {
            console.log("El documento no existe");
          }
        }
      } catch (error) {
        console.error("Error al obtener el enlace del monitor:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerEnlaceMonitor();
  }, [tamboSel, firebase]);

  return (
    <Layout titulo="Monitor de ingreso">
      <div>
        {loading ? (
          <div className="loaderContainer">
            <div className="loaderMonitor"></div>
          </div>
        ) : linkValido ? (
          <div className="loaderContainer">
            <div className="loaderMonitor">
              <div className="innerContentMonitor">
                <h1 className="imagenLogoMonitor"></h1>
              </div>
            </div>
            <h2 className="textoLoaderMonitor">OBTENIENDO INFORMACION</h2>
          </div>
        ) : tamboLink ? (
          <iframe
            src={tamboLink}
            title="Monitor"
            style={{ width: '100%', height: '1000px', border: '1px solid #fff', borderRadius: '10px' }}
          />
        ) : (
          <div className="divRaciones">
          <h1 className="tituloRacionesAviso">Aviso </h1>
          <h2 className="tituloRacionesAviso">No se pudo conectar con el Monitor de Ingreso</h2>
        </div>
        )}
      </div>
    </Layout>

  );
};

export default Monitor;