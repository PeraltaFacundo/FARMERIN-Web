import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineBars } from 'react-icons/ai';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiLogOut } from "react-icons/fi";
import { Button } from 'react-bootstrap';
import Switch from 'react-switch';
import { FirebaseContext } from '../../firebase2';
import { Badge, Modal, Alert } from 'react-bootstrap';
import DetalleAlerta from './detalleAlerta';
import { ContenedorAlertas } from '../ui/Elementos';
import { useDispatch, useSelector } from "react-redux";
import { updateValor } from '../../redux/valorSlice';

const Navegacion = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange, titulo }) => {
    const { usuario, firebase, guardarTamboSel, tambos, tamboSel, porc, setPorc } = useContext(FirebaseContext);
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [alertas, guardarAlertas] = useState([]);
    const [alertasSinLeer, guardarAlertasSinLeer] = useState([]);
    const [error, guardarError] = useState(false);
    let variante = "warning";

    const dispatch = useDispatch();
    const valor = useSelector((state) => state.valor);

    useEffect(() => {
        // Actualizar el valor cuando "porc" cambie
        dispatch(updateValor(porc));
    }, [porc, dispatch]);

    useEffect(() => {
        // Actualizar "porc" cuando cambie "tamboSel"
        if (tamboSel) {
            dispatch(updateValor(tamboSel.porcentaje));
        }
    }, [tamboSel, dispatch]);

    useEffect(() => {
        if (valor !== 0 || valor === 0) {
            agregarNotificacion(valor);
        }
    }, [valor]);

    const agregarNotificacion = async (nuevoValor) => {
        let mensajeNotificacion = '';
        if (nuevoValor === 0) {
            mensajeNotificacion = 'SE VOLVIO AL VALOR ORIGINAL DE LA RACION';
        } else if (nuevoValor < 0) {
            mensajeNotificacion = `SE APLICO UNA REDUCCION EN LA RACION (${Math.abs(nuevoValor)}%)`;
        } else {
            mensajeNotificacion = `SE APLICO UN AUMENTO EN LA RACION (${nuevoValor}%)`;
        }

        const nuevaAlerta = {
            id: `notificacion-${Date.now()}`, // ID único
            mensaje: mensajeNotificacion,
            valorPorcentaje: nuevoValor, // Agregar el valor del porcentaje
            visto: false,
            fecha: new Date().toISOString()
        };

        // Guardar la notificación en el estado local
        guardarAlertas(prevAlertas => [nuevaAlerta, ...prevAlertas]);
        guardarAlertasSinLeer(prevSinLeer => [nuevaAlerta, ...prevSinLeer]);

        // Guardar la notificación en Firestore
        try {
            await firebase.db.collection('notificaciones').add(nuevaAlerta);
        } catch (error) {
            console.error("Error al guardar la notificación en Firestore:", error);
        }
    };

    const limpiarNotificaciones = async () => {
        try {
            // Eliminar todas las notificaciones de Firestore
            const batch = firebase.db.batch();
            const snapshot = await firebase.db.collection('notificaciones').get();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            
            // Limpiar el estado local
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

    const handleClose = () => setShow(false);
    const handleShow = () => {
        alertasSinLeer.forEach(a => vista(a));
        setShow(true);
        guardarAlertasSinLeer([]);
    };

    function cerrarSesion() {
        guardarTamboSel(null);
        firebase.logout();
        return router.push('/login');
    }

    async function obtenerAlertas() {
        const tambosArray = tambos.map(t => t.id);
        try {
            // Obtener alertas y notificaciones
            const [alertasSnapshot, notificacionesSnapshot] = await Promise.all([
                firebase.db.collection('alerta')
                    .where('idtambo', 'in', tambosArray)
                    .orderBy('fecha', 'desc')
                    .get(),
                firebase.db.collection('notificaciones')
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

            // Fusionar alertas y notificaciones
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
                            <Button variant="link" onClick={handleShow}>
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
            <Modal size="lg" show={show} onHide={handleClose}>
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
                    <Button variant="danger" onClick={limpiarNotificaciones}>
                        Restablecer
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default Navegacion;
