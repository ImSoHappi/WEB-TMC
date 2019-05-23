
var el = document.getElementById("btn");
if (el.addEventListener)
    el.addEventListener("click", doFunction, false);
else if (el.attachEvent)
    el.attachEvent('onclick', doFunction);


document.getElementById("btn").onclick = (function(){

	v


    var cargarDatos = function(key, label){
  
  
    var xhttp = new XMLHttpRequest();
    var url = "https://imsohappy.pythonanywhere.com/Tecnico/";
    
  
    xhttp.onreadystatechange = function() {
        if ( this.readyState == 4 && this.status == 200 ){
            console.log( this.responseText );
            var data = ( JSON.parse(this.responseText) );
            mostrarDatos( data );
            app.listaUsuarios = data;
            console.log(data)
        }
    }
  
  
      xhttp.open( 'GET', url, true );
      xhttp.send();
  
    }
	
    var logearUsuario = function( usuarios ){
  
        for ( let usuario of usuarios ){
			if(usuario.value == usuario.usuario && usuario.value == usuario.contraseña){
				alert("Usuarios validos ! ingresando a la pagina");
				window.location.assign("index.html");
			}
			else{
				// alert("Usuario o contraseña incorrectos");
				window.location.assign("login.html");
			}
    
    	}
  
    }
  
    cargarDatos();
  
    logearUsuario(app.listaUsuarios);
  })( );