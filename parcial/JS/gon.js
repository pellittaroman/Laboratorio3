$(document).ready(function()
{
    CargarRegistros();
});
function CargarRegistros()
{
   
    $.get("http://localhost:3000/materias", function(data,status){
        console.log(status);
        if(status==="success")
        {
            CargarMaterias(data);
        }
        else
        {
            alert("Error del servidor");
        }
    });
}
function CargarMaterias(materias)
{
	
	for (var i = 0; i < materias.length; i++) 
	{
		var fila=$("<tr>"); 
        $(fila).attr('id','vtr');
        var obj = materias[i];
		var columnas = Object.keys(obj);

		for (var j = 0; j < columnas.length; j++) 
		{
            var cel= $('<td>');
            $(fila).append(cel);
            $(cel).text(obj[columnas[j]]);    
        }
        $(fila).dblclick(MostrarRecuadro);
        $('#tbody').append(fila); 
    }
}
function MostrarRecuadro()
{
    var elemento = event.target;
    var nodo = $(elemento).parent();
    var tr = $(nodo).children();
    var id = $(tr[0]).text();
    var nombre = $(tr[1]).text();
    var cuatrimestre = $(tr[2]).text();
    var fecha =$(tr[3]).text();
    var turno = $(tr[4]).text();
    fecha=fecha.split("/").reverse().join("-");
    
    $("#nombre").val(nombre);
    $("#cuatrimestre").val(cuatrimestre);
    $('#fecha').val(fecha);
    if (turno === "Mañana")
    {
        
        $("#turnoM").prop('checked', true);
    }
    else
    {
        
        $("#turnoN").prop('checked', true);
    }
    $('#div').show();
    $('#btnCerrar').click(function(){

        $('#div').hide();
    });
    $('#btnModificar').click(function(){
       event.preventDefault();
        var nombreAux=$('#nombre').val();
        var fechaAux=$('#fecha').val();
        var dia=new Date(fechaAux);
        var diad=new Date();
        var control=nombreAux.length;
        if(diad<dia)
        {
          var fechaFinal=fechaAux.split("-").reverse().join("/");
          if($('#fecha').prop("class")=='conError')
          {
            $('#fecha').removeClass();
          }
        }
        else
        {
            $('#fecha').addClass('conError');
            var fechaFinal=null;
        }
        
        if(control<6)
        {
            
            $('#nombre').addClass('conError');
            var nombreFinal=null;
        }
        else
        {
            var nombreFinal=nombreAux;
            if($('#nombre').prop("class")=='conError')
          {
            $('#nombre').removeClass();
          }
        }
        if($('#turnoM').prop('checked')==true)
        {
            var turnoFinal="Mañana";
        }
        else
        {
            var turnoFinal="Noche";
        }
        if(nombreFinal!=null && fechaFinal!==null)
        {
            // $('#fondo').show();
             var obj = 
            {
                "id": id,
                "nombre": nombreFinal,
                "cuatrimestre": cuatrimestre,
                "fechaFinal": fechaFinal,
                "turno": turnoFinal
            };
            modificar(obj);
        }
    });

    $('#btnEliminar').click(function(){
        event.preventDefault();
        $('#fondo').show();
        var obj = 
                {
                    "id": id,
                };
                $.post( "http://localhost:3000/eliminar",obj,function(data,status){
                    if(status=="success")
                    {
                        $(tr).remove();
                        $('#fondo').hide();
                    }
                    else
                    {
                        alert("Error del servidor");
                    }
                });
        $('#div').hide();
    });
}   
 function modificar(obj)
 {
         $('#fondo').show();
     $.post( "http://localhost:3000/editar",obj,function(data,status){
                    if(status=="success")
                    {
                        $('#tbody').empty();
                        $('#fondo').hide();
                        CargarRegistros();
                    }
                    else
                    {
                        alert("Error del servidor");
                    }
                });
        $('#div').hide();
 } 