<?php
    include '../conexion.php';
    $correo = $_POST['school-id'];
    $passw  = $_POST['school-password'];

    header('Content-Type: application/json');

    $query = "SELECT * FROM administrador where correo = '$correo' and password = '$passw';";
    $response = [
        'success' => true,
        'message' => 'Login realizado correctamente',
        'admin' => null 
    ];
    
    $result = pg_query($conn, $query);
    $row = pg_fetch_row($result);

    if( !$row ) {
        $response['success'] = false;
        $response['message'] = 'Revise las credenciales ingresadas';    
    }
    else {
        $response['success'] = true;
        $response['message'] = 'Login realizado correctamente';
        $response['admin'] = [
            'username' => $row[0],
            'correo' => $row[1]
        ];
    }
    echo json_encode($response);
    pg_close($conn); # Cerramos conexión con base de datos.
    exit;
?>