// Initialize notes from localStorage
let notas = [];
let notasGuardadas = localStorage.getItem('notas');
if (notasGuardadas) {
    try {
        notas = JSON.parse(notasGuardadas);
    } catch (e) {
        console.error("Error parsing notes from localStorage", e);
        notas = [];
    }
}

// DOM Elements
const tituloInput = document.getElementById('tituloInput');
const notaInput = document.getElementById('notaInput');
const colorInput = document.getElementById('colorInput');
const agregarBtn = document.getElementById('agregarBtn');
const buscarInput = document.getElementById('buscarInput');
const buscarBtn = document.getElementById('buscarBtn');
const listaNotas = document.getElementById('listaNotas');
const buttonContainer = document.getElementById('buttonContainer');

// Helper to update localStorage
function actualizarLocalStorage() {
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Function to show notifications using Toastify
function notify(text, type = "success") {
    if (typeof Toastify === "function") {
        Toastify({
            text: text,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: type === "success" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #ff5f6d, #ffc371)",
            },
            close: true,
        }).showToast();
    } else {
        alert(text);
    }
}

// Function to display all notes
function mostrarNotas(notasAMostrar = notas) {
    if (!listaNotas) return;
    listaNotas.innerHTML = '';

    if (notasAMostrar.length === 0) {
        listaNotas.innerHTML = '<p class="text-muted">No hay notas para mostrar.</p>';
        return;
    }

    notasAMostrar.forEach((nota) => {
        const originalIndex = notas.indexOf(nota);

        let card = document.createElement('div');
        card.className = 'card mb-3 shadow-sm';
        card.style.backgroundColor = nota.color;

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let cardTitle = document.createElement('h4');
        cardTitle.className = 'card-title';
        cardTitle.textContent = nota.titulo;

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = nota.nota;

        let editarBtn = document.createElement('button');
        editarBtn.textContent = '✏️';
        editarBtn.className = 'btn btn-sm btn-primary me-2';
        editarBtn.title = 'Editar nota';
        editarBtn.setAttribute('aria-label', 'Editar nota');
        editarBtn.onclick = () => editarNota(originalIndex);

        let eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = '➖';
        eliminarBtn.className = 'btn btn-sm btn-danger';
        eliminarBtn.title = 'Eliminar nota';
        eliminarBtn.setAttribute('aria-label', 'Eliminar nota');
        eliminarBtn.onclick = () => eliminarNota(originalIndex);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(editarBtn);
        cardBody.appendChild(eliminarBtn);

        card.appendChild(cardBody);
        listaNotas.appendChild(card);
    });
}

// Function to add a note
function agregarNota() {
    if (!tituloInput || !notaInput) return;
    let titulo = tituloInput.value.trim();
    let nota = notaInput.value.trim();
    let color = colorInput ? colorInput.value : '#FEDC97';

    if (titulo === '' || nota === '') {
        notify("Por favor, ingresa un título y una nota válidos.", "error");
        return;
    }

    notas.push({ titulo, nota, color });
    resetForm();
    actualizarLocalStorage();
    mostrarNotas();
    notify("¡Has agregado una nota!");
}

// Function to delete a note
function eliminarNota(index) {
    if (confirm("¿Estás seguro de que deseas eliminar esta nota?")) {
        notas.splice(index, 1);
        actualizarLocalStorage();
        mostrarNotas();
        notify("Nota eliminada correctamente.");
    }
}

// Function to enter edit mode
let editIndex = null;
function editarNota(index) {
    if (!tituloInput || !notaInput) return;
    editIndex = index;
    let notaActual = notas[index];

    tituloInput.value = notaActual.titulo;
    notaInput.value = notaActual.nota;
    if (colorInput) colorInput.value = notaActual.color;

    if (agregarBtn) {
        agregarBtn.textContent = '💾';
        agregarBtn.className = 'btn btn-success';
        agregarBtn.title = 'Actualizar nota';
        agregarBtn.setAttribute('aria-label', 'Actualizar nota');
        agregarBtn.onclick = actualizarNota;
    }

    // Show cancel button if it doesn't exist
    if (buttonContainer && !document.getElementById('cancelarBtn')) {
        let cancelarBtn = document.createElement('button');
        cancelarBtn.id = 'cancelarBtn';
        cancelarBtn.textContent = '❌';
        cancelarBtn.className = 'btn btn-outline-secondary ms-2';
        cancelarBtn.title = 'Cancelar edición';
        cancelarBtn.setAttribute('aria-label', 'Cancelar edición');
        cancelarBtn.onclick = resetForm;
        buttonContainer.appendChild(cancelarBtn);
    }

    tituloInput.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to update a note
function actualizarNota() {
    if (!tituloInput || !notaInput) return;
    let titulo = tituloInput.value.trim();
    let nota = notaInput.value.trim();
    let color = colorInput ? colorInput.value : '#FEDC97';

    if (titulo === '' || nota === '') {
        notify("Por favor, ingresa un título y una nota válidos.", "error");
        return;
    }

    notas[editIndex] = { titulo, nota, color };
    resetForm();
    actualizarLocalStorage();
    mostrarNotas();
    notify("Nota actualizada correctamente.");
}

// Function to reset form and return to "Add" mode
function resetForm() {
    if (tituloInput) tituloInput.value = '';
    if (notaInput) notaInput.value = '';
    if (colorInput) colorInput.value = '#FEDC97';

    if (agregarBtn) {
        agregarBtn.textContent = '➕';
        agregarBtn.className = 'btn btn-primary';
        agregarBtn.title = 'Agregar nota';
        agregarBtn.setAttribute('aria-label', 'Agregar nota');
        agregarBtn.onclick = agregarNota;
    }

    let cancelarBtn = document.getElementById('cancelarBtn');
    if (cancelarBtn) {
        cancelarBtn.remove();
    }
    editIndex = null;
}

// Function to search notes
function buscarNota(e) {
    if (e) e.preventDefault();
    if (!buscarInput) return;
    let busqueda = buscarInput.value.trim().toLowerCase();

    if (busqueda === '') {
        mostrarNotas();
        return;
    }

    let notasEncontradas = notas.filter(nota =>
        nota.titulo.toLowerCase().includes(busqueda) ||
        nota.nota.toLowerCase().includes(busqueda)
    );

    if (notasEncontradas.length === 0) {
        notify(`No se encontraron notas que contengan "${busqueda}".`, "error");
        mostrarNotas([]);
    } else {
        mostrarNotas(notasEncontradas);
    }
}

// Initial Setup
if (agregarBtn) agregarBtn.onclick = agregarNota;
if (buscarBtn) buscarBtn.onclick = buscarNota;
if (buscarInput) {
    buscarInput.oninput = (e) => {
        if (e.target.value === '') mostrarNotas();
    };
}

// Initial load
window.onload = () => {
    mostrarNotas();
};
