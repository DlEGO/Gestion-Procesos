import {Queue} from "./Classes";

export function RR(procesos, quantum) {
  let procesosOrganizados = organizarProcesos(procesos);
  let procesosParaGraficas = organizarProcesos(procesos);

  let colaProcesosListos = new Queue();
  let colaProcesosDesbloqueados = new Queue();
  let arregloProcesosBloqueados = [];
  let cont = 0;
  let procesoActivo = undefined;
  let arregloGraficas = [];
  let arregloQ = [];
  let qDuration = 0;
  let isInQuantum = true;
  while (procesosOrganizados.length !== 0) {
    
    if (isInQuantum) {
      qDuration = quantum+1;
      if(!colaProcesosListos.isEmpty() && colaProcesosListos.peek()===procesoActivo){
        colaProcesosListos.enqueue(colaProcesosListos.dequeue());
        //colaProcesosListos = organizarColaPorProcesos(colaProcesosListos.queueArreglo());
      }
    }
    qDuration--;

    let indices = inicioProceso(cont, procesosOrganizados); //
    
    // Añade un proceso de acuerdo al cont
    if (indices.length !== 0) {
      for (let i = 0; i < indices.length; i++) {
        colaProcesosListos.enqueue(procesosOrganizados[indices[i]]);
      }
    }
    
    while(!colaProcesosDesbloqueados.isEmpty()){
      colaProcesosListos.enqueue(colaProcesosDesbloqueados.dequeue());
    }
    
    // Atiende al primer procesos en la cola
    if (procesoActivo != colaProcesosListos.peek()) {
      procesoActivo = colaProcesosListos.peek();
    }

    let bloqueosProcesoActivo = [];

    if (isInQuantum) {
      bloqueosProcesoActivo = [];
    } else {
      if (procesoActivo !== undefined) {
        bloqueosProcesoActivo = procesoActivo.bloqueosPendientes;
        procesoActivo.tiempo++;
      }
    }
    
    graficar(
      procesosParaGraficas,
      colaProcesosListos.queueArreglo(),
      arregloProcesosBloqueados,
      arregloGraficas,
      1,isInQuantum
    );
    
   retirarProcesoBloqueado(arregloProcesosBloqueados, colaProcesosListos, colaProcesosDesbloqueados);
   
    if (
      procesoActivo !== undefined &&
      procesoActivo.tiempo === procesoActivo.duracion
    ) {
      qDuration = 0;
      retirarProcesoFinalizado(procesosOrganizados, procesoActivo);
      colaProcesosListos.dequeue();
      //colaProcesosListos = organizarColaPorDuracion(colaProcesosListos.queueArreglo());
    }

    // Bloquea al procesos segun sea el caso
    if (bloquearProceso(procesoActivo, bloqueosProcesoActivo)) {
      qDuration = 0;
      arregloProcesosBloqueados.push(procesoActivo);
      colaProcesosListos.dequeue();
      //colaProcesosListos = organizarColaPorDuracion(colaProcesosListos.queueArreglo());
    }
    
    sumarTiempo(arregloProcesosBloqueados);
 
    graficar(
      procesosParaGraficas,
      colaProcesosListos.queueArreglo(),
      arregloProcesosBloqueados,
      arregloGraficas,
      2,isInQuantum
    );
    
    
    let res = eliminarElementoPorNombre(colaProcesosListos.queueArreglo(),colaProcesosDesbloqueados.queueArreglo());
    colaProcesosListos = res[0];
    colaProcesosDesbloqueados = res[1];
    

    if(isInQuantum){
      arregloQ.push('Q');
    }else{
      arregloQ.push('-');
    }
    isInQuantum = qDuration === 0 ? true : false;
    cont++;
  }
  arregloQ.push('Q');
  return [arregloQ,arregloGraficas];
}

