import React, { useState, useContext } from "react";
import { FirebaseContext } from '../firebase2';
import Layout from '../components/layout/layout';
import { parse, differenceInDays } from 'date-fns';
import { Contenedor } from '../components/ui/Elementos';

const MotivoBaja = () => {
    const [animalesConBaja, setAnimalesConBaja] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { firebase, tamboSel } = useContext(FirebaseContext);

    const diasLimite = 100;      // variable para comparar los dias

    // Función para obtener animales con mbaja y fbaja no vacíos
    const obtenerAnimalesConBaja = async () => {
        setLoading(true);
        setError(null);
        try {
            // Referencia a la colección 'animal'
            const querySnapshot = await firebase.db.collection('animal')
                .where('idtambo', '==', tamboSel.id)
                .get();

            const animales = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Verifica que mbaja y fbaja no estén vacíos y que fbaja tenga más de 60 días
                if (data.mbaja && data.fbaja) {
                    const fbaja = parse(data.fbaja, 'yyyy-MM-dd', new Date());
                    const diasDesdeBaja = differenceInDays(new Date(), fbaja);
                    if (diasDesdeBaja < diasLimite) {
                        animales.push({ id: doc.id, ...data });
                    }
                }
            });

            setAnimalesConBaja(animales);
        } catch (error) {
            console.error("Error obteniendo animales:", error);
            setError("Error obteniendo animales. Por favor, intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const eliminarTodosLosAnimalesConBaja = async () => {
        try {
            const batch = firebase.db.batch();

            animalesConBaja.forEach((animal) => {
                const docRef = firebase.db.collection('animal').doc(animal.id);
                batch.delete(docRef);
            });

            await batch.commit();
            console.log("Todos los animales con baja eliminados exitosamente");

            // Limpiar la lista de animales con baja
            setAnimalesConBaja([]);
        } catch (error) {
            console.error("Error eliminando animales:", error);
            setError("Error eliminando animales. Por favor, intenta de nuevo.");
        }
    };

    const manejarEliminarTodosLosAnimales = async () => {
        await obtenerAnimalesConBaja();
        eliminarTodosLosAnimalesConBaja();
    };


    return (
        <Layout titulo="Obtener y Eliminar">
            <div className="motivoBaja">
                <button className="botObtener" onClick={obtenerAnimalesConBaja} disabled={loading}>
                    {loading ? "Cargando..." : "Obtener Animales con Baja"}
                </button>

                <button className="botEliminar" onClick={manejarEliminarTodosLosAnimales}>
                    {loading ? "Cargando..." : "Eliminar todos los animales con baja"}
                </button>
            </div>
            <Contenedor>
                <h3>Listado de animales con motivo de baja:</h3>
                <h4>cantidad de animales: {animalesConBaja.length}</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {animalesConBaja.length === 0 && !loading && <li>No se encontraron animales con baja.</li>}
                    {animalesConBaja.map((animal) => (
                        <li key={animal.id}>
                            Nombre: {animal.rp}, eRP: {animal.erp}, mbaja: {animal.mbaja}, fbaja: {animal.fbaja}
                        </li>
                    ))}
                </ul>
            </Contenedor>
        </Layout>
    );
};

export default MotivoBaja;