<?php
    include './../conexion.php';

$boleta     = $_POST['form-boleta'];
$nombre     = $_POST['form-full-name'];
$telefono   = $_POST['form-tel'];
$curp       = $_POST['form-curp'];
$entidad    = $_POST['entidad'];
$fecha      = $_POST['form-date'];
$escuela    = $_POST['form-school-precedence'];
$promedio   = $_POST['form-prom'];
$correo     = $_POST['form-email'];
$password   = $_POST['form-pass']; 
$gender     = $_POST['radioDefault']; // Asumo que 'true'/'false' o '1'/'0' o 'M'/'F'


// Paso 2: Convertir tipos de datos si es necesario
// PostgreSQL es estricto, así que castear es buena práctica
$telefono_int = (int)$telefono;
$promedio_float = (float)$promedio;

// Para el género (BOOLEAN), necesitas convertirlo a TRUE/FALSE de PostgreSQL.
// Suponiendo que 'radioDefault' te da 'masculino' o 'femenino', o '1'/'0'.
// Ajusta esta lógica según cómo tu radio button envíe el valor.
$genero_bool = null;
if (strtolower($gender) === 'masculino' || $gender === '1') {
    $genero_bool = TRUE; // O directamente 't' en PostgreSQL si lo prefieres
} elseif (strtolower($gender) === 'femenino' || $gender === '0') {
    $genero_bool = FALSE; // O directamente 'f'
} else {
    // Manejar caso donde el género no es válido, quizás asignar un valor por defecto
    // o lanzar un error.
    error_log("Valor de género no reconocido: " . $gender);
    // Podrías poner $genero_bool = NULL; o FALSE como fallback
}

$stmt_name = "insert_alumno";
$query_sql = "INSERT INTO alumno (boleta, nombre, telefono, curp, entidad, genero, fecha, escuela, promedio, correo, password, data_examen)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

$result = pg_prepare($conn, $stmt_name, $query_sql);

if (!$result) {
    echo "Error al preparar la consulta: " . pg_last_error($conn);
    exit; // Detiene la ejecución 
}
$data_examen_id = 12; 

    $exec_result = pg_execute($conn, $stmt_name, array(
        $boleta,             // $1
        $nombre,             // $2
        $telefono_int,       // $3
        $curp,               // $4
        $entidad,            // $5
        $genero_bool,        // $6 
        $fecha,              // $7
        $escuela,            // $8
        $promedio_float,     // $9
        $correo,             // $10
        $password,           // $11 
        $data_examen_id      // $12 (el numero del lab)
    ));
    if (!$exec_result) {
        echo "Error al insertar el alumno menso: " . pg_last_error($conn);
    } else {
        echo "¡Alumno registrado exitosamente en la base de datos, carnal!";
    }
    header('Location: ./../login/index.html');
    # Cerrar la conexión 
    pg_close($conn);
?>