export class Proceso {
  constructor(nombre, llegada, duracion, bloqueos, estado) {
    this._nombre = nombre;
    this._llegada = llegada;
    this._duracion = duracion;
    this._bloqueosPendientes = bloqueos;
    this._bloqueosHechos = [];
    this._tiempo = 0;
    this._estado = estado;
    this._posicion = 0;
  }

  // Getter y Setter para `nombre`
  get nombre() {
    return this._nombre;
  }

  set nombre(nuevoNombre) {
    if (typeof nuevoNombre === "string" && nuevoNombre.trim() !== "") {
      this._nombre = nuevoNombre;
    } else {
      throw new Error("El nombre debe ser una cadena no vacía.");
    }
  }

  // Getter para `posicion`
  get posicion() {
    return this._posicion;
  }

  // Setter para `posicion`
  set posicion(nuevaPosicion) {
    // Verifica que nuevaPosicion sea un número entero no negativo
    if (
      typeof nuevaPosicion === "number" &&
      nuevaPosicion >= 0 &&
      Number.isInteger(nuevaPosicion)
    ) {
      this._posicion = nuevaPosicion;
    } else {
      throw new Error("La posición debe ser un número entero no negativo.");
    }
  }

  // Getter y Setter para `estado`
  get estado() {
    return this._estado;
  }

  set estado(nuevoEstado) {
    this._estado = nuevoEstado;
  }

  // Getter y Setter para `tiempo`
  get tiempo() {
    return this._tiempo;
  }

  set tiempo(nuevoTiempo) {
    if (typeof nuevoTiempo === "number" && nuevoTiempo >= 0) {
      this._tiempo = nuevoTiempo;
    } else {
      throw new Error("El tiempo debe ser un número no negativo.");
    }
  }

  // Getter y Setter para `duracion`
  get duracion() {
    return this._duracion;
  }

  set duracion(nuevaDuracion) {
    if (typeof nuevaDuracion === "number" && nuevaDuracion >= 0) {
      this._duracion = nuevaDuracion;
    } else {
      throw new Error("La duración debe ser un número no negativo.");
    }
  }

  // Getter y Setter para `llegada`
  get llegada() {
    return this._llegada;
  }

  set llegada(nuevaLlegada) {
    if (typeof nuevaLlegada === "number" && nuevaLlegada >= 0) {
      this._llegada = nuevaLlegada;
    } else {
      throw new Error("La llegada debe ser un número no negativo.");
    }
  }

  // Getter y Setter para `bloqueosPendientes`
  get bloqueosPendientes() {
    return this._bloqueosPendientes;
  }

  set bloqueosPendientes(nuevosBloqueos) {
    if (
      Array.isArray(nuevosBloqueos) &&
      nuevosBloqueos.every((b) => b instanceof Bloqueo)
    ) {
      this._bloqueosPendientes = nuevosBloqueos;
    } else {
      throw new Error(
        "Los bloqueos deben ser un arreglo de instancias de la clase Bloqueo."
      );
    }
  }

  // Getter y Setter para `bloqueosHechos`
  get bloqueosHechos() {
    return this._bloqueosHechos;
  }

  set bloqueosHechos(nuevosBloqueosHechos) {
    if (
      Array.isArray(nuevosBloqueosHechos) &&
      nuevosBloqueosHechos.every((b) => b instanceof Bloqueo)
    ) {
      this._bloqueosHechos = nuevosBloqueosHechos;
    } else {
      throw new Error(
        "Los bloqueos hechos deben ser un arreglo de instancias de la clase Bloqueo."
      );
    }
  }
}

export class Bloqueo {
  constructor(llegada, duracionBloqueo) {
    this._llegada = llegada;
    this._duracionBloqueo = duracionBloqueo;
    this._estado = false;
    this._tiempo = 0;
  }

  // Getter y Setter para `llegada`
  get llegada() {
    return this._llegada;
  }

  set llegada(nuevaLlegada) {
    if (typeof nuevaLlegada === "number" && nuevaLlegada >= 0) {
      this._llegada = nuevaLlegada;
    } else {
      throw new Error("La llegada debe ser un número no negativo.");
    }
  }

  // Getter y Setter para `estado`
  get estado() {
    return this._estado;
  }

  set estado(nuevoEstado) {
    this._estado = nuevoEstado;
  }

  // Getter y Setter para `duracionBloqueo`
  get duracionBloqueo() {
    return this._duracionBloqueo;
  }

  set duracionBloqueo(nuevaDuracionBloqueo) {
    if (typeof nuevaDuracionBloqueo === "number" && nuevaDuracionBloqueo >= 0) {
      this._duracionBloqueo = nuevaDuracionBloqueo;
    } else {
      throw new Error(
        "La duración del bloqueo debe ser un número no negativo."
      );
    }
  }

  // Getter y Setter para `tiempo`
  get tiempo() {
    return this._tiempo;
  }

  set tiempo(nuevoTiempo) {
    if (typeof nuevoTiempo === "number" && nuevoTiempo >= 0) {
      this._tiempo = nuevoTiempo;
    } else {
      throw new Error("El tiempo debe ser un número no negativo.");
    }
  }
}

export class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(elemento) {
    this.queue.push(elemento);
    return this.queue;
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  queueArreglo() {
    return this.queue;
  }
}
