document.addEventListener('DOMContentLoaded', () => {
    const cont = document.getElementById('info-alumno');
    const data = JSON.parse(localStorage.getItem('data'))
    cont.innerHTML = `
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Boleta:</strong> ${data.boleta}</p>
    `;
});