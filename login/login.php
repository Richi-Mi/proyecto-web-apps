<?php
    include '../conexion.php';
    $boleta = $_POST['school-id'];
    $passw  = $_POST['school-password'];

    header('Content-Type: application/json');

    $query = "SELECT * FROM alumno where boleta = '$boleta' and password = '$passw';";
    $response = [
        'success' => true,
        'message' => 'Login realizado correctamente',
        'alumno' => null 
    ];
    
    $result = pg_query($conn, $query);
    $row = pg_fetch_row($result);

    if( !$row ) {
        $response['success'] = false;
        $response['message'] = 'Revise las credenciales ingresadas';    
    }
    else {
        $data_exam = $row[11];
        $query2 = "SELECT * FROM examen where lab = $data_exam";
        
        $result2 = pg_query($conn, $query2);
        $row2 = pg_fetch_row($result2);

        $response['success'] = true;
        $response['message'] = 'Login realizado correctamente';
        $response['alumno'] = [
            'boleta' => $row[0],
            'nombre' => $row[1],
            'telefono' => $row[2],
            'curp' => $row[3],
            'entidad' => $row[4],
            'genero' => $row[5],
            'fecha' => $row[6],
            'escuela' => $row[7],
            'promedio' => $row[8],
            'correo' => $row[9],
            'fecha_exam' => $row2[0],
            'hora_exam' => $row2[1],
            'lab_exam' => $row2[2] 
        ];
    }
    echo json_encode($response);
    pg_close($conn); # Cerramos conexión con base de datos.
    exit;
?>