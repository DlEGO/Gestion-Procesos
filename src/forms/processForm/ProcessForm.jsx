import React, { useState } from "react";
import "./ProcessForm.css"; // Importar estilos CSS
import { Bloqueo } from "../../Algorithms/Classes";
import { Proceso } from "../../Algorithms/Classes";
import { useLocation } from "react-router-dom";


export default function ProcessForm({ agregarProceso }) {
  const currentLocation = useLocation();

  // Estados para almacenar los datos del formulario
  const [nombreProceso, setNombreProceso] = useState("tu proceso");
  const [tiempoLlegada, setTiempoLlegada] = useState(0);
  const [duracion, setDuracion] = useState(0);
  const [tiempoBloqueo, setTiempoBloqueo] = useState(0);
  const [duracionBloqueo, setDuracionBloqueo] = useState(0);
  const [bloqueos, setBloqueos] = useState([]);


  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProceso = new Proceso(
      nombreProceso,
      parseInt(tiempoLlegada),
      parseInt(duracion),
      bloqueos,
      "N"
    );
    agregarProceso(nuevoProceso);
    // Limpia el formulario después de enviar los datos
    setNombreProceso("tu proceso");
    setTiempoLlegada(0);
    setDuracion(0);
    setTiempoBloqueo(0);
    setDuracionBloqueo(0);
    setBloqueos([]);
  };

  const agregarBloqueo = () => {
    const tiempoBloqueoNum = parseInt(tiempoBloqueo);
    const duracionBloqueoNum = parseInt(duracionBloqueo);

    // Verificar si los datos son números válidos antes de agregar el bloqueo
    if (!isNaN(tiempoBloqueoNum) && !isNaN(duracionBloqueoNum)) {
      // Crear un nuevo objeto de bloqueo con los datos convertidos
      const nuevoBloqueo = new Bloqueo(tiempoBloqueoNum, duracionBloqueoNum);
      // Actualizar la lista de bloqueos añadiendo el nuevo bloqueo al final del array
      setBloqueos([...bloqueos, nuevoBloqueo]);
      // Limpiar los campos de tiempoBloqueo y duracionBloqueo después de agregar el bloqueo
      setTiempoBloqueo(0);
      setDuracionBloqueo(0);
    } else {
      // Manejar el caso donde los datos no son números válidos
      console.error(
        "Los datos de tiempoBloqueo y duracionBloqueo deben ser números válidos."
      );
    }
  };

  const eliminarBloqueo = (indice) => {
    const nuevosBloqueos = bloqueos.filter((_, i) => i !== indice);
    setBloqueos(nuevosBloqueos);
  };

  return (
    <div
      style={{
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "65%",
      }}
    >
      <form onSubmit={handleSubmit} className="process-form">
        <div className="form-group">
          <label htmlFor="nombreProceso">Nombre del proceso:</label>
          <input
            type="text"
            id="nombreProceso"
            value={nombreProceso}
            onChange={(e) => setNombreProceso(e.target.value)}
          />
        </div>
        <div className="bloqueos">
          <div className="form-group">
            <label htmlFor="tiempoLlegada">llegada proceso:</label>
            <input
              type="number"
              id="tiempoLlegada"
              value={tiempoLlegada == null ? "" : tiempoLlegada}
              onChange={(e) => setTiempoLlegada(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duracion">Duración proceso:</label>
            <input
              type="number"
              id="duracion"
              value={duracion == null ? "" : duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>
        </div>
        <div className="bloqueos">
          <div className="form-group">
            <label htmlFor="tiempoBloqueo">llegada bloqueo:</label>
            <input
              type="number"
              id="tiempoBloqueo"
              value={tiempoBloqueo == null ? "" : tiempoBloqueo}
              onChange={(e) => setTiempoBloqueo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duracionBloqueo">Duración bloqueo:</label>
            <input
              type="number"
              id="duracionBloqueo"
              value={duracionBloqueo == null ? "" : duracionBloqueo}
              onChange={(e) => setDuracionBloqueo(e.target.value)}
            />
          </div>
        </div>
        <button type="button" onClick={agregarBloqueo}>
          Agregar Bloqueo
        </button>
        <button type="submit">Cargar Proceso</button>
        <div className="bloqueosGuardados">
          {bloqueos.map((bloqueo, indice) => (
            <div
              key={indice}
              style={{
                display: "flex",
                borderBottom: "2px solid white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{ width: "90%", color: "white", textAlign: "center" }}
              >{`bloqueo ${indice}- llegada: ${bloqueo.llegada}, duracion: ${bloqueo.duracionBloqueo}`}</p>
              <button
                onClick={() => eliminarBloqueo(indice)}
                type="button"
                style={{ width: "10%", height: "30px" }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
