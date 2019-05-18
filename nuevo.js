$(document).ready(function(){
	$("#btn").click(function(){
		$.get("http://localhost:3000/personas",function(data,status){
			alert(data,status);
			console.log(data);
		}
	}
}
$(".tr").dblclick(function()
{
	$.post("http:/localhost:3000/nuevaPersona",parametros
		function(data,status){

	}
}