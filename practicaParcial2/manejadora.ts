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
			$("#btnNomYAp").click(SoloNombreyApellido);
			$("#btnFiltrar2").click(filtrarPorHorario);
			$("#btnPromedio2").click(promedioDeEdadPorHorario);
			$("#btnFiltrar").click(function(){
				$("#btnFiltrar2").show();
				$("#btnPromedio2").hide();
				$("#titleF").attr("style","display: block");
				$("#titleP").attr("style","display: none");
			});
			$("#btnPromedio").click(function(){
				$("#btnPromedio2").show();	
				$("#btnFiltrar2").hide();
				$("#titleP").attr("style","display: block");
				$("#titleF").attr("style","display: none");
			});
			
		});
		var lista:Array<Empleado> = new Array<Empleado>();
function agregarEmpleado():void
{
        let nombre:string = String($("#nombre").val());
    	let apellido:string = String($("#apellido").val());
    	let edad:number = Number($("#edad").val());
    	let legajo:number = Number($("#legajo").val());
		let horario:string=String($("#horario").val());
		let empleado:Empleado = new Empleado(nombre,apellido,edad,horario,legajo);
		LocalStorage(empleado);
		mostrarEmpleados();
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
					var mod= $('<td>');
            		var bor= $('<td>');
					$(bor).addClass("far fa-trash-alt");
					$(mod).addClass("far fa-edit");
					$(bor).attr('id','tdBorrar');
					$(mod).attr('id','tdModificar');
					$(mod).click(modificarEmpleado);
					$(bor).click(eliminarEmpleado);
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
	$("#tituloForm").text("Modificar Persona");
	var	btn=$('<button>');
	$("#btnAgregar").hide();
	$(btn).addClass("btn btn-success");
	$(btn).text("Modificar ");
	$(btn).attr("id","btnModificar");
	let icono=$('<span>');
	$(icono).addClass("fas fa-save");
	$(btn).append(icono);
	$("#formulario").append(btn);
	let elemento = event.target;
    let nodo = $(elemento).parent();
	let tr = $(nodo).parent();
	let td =$(tr).children();
    let nombre:string = $(td[0]).text();
    let apellido:string = $(td[1]).text();
    let edad:string = $(td[2]).text();
    let legajo:string =$(td[3]).text();
	var horario:string = $(td[4]).text();
	let toParse=localStorage.getItem("lista");
	var carga = JSON.parse(toParse);
	
	for(let i=0;i<carga.length; i++)
	{

		if(nombre==carga[i].nombre)
		{
			var index=i;
			break;
		}
	}

	$("#nombre").val(nombre);
    $("#apellido").val(apellido);
	$('#edad').val(edad);
	$('#legajo').val(legajo);
	$('#horario').val(horario);
	$(btn).click(function(){
		
		let nombre:string = String($("#nombre").val());
    	let apellido:string = String($("#apellido").val());
    	let edad:number = Number($("#edad").val());
    	let legajo:number = Number($("#legajo").val());
		let horario:string=String($("#horario").val());
		let empleado:Empleado = new Empleado(nombre,apellido,edad,horario,legajo);
		lista=[];
		localStorage.clear();
		for(let i=0;i<carga.length; i++)
		{
			if(i==index)
			{
				lista.push(empleado);
			}
			else
			{
				lista.push(carga[i]);
			}
		}
		localStorage.setItem('lista', JSON.stringify(lista));
		mostrarEmpleados();
	});
}
function eliminarEmpleado():void
{
	let elemento = event.target;
    let nodo = $(elemento).parent();
	let tr = $(nodo).parent();
	let td =$(tr).children();
	let nombre:string = $(td[0]).text();
	let toParse=localStorage.getItem("lista");
	var carga = JSON.parse(toParse);
	localStorage.clear();
	lista=[];
	for(let i=0;i<carga.length; i++)
	{

		if(nombre!=carga[i].nombre)
		{
			LocalStorage(carga[i]);
		}
	}
	mostrarEmpleados();
}
function filtrarPorHorario():void
{
	$("modal-title").text("Filtrar por horario");
	var listaFiltrada:Array<Empleado>=new Array<Empleado>();
	let horario:string=String($("#horario2").val());
	let toParse=localStorage.getItem("lista");
	var carga = JSON.parse(toParse);
	listaFiltrada=carga.filter((a)=>a.horario===horario);
	localStorage.setItem('listaFiltradaxHorario', JSON.stringify(listaFiltrada));
	$("#tbody").empty();
	for (var i = 0; i <listaFiltrada.length; i++) 
		{
			var fila=$("<tr>");
			let obj=listaFiltrada[i]; 
			var columnas = Object.keys(obj);
        	for (var j = 0; j <columnas.length + 1; j++) 
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
					var mod= $('<td>');
            		var bor= $('<td>');
					$(bor).addClass("far fa-trash-alt");
					$(mod).addClass("far fa-edit");
					$(bor).attr('id','tdBorrar');
					$(mod).attr('id','tdModificar');
					$(mod).click(modificarEmpleado);
					$(bor).click(eliminarEmpleado);
					$(cel).append(mod);
					$(cel).append(bor);	
					$(fila).append(cel);
				}
				
				    
			}	
			
			
        	$('#tbody').append(fila); 
			
		}
	
}
function promedioDeEdadPorHorario():void
{
	let horario:string=String($("#horario2").val());
	var aux:number;
	let toParse=localStorage.getItem("lista");
	var carga = JSON.parse(toParse);
	let div=carga.filter((a)=>a.horario===horario);
	aux=carga.filter((a)=>a.horario===horario).reduce((sum, persona) => {return sum + persona.edad ;}, 0)/div.length;
	$("#MBody").text(aux);

}
function SoloNombreyApellido():void
{
	var aux=[];
	let toParse=localStorage.getItem("lista");
	var carga = JSON.parse(toParse);
	aux=carga.map((a)=>aux=[a.nombre,a.apellido]);
	localStorage.setItem('listaFiltrada', JSON.stringify(aux));
	$("#tbody").empty();
	for (var i = 0; i <aux.length; i++) 
		{
			var fila=$("<tr>");
			let obj=aux[i]; 
			var columnas = Object.keys(obj);
        	for (var j = 0; j <columnas.length + 1; j++) 
			{
				if(j!=columnas.length)
				{
					var cel= $('<td>');
            		$(fila).append(cel);
					$(cel).text(aux[i][j]);
				}

				else
				{
					var cel= $('<td>');
					let cel1= $('<td>');
					let cel2= $('<td>');
					let cel3= $('<td>');	
					$(fila).append(cel1);
					$(fila).append(cel2);
					$(fila).append(cel3);
					var mod= $('<td>');
            		var bor= $('<td>');
					$(bor).addClass("far fa-trash-alt");
					$(mod).addClass("far fa-edit");
					$(bor).attr('id','tdBorrar');
					$(mod).attr('id','tdModificar');
					$(mod).click(modificarEmpleado);
					$(bor).click(eliminarEmpleado);
					$(cel).append(mod);
					$(cel).append(bor);	
					$(fila).append(cel);
				}
				
				    
			}	
			$('#tbody').append(fila); 
		}
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
function limpiarFormulario():void
{
	event.preventDefault();
	$("#nombre").val("");
    $("#apellido").val("");
    $("#edad").val("");
   	$("#horario").val("Mañana");
	$("#legajo").val("");
	$("#btnModificar").remove();
	$("#btnAgregar").show();
	$("#tituloForm").text("Alta Personas");

}
