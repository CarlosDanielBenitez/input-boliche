// Cargar los totales cuando se cargue la página
window.onload = function() {
    cargarTotales();
};

// Función para añadir el costo de la bebida seleccionada
function agregarBebida(mesaId, selectId) {
    let totalElement = document.getElementById(mesaId);
    let bebidaSelect = document.getElementById(selectId);
    
    let totalActual = parseInt(totalElement.textContent);
    let precioBebida = parseInt(bebidaSelect.value);

    totalActual += precioBebida;

    totalElement.textContent = totalActual;

    // Guardar el nuevo total en localStorage
    localStorage.setItem(mesaId, totalActual);

    // Comprobar si el total supera el umbral especial
    verificarUmbral(mesaId, totalActual);
}

// Función para verificar si el total supera un monto especial
function verificarUmbral(mesaId, total) {
    let mesa = document.getElementById(mesaId).closest('.mesa');

    // Umbral especial
    const umbralEspecial = 2000;

    // Si el total supera el umbral, aplicar estilo especial
    if (total >= umbralEspecial) {
        mesa.classList.add('mesa-destacada');
    } else {
        // Si baja del umbral, quitar el estilo especial
        mesa.classList.remove('mesa-destacada');
    }
}

// Función para limpiar el total de una mesa
function limpiarMesa(mesaId) {
    let confirmar = confirm("¿Está seguro que desea limpiar el total de esta mesa? Esta acción no se puede deshacer.");
    
    if (confirmar) {
        document.getElementById(mesaId).textContent = 0;
        localStorage.removeItem(mesaId);
        alert("La mesa se ha limpiado con éxito.");

        // Quitar estilo destacado si la mesa fue reseteada
        let mesa = document.getElementById(mesaId).closest('.mesa');
        mesa.classList.remove('mesa-destacada');
    }
}

// Función para cargar los totales guardados en localStorage
function cargarTotales() {
    const mesas = ['total1', 'total2', 'total3', 'total4'];

    mesas.forEach(function(mesaId) {
        let totalGuardado = localStorage.getItem(mesaId);
        if (totalGuardado !== null) {
            document.getElementById(mesaId).textContent = totalGuardado;

            // Verificar si el total supera el umbral especial
            verificarUmbral(mesaId, parseInt(totalGuardado));
        }
    });
}
