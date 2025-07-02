<?php
include '../conexion.php'; 

require('./../fpdf/fpdf.php');

$boleta_solicitada = $_GET['boleta'];

$query = "SELECT
            a.boleta, a.nombre, a.telefono, a.curp, a.entidad, a.genero, a.fecha, a.escuela, a.promedio, a.correo,
            e.fecha AS fecha_examen, e.hora AS hora_examen
          FROM
            alumno a
          JOIN
            examen e ON a.data_examen = e.lab
          WHERE
            a.boleta = '$boleta_solicitada'";
$result_execute = pg_query($conn, $query);

if (!$result_execute) {
    pg_close($conn);
    exit;
}

$alumno_examen_data = pg_fetch_row($result_execute);

pg_close($conn);

if (!$alumno_examen_data) {
    http_response_code(404);
    exit;
}
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// REMOVIDO utf8_decode() en estas líneas
$pdf->Cell(0, 10, utf8_decode('Reporte de Información del Alumno y Examen'), 0, 1, 'C');
$pdf->Ln(10);

$pdf->SetFont('Arial', '', 12);

$labels = [
    'Boleta', 'Nombre Completo', 'Teléfono', 'CURP', 'Entidad de Nacimiento',
    'Género', 'Fecha de Nacimiento', 'Escuela de Procedencia', 'Promedio General', 'Correo Electrónico'
];

$examen_labels = [
    'Fecha del Examen', 'Hora del Examen'
];

$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Datos del Alumno', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->Ln(2);

for ($i = 0; $i < count($labels); $i++) {
    $value = $alumno_examen_data[$i];
    if ($labels[$i] === 'Genero') {
        $value = ($alumno_examen_data[$i] == 't' || $alumno_examen_data[$i] == '1') ? 'Masculino' : 'Femenino';
    }
    $pdf->Cell(60, 10, $labels[$i] . ':', 0);
    $pdf->Cell(0, 10, $value, 0, 1);
}

$pdf->Ln(10);

$pdf->SetFont('Arial', 'B', 14);
$pdf->Cell(0, 10, 'Datos del Examen de Admisión', 0, 1, 'L');
$pdf->SetFont('Arial', '', 12);
$pdf->Ln(2);

$examen_offset = 10;
for ($i = 0; $i < count($examen_labels); $i++) {
    $value = $alumno_examen_data[$examen_offset + $i];
    $pdf->Cell(60, 10, $examen_labels[$i] . ':', 0);
    $pdf->Cell(0, 10, $value, 0, 1);
}
$pdf->Output('I', 'reporte_alumno_examen_' . $boleta_solicitada . '.pdf');
exit;
?>