function graficar(
  procesosOrganizados,
  colaProcesosListos,
  arregloProcesosBloqueados,
  arregloGrafica,
  op,
  isInQuantum
) {
  procesosOrganizados.forEach((proceso) => {
    if (op === 1) {
      if (
        comprobarSiEstaEnCola(proceso, colaProcesosListos, true, isInQuantum)
      ) {
        agregarAGrafica(arregloGrafica, proceso);
      }
    }

    if (op === 2) {
      if (comprobarSiBloqueado(proceso, arregloProcesosBloqueados, true)) {
        agregarAGrafica(arregloGrafica, proceso);
      } else if (
        !comprobarSiEstaEnCola(
          proceso,
          colaProcesosListos,
          false,
          isInQuantum
        ) &&
        !comprobarSiBloqueado(proceso, arregloProcesosBloqueados, false)
      ) {
        proceso.estado = "-";
        agregarAGrafica(arregloGrafica, proceso);
      }
    }
  });
}

function eliminarElementoPorNombre(
  colaProcesosListos,
  colaProcesosDesbloqueados
) {
  if (colaProcesosDesbloqueados.length !== 0) {
    for (let i = 0; i < colaProcesosListos.length; i++) {
      const elementoA = colaProcesosListos[i];
      if (
        colaProcesosDesbloqueados.some(
          (elementoB) => elementoB.nombre === elementoA.nombre
        )
      ) {
        colaProcesosListos.splice(i, 1);
        i--; // Ajusta el índice después de la eliminación del elemento
      }
    }
  }
  return [
    listaACola(colaProcesosListos),
    listaACola(colaProcesosDesbloqueados),
  ];
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

function comprobarSiEstaEnCola(
  proceso,
  colaProcesosListos,
  cambiar,
  isInQuantum
) {
  // Usar findIndex con una función de prueba para verificar si el proceso está en la lista
  const indice = colaProcesosListos.findIndex(
    (elemento) => elemento.nombre === proceso.nombre
  );

  if (cambiar) {
    if (indice !== -1 && colaProcesosListos[0] === proceso && !isInQuantum) {
      proceso.estado = "A";
    } else if (
      indice !== -1 &&
      colaProcesosListos[0] === proceso &&
      isInQuantum
    ) {
      proceso.estado = "*";
    } else if (indice !== -1 && colaProcesosListos[0] !== proceso) {
      proceso.estado = "*";
    }
  }
  return indice !== -1;
}

function comprobarSiBloqueado(proceso, arregloBloqueado, cambiar) {
  // Usar findIndex con una función de prueba para verificar si el proceso está en la lista
  const indice = arregloBloqueado.findIndex(
    (elemento) => elemento.nombre === proceso.nombre
  );

  if (cambiar) {
    if (indice !== -1) {
      proceso.estado = "B";
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

function retirarProcesoBloqueado(arregloProcesosBloqueados, colaProcesosListos, colaProcesosDesbloqueados) {
  if (arregloProcesosBloqueados.length !== 0) {
    for (let i = 0; i < arregloProcesosBloqueados.length; i++) {
      let proceso = arregloProcesosBloqueados[i];
      if (desbloquearProceso(proceso.bloqueosPendientes)) {
        colaProcesosListos.enqueue(proceso);
        colaProcesosDesbloqueados.enqueue(proceso);
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
  let arreglo = eliminarProceso(procesosOrganizados, proceso);
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
  const indice = arreglo.findIndex(
    (e) => e.llegada === elemento.llegada && e.duracion === elemento.duracion
  );
  if (indice !== 1) {
    arreglo.splice(indice, 1);
  }

  return arreglo;
}

function eliminarProceso(arreglo, elemento,cont) {
  const indice = arreglo.findIndex(
    (e) =>
      e.nombre === elemento.nombre &&
      e.llegada === elemento.llegada &&
      e.duracion === elemento.duracion
  );
  if (indice !== -1) arreglo.splice(indice, 1);
  return arreglo;
}

function listaACola(lista) {
  // Crear una nueva instancia de la clase Queue
  const nuevaCola = new Queue();

  // Encolar cada elemento de la lista en la nueva cola
  lista.forEach((elemento) => {
    nuevaCola.enqueue(elemento);
  });

  return nuevaCola;
}

/*
    // Instancia de la clase Bloqueo
    const bloqueo1 = new Bloqueo(3, 2);
    const bloqueo2 = new Bloqueo(1, 3);
    const bloqueo3 = new Bloqueo(5, 1);
    const bloqueo4 = new Bloqueo(2, 4);
    
    // Objetos de la clase Proceso
    const proceso1 = new Proceso("Proceso A", 0, 6, [bloqueo1], "N");
    const proceso2 = new Proceso("Proceso B", 1, 8, [bloqueo2], "N");
    const proceso3 = new Proceso("Proceso C", 2, 7, [], "N");
    const proceso4 = new Proceso("Proceso D", 4, 3, [], "N");
    const proceso5 = new Proceso("Proceso E", 6, 9, [bloqueo4], "N");
    const proceso6 = new Proceso("Proceso F", 6, 2, [], "N");
    
    // Lista de objetos tipo Proceso
    const procesos = [proceso1, proceso2, proceso3, proceso4,proceso5,proceso6];
 



//Instancia de la clase Bloqueo
const bloqueo1_1 = new Bloqueo(3, 4);
const bloqueo1_2 = new Bloqueo(7, 2);
const bloqueo2_1 = new Bloqueo(2, 5);
const bloqueo3_1 = new Bloqueo(1, 3);
const bloqueo3_2 = new Bloqueo(8, 1);
const bloqueo4_1 = new Bloqueo(1, 4);
const bloqueo4_2 = new Bloqueo(2, 12);
const bloqueo5_1 = new Bloqueo(4, 11);
const bloqueo6_1 = new Bloqueo(5, 3);
const bloqueo6_2 = new Bloqueo(7, 4);

// Objetos de la clase Proceso
const proceso1 = new Proceso("Proceso A", 0, 8, [bloqueo1_1, bloqueo1_2], "N");
const proceso2 = new Proceso("Proceso B", 1, 3, [bloqueo2_1], "N");
const proceso3 = new Proceso("Proceso C", 3, 12, [bloqueo3_1, bloqueo3_2], "N");
const proceso4 = new Proceso("Proceso D", 5, 10, [bloqueo4_1, bloqueo4_2], "N");
const proceso5 = new Proceso("Proceso E", 9, 11, [bloqueo5_1], "N");
const proceso6 = new Proceso("Proceso F", 12, 9, [bloqueo6_1, bloqueo6_2], "N");
const proceso7 = new Proceso("Proceso G", 14, 10, [], "N");

// Lista de objetos tipo Proceso
const procesos = [
  proceso1,
  proceso2,
  proceso3,
  proceso4,
  proceso5,
  proceso6,
  proceso7,
];

const arreglos = RR(procesos,3);
const arreglo = arreglos[1];
const Q = arreglos[0];
// Función para mostrar una gráfica como barras
function mostrarGraficaComoBarras(proceso) {
  // Mapeo de los estados a caracteres
  const caracteres = {
    "A": "A", // Activo
    "B": "#", // Bloqueado
    "*": "*", // Interrumpido
    "-": " ", // Inactivo
  };

  // Construir la gráfica visual
  const graficaVisual = proceso.grafica
    .map((estado) => caracteres[estado])
    .join("  ");

  // Mostrar la gráfica
  console.log(`Gráfica de ${proceso.nombre}:`, graficaVisual);
}

// Mostrar todas las gráficas como barras en la consola en orden inverso
for (let i = arreglo.length - 1; i >= 0; i--) {
  mostrarGraficaComoBarras(arreglo[i]);
}
 
   const caracteres = {
    'A': "A", // Activo
    'B': "#", // Bloqueado
    'Q':'Q',
    "*": "*", // Interrumpido
    "-": " ", // Inactivo
  };
  
const graficaVisual = Q
    .map((estado) => caracteres[estado])
    .join("  ");

  // Mostrar la gráfica
  console.log(`                     `, graficaVisual);

// Calcular la longitud máxima de la gráfica
const longitudMaxima = Math.max(
  ...arreglo.map((proceso) => proceso.grafica.length)
);

// Mostrar el contador en la parte inferior
let contador = "";
for (let i = 0; i <= longitudMaxima; i++) {
  // Formatear el número para que tenga dos dígitos (rellenarlo con un espacio si tiene un solo dígito)
  const numeroFormateado = String(i).padStart(2, " ");
  contador += numeroFormateado + " "; // Agrega el número seguido de un espacio
}
console.log("Contador:           ", contador);
   */