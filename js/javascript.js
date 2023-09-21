// //Simulador interactivo Segunda pre-entrega

// // Definir notas en blanco para almacenar las notas
// let notas = [];

// // Función para mostrar el menú y obtener la selección del usuario
// function mostrarMenu() {
//     let opciones = [
//         "1. Agregar nota ➕",
//         "2. Mostrar notas 🗒️",
//         "3. Eliminar nota ➖",
//         "4. Extender nota 🔗",
//         "5. Buscar notas 🔎",
//         "6. Salir ❌"
//     ];
//     console.log(opciones.join("\n"));

//     let opcion = prompt("Seleccione una opción:\n 1. Agregar nota ➕ \n 2. Mostrar nota 🗒️ \n 3. Eliminar nota ➖ \n 4. Concatenar nota 🔗 \n 5. Buscar notas 🔎 \n 6. Salir ❌");
//     return opcion;
// }

// // Función para agregar una nota
// function agregarNota() {
//     let nota = prompt("Ingresa la nueva nota 📝: ");
//     notas.push(nota);
//     alert("Haz agregado una nueva nota, para ver las notas presiona 2. ✅");
// }

// // Función para eliminar una nota
// function eliminarNota() {
//     if (notas.length === 0) {
//         alert("No hay notas para eliminar.");
//         return;
//     }

//     let indice = parseInt(prompt("Ingresa el numero correspondiente a la nota a eliminar (1, 2, ...): ")) - 1;
//     if (indice < 0 || indice >= notas.length) {
//         alert(`Numero inválido.`);
//         return;
//     }

//     let eliminada = notas.splice(indice, 1);
//     alert(`Se eliminó la nota: ${eliminada} 🚮`);
// }

// // Función para concatenar una nota
// function concatenarNota() {
//     if (notas.length === 0) {
//         alert("No hay notas para extender.");
//         return;
//     }

//     let indice = parseInt(prompt("Ingresa el numero de la nota a extender (1, 2, ...): ")) - 1;
//     if (indice < 0 || indice >= notas.length) {
//         alert(`Nunero no inválido.`);
//         return;
//     }

//     let texto = prompt("Ingresa el texto a sumar: ");
//     notas[indice] += texto;
//     alert(`Se extendio la nota: ${notas[indice]}`);
// }

// // Función para buscar notas
// function buscarNotas() {
//     let busqueda = prompt("Ingresa el texto de búsqueda en las notas: ");
//     let notasEncontradas = notas.filter(nota => nota.includes(busqueda));

//     if (notasEncontradas.length === 0) {
//         alert(`No se encontraron notas que contengan "${busqueda}".`);
//         return;
//     }

//     alert(`🔎 Notas encontradas:`);
//     for (let i = 0; i < notasEncontradas.length; i++) {
//         alert(i + 1 + ". " + notasEncontradas[i]);
//     }
// }

// // Función para mostrar las notas
// function mostrarNotas() {
//     if (notas.length === 0) {
//         alert("No haz agregado ninguna nota en esta sesion. 🤷🏻‍♂️");
//     } else {
//         alert("🗒️ Notas:");
//         for (let i = 0; i < notas.length; i++) {
//             alert(i + 1 + ". " + notas[i]);
//         }
//     }
// }

// // Ciclo principal de la aplicación
// let continuar = true;
// while (continuar) {
//     let opcion = mostrarMenu();

//     switch (opcion) {
//         case "1":
//             agregarNota();
//             break;
//         case "2":
//             mostrarNotas();
//             break;
//         case "3":
//             eliminarNota();
//             break;
//         case "4":
//             concatenarNota();
//             break;
//         case "5":
//             buscarNotas();
//             break;
//         case "6":
//             continuar = false;
//             alert("Cerrando notas.😢");
//             break;
//         default:
//             alert("Opción inválida. Por favor, elige una opción válida.");
//             break;
//     }
// }
// Definir notas en blanco para almacenar las notas
let notas = [];

// Obtener referencias a los elementos HTML
let tituloInput = document.getElementById('tituloInput');
let notaInput = document.getElementById('notaInput');
let colorInput = document.getElementById('colorInput');
let agregarBtn = document.getElementById('agregarBtn');
let buscarInput = document.getElementById('buscarInput');
let buscarBtn = document.getElementById('buscarBtn');
let listaNotas = document.getElementById('listaNotas');

// Función para agregar una nota
function agregarNota() {
    let titulo = tituloInput.value;
    let nota = notaInput.value;
    let color = colorInput.value;

    if (titulo.trim() === '' || nota.trim() === '') {
        alert("Por favor, ingresa un título y una nota válidos.");
        return;
    }

    notas.push({ titulo, nota, color });

    // Limpiar los campos de entrada
    tituloInput.value = '';
    notaInput.value = '';

    // Actualizar la lista de notas
    mostrarNotas();
}

// Función para mostrar las notas
function mostrarNotas() {
    // Limpiar la lista existente
    listaNotas.innerHTML = '';

    // Crear un nuevo elemento de lista para cada nota
    for (let i = 0; i < notas.length; i++) {
        let li = document.createElement('li');
        li.textContent = notas[i].titulo + ": " + notas[i].nota;
        li.style.backgroundColor = notas[i].color;

        // Agregar botón de eliminar a cada nota
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar ➖';
        eliminarBtn.addEventListener('click', function () {
            notas.splice(i, 1);
            mostrarNotas();
        });
        li.appendChild(eliminarBtn);

        listaNotas.appendChild(li);
    }
}

// Función para buscar una nota
function buscarNota() {
    let busqueda = buscarInput.value;

    if (busqueda.trim() === '') {
        alert("Por favor, ingresa un término de búsqueda válido.");
        return;
    }

    let notasEncontradas = notas.filter(nota => nota.titulo.includes(busqueda) || nota.nota.includes(busqueda));

    if (notasEncontradas.length === 0) {
        alert(`No se encontraron notas que contengan "${busqueda}".`);
        return;
    }

    // Limpiar la lista existente
    listaNotas.innerHTML = '';

    // Crear un nuevo elemento de lista para cada nota encontrada
    for (let i = 0; i < notasEncontradas.length; i++) {
        let li = document.createElement('li');
        li.textContent = notasEncontradas[i].titulo + ": " + notasEncontradas[i].nota;
        li.style.backgroundColor = notasEncontradas[i].color;

        // Agregar botón de eliminar a cada nota
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar ➖';
        eliminarBtn.addEventListener('click', function () {
            let indice = notas.indexOf(notasEncontradas[i]);
            notas.splice(indice, 1);
            mostrarNotas();
        });
        li.appendChild(eliminarBtn);

        listaNotas.appendChild(li);
    }
}

// Agregar un controlador de eventos al botón
agregarBtn.addEventListener('click', agregarNota);
buscarBtn.addEventListener('click', buscarNota);
