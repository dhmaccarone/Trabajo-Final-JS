
/**************************************************************************************
*       Simulador para controlar gastos para fines personales o comerciales.          *
*     Se ingresa un monto incial para luego ir controlando cuanto dinero se gasta.    *
**************************************************************************************/


const DateTime = luxon.DateTime;

const fecha = DateTime.now();

let nombre;

let billetera;

let gasto;

let motivo;

let categoria;

let listaGastos = [];

let tieneGastos = false;


const llamarCategorias = async () => {

   const response = await fetch("categoriasGasto.json");

  const data = await response.json();

  data.forEach(categoria => {
    
    let nuevaOpcion = document.createElement("option");

    nuevaOpcion.innerHTML = categoria;

    selectCategoria.append(nuevaOpcion);
    
    // console.log(response)

  });

}

llamarCategorias();


const usuario = new Persona("user",0);


if (nombreStorage && billeteraStorage) {

  usuario.setNombreUsuario(nombreStorage);

  usuario.setDineroUsuario(Number(billeteraStorage));

  document.querySelector(".primer-formulario").style.display = "none";
  
  botonEnviarDatos.style.display = "none";
  
  document.getElementById("tituloUsuario").style.display = "block";
  
  document.getElementById("tituloUsuario").innerHTML = `¡Bienvenido ${usuario.nombre}!`;

  document.getElementById("tituloBilletera").style.display = "block";
  
  document.getElementById("tituloBilletera").innerHTML = `<i class="fa-solid fa-wallet me-1"></i> $${usuario.dinero}`;
  
  botonUsuarioGastos.style.display = "block";

  botonBorrarDatos.style.display = "block";

  document.getElementById("botonResetearDatos").style.display = "none";

  listaGastosStorage && ((listaGastos = JSON.parse(listaGastosStorage)) && (botonVerGastos.style.display = "block"));

}


formulario.addEventListener("submit",(e) => {

  e.preventDefault();
  
  nombre = inputUsuarioNombre.value;

  usuario.setNombreUsuario(nombre);
  
  inputUsuarioNombre.value = "";
  
  billetera = Number(inputUsuarioDinero.value);

  usuario.setDineroUsuario(billetera);
  
  inputUsuarioDinero.value = "";

  insertarStorage("nombreUsuario",nombre);

  insertarStorage("dineroUsuario",billetera);
  
  document.querySelector(".primer-formulario").style.display = "none";
  
  botonEnviarDatos.style.display = "none";
  
  document.getElementById("tituloUsuario").style.display = "block";
  
  document.getElementById("tituloUsuario").innerHTML = `¡Bienvenido ${usuario.nombre}!`;

  document.getElementById("tituloBilletera").style.display = "block";
  
  document.getElementById("tituloBilletera").innerHTML = `<i class="fa-solid fa-wallet me-1"></i> $${usuario.dinero}`;
  
  botonUsuarioGastos.style.display = "block";

  botonBorrarDatos.style.display = "block";

  document.getElementById("botonResetearDatos").style.display = "none";

  Swal.fire ({

    position: 'center',

    icon: 'success',

    title: '¡Cuenta creada con éxito!',

    showConfirmButton: false,

    timer: 1500

  });
  
});

botonUsuarioGastos.addEventListener("click",() => {

    if (usuario.dinero !== 0 && usuario.dinero !== "0") {

      document.querySelector(".segundo-formulario").style.display = "block";

      document.getElementById("tituloUsuario").style.display = "none";

      document.getElementById("tituloNombre").style.display = "block";

      document.getElementById("tituloNombre").innerHTML = `<i class="fa-solid fa-user me-1"></i> ${usuario.nombre}`;
  
      botonUsuarioGastos.style.display = "none";

      botonBorrarDatos.style.display = "none";
  
      botonCrearGasto.style.display = "block";

      document.getElementById("botonResetearDatos").style.display = "block";

    }

    else {

      Swal.fire ({

        icon: 'error',
  
        title: 'Oops...',
  
        text: '¡No tienes más dinero!',
  
      });

    }
  
});

