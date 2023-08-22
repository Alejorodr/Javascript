//Simulador interactivo primera pre-entrega

// Definir notas en blanco para almacenar las notas
var notas = [];

// Función para mostrar el menú y obtener la selección del usuario
function mostrarMenu() {
    console.log("1. Agregar nota 📝");
    console.log("2. Mostrar notas 🔍");
    console.log("3. Salir ❌");

    var opcion = prompt("Seleccione una opción: 1. Agregar nota 📝 / 2. Mostrar nota 🔍 / 3. Salir ❌");
    return opcion;
}

// Función para agregar una nota
function agregarNota() {
    var nota = prompt("Ingresa la nueva nota 📝: ");
    notas.push(nota);
    console.log("Haz agregado una nueva nota, para ver las notas presiona 2. ✅");
}

// Función para mostrar las notas
function mostrarNotas() {
    if (notas.length === 0) {
        console.log("No haz agregado ninguna nota en esta sesion. 🤷🏻‍♂️");
    } else {
        console.log("🗒️ Notas:");
        for (var i = 0; i < notas.length; i++) {
            console.log(i + 1 + ". " + notas[i]);
        }
    }
}

// Ciclo principal de la aplicación
var continuar = true;
while (continuar) {
    var opcion = mostrarMenu();

    switch (opcion) {
        case "1":
            agregarNota();
            break;
        case "2":
            mostrarNotas();
            break;
        case "3":
            continuar = false;
            console.log("Cerrando notas.😢");
            break;
        default:
            console.log("Opción inválida. Por favor, elige una opción válida.");
            break;
    }
}