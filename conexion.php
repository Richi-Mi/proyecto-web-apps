<?php
# 1. Define tus parámetros de conexión
$host = "localhost"; 
$port = "5432";    
$dbname = "proyectoweb";
$user = "richi_mc";     
$password = "Jose1914";

$variable = "XD";

// 2. Intenta establecer la conexión
// La función pg_connect() devuelve un recurso de conexión si es exitosa, o false si falla.
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// 3. Verifica si la conexión fue exitosa
if (!$conn) {
    echo "Error: No se pudo conectar a PostgreSQL.<br>";
    echo pg_last_error(); // Muestra el último error de PostgreSQL para depuración
    exit; // Termina la ejecución del script si no hay conexión
}

echo "¡Conexión a PostgreSQL exitosa, carnal!<br>";

// 4. (Opcional) Realizar una consulta de ejemplo
$query = "SELECT version();"; // Consulta para obtener la versión de PostgreSQL
$result = pg_query($conn, $query);

$query2 = "insert into examen (fecha, hora) values ('2025-10-24', 10);";
$result2 = pg_query($conn, $query2);

if (!$result) {
    echo "Error al ejecutar la consulta: " . pg_last_error($conn) . "<br>";
} else {
    $row = pg_fetch_row($result);
    echo "Versión de PostgreSQL: " . $row[0] . "<br>";
}
?>