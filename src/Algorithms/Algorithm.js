import {Queue} from "./Classes";

export function algoritmo(procesos, ordenarCola) {
  let procesosOrganizados = organizarProcesos(procesos);
  let procesosParaGraficas = organizarProcesos(procesos);

  let colaProcesosListos = new Queue();
  let arregloProcesosBloqueados = [];
  let cont = 0;
  let procesoActivo = undefined;
  let arregloGraficas = [];

  while (procesosOrganizados.length !== 0) {
    let indices = inicioProceso(cont, procesosOrganizados); //

    // Añade un proceso de acuerdo al cont
    if (indices.length !== 0) {
      for (let i = 0; i < indices.length; i++) {
        colaProcesosListos.enqueue(procesosOrganizados[indices[i]]);
      }
    }

    // Atiende al primer procesos en la cola
    if(procesoActivo != colaProcesosListos.peek()){
      procesoActivo = colaProcesosListos.peek();
    }

    let bloqueosProcesoActivo = [];    

    if (procesoActivo !== undefined) {
      bloqueosProcesoActivo = procesoActivo.bloqueosPendientes;
      procesoActivo.tiempo++;
    }
    
    graficar(procesosParaGraficas, colaProcesosListos.queueArreglo(),arregloProcesosBloqueados,arregloGraficas,1);
    
    retirarProcesoBloqueado(
      arregloProcesosBloqueados,colaProcesosListos
    );

    if (
      procesoActivo !== undefined &&
      procesoActivo.tiempo === procesoActivo.duracion
    ) {
      retirarProcesoFinalizado(procesosOrganizados, procesoActivo);
      colaProcesosListos.dequeue();
      colaProcesosListos= ordenarCola(colaProcesosListos.queueArreglo());
    }
        
    // Bloquea al procesos segun sea el caso
    if (bloquearProceso(procesoActivo, bloqueosProcesoActivo)) {
      arregloProcesosBloqueados.push(procesoActivo);
      colaProcesosListos.dequeue();
      colaProcesosListos= ordenarCola(colaProcesosListos.queueArreglo());
    }
    
    sumarTiempo(arregloProcesosBloqueados);
    graficar(procesosParaGraficas, colaProcesosListos.queueArreglo(),arregloProcesosBloqueados,arregloGraficas,2);
    cont++;
  }
  return arregloGraficas;
}

function graficar(procesosOrganizados, colaProcesosListos, arregloProcesosBloqueados, arregloGrafica, op){
  procesosOrganizados.forEach((proceso)=>{
    if(op === 1){
      if(comprobarSiEstaEnCola(proceso,colaProcesosListos,true)){
        agregarAGrafica(arregloGrafica, proceso);
      }
    }

    if(op === 2){
      if(comprobarSiBloqueado(proceso, arregloProcesosBloqueados, true)){
        agregarAGrafica(arregloGrafica, proceso);
      }else if(!comprobarSiEstaEnCola(proceso,colaProcesosListos,false) && !comprobarSiBloqueado(proceso, arregloProcesosBloqueados, false)){
        proceso.estado = '-';
        agregarAGrafica(arregloGrafica,proceso);
      }
    }
  })
}

function agregarAGrafica(arregloGrafica, proceso) {
  const indice = arregloGrafica.findIndex(
    (objeto) => objeto.nombre === proceso.nombre
  );

  if (indice === -1) {
    arregloGrafica.push({
      nombre: proceso.nombre,
      grafica: [proceso.estado],
    });
  } else {
    arregloGrafica[indice].grafica.push(proceso.estado);
  }
}

function comprobarSiEstaEnCola(proceso, colaProcesosListos, cambiar) {
  // Usar findIndex con una función de prueba para verificar si el proceso está en la lista
  const indice = colaProcesosListos.findIndex(elemento => elemento.nombre === proceso.nombre);
  
  if(cambiar){
    if(indice !== -1 && colaProcesosListos[0] === proceso){
      proceso.estado = 'A';
    }else if(indice !== -1 && colaProcesosListos[0] !== proceso){
      proceso.estado = '*';
    }
  }
  return indice !== -1;
}

function comprobarSiBloqueado(proceso,arregloBloqueado, cambiar) {
  // Usar findIndex con una función de prueba para verificar si el proceso está en la lista
  const indice = arregloBloqueado.findIndex(elemento => elemento.nombre === proceso.nombre);
  
  if(cambiar){
    if(indice !== -1){
      proceso.estado = 'B';
    }  
  }

  return indice !== -1;
}

function organizarProcesos(procesos) {
  const sortedObj = procesos.sort((a, b) => a.llegada - b.llegada);
  // Asignar un nuevo índice a cada objeto después de ordenar
  sortedObj.forEach((proceso, index) => {
    proceso.posicion = index;
  });

  return sortedObj;
}

function inicioProceso(cont, procesos) {
  const indices = procesos
    .map((proceso, index) => (proceso.llegada === cont ? index : -1))
    .filter((index) => index !== -1);
  return indices;
}

function bloquearProceso(proceso, bloqueos) {
  if (bloqueos.length !== 0) {
    let bloqueo = bloqueos[0];
    if (bloqueo.llegada === proceso.tiempo) {
      return true;
    }
  }
  return false;
}

function sumarTiempo(arregloProcesosBloqueados) {
  if (arregloProcesosBloqueados.length !== 0) {
    arregloProcesosBloqueados.forEach((proceso) => {
      if (proceso.bloqueosPendientes.length !== 0)
        proceso.bloqueosPendientes[0].tiempo++;
    });
  }
}

function retirarProcesoBloqueado(arregloProcesosBloqueados, colaProcesosListos, cont) {
  if (arregloProcesosBloqueados.length !== 0) {
    for (let i = 0; i < arregloProcesosBloqueados.length; i++) {
      let proceso = arregloProcesosBloqueados[i];
      if (desbloquearProceso(proceso.bloqueosPendientes)) {
        colaProcesosListos.enqueue(proceso);
        // Eliminar el proceso del arreglo de procesos bloqueados
        arregloProcesosBloqueados.splice(i, 1);
        i--; // Ajustar el índice después de eliminar el proceso
        let bloqueo = proceso.bloqueosPendientes[0];
        bloqueo.estado = true;
        proceso.bloqueosPendientes = eliminarElemento(proceso.bloqueosPendientes, bloqueo);
        proceso.bloqueosHechos.push(bloqueo);
      }
    }
  }
}

function retirarProcesoFinalizado(procesosOrganizados, proceso) {
  let arreglo = eliminarProceso(procesosOrganizados, proceso)
  return arreglo;
}

function desbloquearProceso(bloqueos) {
  if (bloqueos.length !== 0) {
    let bloqueo = bloqueos[0];
    if (bloqueo !== undefined && bloqueo.tiempo === bloqueo.duracionBloqueo) {
      return true;
    }
  }
  return false;
}

function eliminarElemento(arreglo, elemento) {
  const indice = arreglo.findIndex(e => e.llegada === elemento.llegada && e.duracion === elemento.duracion);
  if (indice !== 1){
      arreglo.splice(indice, 1);
  }

  return arreglo;
}

function eliminarProceso(arreglo, elemento) {
    const indice = arreglo.findIndex(e => e.nombre === elemento.nombre && e.llegada === elemento.llegada && e.duracion === elemento.duracion);
    if (indice !== -1) arreglo.splice(indice, 1);
    return arreglo;
}
