document.getElementById("btn_add").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_add");

    var $mes = document.getElementById('mes').value;
    var $venta_real = document.getElementById('venta_real').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {mes: $mes, venta_real: $venta_real};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/promedios.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var mes = data.mes;
        var venta_real = data.venta_real;

 // Vaciar los campos de entrada
 document.getElementById('mes').value = "";
 document.getElementById('venta_real').value = "";
    

 //llamada de la funcion de la tabla principal de datos
 complete_table(mes, venta_real);

    //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

///////////////////////////////////////////////////////////////////////////

document.getElementById("btn_cantidad_meses").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_cantidad_meses");

    var $cantidad_meses = document.getElementById('cantidad_meses').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {cantidad_meses: $cantidad_meses};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/promedios.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var cantidad_meses = data.cantidad_meses;

 // Vaciar los campos de entrada
 document.getElementById('cantidad_meses').value = "";    

 //llamada de la funcion de la tabla principal de datos
 tabla_promedios(cantidad_meses)

    //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

///////////////////////////////////////////////////////////////////////////

var cont_row = 0;
var cont_cell = 0;
var data_venta_real = [];

function complete_table(mes, venta_real){

    // Obtener una referencia al cuerpo de la tabla
    var cuerpoTabla = document.getElementById("table_data").getElementsByTagName("tbody")[0];
    
    // Crear una nueva fila
    var newRow = cuerpoTabla.insertRow();

    // Insertar celdas en la fila
    var celda_mes = newRow.insertCell(); // Segunda columna
    var celda_venta_real = newRow.insertCell(); // Tercera columna

    data_venta_real.push(venta_real)

    // Agregar los datos a las celdas
    celda_mes.textContent = mes; 
    celda_venta_real.textContent = venta_real; 

    // Incrementar el contador de celdas
    cont_cell++;
}

function promedio_movil(cantidad_meses){

    //formula promedio movil y promedio movil ponderado
    var promedio_movil = [];
    var position = 0;
    var num = cantidad_meses;
    var suma = 0;

    for (let i = 0; i < data_venta_real.length-(cantidad_meses-1); i++) {

        for (let j = position; j < num; j++) {
            suma += parseInt( data_venta_real[j]);

        }
        
        position++;
        num++;

    promedio_movil.push(suma/cantidad_meses)
    suma = 0;
}
return promedio_movil;
}

function promedio_movil_ponderado(cantidad_meses){


    //formula promedio movil y promedio movil ponderado
    var promedio_movil_ponderado = [];
    var position = 0;
    var num = cantidad_meses-1;
    var mult = parseInt(cantidad_meses);
    var suma = 0;
    var suma_mult = 0;

    for (let i = 0; i < data_venta_real.length-(cantidad_meses-1); i++) {
        mult = parseInt(cantidad_meses);
        suma_mult = 0;

        for (let j = num; j >= position; j--) {
            suma_mult += mult;
            suma += parseInt( data_venta_real[j])*mult;;
            mult--;
        }   
        console.log(suma_mult)

        position++;
        num++;
        
        promedio_movil_ponderado.push(suma/suma_mult)
    suma = 0;
    }
return promedio_movil_ponderado;
}

function tabla_promedios(cantidad_meses){

    // Obtener una referencia al cuerpo de la tabla
var cuerpoTabla = document.getElementById("table_data").getElementsByTagName("tbody")[0];

// Inicializar variables
var cont_row = cantidad_meses-1;
var cont_cell = 0;

// Iterar sobre los datos y agregarlos a la tabla
// Iterar sobre los datos y agregarlos a la tabla
for (let i = 0; i < promedio_movil(cantidad_meses).length; i++) {
    // Crear una nueva fila si es necesario
    if (cont_cell === 0 || cont_cell === 1) {
        // Crear una nueva fila
        var newRow = cuerpoTabla.insertRow();
        // Reiniciar el contador de celdas
        cont_cell = 0; // Reinicia el contador para cada nueva fila
        // Incrementar el contador de filas
        cont_row++;
    }

    // Obtener la fila actual
    var currentRow = cuerpoTabla.rows[cont_row - 1];

    // Insertar celdas en la fila actual
    var celda_promedio_movil = currentRow.insertCell(); // Segunda columna
    var celda_promedio_movil_ponderado = currentRow.insertCell(); // Tercera columna

    // Insertar datos en las celdas
    celda_promedio_movil.textContent = promedio_movil(cantidad_meses)[i];
    celda_promedio_movil_ponderado.textContent = promedio_movil_ponderado(cantidad_meses)[i];

    // Incrementar el contador de celdas
    cont_cell++;
}
}