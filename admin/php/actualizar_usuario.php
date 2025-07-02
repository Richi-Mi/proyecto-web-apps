<?php
    include '../../conexion.php';

    header('Content-Type: application/json');

    // Validamos que se haya recibido la boleta
    if (!isset($_POST['boleta'], $_POST['fecha_examen'], $_POST['lab'])) {
        echo "Faltan datos";
        exit;
    }
    $boleta = pg_escape_string($conn, $_POST['boleta']);
    $fecha_examen = pg_escape_string($conn, $_POST['fecha_examen']);
    $lab = (int)$_POST['lab'];

    // Verificar si el laboratorio existe
    $queryCheck = "SELECT lab FROM examen WHERE lab = $lab";
    $resultCheck = pg_query($conn, $queryCheck);

    if (!$resultCheck) {
        echo "Error al consultar laboratorio";
        exit;
    }

    if (pg_num_rows($resultCheck) <= 0) {
        // No existe: insertar nuevo registro
        $queryInsert = "INSERT INTO examen (lab, fecha, hora) VALUES ($lab, '$fecha_examen', 0)";
        // Aquí pongo hora = 0 por defecto, ajusta si necesitas otro valor
        $res = pg_query($conn, $queryInsert);

        if (!$res) {
            echo "Error al insertar nuevo laboratorio";
            exit;
        }
    }

    // Finalmente actualizar la relación en alumno
    $queryAlumno = "UPDATE alumno SET data_examen = $lab WHERE boleta = '$boleta'";
    $resAlumno = pg_query($conn, $queryAlumno);

    if ($resAlumno) {
        echo "OK";
    } else {
        echo "Error al actualizar alumno";
    }
    pg_close($conn); # Cerramos conexión con base de datos.
    exit;
?>