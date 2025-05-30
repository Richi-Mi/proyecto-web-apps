flatpickr("#fecha", {
    dateFormat: "d/m/Y"
});

const in_full_name = document.getElementById('form-fullName')
const in_boleta    = document.getElementById('form-boleta')
const in_curp      = document.getElementById('form-curp')
const in_tel       = document.getElementById('form-tel')
const select_schol = document.getElementById('form-escuelas')
const in_prom      = document.getElementById('form-prom')
const in_email     = document.getElementById('form-email')
const in_pass      = document.getElementById('form-pass')

const setValid = (isValid, input) => {
    if( isValid ) {
        input.classList.add('is-valid')
        input.classList.remove('is-invalid')
    }
    else {
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
    }
}

in_full_name.addEventListener('input', (evt) => {
    const regex = /[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g;    
    in_full_name.value = evt.target.value.replace(regex, '').toUpperCase()    
})
in_boleta.addEventListener('input', (evt) => {
    const regex = /^(PE|PP)\d{8}$|^\d{10}$/;
    setValid( regex.test(evt.target.value), in_boleta )
})
in_curp.addEventListener('input', (evt) => {
    const regexCURP = /\w{4}\d{4}\w{7}\d$/
    setValid( regexCURP.test(evt.target.value), in_curp )
})
in_tel.addEventListener('input', (e) => {
    const regex = /^\d{10}$/
    const valid = regex.test(e.target.value)
    setValid( valid, in_tel )
    value ? in_tel.value = `${e.target.value.substring(0, 2)} ${e.target.value.substring(2, 6)} ${e.target.value.substring(6, 10)}` : in_tel.value = e.target.value.replaceAll(' ', '')
})
select_schol.addEventListener('change', (evt) => {
    const in_school = document.getElementById('hidden')
    select_schol.value == 'other' ? in_school.classList.remove('overflow') : in_school.classList.add('overflow')
})
in_prom.addEventListener('input', (e) => {
    let prom = e.target.value.replace(/\D{2}/g, '').slice(0, 2); // Elimina todo lo que no sea número
    in_prom.value = prom
    prom = parseFloat(prom)
    setValid( !(prom < 6 || prom > 10 || isNaN(prom)), in_prom )
})
in_email.addEventListener('input', () => {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/
    setValid( regex.test(in_email.value), in_email )
})
in_pass.addEventListener('input', () => { setValid(in_pass.value.length >= 6, in_pass) } )

document.getElementById('register-form').addEventListener('submit', (evt) => {
    evt.preventDefault()
    const data = {
        fullName: in_full_name.value,
        boleta: in_boleta.value,
        telefono: in_tel.value,
        curp: in_curp.value,
        entidad: document.getElementById('form-entidades').value
    }
    console.log(data);
    
})
document.getElementById('register-form').addEventListener('reset', () => {
    const inputs = Array.from(document.querySelectorAll('.form-control'))
    for( input of inputs ) {
        input.classList.remove('is-valid')
        input.classList.remove('is-invalid')        
    }    
})

document.getElementById('fecha').addEventListener()