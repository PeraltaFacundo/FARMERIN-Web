import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, Modal, Table, Alert } from 'react-bootstrap';
import { FirebaseContext } from '../../firebase2';
import DetalleHistorial from './detalleHistorial'; // Asegúrate de que la ruta sea correcta

const FichaHistorial = ({ show, setShow, tamboSel }) => {
    const handleClose = () => { setShow(false) };
    const [historial, setHistorial] = useState([]);
    const [notificaciones, setNotificaciones] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (tamboSel) {
            obtenerHistorial();
            obtenerNotificaciones();
        }
    }, [tamboSel]);

    const obtenerHistorial = async () => {
        try {
            const snapshot = await firebase.db.collection('tambo')
                .doc(tamboSel.id)
                .collection('historialParametros')
                .orderBy('fecha', 'desc')
                .get();

            const historialCambios = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setHistorial(historialCambios);
        } catch (error) {
            console.error("Error al obtener el historial de cambios:", error);
        }
    };

    const obtenerNotificaciones = async () => {
        try {
            const snapshot = await firebase.db.collection('tambo')
                .doc(tamboSel.id)
                .collection('notificaciones')
                .orderBy('fecha', 'desc')
                .get();

            const notificaciones = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setNotificaciones(notificaciones);
        } catch (error) {
            console.error("Error al obtener las notificaciones:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Historial de Cambios y Notificaciones - {tamboSel && tamboSel.nombre}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="general" id="historial-tabs">
                    <Tab eventKey="general" title="Último Valor">
                        {historial.length > 0 ? (
                            <div>
                                <h5>Último Valor:</h5>
                                <p>{historial[0].mensaje}</p>
                                <p><b>Fecha:</b> {new Date(historial[0].fecha).toLocaleString()}</p>
                            </div>
                        ) : (
                            <Alert variant="warning">No hay historial de cambios registrado</Alert>
                        )}
                    </Tab>
                    <Tab eventKey="historial" title="Historial de Cambios">
                        {historial.length === 0 ? (
                            <Alert variant="warning">No hay historial de cambios registrado</Alert>
                        ) : (
                            <Table responsive>
                                <tbody>
                                    {historial.map(cambio => (
                                        <DetalleHistorial key={cambio.id} evento={cambio} />
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Tab>
                    <Tab eventKey="notificaciones" title="Notificaciones">
                        {notificaciones.length === 0 ? (
                            <Alert variant="warning">No hay notificaciones registradas</Alert>
                        ) : (
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Mensaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notificaciones.map(notificacion => (
                                        <DetalleHistorial key={notificacion.id} evento={notificacion} />
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    );
};

export default FichaHistorial;
