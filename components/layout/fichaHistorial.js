import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, Modal, Table, Alert } from 'react-bootstrap';
import moment from 'moment';
import { FirebaseContext } from '../../firebase2';

const FichaHistorial = ({ show, setShow, tamboSel }) => {
    const handleClose = () => { setShow(false) };
    const [notificaciones, setNotificaciones] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (tamboSel) {
            obtenerNotificaciones();
        }
    }, [tamboSel]);

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
                    Notificaciones - {tamboSel && tamboSel.nombre}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="notificaciones" id="historial-tabs">
                    <Tab eventKey="notificaciones" title="Notificaciones">
                        {notificaciones.length === 0 ? (
                            <Alert variant="warning">No hay notificaciones registradas</Alert>
                        ) : (
                            <Table responsive className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Notificación</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notificaciones.map(notificacion => (
                                        <tr key={notificacion.id}>
                                            <td>{moment(notificacion.fecha).format('YYYY-MM-DD')}</td>
                                            <td>{notificacion.mensaje}</td>
                                        </tr>
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
