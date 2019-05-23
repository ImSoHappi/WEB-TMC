(function(){

    var app = {
      listaClientes: [],
      listaOffline: [],
    }
  
    var pedirDatos = function(key, label){
  
  
    var xhttp = new XMLHttpRequest();
    var url = "https://imsohappy.pythonanywhere.com/Tecnico/";
    
  
    xhttp.onreadystatechange = function() {
        if ( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = ( JSON.parse( this.responseText ) );
            localStorage.setItem('offline', JSON.stringify( data ) );
            mostrarTecnicos( data );
            app.listaTecnico = data;
        }
    }
  
  
      xhttp.open( 'GET', url, true );
      xhttp.send();
  
    }
  
    var mostrarTecnicos = function( Tecnicos ){
  
        var containerTecnico = document.getElementById("containerTecnico")
  
        for ( let Tecnico of Tecnicos ){
            var containerTecnico = document.createElement("section");
            var idContainer = document.createElement("p");
            var nombreContainer = document.createElement("h2")
            var clienteContainer = document.createElement("p");
            var correoContainer = document.createElement("p");
            var passwordContainer = document.createElement("p");
            containerTecnico.className = "containerTecnico"
            

            idContainer.innerHTML = "Id: "+Tecnico.id;
            nombreContainer.innerHTML = "Nombre: "+Tecnico.nombre;
            clienteContainer.innerHTML ="Cliente: "+Tecnico.cliente;
            correoContainer.innerHTML = "Correo: "+Tecnico.correo;
            passwordContainer.innerHTML= "Contraseña: "+Tecnico.password;

            containerTecnico.appendChild(nombreContainer);
            containerTecnico.appendChild(idContainer);
            containerTecnico.appendChild(clienteContainer);
            containerTecnico.appendChild(passwordContainer);
            containerTecnico.appendChild(correoContainer);
  
            containerTecnicos.appendChild(containerTecnico);
  
    }
  
    }
    

    if(navigator.onLine){
        
        mostrarTecnicos(app.listaTecnicos);
        pedirDatos();

    }else{

        var offline = JSON.parse(localStorage.getItem( 'offline' ) );
        app.listaOffline = offline;
        mostrarTecnicos( app.listaOffline );
    }

})( );