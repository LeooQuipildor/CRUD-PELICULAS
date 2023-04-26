export function cantidadCaracteres(texto, min, max) {
  if (texto.length >= min && texto.length <= max) {
    console.log("correcto");
    return true;
  } else {
    console.log("incorrecto");
    return false;
  }
}

function validarDuracion(value){
  let patron = /^[0-9]{1,3}$/
  if(patron.test(value)){
    console.log(`digito valido de 1 a 3 caracteres`);
    return true;
  }else{
    console.log(`No paso la expresion regular del tiempo`)
    return false;
  }
}



function validarURLImagen(value){
  let patron = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/
  if(patron.test(value)){
    console.log(`URL valida`);
    return true;
  }else{
    console.log(`URL invalida`);
    return false;
  }
}

function validarGenero(texto){
  if(texto.length > 0 && (texto === `Accion` || texto === `Aventura` || texto === `Comedia`)){
    console.log("Genero valido")
    return true;
  }else{
    console.log("Genero invalido")
    return false;
  }
}
//1985 - año actual + 1
function validarAnio(value){
  let anioActual = new Date().getFullYear();
  if (value >= 1985 && value <= anioActual + 1){
    console.log("Año válido");
    return true;
  } else {
    console.log("Año inválido");
    return false;
  }
}


export function sumarioValidaciones(titulo, descripcion, imagen, duracion, genero, anio, pais, reparto) {
  let resumen = ``;
  if (!cantidadCaracteres(titulo, 3, 100)) {
    resumen += `Corregir el campo del titulo debe contener entre 3 y 100 caracteres <br>`;
  }
  if (!validarURLImagen(imagen)) {
    resumen += `Corregir la URL de la imagen!, la extension debe ser .jpg, .gif o .png <br>`;
  }
  if (!cantidadCaracteres(descripcion, 3, 100)) {
    resumen += `Corregir el campo de la descripcion <br>`;
  }
  if (!validarGenero(genero)) {
    resumen += `Seleccione un genero en la lista de opciones <br>`;
  }
  if (anio.length !==0 && !validarAnio(anio)) {
    resumen += `Ingrese un año valido <br>`;
  }
  if (duracion.length !==0 && !validarDuracion(duracion)) {
    resumen += `Corregir la duracion, debe ser un numero de 3 digitos como maximo <br>`;
  }
  if (pais.length !==0 && !cantidadCaracteres(pais, 3, 50)) {
    resumen += `Corregir el campo del pais debe contener entre 3 y 50 caracteres <br>`;
  }
  if (reparto.length !==0 && !cantidadCaracteres(reparto, 3, 100)) {
    resumen += `Corregir el campo del reparto debe contener entre 3 y 100 caracteres <br>`;
  }
  if (resumen.length !== 0) {
    return resumen;
  } else {
    console.log(`Todo esta ok con el formulario`);
    return ``;
  }
}
