document.getElementById("btn_add").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_add");
    btn_incertidumbre = document.getElementById("btn_incertidumbre");

    var $monto_fijo = document.getElementById('monto_fijo').value;
    var $perdida_dias = document.getElementById('perdida_dias').value;
    var $monto_perdida = document.getElementById('monto_perdida').value;
    var $gasto_adicional = document.getElementById('gasto_adicional').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {monto_fijo: $monto_fijo, perdida_dias: $perdida_dias, 
        monto_perdida: $monto_perdida, gasto_adicional: $gasto_adicional};

    // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/estado_naturaleza_incertidumbre.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var leve = data.leve;

 // Vaciar los campos de entrada
    
    document.getElementById('monto_fijo').value = "";
    document.getElementById('perdida_dias').value = "";
    document.getElementById('monto_perdida').value = "";
    document.getElementById('gasto_adicional').value = "";
    

    table(leve);
    

    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });

});

var cont_fin_table = 0;
var contador_table = 0;

function table(leve){
    
    var tabla = document.getElementById("miTabla");
    var cuerpoTabla = tabla.getElementsByTagName("tbody")[0];
    var filas = cuerpoTabla.getElementsByTagName("tr");

    // Obtener el número de filas en la tabla
   var numFilas = cuerpoTabla.rows.length;
   
   // Obtener el índice de fila actual (comenzando desde 0)
   var indiceFila = numFilas % 3;
   
   // Obtener la última fila en la tabla (la fila actual)
   var ultimaFila = cuerpoTabla.rows[numFilas - 1];

   if(cont_fin_table == 8){
    btn_add.disabled = true;
    btn_incertidumbre.disabled = false;
    btn_incertidumbre.addEventListener("click", table_incertidumbre);
   }
    var nuevaCelda = filas[contador_table].insertCell(); // Segunda columna

    nuevaCelda.textContent = leve

    if(cont_fin_table == 2 || cont_fin_table == 5){
        contador_table++;
    }

cont_fin_table++;
 console.log(c);


}

function table_incertidumbre(){

     // Obtener la referencia de la tabla
     var tabla = document.getElementById("miTabla");

     // Array para almacenar los datos
     var datos = [];
     var laplace = [];

     // Recorrer las filas de la tabla
     for (var i = 1; i < tabla.rows.length; i++) {
         var fila = tabla.rows[i];
         var filaDatos = [];
 
         // Recorrer las celdas de la fila
         for (var j = 1; j < fila.cells.length; j++) {
             var celda = fila.cells[j];
             // Extraer el texto de la celda y agregarlo al array de datos
             filaDatos.push(celda.innerText);
         }
 
         // Agregar los datos de la fila al array principal
         datos.push(filaDatos);
     }
 
     //obtener primera y ultima columna
     var columna_optimista = [];
     var columna_pesimista = [];
     for (var i = 0; i < datos.length; i++) {
        columna_optimista.push(datos[i][0]);
        columna_pesimista.push(datos[i][datos[i].length - 1]);

    }

    //contador para agregar el dato a la lista
    pos_dat = 0;

    while(pos_dat < 3){

        //realiza un promedio de los 3 datos dentro de la lista datos
        laplace.push((parseInt(datos[pos_dat][0])+parseInt(datos[pos_dat][1])+parseInt(datos[pos_dat][2]))/3)
        pos_dat++;
    }

     data_table_incertidumbre(columna_optimista, columna_pesimista, laplace);
}

function data_table_incertidumbre(columna_optimista, columna_pesimista, laplace){

    // Obtener una referencia al cuerpo de la tabla
var cuerpoTabla = document.getElementById("table_incertidumbre").getElementsByTagName("tbody")[0];

// Obtener todas las filas existentes en el cuerpo de la tabla
var filas = cuerpoTabla.getElementsByTagName("tr");

// Iterar sobre cada fila y agregar los datos a las celdas correspondientes
for (var i = 0; i < filas.length; i++) {
    var fila = filas[i];

    // Obtener el nombre de la alternativa de la primera celda (la primera columna)
    var nombreAlternativa = fila.getElementsByTagName("th")[0].textContent;

    // Obtener las celdas de las columnas de datos (segunda, tercera y cuarta)
    var celdaOptimista = fila.insertCell(); // Segunda columna
    var celdaPesimista = fila.insertCell(); // Tercera columna
    var celdaLaplace = fila.insertCell(); // Cuarta columna

    // Aquí puedes asignar los datos correspondientes a las celdas
    // Por ejemplo, si tienes los datos en arreglos columna_optimista, columna_pesimista, y laplace, puedes usar el índice 'i' para acceder a los datos correctos
    celdaOptimista.textContent = columna_optimista[i]; // Inserta el dato correspondiente a la columna optimista
    celdaPesimista.textContent = columna_pesimista[i]; // Inserta el dato correspondiente a la columna pesimista
    celdaLaplace.textContent = laplace[i]; // Inserta el dato correspondiente a la columna de Laplace
}

    
}
