(function(){

    var app = {
      listaClientes: [],
      listaOffline: [],
    }
  
    var pedirDatos = function(key, label){
  
  
    var xhttp = new XMLHttpRequest();
    var url = "https://imsohappy.pythonanywhere.com/clientes/";
    
  
    xhttp.onreadystatechange = function() {
        if ( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = ( JSON.parse( this.responseText ) );
            localStorage.setItem('offline', JSON.stringify( data ) );
            mostrarClientes( data );
            app.listaClientes = data;
        }
    }
  
  
      xhttp.open( 'GET', url, true );
      xhttp.send();
  
    }
  
    var mostrarClientes = function( clientes ){
  
        var containerClientes = document.getElementById("containerClientes")
  
        for ( let cliente of clientes ){
            var containerCliente = document.createElement("section");
            var nombreContainer = document.createElement("h3");
            var iconoContainer = document.createElement("img")
            var direccionContainer = document.createElement("p");
            var ciudadContainer = document.createElement("p");
            var comunaContainer = document.createElement("p");
            var telefonoContainer = document.createElement("p");
            var correoContainer = document.createElement("p");
            var btnOrden = document.createElement("button");
            
            containerCliente.className = "containerCliente"
            
            nombreContainer.innerHTML = cliente.nombre;
            iconoContainer.src = "img/iconocliente.png";
            direccionContainer.innerHTML = "Direccion: "+cliente.direccion;
            ciudadContainer.innerHTML = "Ciudad: "+cliente.ciudad;
            comunaContainer.innerHTML = "Comuna: "+cliente.comuna;
            telefonoContainer.innerHTML = "Telefono: "+cliente.telefono;
            correoContainer.innerHTML = "Correo: "+cliente.correo;
            btnOrden.innerHTML = "Orden";
            btnOrden.href = "crear.html";

            containerCliente.appendChild(nombreContainer);
            containerCliente.appendChild(iconoContainer)
            containerCliente.appendChild(direccionContainer);
            containerCliente.appendChild(ciudadContainer);
            containerCliente.appendChild(comunaContainer);
            containerCliente.appendChild(telefonoContainer);
            containerCliente.appendChild(correoContainer);
            containerCliente.appendChild(btnOrden);
  
            containerClientes.appendChild(containerCliente);
  
    }
  
    }
    

    if(navigator.onLine){
        
        mostrarClientes(app.listaClientes);
        pedirDatos();

    }else{

        var offline = JSON.parse(localStorage.getItem( 'offline' ) );
        app.listaOffline = offline;
        mostrarClientes( app.listaOffline );
    }

})( );