<?php

// Verificar si se han recibido datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Leer el contenido enviado desde JavaScript
    $datos_recibidos = json_decode(file_get_contents("php://input"), true);

    //se consulta cuales son los datos que se están recibiendo
    if(isset($datos_recibidos['favorable']) && isset($datos_recibidos['desfavorable'])){
            // Acceder a los datos
    $favorable = $datos_recibidos['favorable'];
    $desfavorable = $datos_recibidos['desfavorable']; 
    //$porcentaje_realismo = $datos_recibidos['porcentaje_realismo'];

    // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
    $respuesta = array('favorable' => $favorable, "desfavorable" => $desfavorable);
    
    echo json_encode($respuesta);

    }elseif (isset($datos_recibidos['porcentaje_realismo']) && isset($datos_recibidos['probabilidad'])) {
        
        $porcentaje_realismo = $datos_recibidos['porcentaje_realismo']; 
        $probabilidad = $datos_recibidos['probabilidad']; 

        // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
        $respuesta = array('porcentaje_realismo' => $porcentaje_realismo, 'probabilidad' => $probabilidad);
    
        echo json_encode($respuesta);
    }

    
} else {
    // Si no se recibió una solicitud POST, devolver un error o realizar alguna acción apropiada
    echo "Error: Se esperaba una solicitud POST";
}

?>
