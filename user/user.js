document.addEventListener('DOMContentLoaded', () => {
    cargarInfo();
});

function cargarInfo() {
    fetch('datos.php?boleta=2024123456')
            .then(res => res.json())
            .then(data => {
                const cont = document.getElementById('info-alumno');
                cont.innerHTML = `
                    <p><strong>Nombre:</strong> ${data.nombre}</p>
                    <p><strong>Boleta:</strong> ${data.boleta}</p>
                    <p><strong>Laboratorio de examen:</strong> ${data.lab}</p>
                    <p><strong>Fecha de examen:</strong> ${data.fecha}</p>
                `;
            })
            .catch(error => {
                document.getElementById('info-alumno').innerHTML = `<p class="text-danger">Error al cargar datos.</p>`;
                console.error(error);
            });
}