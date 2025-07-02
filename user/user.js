const cont = document.getElementById('info-alumno');
const data = JSON.parse(localStorage.getItem('data'))
cont.innerHTML = `
    <p><strong> Nombre:</strong> ${data.nombre}</p>
    <p><strong> Boleta:</strong> ${data.boleta}</p>
    <p><strong> Fecha de examen:</strong> ${data.fecha_exam}</p>
    <p><strong> Laboratorio: </strong> ${data.hora_exam}</p>
    <p><strong> Hora de examen: :</strong> ${data.lab_exam}</p>
`;
document.querySelector('.btn-primary').addEventListener('click', () => {
    window.open(`generarPDF.php?boleta=${data.boleta}`)
})
