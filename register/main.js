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
const in_date      = document.getElementById('fecha')
const in_precedence = document.getElementById('form-school-precedence')
const alertMSG      = document.querySelector('.alert-msg');
const formu         = document.getElementById('register-form')

const validForm = {
    boleta: false,
    curp: false,
    tel: false,
    prom: false,
    email: false,
    pass: false
}

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
    validForm.boleta = regex.test(evt.target.value)
    setValid( validForm.boleta, in_boleta )
})
in_curp.addEventListener('input', (evt) => {
    const regexCURP = /\w{4}\d{6}\w{7}\d$/
    validForm.curp = regexCURP.test(evt.target.value) 
    setValid(validForm.curp, in_curp )
    in_curp.value = in_curp.value.slice(0, 18).toUpperCase()
})
in_tel.addEventListener('input', (e) => {
    const regex = /^\d{10}$/
    validForm.tel = regex.test(e.target.value)
    setValid( validForm.tel, in_tel )
})
select_schol.addEventListener('change', (evt) => {
    const in_school = document.getElementById('hidden')
    select_schol.value == 'other' ? in_school.classList.remove('overflow') : in_school.classList.add('overflow')
})
in_prom.addEventListener('input', (e) => {
    let prom = in_prom.value
    prom = parseFloat(prom)
    validForm.prom = !(prom < 6 || prom > 10 || isNaN(prom))
    setValid( validForm.prom, in_prom )
})
in_email.addEventListener('input', () => {
    const regex = /^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/
    validForm.email = regex.test(in_email.value)
    setValid( validForm.email, in_email )
})
in_pass.addEventListener('input', () => { 
    validForm.pass = in_pass.value.length >= 6;
    setValid(validForm.pass, in_pass);
})

formu.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const escuela = select_schol.value == "other" ? in_precedence.value : select_schol.value
    in_precedence.value = escuela;

    let send = true

    for( cond of Object.values(validForm) ) {
        if( cond == false ) {
            send = false
            break;
        }
    }

    if( send ) {
        const data = {
            fullName: in_full_name.value,
            boleta: in_boleta.value,
            telefono: in_tel.value,
            curp: in_curp.value,
            entidad: document.getElementById('form-entidades').value
        }
        const message = `
            Hola ${data.fullName} verifica tus datos: <br>
            <b> Boleta</b> : ${data.boleta} <br>
            <b> Teléfono</b> : ${data.telefono} <br>
            <b> CURP</b> : ${data.curp} <br>
            <b> Entidad</b> : ${data.entidad} <br>
            <b> Fecha</b> : ${in_date.value} <br>
            <b> Escuela</b> : ${ escuela } <br>
            <b> Promedio</b> : ${ in_prom.value} <br>
            <b> Correo</b> : ${ in_email.value } <br><br>

            Al seleccionar aceptar seras redirigido para que inicies sesión.
        `
        document.querySelector('#text').innerHTML = message;
        alertMSG.classList.add('show');
        alertMSG.classList.remove('hidden');

        formu.classList.add('opacity');
    }
    else {
        alert("Ingrese datos que sean validos");
    }    
})
document.getElementById('register-form').addEventListener('reset', () => {
    const inputs = Array.from(document.querySelectorAll('.form-control'))
    for( input of inputs ) {
        input.classList.remove('is-valid')
        input.classList.remove('is-invalid')        
    }    
})
document.getElementById('btn-aceptar').addEventListener('click', () => {
    formu.submit();
})
document.querySelector('#btn-modificar').addEventListener('click', () => {
    alertMSG.classList.add('hidden');
    alertMSG.classList.remove('show');

    formu.classList.remove('opacity')
})