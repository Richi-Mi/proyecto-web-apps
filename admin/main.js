const schoolId   = document.getElementById('form-school-id')
const schoolPass = document.getElementById('form-school-password')
const btnSubmit  = document.getElementById('btn-submit')

schoolId.addEventListener('keyup', (evt) => {
    schoolId.value = evt.target.value.replace(/[a-zA-Z]/g, '')
})
btnSubmit.addEventListener('click', () => {
    alert(`Tu boleta ${schoolId.value} y su pass: ${schoolPass.value}`)
})