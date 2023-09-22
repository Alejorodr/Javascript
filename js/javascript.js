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

        // Agregar botón de editar a cada nota
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar ✏️';
        editarBtn.addEventListener('click', function () {
            editarNota(i);
        });
        li.appendChild(editarBtn);

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

// Función para editar una nota
function editarNota(indice) {
    // Obtener la nota actual
    let notaActual = notas[indice];

    // Mostrar un formulario con los detalles actuales de la nota
    tituloInput.value = notaActual.titulo;
    notaInput.value = notaActual.nota;

    // Cambiar el controlador del botón para que actualice la nota en lugar de añadir una nueva
    agregarBtn.removeEventListener('click', agregarNota);
    agregarBtn.addEventListener('click', function() {
        actualizarNota(indice);
    });
}

// Función para actualizar una nota
function actualizarNota(indice) {
    // Actualizar la nota con los nuevos detalles
    notas[indice].titulo = tituloInput.value;
    notas[indice].nota = notaInput.value;

    // Cambiar el controlador del botón para que añada una nueva nota en lugar de actualizar la existente
    agregarBtn.removeEventListener('click', actualizarNota);
    agregarBtn.addEventListener('click', agregarNota);

    // Actualizar la lista de notas
    mostrarNotas();
}

// Agregar un controlador de eventos al botón
agregarBtn.addEventListener('click', agregarNota);
buscarBtn.addEventListener('click', buscarNota);
// Función para mostrar las notas
function mostrarNotas() {
    // Limpiar la lista existente
    listaNotas.innerHTML = '';

    // Crear una nueva tarjeta para cada nota
    for (let i = 0; i < notas.length; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = notas[i].color;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = notas[i].titulo;

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = notas[i].nota;

        // Agregar botón de editar a cada nota
        let editarBtn = document.createElement('button');
        editarBtn.textContent = 'Editar ✏️';
        editarBtn.className = 'btn btn-primary';
        editarBtn.addEventListener('click', function () {
            editarNota(i);
        });

        // Agregar botón de eliminar a cada nota
        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar ➖';
        eliminarBtn.className = 'btn btn-danger ml-2';
        eliminarBtn.addEventListener('click', function () {
            notas.splice(i, 1);
            mostrarNotas();
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(editarBtn);
        cardBody.appendChild(eliminarBtn);
        
        card.appendChild(cardBody);

        listaNotas.appendChild(card);
    }
}
