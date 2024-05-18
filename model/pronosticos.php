<?php

// Verificar si se han recibido datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Leer el contenido enviado desde JavaScript
    $datos_recibidos = json_decode(file_get_contents("php://input"), true);

    //se consulta cuales son los datos que se están recibiendo
    if(isset($datos_recibidos['venta_real']) && isset($datos_recibidos['pronostico_venta'])){
            // Acceder a los datos
    $venta_real = $datos_recibidos['venta_real'];
    $pronostico_venta = $datos_recibidos['pronostico_venta']; 
    //$porcentaje_realismo = $datos_recibidos['porcentaje_realismo'];

    // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
    $respuesta = array('venta_real' => $venta_real, "pronostico_venta" => $pronostico_venta);
    
    echo json_encode($respuesta);

    }

    
} else {
    // Si no se recibió una solicitud POST, devolver un error o realizar alguna acción apropiada
    echo "Error: Se esperaba una solicitud POST";
}

?>
