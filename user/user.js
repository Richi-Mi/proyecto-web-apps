const cont = document.getElementById('info-alumno');
const data = JSON.parse(localStorage.getItem('data'))
cont.innerHTML = `
    <p><strong>Nombre:</strong> ${data.nombre}</p>
    <p><strong>Boleta:</strong> ${data.boleta}</p>
`;
document.querySelector('.btn-primary').addEventListener('click', () => {
    window.open(`generarPDF.php?boleta=${data.boleta}`)
})
