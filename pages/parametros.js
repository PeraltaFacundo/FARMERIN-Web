import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../firebase2';
import Layout from '../components/layout/layout';
import DetalleParametro from '../components/layout/detalleParametro';
import SelectTambo from '../components/layout/selectTambo';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

const Parametros = () => {
  const [valor, setValor] = useState(0);
  const [porcentajeSeleccionado, setPorcentajeSeleccionado] = useState(null);
  const [tipoCambio, setTipoCambio] = useState(null);
  const { firebase, setPorc, tamboSel } = useContext(FirebaseContext);

  useEffect(() => {
    if (tamboSel) {
      obtenerPorcentaje();
    }
  }, [tamboSel]);
  
  const obtenerPorcentaje = async () => {
    try {
      const snapshot = await firebase.db.collection('tambo').doc(tamboSel.id).get();
      setValor(snapshot.data().porcentaje);
    } catch (error) {
      console.log(error);
    }
  }

  const actualizarPorcentaje = async (nuevoPorcentaje) => {
    if (tamboSel) {
      const p = { porcentaje: nuevoPorcentaje };
      setPorc(nuevoPorcentaje);
      try {
        await firebase.db.collection('tambo').doc(tamboSel.id).update(p);
        await firebase.db.collection('animal').doc(tamboSel.id).update(p);
      } catch (error) {
        console.log(error);
      }
      setValor(nuevoPorcentaje);
      setPorcentajeSeleccionado(null);
      setTipoCambio(null);
    }
  };

  const aplicarPorcentaje = () => {
    if (porcentajeSeleccionado !== null) {
      actualizarPorcentaje(porcentajeSeleccionado);
    }
  };

  const handleSelect = (e, tipo) => {
    setPorcentajeSeleccionado(Number(e));
    setTipoCambio(tipo);
  };

  const restablecer = async () => {
    if (tamboSel) {
      setValor(0);
      const p = { porcentaje: 0 };
      try {
        await firebase.db.collection('tambo').doc(tamboSel.id).update(p);
        await firebase.db.collection('animal').doc(tamboSel.id).update(p);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let porcentaje;
  switch (valor) {
    case 10: porcentaje = 1.1; break;
    case 20: porcentaje = 1.2; break;
    case 30: porcentaje = 1.3; break;
    case 40: porcentaje = 1.4; break;
    case 50: porcentaje = 1.5; break;
    case 60: porcentaje = 1.6; break;
    case 70: porcentaje = 1.7; break;
    case 80: porcentaje = 1.8; break;
    case 90: porcentaje = 1.9; break;
    case 100: porcentaje = 2; break;
    case -10: porcentaje = 0.9; break;
    case -20: porcentaje = 0.8; break;
    case -30: porcentaje = 0.7; break;
    case -40: porcentaje = 0.6; break;
    case -50: porcentaje = 0.5; break;
    default: porcentaje = 1; break;
  }

 
  return (
    <Layout titulo="Parámetros Nutricionales">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ color: "#404040", fontWeight: "bold", fontSize: "34px", marginTop: 0 }}>ALIMENTACIÓN</h1>
        <div style={{ display: "flex", flexDirection: "row", gap: "7px" }}>
          <p style={{ color: "grey", fontWeight: "bold", fontSize: "18px", marginTop: 0 }}>ESTADO ACTUAL: </p>
          <p style={{ color: "#404040", fontWeight: "bold", fontSize: "18px" }}>
            {valor === 0 ? "POR DEFECTO" : null}
            {valor < 0 ? `REDUCCIÓN DEL ${valor}%` : null}
            {valor > 0 ? `AUMENTO DEL ${valor}%` : null}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px" }}>
      <DropdownButton
  id="dropdown-reducir-button"
  title={tipoCambio === 'reducir' && porcentajeSeleccionado !== null ? ` REDUCIR ${porcentajeSeleccionado}%` : "REDUCIR PORCENTAJE"}
  onSelect={(e) => handleSelect(e, 'reducir')}
  className="dropdown-reducir-button"
>
  <Dropdown.Item eventKey="-10">-10%</Dropdown.Item>
  <Dropdown.Item eventKey="-20">-20%</Dropdown.Item>
  <Dropdown.Item eventKey="-30">-30%</Dropdown.Item>
  <Dropdown.Item eventKey="-40">-40%</Dropdown.Item>
  <Dropdown.Item eventKey="-50">-50%</Dropdown.Item>
</DropdownButton>

        <Button
          className="botonRestablecer"
          variant="info"
          onClick={() => { setValor(0); setPorc(0); }} // Asegúrate de definir una función para restablecer
        >
          RESTABLECER
        </Button>

        <DropdownButton
          id="dropdown-aumentar-button"
          title={tipoCambio === 'aumentar' && porcentajeSeleccionado !== null ? `AUMENTAR ${porcentajeSeleccionado}%` : "AUMENTAR PORCENTAJE"}
          onSelect={(e) => handleSelect(e, 'aumentar')}
          className="dropdown-aumentar-button"
        >
          <Dropdown.Item eventKey="10">10%</Dropdown.Item>
          <Dropdown.Item eventKey="20">20%</Dropdown.Item>
          <Dropdown.Item eventKey="30">30%</Dropdown.Item>
          <Dropdown.Item eventKey="40">40%</Dropdown.Item>
          <Dropdown.Item eventKey="50">50%</Dropdown.Item>
          <Dropdown.Item eventKey="60">60%</Dropdown.Item>
          <Dropdown.Item eventKey="70">70%</Dropdown.Item>
          <Dropdown.Item eventKey="80">80%</Dropdown.Item>
          <Dropdown.Item eventKey="90">90%</Dropdown.Item>
          <Dropdown.Item eventKey="100">100%</Dropdown.Item>
        </DropdownButton>
      </div>

      <Button
        className="botonAplicar"
        variant="success"
        onClick={aplicarPorcentaje}
        style={{ display: tipoCambio !== null ? 'block' : 'none' }}
      >
        APLICAR
      </Button>

      {tamboSel ?
        <>
          <DetalleParametro
            idTambo={tamboSel.id}
            categoria="Vaquillona"
            porcentaje={porcentajeSeleccionado}
          />
          <DetalleParametro
            idTambo={tamboSel.id}
            categoria="Vaca"
            porcentaje={porcentajeSeleccionado}
          />
        </>
        :
        <SelectTambo />
      }
    </Layout>
  );
}

export default Parametros;
