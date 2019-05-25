$(document).ready(function()
{
    CargarData();
    
});
function CargarData()
{
   $("#fondo").attr("display","block");
    $.get("http://localhost:3000/personajes", function(data,status){
        console.log(status);
        if(status==="success")
        {
            
            CargarPersonas(data);
            
        }
        else
        {
            alert("Error del servidor");
        }
    });
}
function CargarPersonas(data)
{
	$(".fondo").hide();
	for (var i = 0; i < data.length; i++) 
	{
		var fila=$("<tr>"); 
        var obj = data[i];
        var columnas = Object.keys(obj);
        var foto=$('<img>');
        $(foto).addClass("foto");
        $(foto).attr("src",obj.foto);
        var fot=$('<input>');
        $(fot).attr("type","file");
        $(fot).attr("id","archivo");
        $(fot).hide();
        $(fot).text("Agregar imagen");
        $(fila).append(fot);
        $(fila).append(foto);
        var cel= $('<td>');
        $(cel).text(obj.nombre);
        $(fila).append(cel);
        var cel2=$('<td>'); 
        $(cel2).text(obj.apellido);
        $(fila).append(cel2);
        var estado=$('<select>');
        $(estado).addClass("estado");
        var vivo=$('<option>');
        $(vivo).attr("value","1");
        $(vivo).text("vivo");       
        var muerto=$('<option>');
        $(muerto).attr("value","2");
        $(muerto).text("muerto");
        $(estado).append(vivo);
        $(estado).append(muerto);
        var id=$('<td>');
        $(id).attr("id","ID");
        $(id).text(obj.id);
        $(fila).append(id);
        $(id).hide();
        var con=obj.estado;

        console.log(con);

        if(con == "Vivo")
            {
             
               $('.estado option[value="1"]')
                console.log(" op 1");
                var text="Vivo";
            }
            else
            {
                console.log(" op 2");
                    $('.estado option[value="2"]')
                    var text="Muerto"  
            }

             
        $(fila).append(estado);

        $('#tbody').append(fila); 
        $('.foto').click(modificar);
        $(".estado").change(function(){
        var elemento = event.target;
        var nodo = $(elemento).parent();
        var tr = $(nodo).children();
        var idc=$(tr[4]).text();
        var obj=
        {
            "id":idc,
            "estado":text
        };
        $("#fondo").show();
        $.post( "http://localhost:3000/editarEstado",obj,function(data,status){
                    if(status=="success")
                    {
                        $('#tbody').val("");
                        $('#fondo').hide();
                        CargarData();

                    }
                    else
                    {
                        alert("Error del servidor");
                    }
                });
        }); 
    }
}

 function modificar()
 {              $('#archivo').show();
                  
                $("#archivo").change(function(){
                var elemento = event.target;
                var nodo = $(elemento).parent();
                var tr = $(nodo).children();
                var id=$(tr[4]).text();

                console.log(tr);
                
                if (this.files && this.files[0]) {
    
                    var fReader= new FileReader();
                    
                    fReader.addEventListener("load", function(e) {
                      console.log(e.target.result);
                      console.log(id);

                    $('#fondo').show(); 
                      var obj=
                    {
                        "id":id,
                        "foto":e.target.result
                    };
                    console.log(obj);
                    $.post( "http://localhost:3000/editarFoto",obj,function(data,status){
                    if(status=="success")
                    {
                        $('#tbody').empty();
                        $('#fondo').hide();
                        CargarData();

                    }
                    else
                    {
                        alert("Error del servidor");
                    }
                });
                    }); 
                    
                    fReader.readAsDataURL( this.files[0] );
                }
            });
         
 } 