// Leer el local storage cuando cargue la pagina
let temaConfigurado = JSON.parse(localStorage.getItem("Theme")) || "dark";
cambiarTema(temaConfigurado);


let btnThemeLight = document.getElementById("themeLight");
btnThemeLight.addEventListener("click", () => cambiarTema("light"));

let btnThemeDark = document.getElementById("themeDark");
btnThemeDark.addEventListener("click", () => cambiarTema("dark"));

function cambiarTema(color) {
  let body = document.querySelector("body");
  body.setAttribute("data-bs-theme", color);

  //cambiar theme
  color === "dark"
    ? (document.getElementById("iconTheme").className = "bi bi-moon-stars-fill")
    : (document.getElementById("iconTheme").className =
        "bi bi-brightness-high-fill");

  // almacenar datos en el local storage
  localStorage.setItem("Theme",  JSON.stringify(color)) 
}
