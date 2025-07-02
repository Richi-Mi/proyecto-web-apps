document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
});

//Cargar usuarios del php
function cargarUsuarios() {
    fetch('obtener_usuarios.php')
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
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                &#x22EE;
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" onclick="editarUsuario(${usuario.boleta})">Editar</a></li>
                                <li><a class="dropdown-item text-danger" href="#" onclick="eliminarUsuario(${usuario.boleta})">Eliminar</a></li>
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
  fetch(`obtener_usuario.php?id=${boleta}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) return alert(data.error);
      document.getElementById('editarFecha').value = data.fecha_examen ?? '';
      document.getElementById('editarLap').value = data.lab ?? '';

      const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
      modal.show();
    });
}

function eliminarUsuario(boleta) {
  if (confirm('¿Seguro que deseas eliminar este usuario?')) {
    alert(`Eliminar usuario ID: ${boleta}`);
    // Aquí puedes hacer un fetch a eliminar_usuario.php
  }
}

// Guardar cambios del formulario
document.getElementById('formEditar').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch('actualizar_usuario.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      if (result.trim() === "OK") {
        bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
        cargarUsuarios();
      } else {
        alert(result);
      }
    });
});