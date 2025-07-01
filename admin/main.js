const schoolId   = document.getElementById('form-school-id')
const schoolPass = document.getElementById('form-school-password')
const btnSubmit  = document.getElementById('btn-submit')

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
    const regex = /^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/
    setValid( regex.test(evt.target.value), schoolId )
})
schoolPass.addEventListener('input', (evt) => {
    setValid(schoolPass.value.length >= 6, schoolPass)
})
btnSubmit.addEventListener('click', () => {
    if( schoolId.value.length == 0 || schoolId.value.length == 0 ) {
        alert("Ingrese datos validos")
    }
    else {
        alert(`Tu boleta ${schoolId.value} y su pass: ${schoolPass.value}`)
    }
})