<?php
    include '../../conexion.php';

    header('Content-Type: application/json');

    // Consultar usuarios
    $query = "SELECT 
                a.boleta, 
                a.nombre, 
                e.lab, 
                e.fecha AS fecha_examen FROM alumno a LEFT JOIN examen e ON a.data_examen = e.lab";
    $result = pg_query($conn, $query);

    if (!$result) {
        echo json_encode(['success' => false, 'message' => 'Error al obtener los usuarios.']);
        exit;
    }

    // Crear un array para almacenar los usuarios
    $usuarios = [];

    while ($row = pg_fetch_assoc($result)) {
        $usuarios[] = [
            'boleta' => $row['boleta'],
            'nombre' => $row['nombre'],
            'lab' => $row['lab'],
            'fecha_examen' => $row['fecha_examen']
        ];
    }

    // Devolver los usuarios en formato JSON
    echo json_encode([
        'array' => $usuarios,
        'length' => count($usuarios)
    ]);
    pg_close($conn); # Cerramos conexión con base de datos.
    exit;
?>