document.getElementById("btn_add").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_add");

    var $venta_real = document.getElementById('venta_real').value;
    var $pronostico_venta = document.getElementById('pronostico_venta').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = {venta_real: $venta_real, pronostico_venta: $pronostico_venta};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/pronosticos.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var venta_real = data.venta_real;
        var pronostico_venta = data.pronostico_venta;

 // Vaciar los campos de entrada
 document.getElementById('venta_real').value = "";
 document.getElementById('pronostico_venta').value = "";
    

 //llamada de la funcion de la tabla principal de datos

 complete_table(venta_real, pronostico_venta);
    //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

///////////////////////////////////////////////////////////////////////////
document.getElementById("btn_calcular").addEventListener("click", function(event){
    event.preventDefault();
    
    result();

});//fin escuchador de boton
///////////////////////////////////////////////////////////////////////////

var cont_row = 0;
var cont_cell = 0;
var data_valor_absoluto = [];
var data_pronostico_venta = [];
var data_ventas_reales = [];

var cont = 1;
//llenar la tabla de datos
function complete_table(venta_real, pronostico_venta){

    // Obtener una referencia al cuerpo de la tabla
    var cuerpoTabla = document.getElementById("table_data").getElementsByTagName("tbody")[0];
    
    // Crear una nueva fila
    var newRow = cuerpoTabla.insertRow();

    // Insertar celdas en la fila
    var celda_numero = newRow.insertCell(); // Segunda columna
    var celda_venta_real = newRow.insertCell(); // Tercera columna
    var celda_pronostico_venta = newRow.insertCell(); // Cuarta columna
    var celda_valor_abs = newRow.insertCell(); // Quinta columna

    // Calcular el valor absoluto
    var valor_absoluto = Math.abs(venta_real - pronostico_venta);
    data_valor_absoluto.push(valor_absoluto);
    data_pronostico_venta.push(pronostico_venta);
    data_ventas_reales.push(venta_real);

    // Agregar los datos a las celdas
    celda_numero.textContent = cont++; 
    celda_venta_real.textContent = venta_real; 
    celda_pronostico_venta.textContent = pronostico_venta; 
    celda_valor_abs.textContent = valor_absoluto; 

    // Incrementar el contador de celdas
    cont_cell++;
}

function result(){

    //DMA es el resultado de la suma de data_valor_absoluto/data_valor_absoluto.lenght-1
    var suma =0;
    var suma_venta_real = 0;
    var dma = 0;
    var resultado = 0;
    var ecm = 0;
    var emap = 0;

    for (let i = 0; i < data_valor_absoluto.length; i++) {
        suma += data_valor_absoluto[i];  
        suma_venta_real += data_ventas_reales[i];
    }

    dma = suma / (data_valor_absoluto.length);

    resultado = (parseInt(data_pronostico_venta[data_pronostico_venta.length-1])+dma)

    // Eleva al cuadrado cada valor en el arreglo
    let cuadrados = data_valor_absoluto.map(valor => Math.pow(valor, 2));
    // Calcula la suma de los cuadrados
    let sumaCuadrados = cuadrados.reduce((suma, cuadrado) => suma + cuadrado, 0);
    // Divide la suma por el número total de elementos en el rango
    ecm = sumaCuadrados / data_valor_absoluto.length;

    // Calcular el resultado de la división de cada par de elementos de los arreglos
let divisiones = [];
for (let i = 0; i < data_ventas_reales.length; i++) {
    divisiones.push(data_valor_absoluto[i] / data_ventas_reales[i]);
}
// Sumar todas las divisiones
let sumaDivisiones = divisiones.reduce((suma, division) => suma + division, 0);

// Dividir la suma por 3
emap = sumaDivisiones / data_ventas_reales.length;
    
    console.log("DMA:", dma);
    console.log("Resultado:", resultado);
    console.log("ECM:", ecm);
    console.log("EMAP:", emap);

    document.getElementById("result_dma").textContent = dma;
    document.getElementById("result_resultado").textContent = resultado;
    document.getElementById("result_ecm").textContent = ecm;
    document.getElementById("result_emap").textContent = emap;




}

