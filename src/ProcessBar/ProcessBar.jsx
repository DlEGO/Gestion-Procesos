import React, { useContext, useState } from "react";
import { Context } from "../Contex";
import { useLocation } from "react-router-dom";

export default function ProcessBar({ procesos }) {
  const arrayProcesos = [...procesos];
  const { setProcessesToPlotted } = useContext(Context);
  const { setQuantumDataG } = useContext(Context);
  const[auxQ, setAuxQ] = useState(0)
  const currentLocation = useLocation();
  const setProcesses = (arrayProcesos) => {
    setProcessesToPlotted(arrayProcesos);
  };

  return (
    <div
      style={{
        height: "250px",
        width: "65%",
        maxWidth: "700px",
        overflowX: "auto",
        display: "flex",
        border: "5px solid white",
        borderRadius: "5px",
        margin: "10px",
      }}
    >
      {arrayProcesos.map((proceso, indice) => (
        // Aquí debes colocar lo que quieras renderizar para cada proceso
        // Por ejemplo, puedes retornar un elemento JSX representando cada proceso
        <div
          key={indice}
          style={{
            minWidth: "250px",
            margin: "5px",
            border: "2px white solid",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          <p>{proceso.nombre}</p>
          <p>{` llegada ${proceso.llegada} , duracion ${proceso.duracion} `}</p>
          <p>bloqueos</p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid white",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid white" }}>llegada</th>
                <th style={{ border: "1px solid white" }}>Duración</th>
              </tr>
            </thead>
            <tbody>
              {proceso.bloqueosPendientes.length !== 0
                ? proceso.bloqueosPendientes.map((bloqueo, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid white", padding: "8px" }}>
                        {bloqueo.llegada}
                      </td>
                      <td style={{ border: "1px solid white", padding: "8px" }}>
                        {bloqueo.duracionBloqueo}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      ))}
      {currentLocation.pathname === "/RR" && (
        <div className="form-group">
          <label htmlFor="Quantum">Quantum: </label>
          <input
            type="number"
            id="Quantum"
            onChange={(e) => setAuxQ(e.target.value)}
          />
        </div>
      )}
      <div>
        <button
          onClick={() => {
            setQuantumDataG(auxQ),
            setProcesses(arrayProcesos);
          }}
        >
          Graficar Procesos
        </button>
      </div>
    </div>
  );
}
