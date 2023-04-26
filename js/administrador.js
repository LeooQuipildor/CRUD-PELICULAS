// importar la clase pelicula
import Pelicula from "./classPelicula.js";
import { sumarioValidaciones } from "./helpers.js";

//const btnEditar = document.getElementById("btnEditar");
//btnEditar.addEventListener("click", crearPeli);

const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", mostrarModalPeli);

const modalPelicula = new bootstrap.Modal(
  document.getElementById("modalAgregar")
);

const administrarPelicula = document.getElementById("administrarPelicula");
administrarPelicula.addEventListener("submit", cargarPelicula);

// Trabajar las peliculas para que vuelvan a ser un objeto Pelicula.
//let listaPeliculas = JSON.parse(localStorage.getItem(`listaPeliculas`)) || []; //esto me devuelve un objeto de tipo Objetc

let listaPeliculas = localStorage.getItem(`listaPeliculas`);
if (!listaPeliculas) {
  //si lista peliculas no exist en localStoreage
  listaPeliculas = [];
} else {
  //si lista Peliculas tiene datos, quiero transformarlo en un array de objetos Pelicula
  listaPeliculas = JSON.parse(listaPeliculas).map(
    (pelicula) =>
      new Pelicula(
        pelicula.codigo,
        pelicula.titulo,
        pelicula.descripcion,
        pelicula.imagen,
        pelicula.genero,
        pelicula.anio,
        pelicula.duracion,
        pelicula.pais,
        pelicula.reparto
      )
  );
}

cargaInicial();

function cargaInicial(){
  //verificar si listaPeliculas tiene datos
  if(listaPeliculas.length > 0){
    //dibuja los datos en la tabla
    listaPeliculas.map((pelicula, indice)=> crearFila(pelicula, indice))
  }
}

function crearFila(pelicula, indice){
  //aqui dibujo el TR
  let datosTablaPelicula = document.querySelector(`tbody`);
  console.log(datosTablaPelicula);
  datosTablaPelicula.innerHTML += `<tr>
  <th scope="row">${indice+1}</th>
  <td
    class="text-truncate"
    data-toggle="tooltip"
    title="${pelicula.titulo}"
  >
    ${pelicula.titulo}
  </td>
  <td
    class="text-truncate"
    data-toggle="tooltip"
    title="${pelicula.descripcion}"
  >
  ${pelicula.descripcion}
  </td>
  <td
    class="text-truncate"
    data-toggle="tooltip"
    title="${pelicula.imagen}"
  >
  ${pelicula.imagen}
  </td>
  <td>${pelicula.genero}</td>
  <td>
    <div class="d-flex">
      <button
        type="button"
        class="btn btn-info me-1"
        id="btnEditar"
        onclick="editarPelicula('${pelicula.codigo}')"
      >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button type="button" class="btn btn-danger ms-1" onclick="borrarPelicula('${pelicula.codigo}')">
        <i class="bi bi-x-square"></i>
      </button>
    </div>
  </td>
</tr>`
}


const codigo = document.getElementById("codigo");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const imagen = document.getElementById("imagen");
const genero = document.getElementById("genero");
const anio = document.getElementById("anio");
const duracion = document.getElementById("duracion");
const pais = document.getElementById("pais");
const reparto = document.getElementById("reparto");
const msjFormulario = document.getElementById("msjFormulario");

// crear una nueva peli

function mostrarModalPeli() {
  modalPelicula.show();
}

function cargarPelicula(e) {
  e.preventDefault();
  //validar los datos
  console.log(genero.value);
  let sumario = sumarioValidaciones(
    titulo.value,
    descripcion.value,
    imagen.value,
    duracion.value,
    genero.value,
    anio.value,
    pais.value,
    reparto.value
  );

  if (sumario.length == 0) {
    //crear pelicula
    let nuevaPeli = new Pelicula(
      undefined,
      titulo.value,
      descripcion.value,
      imagen.value,
      genero.value,
      anio.value,
      duracion.value,
      pais.value,
      reparto.value
    );
    listaPeliculas.push(nuevaPeli);
    console.log(nuevaPeli)

    //almacenar la peli en el local storage
    guardarEnLocalStorage();

    //Limpiar el form
    limpiarFormularioPeliculas();

    modalPelicula.hide();

    // dibujar la fila
    let indicePeli = listaPeliculas.length - 1;
    crearFila(nuevaPeli, indicePeli);

    // mostrar un cartel al usuario

    Swal.fire(
      'Pelicula Creada!',
      `La pelicula ${nuevaPeli.titulo} fue crada correctamente!`,
      'success'
    )
  } else {
    msjFormulario.className = `alert alert-danger mt-3`;
    msjFormulario.innerHTML = sumario;
  }
  //crear la pelicula

  //almacenar la peli en el localStorage
}

function guardarEnLocalStorage() {
  localStorage.setItem(`listaPeliculas`, JSON.stringify(listaPeliculas));
}

function limpiarFormularioPeliculas() {
  administrarPelicula.reset();
}

//function borrarPelicula(){}

window.borrarPelicula = (codigo)=>{
  Swal.fire({
    title: 'Estas seguro de borrar la pelicula?',
    text: "No puedes revertir este proceso posteriormente!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText:'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(`aqui borro la peli`)
      //busco en el array de peliculas la peli que quiero borrar
      let posicionPeli = listaPeliculas.findIndex(pelicula => pelicula.codigo === codigo)
      console.log(posicionPeli);
      // borrar del array el objeto pelicula
      listaPeliculas.splice(posicionPeli,1)
      //igual los datos del localStorage
      guardarEnLocalStorage();
      //quitar la fila de la tabla
      let datosTablaPelicula = document.querySelector(`tbody`);
      datosTablaPelicula.removeChild(datosTablaPelicula.children[posicionPeli]);
      //actualizar los indices de la lista

      Swal.fire(
        'Borramos la pelicula!',
        'La pelicula seleccionada fue eliminada correctamente',
        'success'
      )
    }
  })

}

window.editarPelicula = (codigoUnico)=>{
  //mostrar la ventana modal
  const pelicula = listaPeliculas.find(peli => peli.codigo === codigoUnico)
  console.log(pelicula)
  modalPelicula.show();

  //completar los datos en el modal
  codigo.value = pelicula.codigo;
  titulo.value = pelicula.titulo;
  descripcion.value = pelicula.descripcion;
  imagen.value = pelicula.imagen;
  genero.value = pelicula.genero;
  anio.value = pelicula.anio;
  duracion.value = pelicula.duracion;
  pais.value = pelicula.pais;
  reparto.value = pelicula.reparto;
}