<?php
    include '../../conexion.php';

    header('Content-Type: application/json');

    // Validamos que se haya recibido la boleta
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        echo json_encode(['error' => 'Falta el identificador del usuario']);
        exit;
    }
    $boleta = pg_escape_string($conn, $_GET['id']);

    // Consulta para obtener el usuario y el examen relacionado
    $query = "SELECT a.boleta, a.nombre, e.lab, e.fecha AS fecha_examen
            FROM alumno a
            LEFT JOIN examen e ON a.data_examen = e.lab
            WHERE a.boleta = '$boleta' LIMIT 1";

    $result = pg_query($conn, $query);

    if (!$result || pg_num_rows($result) === 0) {
        echo json_encode(['error' => 'Usuario no encontrado']);
        exit;
    }

    $data = pg_fetch_assoc($result);

    echo json_encode($data);
    pg_close($conn); # Cerramos conexión con base de datos.
    exit;
?>