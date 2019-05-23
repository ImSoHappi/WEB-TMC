(function() {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                 .register('./service-worker.js')
                 .then(function() {
                     console.log('Service Worker Registered');
                });
    }
})( );



(function(){

    var app = {
      listaOrden : [],
      listaOffline: [],
    }
  
    var pedirDatos = function(key, label){
  
  
    var xhttp = new XMLHttpRequest();
    var url = "https://imsohappy.pythonanywhere.com/Orden/";
    
  
    xhttp.onreadystatechange = function() {
        if ( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = ( JSON.parse(this.responseText) );
            localStorage.setItem('offline', JSON.stringify( data ) );
            mostrarOrdenes( data );
            app.listaOrden = data;
        }
    }
  
  
      xhttp.open( 'GET', url, true );
      xhttp.send();
  
    }
  
    var mostrarOrdenes = function( ordenes ){
  
        var containerOrdenes = document.getElementById("containerOrdenes")
  
        for ( let orden of ordenes ){
        
            var containerOrden = document.createElement("section");
            var folioContainer = document.createElement("h3");
            var fechaContainer = document.createElement("p");
            var horainicioContainer = document.createElement("p");
            var horaterminoContainer = document.createElement("p");
            var idascensorContainer = document.createElement("p");
            var modeloContainer = document.createElement("p");
            var fallasContainer = document.createElement("p");
            var reparacionesContainer = document.createElement("p");
            var piezasContainer = document.createElement("p");
            
  
            containerOrden.className = "containerOrden"

            folioContainer.innerHTML= "Nº Folio: "+orden.folio;
            fechaContainer.innerHTML = "Fecha: "+orden.fecha;
            horainicioContainer.innerHTML = "Hora Inicio: "+orden.horainicio;
            horaterminoContainer.innerHTML = "Hora Termino: "+orden.horatermino;
            idascensorContainer.innerHTML = "ID Ascensor: "+orden.idascensor;
            modeloContainer.innerHTML = "Modelo: "+orden.modelo; 
            fallasContainer.innerHTML = "Fallas: "+orden.fallas; 
            reparacionesContainer.innerHTML = "Reparaciones: "+orden.reparaciones;
            piezasContainer.innerHTML = "Piezas: "+orden.piezas;


            containerOrden.appendChild(folioContainer);
            containerOrden.appendChild(fechaContainer);
            containerOrden.appendChild(horainicioContainer);
            containerOrden.appendChild(horaterminoContainer);
            containerOrden.appendChild(idascensorContainer);
            containerOrden.appendChild(modeloContainer);
            containerOrden.appendChild(fallasContainer);
            containerOrden.appendChild(reparacionesContainer);
            containerOrden.appendChild(piezasContainer);

            containerOrdenes.appendChild(containerOrden);
  
    }
  
    }

    if(navigator.onLine){
        
        mostrarOrdenes(app.listaOrden);
        pedirDatos();

    }else{

        var offline = JSON.parse(localStorage.getItem( 'offline' ) );
        app.listaOffline = offline;
        mostrarOrdenes( app.listaOffline );
    }

})( );