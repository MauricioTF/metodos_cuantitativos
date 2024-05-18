document.getElementById("btn_cle").addEventListener("click", function(event){
    event.preventDefault();

    btn_add = document.getElementById("btn_cle");

    var $d = document.getElementById('d').value;
    var $co = document.getElementById('co').value;
    var $ch = document.getElementById('ch').value;

    // Objeto de datos que deseas enviar al servidor
    var datos = { d: $d, co:$co, ch:$ch};

        // Enviar datos a un script PHP utilizando fetch y el método POST
    fetch('../model/inventario.php', {
        method: 'POST',
        body: JSON.stringify(datos), // Convertir el objeto a una cadena JSON
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(response => response.json())
    .then(data => {
        // resultados recibidos del servidor
        var d = data.d;
        var co = data.co;
        var ch = data.ch;

 // Vaciar los campos de entrada
 document.getElementById('d').value = "";
 document.getElementById('co').value = "";
 document.getElementById('ch').value = "";

 cle(d, co, ch)

 //llamada de la funcion de la tabla principal de datos


    //llamar metodo que necesite
    })
    .catch(error => {
        // Manejar errores
        console.error('Se ha producido un error:', error);
    });
    
});//fin escuchador de boton

///////////////////////////////////////////////////////////////////////////

function cle(d, co, ch){
    var cle = Math.sqrt((2*d*co)/ch);
    document.getElementById("cle").textContent = Math.sqrt((2*d*co)/ch)

    document.getElementById("por_ordenar").textContent = (d/cle)*co;

    document.getElementById("por_almacenar").textContent = (cle/2)*ch;

    document.getElementById("total").textContent = (d/cle)*co + (cle/2)*ch;


}