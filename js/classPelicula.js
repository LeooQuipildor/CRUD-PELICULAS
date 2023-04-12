export default class Pelicula {
  #codigo;
  #titulo;
  #descripcion;
  #imagen;
  #genero;
  #anio;
  #duracion;
  #pais;
  #reparto;
  #estado;
  constructor(
    titulo,
    descripcion,
    imagen,
    genero,
    anio,
    duracion,
    pais,
    reparto
  ) {
    this.#titulo = titulo;
    this.#descripcion = descripcion;
    this.#imagen = imagen;
    this.#genero = genero;
    this.#anio = anio;
    this.#duracion = duracion;
    this.#pais = pais;
    this.#reparto = reparto;
    this.#estado = false;
  }

  // getters y setters
  getCodigo() {
    return this.#codigo;
  }
  setCodigo(codigo) {
    this.#codigo = codigo;
  }


  getTitulo() {
    return this.#titulo;
  }
  setTitulo(titulo) {
    this.#titulo = titulo;
  }


  getDescripcion() {
    return this.#descripcion;
  }
  setDescripcion(descripcion) {
    this.#descripcion = descripcion;
  }

  
  getImagen() {
    return this.#imagen;
  }
  setImagen(imagen) {
    this.#imagen = imagen;
  }


  getGenero() {
    return this.#genero;
  }
  setGenero(genero) {
    this.#genero = genero;
  }


  getAnio() {
    return this.#anio;
  }
  setAnio(anio) {
    this.#anio = anio;
  }


  getDuracion() {
    return this.#duracion;
  }
  setDuracion(duracion) {
    this.#duracion = duracion;
  }


  getPais() {
    return this.#pais;
  }
  setPais(pais){
    this.#pais = pais;
  }


  getReparto() {
    return this.#reparto;
  }
  setReparto(reparto){
    this.#reparto = reparto;
  }


  getEstado() {
    return this.#estado;
  }
  setEstado(estado){
    this.#estado = estado;
  }
  
}
