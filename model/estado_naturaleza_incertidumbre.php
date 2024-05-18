
<?php
// Verificar si se han recibido datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Leer el contenido enviado desde JavaScript
    $datos_recibidos = json_decode(file_get_contents("php://input"), true);

    // Acceder a los datos
    $monto_fijo = $datos_recibidos['monto_fijo'];
    $perdida_dias = $datos_recibidos['perdida_dias'];
    $monto_perdida = $datos_recibidos['monto_perdida'];
    $gasto_adicional = $datos_recibidos['gasto_adicional'];
 
    
    $leve = $monto_fijo+$gasto_adicional+($perdida_dias*$monto_perdida);
    $moderado = $monto_fijo+$gasto_adicional+($perdida_dias*$monto_perdida);
    
    // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
    $respuesta = array('leve' => $leve, "moderado" => $moderado);
    
    echo json_encode($respuesta);
    
} else {
    // Si no se recibió una solicitud POST, devolver un error o realizar alguna acción apropiada
    echo "Error: Se esperaba una solicitud POST";
}
?>

