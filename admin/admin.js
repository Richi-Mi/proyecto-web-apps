document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
});

//Cargar usuarios del php
function cargarUsuarios() {
    fetch('./php/obtener_usuarios.php')
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById('tablaUsuarios');
            tbody.innerHTML = '';

            if(data.length === 0) {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td colspan="6" class="text-center text-muted">No hay usuarios registrados.</td>`;
                tbody.appendChild(tr);
                return;
            }

            data.array.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.boleta}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.lab}</td>
                    <td>${usuario.fecha_examen}</td>
                    <td class="position-relative">
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                &#x22EE;
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" onclick="editarUsuario('${usuario.boleta}')">Editar</a></li>
                                <li><a class="dropdown-item text-danger" href="#" onclick="eliminarUsuario('${usuario.boleta}')">Eliminar</a></li>
                            </ul>
                            </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            const tbody = document.getElementById('tablaUsuarios');
            tbody.innerHTML = '';
            const tr = document.createElement('tr');
            tr.innerHTML = `<td colspan="6" class="text-center text-muted">No hay usuarios registrados.</td>`;
            tbody.appendChild(tr);
            console.error('Error al cargar usuarios:', error);
        });
}

// Acciones (por ahora sólo logs)
function editarUsuario(boleta) {
  fetch(`./php/obtener_usuario.php?id=${boleta}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) return alert(data.error);
      document.getElementById('editarFecha').value = data.fecha_examen ?? '';
      document.getElementById('editarLab').value = data.lab ?? '';
      // Aquí asignas la boleta recibida para que el formulario la tenga
      document.getElementById('editarBoleta').value = boleta;

      const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
      modal.show();
    });
}

function eliminarUsuario(boleta) {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    fetch('ruta/al/eliminar_usuario.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `boleta=${encodeURIComponent(boleta)}`
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      if (data.status === 'success') {
        // Actualiza la vista o recarga si es necesario
        location.reload();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al comunicarse con el servidor.');
    });
  }
}


// Guardar cambios del formulario
document.getElementById('formEditar').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch('./php/actualizar_usuario.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    if (result.trim() === "OK") {
      // Ocultar el modal
      const modalElement = document.getElementById('modalEditar');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }

      // Recargar la lista de usuarios para reflejar cambios
      cargarUsuarios();

      alert("Usuario actualizado correctamente");
    } else {
      console.error('Error al actualizar:' + result);
      alert("Error al actualizar: " + result);
    }
  })
  .catch(error => {
    console.error('Error en fetch:', error);
    alert("Error en la comunicación con el servidor.");
  });
});
