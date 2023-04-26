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
      >
        <i class="bi bi-pencil-square"></i>
      </button>
      <button type="button" class="btn btn-danger ms-1">
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
function crearPeli() {
  let nuevaPeli = new Pelicula(
    "Super Mario",
    "algo",
    "url",
    "aventura",
    2023,
    "2hs",
    "EEUU",
    "-"
  );
}

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
