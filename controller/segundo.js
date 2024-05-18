document.getElementById("btn_add").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_add");

    var $favorable = document.getElementById('favorable').value;
    var $desfavorable = document.getElementById('desfavorable').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {favorable: $favorable, desfavorable: $desfavorable};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/segundo.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var favorable = data.favorable;
        var desfavorable = data.desfavorable;

 // Vaciar los campos de entrada
 document.getElementById('favorable').value = "";
 document.getElementById('desfavorable').value = "";
    

 //llamada de la funcion de la tabla principal de datos
    data_table_fav_des(favorable, desfavorable);

    //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

///////////////////////////////////////////////////////////////////////////

document.getElementById("btn_porcentaje_realismo").addEventListener("click", function(event){
    event.preventDefault();

    btn_porcentaje_realismo = document.getElementById("btn_porcentaje_realismo");

    var $porcentaje_realismo = document.getElementById('porcentaje_realismo').value;
    var $probabilidad = document.getElementById('probabilidad').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {porcentaje_realismo: $porcentaje_realismo, probabilidad: $probabilidad};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/segundo.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var porcentaje_realismo = data.porcentaje_realismo;
        var probabilidad = data.probabilidad;

 // Vaciar los campos de entrada
 document.getElementById('porcentaje_realismo').value = "";    
 document.getElementById('probabilidad').value = "";    

        //completa la tabla 
        completa_tabla(porcentaje_realismo, probabilidad);

        //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

//////////////////////////////////////////////////////////////////////////////////

document.getElementById("btn_arrepentimiento").addEventListener("click", function(event){
    event.preventDefault();

    completa_tabla_arrepentimiento();
});//fin escuchador de boton
//////////////////////////////////////////////////////////////////////////////////

var cont_row = 0;
var cont_cell = 0;
var data_favorable = [];
var data_desfavorable = [];

function data_table_fav_des(favorable, desfavorable){

    // Obtener una referencia al cuerpo de la tabla
var cuerpoTabla = document.getElementById("table_data").getElementsByTagName("tbody")[0];

// Obtener todas las filas existentes en el cuerpo de la tabla
var filas = cuerpoTabla.getElementsByTagName("tr");

// Iterar sobre cada fila y agregar los datos a las celdas correspondientes
//for (var i = 0; i < filas.length; i++) {
    //var fila = filas[i];

    // Obtener el nombre de la alternativa de la primera celda (la primera columna)
    //var nombreAlternativa = fila.getElementsByTagName("th")[0].textContent;

    // Obtener las celdas de las columnas de datos (segunda, tercera y cuarta)
    var celda_favorable = filas[cont_row].insertCell(); // Segunda columna
    var celda_desfavorable = filas[cont_row].insertCell(); // Tercera columna

    if(cont_cell == 0 || cont_cell == 1){
        cont_row++;
    }

    //se agregan los datos a sus respectivas listas
    data_favorable.push(favorable);
    data_desfavorable.push(desfavorable);
    
        // Aquí puedes asignar los datos correspondientes a las celdas
    celda_favorable.textContent = favorable; 
    celda_desfavorable.textContent = desfavorable; 
    cont_cell++;

//}
}

function realismo(porcentaje_realismo){

    //formula
    // (porcentaje_realismo)*(favorable)+(1-porcentaje_realismo)*(desfavorable)

    var data_realismo = [];

    for (let i = 0; i < data_favorable.length; i++) {
        
        data_realismo.push( (porcentaje_realismo)*(data_favorable[i])+(1-porcentaje_realismo)*(data_desfavorable[i]));
        
    }

    console.log(data_realismo);
    return data_realismo;
}

function laplace (probabilidad){

    var data_laplace = [];

    for (let i = 0; i < data_favorable.length; i++) {
        
        data_laplace.push(parseInt(data_favorable[i])*probabilidad+parseInt(data_desfavorable[i])*probabilidad);
        
    }

    console.log(data_laplace);
    return data_laplace;
}

function completa_tabla_arrepentimiento(){

        //almacenan la resta del mayo de la columna con todos los datos. Favorable y desfavorable
        var arrep_favorable = [];
        var arrep_desfavorable = [];
    
        if(data_desfavorable.length === 3 && data_favorable.length === 3){
    
            for (let i = 0; i < data_favorable.length; i++) {
                
                arrep_favorable.push(Math.max(...data_favorable)-data_favorable[i]);
                arrep_desfavorable.push(Math.max(...data_desfavorable)-data_desfavorable[i]);
                
            }
    
            console.log(arrep_favorable);
            console.log(arrep_desfavorable);
        }

        //obtiene el mayor de la fila
        var max_fila = [];
        for (let i = 0; i < arrep_favorable.length; i++) {
           
            if(arrep_favorable[i] > arrep_desfavorable[i]){
                max_fila.push(arrep_favorable[i]);
            }else{
                max_fila.push(arrep_desfavorable[i]);
            }
        }

// Obtener una referencia al cuerpo de la tabla
var cuerpoTabla = document.getElementById("table_arrepentimiento").getElementsByTagName("tbody")[0];

// Inicializar variables
var cont_row = 0;
var cont_cell = 0;

// Iterar sobre los datos y agregarlos a la tabla
// Iterar sobre los datos y agregarlos a la tabla
for (let i = 0; i < arrep_desfavorable.length; i++) {
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
    var celda_favorable = currentRow.insertCell(); // Segunda columna
    var celda_desfavorable = currentRow.insertCell(); // Tercera columna
    var celda_max_fila = currentRow.insertCell(); // Cuarta columna

    // Insertar datos en las celdas
    celda_favorable.textContent = arrep_favorable[i];
    celda_desfavorable.textContent = arrep_desfavorable[i];
    celda_max_fila.textContent = max_fila[i];

    // Incrementar el contador de celdas
    cont_cell++;
}



}

function completa_tabla(porcentaje_realismo, probabilidad){

// Obtener una referencia al cuerpo de la tabla
var cuerpoTabla = document.getElementById("table_fin").getElementsByTagName("tbody")[0];

// Inicializar variables
var cont_row = 0;
var cont_cell = 0;

// Iterar sobre los datos y agregarlos a la tabla
// Iterar sobre los datos y agregarlos a la tabla
for (let i = 0; i < data_favorable.length; i++) {
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
    var celda_maximax = currentRow.insertCell(); // Segunda columna
    var celda_maximin = currentRow.insertCell(); // Tercera columna
    var celda_realismo = currentRow.insertCell(); // Cuarta columna
    var celda_laplace = currentRow.insertCell(); // Cuarta columna

    // Insertar datos en las celdas
    celda_maximax.textContent = data_favorable[i];
    celda_maximin.textContent = data_desfavorable[i];
    celda_realismo.textContent = realismo(porcentaje_realismo)[i];
    celda_laplace.textContent = laplace(probabilidad)[i];

    // Incrementar el contador de celdas
    cont_cell++;
}

}