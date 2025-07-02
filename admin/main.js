const schoolId   = document.getElementById('form-school-id')
const schoolPass = document.getElementById('form-school-password')
const btnSubmit  = document.getElementById('btn-submit')
const formu      = document.getElementById('formulario')

const alertMSG      = document.querySelector('.alert-msg-sucess');
const alertError    = document.querySelector('.alert-msg-error');
const container     = document.querySelector('.container');

const validForm = {
    correo: false,
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
    const regex = /^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/
    validForm.correo = regex.test(evt.target.value)
    setValid( regex.test(evt.target.value), schoolId )
})
schoolPass.addEventListener('input', (evt) => {
    validForm.password = schoolPass.value.length >= 6
    setValid(validForm.password, schoolPass)
})
formu.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if( !validForm.correo || !validForm.password ) {
        alert("Ingrese datos validos")
    }
    else {
        const formData = new FormData();
        formData.append('school-id', schoolId.value);
        formData.append('school-password', schoolPass.value );

        fetch("login.php", {
            method: 'POST',
            body: formData
        })
        .then( res => res.json())
        .then( data => {
            localStorage.setItem('data', JSON.stringify(data.alumno))
            localStorage.setItem('loged', 'true' );
            if( data.success ) {
                document.querySelector('#text').textContent = data.message;

                alertMSG.classList.add('show');
                alertMSG.classList.remove('hidden');

                container.classList.add('opacity');
            }
            else {
                alertError.classList.add('show');
                alertError.classList.remove('hidden');

                document.querySelector('#text-e').textContent = data.message;
                container.classList.add('opacity');

            }
        })
        .catch( err => {
            console.log(err);
            
        })
        
    }
})

document.getElementById('btn-aceptar').addEventListener('click', () => {
    window.location.href = './admin.html'
});
document.getElementById('btn-error').addEventListener('click', () => {
    alertError.classList.add('hidden');
    alertError.classList.remove('show');

    container.classList.remove('opacity');

})