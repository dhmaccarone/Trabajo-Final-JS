class Persona {

    constructor(nombre,dinero) {
  
      this.nombre = nombre;
  
      this.dinero = dinero;
  
    }
  
    calcularGasto() {
  
      if(gasto > 0) {
  
        this.dinero -= gasto;
  
        const nuevoGasto = {
  
          motivoGasto: motivo,
  
          dineroGastado: gasto,

          categoria: categoria,
  
        };
  
        listaGastos.push(nuevoGasto);
  
        tieneGastos = true;
  
      }
  
    }
  
    verGastos() {
  
      for (const elemento of listaGastos) {
  
      let divGasto = document.createElement("div");
  
      divGasto.innerHTML = `<p class="m-3">Gastaste <b>$${elemento.dineroGastado}</b>, en <b>${elemento.motivoGasto}</b><b class="text-primary"> (#${elemento.categoria})</b></p>
                            <p class="fw-bold m-3"><i class="fa-solid fa-calendar-days me-2"></i>${fecha.toLocaleString()}</p>
                            <a class="d-block mx-3 mt-3" style="cursor: pointer">
                              <i id="botonBorrarGastos" data-gasto="${elemento.motivoGasto}" class="fa-solid fa-trash-can text-danger"></i>
                            </a>`;

      divGasto.setAttribute("class","d-flex justify-content-evenly rounded-2 mt-4 mb-2");

      divGasto.setAttribute("id",`${elemento.motivoGasto}`)

      divGasto.style.border = "2px solid black";

      divGasto.style.borderImage = "linear-gradient(45deg, #ff5576, #0b0bac9f) 1"
  
      document.getElementById("listaDeGastos").append(divGasto);
  
      }
    
    };
  
    setNombreUsuario(nombreUsuario) {
  
      this.nombre = nombreUsuario;
  
    }
  
    setDineroUsuario(dineroUsuario) {
  
      this.dinero = dineroUsuario;
  
    }

    sumarTotalGastos() {

      const gastosReducidos = listaGastos.reduce((acumulador,elemento) => acumulador + elemento.dineroGastado,0);

      return gastosReducidos;

    }


    eliminarGasto(gasto) {

      for(let i in listaGastos) {

        if (listaGastos[i].motivoGasto === gasto) {

          listaGastos.length === 1 && (tieneGastos = false);

          document.getElementById(gasto).remove();

          this.setDineroUsuario(this.dinero += listaGastos[i].dineroGastado);

          insertarStorage("dineroUsuario", this.dinero);

          document.getElementById("tituloBilletera").innerHTML = `<i class="fa-solid fa-wallet me-1"></i> $${this.dinero}`;

          listaGastos.splice(i,1);
          
        }

      }

      document.getElementById("tituloBilletera").innerHTML = `<i class="fa-solid fa-wallet me-1"></i> $${this.dinero}`;

      insertarStorage("listaDeGastos",JSON.stringify(listaGastos));

    }
  
  }