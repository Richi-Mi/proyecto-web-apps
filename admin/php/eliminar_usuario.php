<?php
include '../../conexion.php';

header('Content-Type: application/json');

// Validamos que se haya recibido la boleta
if (!isset($_POST['boleta'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No se recibió la boleta del alumno.'
    ]);
    exit;
}

$boleta = pg_escape_string($conn, $_POST['boleta']);

// Verificar si el alumno existe
$queryCheck = "SELECT * FROM alumno WHERE boleta = '$boleta'";
$resultCheck = pg_query($conn, $queryCheck);

if (!$resultCheck) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al consultar la base de datos.'
    ]);
    pg_close($conn);
    exit;
}

if (pg_num_rows($resultCheck) <= 0) {
    echo json_encode([
        'status' => 'error',
        'message' => 'El alumno con esa boleta no existe.'
    ]);
    pg_close($conn);
    exit;
}

// Ejecutar el DELETE
$queryDelete = "DELETE FROM alumno WHERE boleta = '$boleta'";
$resultDelete = pg_query($conn, $queryDelete);

if ($resultDelete) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Alumno eliminado correctamente.'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al eliminar el alumno.'
    ]);
}

pg_close($conn);
exit;
?>
