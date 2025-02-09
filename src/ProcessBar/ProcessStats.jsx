import React from "react";
import "./ProcessStats.css";
import { useLocation } from "react-router-dom";

export default function ProcessStats({ dataProccesada, dataInicial }) {
  const currentLocation = useLocation();
  
  function contarRepeticiones(arreglo, elemento) {
    let contador = 0;
    arreglo.forEach((item) => {
      if (item === elemento) {
        contador++;
      }
    });
    return contador;
  }

  function tRespuesta(arreglo, elemento) {
    let contador = 0;
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === elemento) {
        contador++;
      }
      if (arreglo[i] === 'A') {
        return contador;
      }
    }
    return contador;
  }

  return (
    <div style={{
      height: "30%",
      width: "105%",
      overflowX: "auto",
      marginTop: "3px",
    }}>
      <table>
        <thead>
          <tr>
            <th>Nombre del Proceso</th>
            <th>ejecucion</th>
            <th>espera</th>
            <th>bloqueo</th>
            <th>fin</th>
            <th>retorno</th>
            <th>Tiempo perdido</th>
            <th>penalidad</th>
            <th>Tiempo de Respuesta</th>
          </tr>
        </thead>
        <tbody>{currentLocation.pathname === "/RR" ? (
          dataProccesada != null && dataProccesada.length > 0 ? 
            dataProccesada[1].map((proceso, index) => (
              <tr key={index}>
                <td>{proceso.nombre}</td>
                <td>{contarRepeticiones(proceso.grafica, 'A').toFixed(2)}</td>
                <td>{contarRepeticiones(proceso.grafica, '*').toFixed(2)}</td>
                <td>{contarRepeticiones(proceso.grafica, 'B').toFixed(2)}</td>
                <td>{proceso.grafica.length.toFixed(2)}</td>
                <td>{(proceso.grafica.length - dataInicial[index].llegada).toFixed(2)}</td>
                <td>{((proceso.grafica.length - dataInicial[index].llegada) - contarRepeticiones(proceso.grafica, 'A')).toFixed(2)}</td>
                <td>{((proceso.grafica.length - dataInicial[index].llegada) / contarRepeticiones(proceso.grafica, 'A')).toFixed(2)}</td>
                <td>{tRespuesta(proceso.grafica,'*').toFixed(2)}</td>
              </tr>
            )) : null
        ) : (
          dataProccesada != null && dataProccesada.length > 0 ?
            dataProccesada.map((proceso, index) => (
              <tr key={index}>
                <td>{proceso.nombre}</td>
                <td>{contarRepeticiones(proceso.grafica, 'A').toFixed(2)}</td>
                <td>{contarRepeticiones(proceso.grafica, '*').toFixed(2)}</td>
                <td>{contarRepeticiones(proceso.grafica, 'B').toFixed(2)}</td>
                <td>{proceso.grafica.length.toFixed(2)}</td>
                <td>{(proceso.grafica.length - dataInicial[index].llegada).toFixed(2)}</td>
                <td>{((proceso.grafica.length - dataInicial[index].llegada) - contarRepeticiones(proceso.grafica, 'A')).toFixed(2)}</td>
                <td>{((proceso.grafica.length - dataInicial[index].llegada) / contarRepeticiones(proceso.grafica, 'A')).toFixed(2)}</td>
                <td>{tRespuesta(proceso.grafica,'*').toFixed(2)}</td>
              </tr>
            )) : null
        )}</tbody>
      </table>
    </div>
  );
}