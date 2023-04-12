// importar la clase pelicula
import Pelicula from "./classPelicula.js";

const btnEditar = document.getElementById("btnEditar");
btnEditar.addEventListener("click", crearPeli);

const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", mostrarModalPeli);

const modalPelicula = new bootstrap.Modal(
  document.getElementById("modalAgregar")
);

const administrarPelicula = document.getElementById("administrarPelicula");
administrarPelicula.addEventListener("submit", cargarPelicula);

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
  console.log("creando pelicula");
  modalPelicula.hide();
}
