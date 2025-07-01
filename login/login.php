<?php
    include '../conexion.php';
    $boleta = $_POST['school-id'];
    $passw  = $_POST['school-password'];

    echo "Hola $boleta tu $passw y $variable";
    # header("Location: ./../index.html");

    pg_close($conn); # Cerramos conexión con base de datos.
?>