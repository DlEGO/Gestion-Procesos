import { Queue } from "./Classes";

export function organizarColaPorProcesos(colaProcesosListos) {
  const sortedObj = colaProcesosListos.sort((a, b) => a.posicion - b.posicion);
  return listaACola(sortedObj);
}

export function organizarColaPorDuracion(colaProcesosListos) {
  const sortedObj = colaProcesosListos.sort((a, b) => {
    // Primero compara las duraciones
    if (a.duracion !== b.duracion) {
      return a.duracion - b.duracion;
    }
    // Si las duraciones son iguales, compara las posiciones
    return a.posicion - b.posicion;
  });

  return listaACola(sortedObj);
}

export function organizarColaPorDuracionRestante(colaProcesosListos) {
  const sortedObj = colaProcesosListos.sort((a, b) => {
    // Calcula el tiempo restante para cada proceso
    const tiempoRestanteA = a.duracion - a.tiempo;
    const tiempoRestanteB = b.duracion - b.tiempo;

    // Compara los tiempos restantes
    if (tiempoRestanteA !== tiempoRestanteB) {
      return tiempoRestanteA - tiempoRestanteB;
    }

    // Si los tiempos restantes son iguales, compara las posiciones
    return a.posicion - b.posicion;
  });

  return listaACola(sortedObj);
}
/*
export function RR(colaProcesosListos, quantum) {
  let procesosOrganizados = organizarProcesos(procesos);
  let colaProcesosListos = new Queue();
  let arregloProcesosBloqueados = [];
  let cont = 0; //Contador de tiempo
  let procesoActivo;
  let tiempoRestanteQuantum = quantum; //Tiempo restante del quantum actual

  //Mientras hay procesos pendientes
  while (procesosOrganizados.length !== 0 || !colaProcesosListos.isEmpty() || procesoActivo !== undefined) {
    retirarProcesoBloqueado(arregloProcesosBloqueados, colaProcesosListos);

    let indices = inicioProceso(cont, procesosOrganizados);

    //Si hay procesos que llegan en el tiempo actual
    if (indices.length !== 0) {
      for (let i = 0; i < indices.length; i++) {
        colaProcesosListos.enqueue(procesosOrganizados[indices[i]]);
      }
    }
    //Si no hay procesos activos
    if (procesoActivo === undefined) {
      procesoActivo = colaProcesosListos.dequeue();
      tiempoRestanteQuantum = quantum;
    }
    //si hay un proceso activo
    if (procesoActivo !== undefined) {
      procesoActivo.tiempo++;
      tiempoRestanteQuantum--;
      //Si el proceso activo se bloquea
      if (bloquearProceso(procesoActivo, procesoActivo.bloqueosPendientes)) {
        arregloProcesosBloqueados.push(procesoActivo);
        procesoActivo = colaProcesosListos.dequeue();
        tiempoRestanteQuantum = quantum;
      }
      //Si el proceso activo termina su ejecución
      if (procesoActivo.tiempo >= procesoActivo.duracion || tiempoRestanteQuantum === 0) {
        if (procesoActivo.tiempo < procesoActivo.duracion) {
          colaProcesosListos.enqueue(procesoActivo);
        }
        procesoActivo = undefined;
        tiempoRestanteQuantum = quantum;
      }
    }

    sumarTiempo(arregloProcesosBloqueados);
    cont++;
  }
}
*/

function listaACola(lista) {
  // Crear una nueva instancia de la clase Queue
  const nuevaCola = new Queue();

  // Encolar cada elemento de la lista en la nueva cola
  lista.forEach((elemento) => {
    nuevaCola.enqueue(elemento);
  });

  return nuevaCola;
}
