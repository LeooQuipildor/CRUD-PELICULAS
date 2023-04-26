import Pelicula from "./classPelicula.js";

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
    listaPeliculas.map((pelicula, indice)=> crearCardPelicula(pelicula, indice))
  }
}

function crearCardPelicula(pelicula) {
  //aqui dibujo las cards
  let cardsPeliculas = document.getElementById(`seccionPeliculas`);
  console.log(cardsPeliculas);
  seccionPeliculas.innerHTML += `
  <article class="col-md-4 col-lg-3" >
  <div class="card h-100">
  <img src="${pelicula.imagen}" class="card-img-top" alt="${pelicula.titulo}">
  <div class="card-body">
    <h5 class="card-title">${pelicula.titulo}</h5>
  </div>
  <div class="card-footer">
    <a href="/pages/detalle.html" class="btn btn-primary">Detalle</a>
  </div>
</div>
</article>`;
}