botonBorrarDatos.addEventListener("click",() =>{

  Swal.fire ({

    title: '¿Estás seguro?',

    text: "¡No podrás recuperar tus datos!",

    icon: 'warning',

    showCancelButton: true,

    confirmButtonColor: '#3085d6',

    cancelButtonColor: '#d33',

    confirmButtonText: 'Sí, quiero eliminar',

    cancelButtonText: 'Cancelar'

  })
  
  .then((resultado) => {

    if (resultado.isConfirmed) {

      Swal.fire(

        '¡Eliminado!',

        'Todos tus datos fueron borrados.',

        'success'

      )

      removerStorage("nombreUsuario");
  
      removerStorage("dineroUsuario");

      removerStorage("listaDeGastos");

      usuario.setNombreUsuario("user");

      usuario.setDineroUsuario(0);

      listaGastos = [];

      botonUsuarioGastos.style.display = "none";

      botonBorrarDatos.style.display = "none";

      botonVerGastos.style.display = "none";

      document.querySelector(".primer-formulario").style.display = "block";

      botonEnviarDatos.style.display = "block";

      document.getElementById("botonResetearDatos").style.display = "block";

      document.getElementById("tituloUsuario").style.display = "none";

      document.getElementById("tituloBilletera").style.display = "none";

      document.getElementById("tituloNombre").style.display = "none";

    }

  });

});

botonCrearGasto.addEventListener("click",() => {

  let cantidadGastos = listaGastos.length;

  gasto = Number(inputMontoGasto.value);
  
  inputMontoGasto.value = "";
  
  motivo = inputTituloGasto.value;

  categoria = selectCategoria.value;
  
  inputTituloGasto.value = "";

  if (usuario.dinero === 0 || usuario.dinero === "0") {

    document.querySelector(".segundo-formulario").style.display = "none";
  
    botonCrearGasto.style.display = "none";
  
    document.getElementById("botonResetearDatos").style.display = "none";

    Swal.fire ({

      icon: 'error',

      title: 'Oops...',

      text: '¡No tienes más dinero!',

    });
  
  }

  else if (gasto <= usuario.dinero) {
    
    usuario.calcularGasto();

    let sumaCantidadGastos = listaGastos.length;

    cantidadGastos !== sumaCantidadGastos && ( 

      Swal.fire ({

        position: 'bottom-end',
    
        icon: 'success',
    
        title: 'Gasto creado correctamente',
    
        showConfirmButton: false,
    
        timer: 1500
    
      })

    );

  }
    
  document.getElementById("tituloBilletera").innerHTML = `<i class="fa-solid fa-wallet me-1"></i> $${usuario.dinero}`;
  
  if (tieneGastos === true) {

    insertarStorage("dineroUsuario",usuario.dinero);
  
    insertarStorage("listaDeGastos",JSON.stringify(listaGastos));

    botonVerGastos.style.display = "block";
  
  }
  
});

botonVerGastos.addEventListener("click", () => {
  
  document.querySelector(".segundo-formulario").style.display = "none";

  document.getElementById("botonResetearDatos").style.display = "none";

  listaGastos.length !== 0 && (document.getElementById("usuarioListaGastos").style.display = "block");

  document.getElementById("tituloUsuario").style.display = "none";

  document.getElementById("tituloNombre").style.display = "block";

  document.getElementById("tituloNombre").innerHTML = `<i class="fa-solid fa-user me-1"></i> ${usuario.nombre}`;
    
  usuario.verGastos();

  botonUsuarioGastos.style.display = "none";

  botonBorrarDatos.style.display = "none";
  
  botonVerGastos.style.display = "none";
  
  botonCrearGasto.style.display = "none";

  botonRegresar.style.display = "block";

  listaGastos.length !== 0 && (botonSumaTotalGastos.style.display = "block");
  
});

botonRegresar.addEventListener("click", () => {

  botonUsuarioGastos.style.display = "block";

  botonBorrarDatos.style.display = "block";
  
  botonVerGastos.style.display = "block";

  botonRegresar.style.display = "none";

  botonSumaTotalGastos.style.display = "none";

  document.getElementById("usuarioListaGastos").style.display = "none";

  document.getElementById("listaDeGastos").innerHTML = "";

});

botonSumaTotalGastos.addEventListener("click", () => {

  Swal.fire(`Gastaste $${usuario.sumarTotalGastos()} en total`);

});

document.getElementById("listaDeGastos").addEventListener("click", (e) => {
  
  e.preventDefault;
  
  if (e.target.id === "botonBorrarGastos") {

    Swal.fire({

      title: '¿Seguro que quieres eliminar?',

      text: "¡Tu gasto se eliminará!",

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Sí, eliminar',

      cancelButtonText: 'Cancelar'

    })
    
    .then((result) => {

      if (result.isConfirmed) {

        Swal.fire (

          '¡Eliminado!',

          'Tu gasto se ha eliminado correctamente',

          'success'

        );

        usuario.eliminarGasto(e.target.dataset.gasto);

        listaGastos.length === 0 && (document.getElementById("usuarioListaGastos").style.display = "none");

      }

    });

  }

});