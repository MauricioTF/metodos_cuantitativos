<?php

// Verificar si se han recibido datos
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Leer el contenido enviado desde JavaScript
    $datos_recibidos = json_decode(file_get_contents("php://input"), true);

    //se consulta cuales son los datos que se están recibiendo
    if(isset($datos_recibidos['d']) && isset($datos_recibidos['co'])&& isset($datos_recibidos['ch'])){
            // Acceder a los datos
    $d = $datos_recibidos['d'];
    $co = $datos_recibidos['co']; 
    $ch = $datos_recibidos['ch']; 

    //$porcentaje_realismo = $datos_recibidos['porcentaje_realismo'];

    // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
    $respuesta = array('d' => $d, "co" => $co, "ch" => $ch);
    
    echo json_encode($respuesta);

    
    }elseif(isset($datos_recibidos['cantidad_meses'])){
              // Acceder a los datos
    $cantidad_meses = $datos_recibidos['cantidad_meses'];

    // Puedes enviar una respuesta de vuelta a JavaScript si lo deseas
    $respuesta = array('cantidad_meses' => $cantidad_meses);
    
    echo json_encode($respuesta);
    }

    
} else {
    // Si no se recibió una solicitud POST, devolver un error o realizar alguna acción apropiada
    echo "Error: Se esperaba una solicitud POST";
}

?>
