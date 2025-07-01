<?php
include './../conexion.php';

# Obtener datos del formulario.
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
$gender     = $_POST['radioDefault'];

# Castear datos del formulario.
$telefono_int = (int)$telefono;
$promedio_float = (float)$promedio;

# Determinar genero de la persona.
$genero_bool = null;
if ($gender === '1') {
    $genero_bool = TRUE;
} else {
    $genero_bool = FALSE;
}

# Insertar datos del alumno.
$stmt_name = "insert_alumno";
$query_sql = "INSERT INTO alumno (boleta, nombre, telefono, curp, entidad, genero, fecha, escuela, promedio, correo, password, data_examen)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

$result = pg_prepare($conn, $stmt_name, $query_sql);

if (!$result) {
    echo "Error al preparar la consulta: " . pg_last_error($conn);
    exit; # Detiene la ejecución 
}
$data_examen_id = 12; 

$exec_result = pg_execute($conn, $stmt_name, array(
    $boleta,             
    $nombre,             
    $telefono_int,       
    $curp,               
    $entidad,            
    $genero_bool,        
    $fecha,              
    $escuela,            
    $promedio_float,     
    $correo,             
    $password,           
    $data_examen_id      
));    
header('Location: ./../login/index.html');
# Cerrar la conexión 
pg_close($conn);
?>