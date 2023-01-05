const obtenerStorage = (valor) => localStorage.getItem(valor);

const insertarStorage = (clave,valor) => localStorage.setItem(clave,valor);

const removerStorage = (clave) => localStorage.removeItem(clave);

let nombreStorage = obtenerStorage("nombreUsuario");

let billeteraStorage = obtenerStorage("dineroUsuario");

let listaGastosStorage = obtenerStorage("listaDeGastos");