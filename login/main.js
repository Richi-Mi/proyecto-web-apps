const schoolId   = document.getElementById('form-school-id')
const schoolPass = document.getElementById('form-school-password')
const btnSubmit  = document.getElementById('btn-submit')
const formu      = document.getElementById('formu')

const validForm = {
    boleta: false,
    password: false
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

schoolId.addEventListener('keyup', (evt) => {
    const regex = /^(PE|PP)\d{8}$|^\d{10}$/;
    validForm.boleta = regex.test(evt.target.value)
    setValid( validForm.boleta, schoolId )
})
schoolPass.addEventListener('input', (evt) => {
    validForm.password = schoolPass.value.length >= 6
    setValid(validForm.password, schoolPass)
})
formu.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if( !validForm.boleta || !validForm.password ) {
        alert("Ingrese datos validos")
    }
    else {
        alert(`Tu boleta ${schoolId.value} y su pass: ${schoolPass.value}`)
        formu.submit();
    }
})