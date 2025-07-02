<?php
# 1. Definimos parametros de la conexión.
$host = "localhost"; 
$port = "5432";    
$dbname = "proyectoweb";
$user = "richi_mc";     
$password = "Jose1914";

# 2. Intenta establecer la conexión
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

# 3. Verifica si la conexión fue exitosa
if (!$conn) {
    echo "Error: No se pudo conectar a PostgreSQL.<br>";
    echo pg_last_error(); # Mostrar el ultimo error de PSQL
    exit;
}
?>