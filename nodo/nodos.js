		var xml = new XMLHttpRequest();
		var tbody = document.querySelector('tbody');
		window.addEventListener('load',listar);

		function callback() 
		{
			if(xml.readyState === 4)
			{
				if (xml.status === 200) 
				{
	    		 	var res = xml.responseText;
	     		 	var obj = JSON.parse(res);
	     		 	var miTabla = document.getElementById('tbody');
	     
	    		 	for (var i=0;i<obj.length;i++)
	   			 	{
	   			 		var nodoTr = document.createElement("tr");
	     		 		var nodoTd1 = document.createElement("td");
	     		 		var nodoTd2 = document.createElement("td");
	     		 		var nodoTd3 = document.createElement("td");
	     		 		var nodoTd4 = document.createElement("td");
	     		 		var nodoTd5 = document.createElement("td");
	     		 		var nodoTd6 = document.createElement("td");
	     		 		var nodoNombre;
	     		 		var nodoApellido;
	     		 		var nodoTelefono;
	     		 		var nodoFecha;
	     		 		var nodoBorrar = document.createTextNode("borrar");
	     		 		var nodoModificar = document.createTextNode("Modificar");
	     		 		var nodoABor = document.createElement("a");
	     		 		var nodoAMod = document.createElement("a");

	     		 		nodoABor.setAttribute('href', "#");
	     		 		nodoABor.addEventListener("click", Borrar);
	     		 		nodoABor.appendChild(nodoBorrar);

	     		 		nodoAMod.setAttribute('href', "#");
	     		 		nodoAMod.addEventListener("click", Modificar);
	     		 		nodoAMod.appendChild(nodoModificar);

	   			 		nodoNombre = document.createTextNode(obj[i].nombre);
	     		 		nodoApellido = document.createTextNode(obj[i].apellido);
	     		 		nodoTelefono = document.createTextNode(obj[i].telefono);
	     		 		nodoFecha = document.createTextNode(obj[i].fecha);

	     		 		/* var persona = obj[i]; Lo mismo pero sin hardcodear tanto
	     		 		var columns = object.keys(persona);
	     		 		for(var j=0; j<columns.length;j++)
	     		 		{
							var cel = document.createElement("td");
							var text = document.createTextNode(persona[columns[j]]);
							cel.appendchild(text);
							nodoTr.appendChild(cel); Falta el borar que se tendria que hardcodear. Para vos Pellita
	     		 		}
						*/
	     		 		nodoTd1.appendChild(nodoNombre);
	     		 		nodoTd2.appendChild(nodoApellido);
	     		 		nodoTd3.appendChild(nodoTelefono);
	     		 		nodoTd4.appendChild(nodoFecha);
	     		 		nodoTd5.appendChild(nodoABor);
	     		 		nodoTd6.appendChild(nodoAMod);

	     		 		nodoTr.appendChild(nodoTd1);
	     		 		nodoTr.appendChild(nodoTd2);
	     		 		nodoTr.appendChild(nodoTd3);
	     		 		nodoTr.appendChild(nodoTd4);
	     		 		nodoTr.appendChild(nodoTd5);
	     		 		nodoTr.appendChild(nodoTd6);


	     		 		miTabla.appendChild(nodoTr);
					}
	  			}
	  			else
	  			{
	  				alert("Error del servidor ", xml.status);
	  			}
  			}
		}

		function Borrar(event)
		{
			event.preventDefault();//Previene que se refresque la pagina con el href, le saca el valor por defecto
			var tagA = event.target;//Devuelve el componente que lanzo el evento
			var tagTd = tagA.parentNode;
			var tagTr = tagTd.parentNode;
			/*var nombre = tagTr.firstElementChild; Datos de la lista que se encuentran en la fila
			var apellido = nombre.nextElementSibling;
			var telefono = apellido.nextElementSibling;*/
			tagTr.parentNode.removeChild(tagTr)
		}

		function Modificar(event)
		{
			event.preventDefault();
			Abrir('contModificar');
			var tagA = event.target;
			var tagTd = tagA.parentNode;
			var tagTr = tagTd.parentNode;
			var nombre = tagTr.firstElementChild;
			var apellido = nombre.nextElementSibling;
			var telefono = apellido.nextElementSibling;
			var fecha = telefono.nextElementSibling;
			var textNombre = document.getElementById("nombreMod");
			var textApellido = document.getElementById("apellidoMod");
			var textTelefono = document.getElementById("telefonoMod");
			var textFecha = document.getElementById("fechaMod");
			var btnModificar = document.getElementById("btnModificar");
			textNombre.value = nombre.innerHTML;
			textApellido.value = apellido.innerHTML;
			textTelefono.value = telefono.innerHTML;
			textFecha.value = fecha.innerHTML;
			btnModificar.addEventListener("click", function(){Guardar(textNombre, textApellido, textTelefono, textFecha, nombre, apellido, telefono, fecha);});


		}
		function Guardar(textNombre, textApellido, textTelefono, textFecha, nombre, apellido, telefono, fecha)
		{
			
			
				if(textNombre.value == "")
			{
				document.getElementById("nombreMod").className = "error";
				alert("Debe ingresar un nombre");
				return;
			}

			if (textApellido.value == "")
			{
				document.getElementById("apellidoMod").className = "error";
				alert("Debe ingresar un apellido");
				return;
			}

			if(textTelefono.value == "")
			{
				document.getElementById("telefonoMod").className = "error";
				alert("Debe ingresar un telefono");
				return;
			}

			if(textFecha.value == "")
			{
				document.getElementById("fechaMod").className = "error";
				alert("Debe ingresar una fecha");
				return;
			}
			
			nombre.innerHTML = textNombre.value;
			apellido.innerHTML = textApellido.value;
			telefono.innerHTML = textTelefono.value;
			fecha.innerHTML = textFecha.value;
			Cerrar('contModificar');
			var miTabla = document.getElementById('tbody');
		}

		function listar()
		{
			xml.open("GET", "http://localhost:3000/personas", true);
			xml.onreadystatechange = callback;
  			xml.send();
		}

		function Agregar()
		{
			var apellido = document.getElementById("apellido").value;
			var nombre = document.getElementById("nombre").value;
			var telefono = document.getElementById("telefono").value;
			var fecha = document.getElementById("fecha").value;

			if(nombre == "")
			{
				document.getElementById("nombre").className = "error";
				alert("Debe ingresar un nombre");
				return;
			}

			if (apellido == "")
			{
				document.getElementById("apellido").className = "error";
				alert("Debe ingresar un apellido");
				return;
			}

			if(telefono == "")
			{
				document.getElementById("telefono").className = "error";
				alert("Debe ingresar un telefono");
				return;
			}

			if(fecha == "")
			{
				document.getElementById("fecha").className = "error";
				alert("Debe ingresar una fecha");
				return;
			}

			if(confirm("Esta seguro que desea agregar una persona?"))
			{
				document.getElementById("apellido").className = "sinError";
				document.getElementById("nombre").className = "sinError";
				document.getElementById("telefono").className = "sinError";
				document.getElementById("fecha").className = "sinError";
				var miTabla = document.getElementById("tbody");

				var nodoTr = document.createElement("tr");
		     	var nodoTd1 = document.createElement("td");
		     	var nodoTd2 = document.createElement("td");
		     	var nodoTd3 = document.createElement("td");
		     	var nodoTd4 = document.createElement("td");
		     	var nodoTd5 = document.createElement("td");
		     	var nodoTd6 = document.createElement("td");
		     	var nodoNombre = document.createTextNode(nombre);
		     	var nodoApellido = document.createTextNode(apellido);
		     	var nodoTelefono = document.createTextNode(telefono);
		     	var nodoFecha = document.createTextNode(fecha);
		     	var nodoBorrar = document.createTextNode("borrar");
		     	var nodoModificar = document.createTextNode("Modificar");
		     	var nodoABor = document.createElement("a");
		     	var nodoAMod = document.createElement("a");

		     	nodoABor.setAttribute('href', "#");
		     	nodoABor.addEventListener("click", Borrar);
		     	nodoABor.appendChild(nodoBorrar);

		     	nodoAMod.setAttribute('href', "#");
		     	nodoAMod.addEventListener("click", Modificar);
		     	nodoAMod.appendChild(nodoModificar);

		     	nodoTd1.appendChild(nodoNombre);
		     	nodoTd2.appendChild(nodoApellido);
		     	nodoTd3.appendChild(nodoTelefono);
		     	nodoTd4.appendChild(nodoFecha);
		      	nodoTd5.appendChild(nodoABor);
		     	nodoTd6.appendChild(nodoAMod);
		     	nodoTr.appendChild(nodoTd1);
		     	nodoTr.appendChild(nodoTd2);
		     	nodoTr.appendChild(nodoTd3);
		     	nodoTr.appendChild(nodoTd4);
		     	nodoTr.appendChild(nodoTd5);
		     	nodoTr.appendChild(nodoTd6);

		    	miTabla.appendChild(nodoTr);
		    	Cerrar('contAgregar');
			}
		}

			function Abrir(cont)
			{
				var contAgregar = document.getElementById(cont);
				var btn = document.getElementById("btnAgregar");
				btn.hidden = true;
				contAgregar.hidden = false;
			}

			function Cerrar(cont)
			{
				var contAgregar = document.getElementById(cont);
				var btn = document.getElementById("btnCerrar");
				var btnAg = document.getElementById("btnAgregar");
				btn.hidden = false;
				contAgregar.hidden = true;
				btnAg.hidden = false;
			}
