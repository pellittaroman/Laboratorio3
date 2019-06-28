//import { Persona } from "./Persona"
//import { Empleado } from "./Empleado"
 class Persona
{
    nombre:string;
    apellido:string;
    edad:number;
    
    constructor( nombre: string, apellido: string, edad: number)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
    } 
    personaToJson():string
    {
        let retorno=
        {
            "nombre" : this.nombre,
            "apellido": this.apellido,
            "edad": this.edad
        }
        
        return JSON.stringify(retorno);
    }
}

class Empleado extends Persona
{
    horario:string;
    legajo:number;
   
    constructor(nombre:string,apellido:string,edad:number,horario:string,legajo:number)
    {
        super( nombre, apellido, edad );
        this.legajo=legajo;
        this.horario=horario;
    }
    empleadoToJson():string
    {
        let retorno=
        {
            "nombre" : this.nombre,
            "apellido": this.apellido,
            "edad": this.edad,
            "horario":this.horario,
            "legajo":this.legajo
        }
        
        return JSON.stringify(retorno);
    }
}


    $(document).ready(function()
		{
			$("#btnAgregar").click(agregarEmpleado);
			$("#btnCancelar").click(limpiarFormulario);
			$("#btnMostrar").click(mostrarEmpleados);
			//$("#btnListar").click(listar);
		});
		var lista:Array<Empleado> = new Array<Empleado>();
function agregarEmpleado():void
{
        let nombre:string = String($("#nombre").val());
    	let apellido:string = String($("#apellido").val());
    	let edad:number = Number($("#edad").val());
    	let legajo:number = Number($("#legajo").val());
   	 	let horario:string = String($("#horario").val());
		let empleado:Empleado = new Empleado(nombre,apellido,edad,horario,legajo);
         LocalStorage(empleado);
}
function limpiarFormulario():void
{
    $("#nombre").val("");
    	$("#apellido").val("");
    	$("#edad").val("");
   	 	$("#horario").val("Mañana");
    	$("#legajo").val("");

    	$("#btnAgregar").text("Agregar");
    	$("#btnAgregar").click(agregarEmpleado);

    	$("#header").html("Alta empleado");

}
function mostrarEmpleados():void
{
	if (localStorage.getItem("lista") === null) 
	{
		$('#tbody').empty();
	}
	else
	{
		$('#tbody').empty();
		let toParse=localStorage.getItem("lista");
		let carga = JSON.parse(toParse);
		for (var i = 0; i <carga.length; i++) 
		{
			var fila=$("<tr>"); 
       		$(fila).attr('id','vtr');
        	var obj = carga[i];
			var columnas = Object.keys(obj);
			for (var j = 0; j < columnas.length + 1; j++) 
			{
				if(j!=columnas.length)
				{
					var cel= $('<td>');
            		$(fila).append(cel);
            		$(cel).text(obj[columnas[j]]);	
				}
				else
				{
					var cel= $('<td>');
            		var bor= $('<td>');
					var mod= $('<td>');
					$(bor).addClass("bor");
					$(mod).addClass("mod");
					$(bor).click(modificarEmpleado);
					$(mod).click(eliminarEmpleado);
					$(cel).append(mod);
					$(cel).append(bor);	
					$(fila).append(cel);
				}
				
				    
			}	
			
			
        	$('#tbody').append(fila); 
			
		}
	}
}
function modificarEmpleado():void
{

}
function eliminarEmpleado():void
{

}
function filtrarPorHorario():void
{

}
function promedioDeEdadPorHorario():void
{

}
function LocalStorage(empleado:Empleado) 
{
	if (localStorage.getItem("lista") === null) 
	{
		lista.push(empleado);
		localStorage.setItem('lista', JSON.stringify(lista));
	}
	else
	{
		let toParse:any = localStorage.getItem('lista');
		lista = JSON.parse(toParse);
		lista.push(empleado);
		localStorage.setItem('lista', JSON.stringify(lista));
	}
}
