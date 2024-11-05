// Importa la librería de confites
import confetti from 'canvas-confetti';

// Función para llamar a la API que devuelve el monto
async function obtenerMontoDeAPI() {
    try {
        const response = await fetch('https://mi-api.com/montos');  // URL de tu API
        const data = await response.json();
        return data.monto;  // Suponiendo que la API devuelve un objeto con el campo 'monto'
    } catch (error) {
        console.error('Error al obtener el monto:', error);
        return 0;  // Retorna 0 si no se puede obtener el monto
    }
}

// Función para agregar el monto y mostrar los confites
async function agregarMonto(mesaId) {
    const totalElement = document.getElementById('total' + mesaId);
    let totalActual = parseInt(totalElement.textContent);

    // Obtener el monto desde la API
    const monto = await obtenerMontoDeAPI();

    // Actualiza el total con el monto obtenido de la API
    totalActual += monto;
    totalElement.textContent = totalActual;

    // Llamar la función para lanzar confites
    lanzarConfites();
}

// Función para lanzar confites
function lanzarConfites() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}
