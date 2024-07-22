import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineBars } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiLogOut } from "react-icons/fi";
import { Button, Badge, Modal, Alert, Form } from 'react-bootstrap';
import Switch from 'react-switch';
import { FirebaseContext } from '../../firebase2';
import DetalleAlerta from './detalleAlerta';
import { ContenedorAlertas } from '../ui/Elementos';
import { useDispatch, useSelector } from "react-redux";
import { updateValor } from '../../redux/valorSlice';
import FichaHistorial from './fichaHistorial'; // Importar el componente FichaHistorial

const Navegacion = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange, titulo }) => {
    const { usuario, firebase, guardarTamboSel, tambos, tamboSel, porc, setPorc } = useContext(FirebaseContext);
    const router = useRouter();
    const [showNotificaciones, setShowNotificaciones] = useState(false);
    const [showHistorial, setShowHistorial] = useState(false);
    const [alertas, guardarAlertas] = useState([]);
    const [alertasSinLeer, guardarAlertasSinLeer] = useState([]);
    const [historialCambios, setHistorialCambios] = useState([]);
    const [historialFiltrado, setHistorialFiltrado] = useState([]);
    const [error, guardarError] = useState(false);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    let variante = "warning";

    const dispatch = useDispatch();
    const valor = useSelector((state) => state.valor);

    useEffect(() => {
        dispatch(updateValor(porc));
    }, [porc, dispatch]);

    useEffect(() => {
        if (tamboSel) {
            dispatch(updateValor(tamboSel.porcentaje));
        }
    }, [tamboSel, dispatch]);

    useEffect(() => {
        agregarNotificacion(valor);
    }, [valor]);

    useEffect(() => {
        obtenerHistorial();
    }, []);

    const agregarNotificacion = async (nuevoValor) => {
        let mensajeNotificacion = '';
        if (nuevoValor === 0) {
            mensajeNotificacion = 'SE VOLVIÓ AL VALOR ORIGINAL DE LA RACIÓN';
        } else if (nuevoValor < 0) {
            mensajeNotificacion = `SE APLICÓ UNA REDUCCIÓN EN LA RACIÓN (${Math.abs(nuevoValor)}%)`;
        } else {
            mensajeNotificacion = `SE APLICÓ UN AUMENTO EN LA RACIÓN (${nuevoValor}%)`;
        }

        const nuevaAlerta = {
            id: `notificacion-${Date.now()}`,
            mensaje: mensajeNotificacion,
            valorPorcentaje: nuevoValor,
            visto: false,
            fecha: new Date().toISOString()
        };

        guardarAlertas(prevAlertas => [nuevaAlerta, ...prevAlertas]);
        guardarAlertasSinLeer(prevSinLeer => [nuevaAlerta, ...prevSinLeer]);

        try {
            await firebase.db.collection('tambo').doc(tamboSel.id).collection('notificaciones').add(nuevaAlerta);
            await firebase.db.collection('tambo').doc(tamboSel.id).collection('historialParametros').add({
                descripcion: mensajeNotificacion,
                valorPorcentaje: nuevoValor,
                fecha: nuevaAlerta.fecha
            });
        } catch (error) {
            console.error("Error al guardar la notificación en Firestore:", error);
        }
    };

    const limpiarNotificaciones = async () => {
        try {
            const batch = firebase.db.batch();
            const snapshot = await firebase.db.collection('tambo')
            .doc(tamboSel.id).collection('notificaciones').get();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();

            guardarAlertas([]);
            guardarAlertasSinLeer([]);
        } catch (error) {
            console.error("Error al limpiar las notificaciones:", error);
        }
    };

    async function vista(a) {
        const valores = {
            idtambo: a.idtambo,
            fecha: a.fecha,
            mensaje: a.mensaje,
            visto: true
        };
        try {
            await firebase.db.collection('alerta').doc(a.id).update(valores);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseNotificaciones = () => setShowNotificaciones(false);
    const handleShowNotificaciones = () => {
        alertasSinLeer.forEach(a => vista(a));
        setShowNotificaciones(true);
        guardarAlertasSinLeer([]);
    };

    const handleShowHistorial = () => {
        setShowNotificaciones(false);
        setShowHistorial(true);
    };

    const handleCloseHistorial = () => setShowHistorial(false);

    const obtenerHistorial = async () => {
        try {
            const snapshot = await firebase.db.collection('tambo')
            .doc(tamboSel.id)
            .collection('historialParametros').orderBy('fecha', 'desc').get();
            const historial = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHistorialCambios(historial);
            setHistorialFiltrado(historial); // Inicialmente, muestra todos los cambios
        } catch (error) {
            console.error("Error al obtener el historial de cambios:", error);
        }
    };

    const filtrarHistorialPorFecha = (fecha) => {
        setFechaSeleccionada(fecha);
        if (fecha) {
            const fechaInicio = new Date(fecha);
            fechaInicio.setHours(0, 0, 0, 0);

            const fechaFin = new Date(fecha);
            fechaFin.setHours(23, 59, 59, 999);

            const historialFiltrado = historialCambios.filter(cambio => {
                const fechaCambio = new Date(cambio.fecha);
                return fechaCambio >= fechaInicio && fechaCambio <= fechaFin;
            });
            setHistorialFiltrado(historialFiltrado);
        } else {
            setHistorialFiltrado(historialCambios); // Si no hay fecha, muestra todos los cambios
        }
    };

    async function obtenerAlertas() {
        const tambosArray = tambos.map(t => t.id);
        try {
            const [alertasSnapshot, notificacionesSnapshot] = await Promise.all([
                firebase.db.collection('alerta')
                    .where('idtambo', 'in', tambosArray)
                    .orderBy('fecha', 'desc')
                    .get(),
                firebase.db.collection('tambo')
                .doc(tamboSel.id).collection('notificaciones')
                    .orderBy('fecha', 'desc')
                    .get()
            ]);

            const alertasTambos = alertasSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const notificaciones = notificacionesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const todasAlertas = [...alertasTambos, ...notificaciones];

            guardarAlertas(todasAlertas);
            const alertasSinVer = todasAlertas.filter(a => !a.visto);
            guardarAlertasSinLeer(alertasSinVer);
            if (alertasSinVer.length > 0) variante = "danger";
        } catch (error) {
            console.log(error);
            guardarError(true);
        }
    }

    function cerrarSesion() {
        guardarTamboSel(null);
        firebase.logout();
        return router.push('/login');
    }

    return (
        <header>
        <div className="elem-header">
            <div className="block ">
                <Switch
                    height={16}
                    width={30}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={handleCollapsedChange}
                    checked={collapsed}
                    onColor="#219de9"
                    offColor="#bbbbbb"
                />
            </div>
            <div className='hambur' onClick={() => handleToggleSidebar(true)}>
                <AiOutlineBars size={40} />
            </div>
            <div className='responsive'>
                <h5>{titulo} {tamboSel && ' - ' + tamboSel.nombre}</h5>
            </div>
            <div className="elem-header-der">
                {usuario && (
                    <>
                        <Button variant="link" onClick={handleShowNotificaciones}>
                            <IoIosNotificationsOutline size={32} />
                            {alertasSinLeer.length > 0 && (
                                <Badge variant={variante}>
                                    {alertasSinLeer.length}
                                </Badge>
                            )}
                        </Button>
                        &nbsp; &nbsp; &nbsp;
                        <Button variant="outline-info" onClick={cerrarSesion}>
                            <FiLogOut size={24} />
                            &nbsp; {usuario.displayName}
                        </Button>
                    </>
                )}
            </div>
        </div>
        <Modal size="lg" show={showNotificaciones} onHide={handleCloseNotificaciones}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <p>Alertas</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alertas.length > 0 ? (
                    <ContenedorAlertas>
                        {alertas.map(a => (
                            <DetalleAlerta
                                key={a.id}
                                alerta={a}
                                alertas={alertas}
                                guardarAlertas={guardarAlertas}
                            />
                        ))}
                    </ContenedorAlertas>
                ) : (
                    <Alert variant="warning">No se registran alertas</Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleShowHistorial}>
                    Ver Historial de Cambios
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showHistorial} onHide={handleCloseHistorial}>
            <Modal.Header closeButton>
                <Modal.Title>Historial de Cambios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FichaHistorial
                    show={showHistorial}
                    setShow={setShowHistorial}
                    tamboSel={tamboSel}
                />
                {historialFiltrado.length > 0 ? (
                    <ul>
                        {historialFiltrado.map(cambio => (
                            <li key={cambio.id}>
                                {new Date(cambio.fecha).toLocaleString('es-AR')}: {cambio.descripcion}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Alert variant="warning">No se registra historial de cambios para la fecha seleccionada</Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseHistorial}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    </header>
    );
}

export default Navegacion;
