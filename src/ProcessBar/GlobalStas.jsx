import React from "react";
import { useLocation } from "react-router-dom";

export default function GlobalStas({ dataProccesada, dataInicial }) {
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

  // Función auxiliar para validar el resultado y ajustar si es NaN o menor que cero
  function validarResultado(resultado) {
    if (isNaN(resultado) || resultado < 0) {
      return 0; // Si es NaN o menor que cero, devuelve cero
    } else {
      return resultado; // De lo contrario, devuelve el resultado original
    }
  }

  const tiempoEncendido = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // O cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    dataProccesada.forEach((proceso) => {
        if (!isNaN(proceso.grafica.length) && proceso.grafica.length > tiempo)
            tiempo = proceso.grafica.length;
    });
    return validarResultado(tiempo - 1);
};

const tiempoCPU = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // O cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    dataProccesada.forEach((proceso) => {
        tiempo += contarRepeticiones(proceso.grafica, "A");
    });
    return validarResultado(tiempo);
};


  const CPULibre = (dataProccesada) => {
    return validarResultado(tiempoEncendido(dataProccesada) - tiempoCPU(dataProccesada));
  };

  const promedioRetorno = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // o cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    let nProcesosHabilidatos = 0;
    dataProccesada.forEach((proceso, index) => {
        tiempo += proceso.grafica.length - dataInicial[index].llegada;
        nProcesosHabilidatos++;
    });
    return validarResultado(tiempo / nProcesosHabilidatos);
};

const promedioTPerdido = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // o cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    let nProcesosHabilidatos = 0;
    dataProccesada.forEach((proceso, index) => {
        tiempo +=
            proceso.grafica.length -
            dataInicial[index].llegada -
            contarRepeticiones(proceso.grafica, "A");
        nProcesosHabilidatos++;
    });
    return validarResultado(tiempo / nProcesosHabilidatos);
};

const promedioEspera = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // o cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    let nProcesosHabilidatos = 0;
    dataProccesada.forEach((proceso, index) => {
        tiempo += contarRepeticiones(proceso.grafica, "*");
        nProcesosHabilidatos++;
    });
    return validarResultado(tiempo / nProcesosHabilidatos);
};

const promedioEjecucion = (dataProccesada) => {
    if (!dataProccesada || !Array.isArray(dataProccesada) || dataProccesada.length === 0) {
        return 0; // o cualquier otro valor predeterminado que desees devolver
    }
    let tiempo = 0;
    let nProcesosHabilidatos = 0;
    dataProccesada.forEach((proceso, index) => {
        tiempo += contarRepeticiones(proceso.grafica, "A");
        nProcesosHabilidatos++;
    });
    return validarResultado(tiempo / nProcesosHabilidatos);
};



  /////funciones RR

  const tEncendidoRR = (dataProccesada) => {
    if (typeof dataProccesada !== 'undefined') {
        return dataProccesada.length;
    } else {
        // Si dataProccesada[0] es undefined, devuelve 0 o cualquier otro valor predeterminado.
        return 0; // O cualquier otro valor predeterminado que desees devolver
    }
}

const tProcesosRR = (dataProccesada) => {
  if (typeof dataProccesada !== 'undefined') {
      return dataProccesada.length-contarRepeticiones(dataProccesada,'Q');
  } else {
      // Si dataProccesada[0] es undefined, devuelve 0 o cualquier otro valor predeterminado.
      return 0; // O cualquier otro valor predeterminado que desees devolver
  }
}

const tsistemaRR = (dataProccesada) => {
  if (typeof dataProccesada !== 'undefined') {
      return contarRepeticiones(dataProccesada,'Q');
  } else {
      // Si dataProccesada[0] es undefined, devuelve 0 o cualquier otro valor predeterminado.
      return 0; // O cualquier otro valor predeterminado que desees devolver
  }
}

const porProcesos =(dataProccesada)=>{

  return validarResultado((tProcesosRR(dataProccesada)/tEncendidoRR(dataProccesada))*100)
}
const porSistema =(dataProccesada)=>{

  return validarResultado((tsistemaRR(dataProccesada)/tEncendidoRR(dataProccesada))*100)
}


  return (
    <div
      style={{
        margin: "10px",
        padding: "5px",
        borderRadius: "5px",
        border: "5px solid white",
      }}
    >
      {currentLocation.pathname === "/RR" ? (
        <>
          <p>Tiempo encendido: {tEncendidoRR(dataProccesada[0]).toFixed(2)}</p>
          <p>Tiempo procesos: {tProcesosRR(dataProccesada[0]).toFixed(2)}</p>
          <p>Tiempo sistema: {tsistemaRR(dataProccesada[0]).toFixed(2)}</p>
          <p>%CPU Procesos: {porProcesos(dataProccesada[0]).toFixed(2)}</p>
          <p>%CPU sistemas: {porSistema(dataProccesada[0]).toFixed(2)}</p>
          <p>Promedio Retorno: {promedioRetorno(dataProccesada[1]).toFixed(2)}</p>
          <p>Promedio Tiempo Perdido: {promedioTPerdido(dataProccesada[1]).toFixed(2)}</p>
          <p>Promedio Espera: {promedioEspera(dataProccesada[1]).toFixed(2)}</p>
          <p>Promedio Ejecución: {promedioEjecucion(dataProccesada[1]).toFixed(2)}</p>
        </>
      ) : (
        <>
          <p>Tiempo Encendido: {tiempoEncendido(dataProccesada).toFixed(2)}</p>
          <p>Tiempo CPU: {tiempoCPU(dataProccesada).toFixed(2)}</p>
          <p>CPU Libre: {CPULibre(dataProccesada).toFixed(2)}</p>
          <p>Promedio Retorno: {promedioRetorno(dataProccesada).toFixed(2)}</p>
          <p>Promedio Tiempo Perdido: {promedioTPerdido(dataProccesada).toFixed(2)}</p>
          <p>Promedio Espera: {promedioEspera(dataProccesada).toFixed(2)}</p>
          <p>Promedio Ejecución: {promedioEjecucion(dataProccesada).toFixed(2)}</p>
        </>
      )}
    </div>
  );
}
