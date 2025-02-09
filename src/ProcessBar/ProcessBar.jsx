import React, { useContext, useState } from "react";
import { Context } from "../Contex";
import { useLocation } from "react-router-dom";

export default function ProcessBar({ procesos }) {
  const arrayProcesos = [...procesos];
  const { setProcessesToPlotted } = useContext(Context);
  const { setQuantumDataG } = useContext(Context);
  const [auxQ, setAuxQ] = useState(0);
  const currentLocation = useLocation();
  const setProcesses = (arrayProcesos) => {
    setProcessesToPlotted(arrayProcesos);
  };

  return (
    <div style={{ // Contenedor principal (gris)
      height: "400px",
      width: "45%",
      borderRadius: "8px",
      margin: "0px",
      display: "flex",
      flexDirection: "column", // Para alinear verticalmente
      alignItems: "center" // Centrar horizontalmente el contenido

      
    }}>
      <div
        style={{ // Contenedor negro
          height: "300px",
          width: "100%", // Ocupa todo el ancho del contenedor gris
          overflowX: "auto",
          display: "flex",
          border: "1px solid #333",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#111",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px" //
        }}
      >
        {arrayProcesos.map((proceso, indice) => (
          <div
            key={indice}
            style={{
              minWidth: "250px",
              margin: "5px",
              border: "1px solid #333",
              borderRadius: "6px",
              maxHeight: "250px",
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#1a1a1a",
            }}
          >
            <p style={{ color: "#fff", fontSize: "16px", fontWeight: "500" }}>
              {proceso.nombre}
            </p>
            <p style={{ color: "#fff" }}>
              {` llegada ${proceso.llegada} , duracion ${proceso.duracion} `}
            </p>
            <p style={{ color: "#fff", marginTop: "10px" }}>bloqueos</p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #333",
                backgroundColor: "#111",
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      border: "1px solid #333",
                      padding: "8px",
                      color: "#fff",
                    }}
                  >
                    llegada
                  </th>
                  <th
                    style={{
                      border: "1px solid #333",
                      padding: "8px",
                      color: "#fff",
                    }}
                  >
                    Duración
                  </th>
                </tr>
              </thead>
              <tbody>
                {proceso.bloqueosPendientes.length !== 0
                  ? proceso.bloqueosPendientes.map((bloqueo, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            border: "1px solid #333",
                            padding: "8px",
                            color: "#fff",
                          }}
                        >
                          {bloqueo.llegada}
                        </td>
                        <td
                          style={{
                            border: "1px solid #333",
                            padding: "8px",
                            color: "#fff",
                          }}
                        >
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
          <div className="form-group" style={{ margin: "0 10px" }}>
            <label
              htmlFor="Quantum"
              style={{ color: "#fff", marginBottom: "5px" }}
            >
              Quantum:{" "}
            </label>
            <input
              type="number"
              id="Quantum"
              onChange={(e) => setAuxQ(e.target.value)}
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                color: "#fff",
                padding: "8px",
                borderRadius: "4px",
                width: "100px",
              }}
            />
          </div>
        )}
        
      </div>
      <div style={{ // Contenedor del botón (centrado y abajo)
                display: "flex",
                justifyContent: "center",
                width: "28%" // Ocupa todo el ancho del contenedor gris
                 }}>
          <button
            onClick={() => {
              setQuantumDataG(auxQ);
              setProcesses(arrayProcesos);
            }}
            style={{
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Graficar Procesos
          </button>
        </div>
    </div>
  );
}
