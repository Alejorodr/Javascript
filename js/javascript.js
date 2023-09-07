//Simulador interactivo Segunda pre-entrega

// Definir notas en blanco para almacenar las notas
let notas = [];

// Función para mostrar el menú y obtener la selección del usuario
function mostrarMenu() {
    let opciones = [
        "1. Agregar nota ➕",
        "2. Mostrar notas 🗒️",
        "3. Eliminar nota ➖",
        "4. Concatenar nota 🔗",
        "5. Buscar notas 🔎",
        "6. Salir ❌"
    ];
    console.log(opciones.join("\n"));

    let opcion = prompt("Seleccione una opción:\n 1. Agregar nota ➕ \n 2. Mostrar nota 🗒️ \n 3. Eliminar nota ➖ \n 4. Concatenar nota 🔗 \n 5. Buscar notas 🔎 \n 6. Salir ❌");
    return opcion;
}

// Función para agregar una nota
function agregarNota() {
    let nota = prompt("Ingresa la nueva nota 📝: ");
    notas.push(nota);
    console.log("Haz agregado una nueva nota, para ver las notas presiona 2. ✅");
}

// Función para eliminar una nota
function eliminarNota() {
    if (notas.length === 0) {
        console.log("No hay notas para eliminar.");
        return;
    }

    let indice = parseInt(prompt("Ingresa el numero correspondiente a la nota a eliminar (1, 2, ...): ")) - 1;
    if (indice < 0 || indice >= notas.length) {
        console.log(`Índice inválido.`);
        return;
    }

    let eliminada = notas.splice(indice, 1);
    console.log(`Se eliminó la nota: ${eliminada} 🚮`);
}

// Función para concatenar una nota
function concatenarNota() {
    if (notas.length === 0) {
        console.log("No hay notas para concatenar.");
        return;
    }

    let indice = parseInt(prompt("Ingresa el numero de la nota a concatenar (1, 2, ...): ")) - 1;
    if (indice < 0 || indice >= notas.length) {
        console.log(`Índice inválido.`);
        return;
    }

    let texto = prompt("Ingresa el texto a concatenar: ");
    notas[indice] += texto;
    console.log(`Se concatenó la nota: ${notas[indice]}`);
}

// Función para buscar notas
function buscarNotas() {
    let busqueda = prompt("Ingresa el texto de búsqueda: ");
    let notasEncontradas = notas.filter(nota => nota.includes(busqueda));

    if (notasEncontradas.length === 0) {
        console.log(`No se encontraron notas que contengan "${busqueda}".`);
        return;
    }

    console.log(`🔎 Notas encontradas:`);
    for (let i = 0; i < notasEncontradas.length; i++) {
        console.log(i + 1 + ". " + notasEncontradas[i]);
    }
}

// Función para mostrar las notas
function mostrarNotas() {
    if (notas.length === 0) {
        console.log("No haz agregado ninguna nota en esta sesion. 🤷🏻‍♂️");
    } else {
        console.log("🗒️ Notas:");
        for (let i = 0; i < notas.length; i++) {
            console.log(i + 1 + ". " + notas[i]);
        }
    }
}

// Ciclo principal de la aplicación
let continuar = true;
while (continuar) {
    let opcion = mostrarMenu();

    switch (opcion) {
        case "1":
            agregarNota();
            break;
        case "2":
            mostrarNotas();
            break;
        case "3":
            eliminarNota();
            break;
        case "4":
            concatenarNota();
            break;
        case "5":
            buscarNotas();
            break;
        case "6":
            continuar = false;
            console.log("Cerrando notas.😢");
            break;
        default:
            console.log("Opción inválida. Por favor, elige una opción válida.");
            break;
    }
}
