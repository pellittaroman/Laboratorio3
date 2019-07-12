var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//import { Persona } from "./Persona"
//import { Empleado } from "./Empleado"
var Persona = /** @class */ (function () {
    function Persona(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }
    Persona.prototype.personaToJson = function () {
        var retorno = {
            "nombre": this.nombre,
            "apellido": this.apellido,
            "edad": this.edad
        };
        return JSON.stringify(retorno);
    };
    return Persona;
}());
var Empleado = /** @class */ (function (_super) {
    __extends(Empleado, _super);
    function Empleado(nombre, apellido, edad, horario, legajo) {
        var _this = _super.call(this, nombre, apellido, edad) || this;
        _this.legajo = legajo;
        _this.horario = horario;
        return _this;
    }
    Empleado.prototype.empleadoToJson = function () {
        var retorno = {
            "nombre": this.nombre,
            "apellido": this.apellido,
            "edad": this.edad,
            "horario": this.horario,
            "legajo": this.legajo
        };
        return JSON.stringify(retorno);
    };
    return Empleado;
}(Persona));
$(document).ready(function () {
    $("#btnAgregar").click(agregarEmpleado);
    $("#btnCancelar").click(limpiarFormulario);
    $("#btnMostrar").click(mostrarEmpleados);
    $("#btnNomYAp").click(SoloNombreyApellido);
    $("#btnFiltrar2").click(filtrarPorHorario);
    $("#btnPromedio2").click(promedioDeEdadPorHorario);
    $("#btnFiltrar").click(function () {
        $("#btnFiltrar2").show();
        $("#btnPromedio2").hide();
        $("#titleF").attr("style", "display: block");
        $("#titleP").attr("style", "display: none");
    });
    $("#btnPromedio").click(function () {
        $("#btnPromedio2").show();
        $("#btnFiltrar2").hide();
        $("#titleP").attr("style", "display: block");
        $("#titleF").attr("style", "display: none");
    });
});
var lista = new Array();
function agregarEmpleado() {
    var nombre = String($("#nombre").val());
    var apellido = String($("#apellido").val());
    var edad = Number($("#edad").val());
    var legajo = Number($("#legajo").val());
    var horario = String($("#horario").val());
    var empleado = new Empleado(nombre, apellido, edad, horario, legajo);
    LocalStorage(empleado);
    mostrarEmpleados();
}
function mostrarEmpleados() {
    if (localStorage.getItem("lista") === null) {
        $('#tbody').empty();
    }
    else {
        $('#tbody').empty();
        var toParse = localStorage.getItem("lista");
        var carga = JSON.parse(toParse);
        for (var i = 0; i < carga.length; i++) {
            var fila = $("<tr>");
            $(fila).attr('id', 'vtr');
            var obj = carga[i];
            var columnas = Object.keys(obj);
            for (var j = 0; j < columnas.length + 1; j++) {
                if (j != columnas.length) {
                    var cel = $('<td>');
                    $(fila).append(cel);
                    $(cel).text(obj[columnas[j]]);
                }
                else {
                    var cel = $('<td>');
                    var mod = $('<td>');
                    var bor = $('<td>');
                    $(bor).addClass("far fa-trash-alt");
                    $(mod).addClass("far fa-edit");
                    $(bor).attr('id', 'tdBorrar');
                    $(mod).attr('id', 'tdModificar');
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
function modificarEmpleado() {
    $("#tituloForm").text("Modificar Persona");
    var btn = $('<button>');
    $("#btnAgregar").hide();
    $(btn).addClass("btn btn-success");
    $(btn).text("Modificar ");
    $(btn).attr("id", "btnModificar");
    var icono = $('<span>');
    $(icono).addClass("fas fa-save");
    $(btn).append(icono);
    $("#formulario").append(btn);
    var elemento = event.target;
    var nodo = $(elemento).parent();
    var tr = $(nodo).parent();
    var td = $(tr).children();
    var nombre = $(td[0]).text();
    var apellido = $(td[1]).text();
    var edad = $(td[2]).text();
    var legajo = $(td[3]).text();
    var horario = $(td[4]).text();
    var toParse = localStorage.getItem("lista");
    var carga = JSON.parse(toParse);
    for (var i = 0; i < carga.length; i++) {
        if (nombre == carga[i].nombre) {
            var index = i;
            break;
        }
    }
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
    $('#edad').val(edad);
    $('#legajo').val(legajo);
    $('#horario').val(horario);
    $(btn).click(function () {
        var nombre = String($("#nombre").val());
        var apellido = String($("#apellido").val());
        var edad = Number($("#edad").val());
        var legajo = Number($("#legajo").val());
        var horario = String($("#horario").val());
        var empleado = new Empleado(nombre, apellido, edad, horario, legajo);
        lista = [];
        localStorage.clear();
        for (var i = 0; i < carga.length; i++) {
            if (i == index) {
                lista.push(empleado);
            }
            else {
                lista.push(carga[i]);
            }
        }
        localStorage.setItem('lista', JSON.stringify(lista));
        mostrarEmpleados();
    });
}
function eliminarEmpleado() {
    var elemento = event.target;
    var nodo = $(elemento).parent();
    var tr = $(nodo).parent();
    var td = $(tr).children();
    var nombre = $(td[0]).text();
    var toParse = localStorage.getItem("lista");
    var carga = JSON.parse(toParse);
    localStorage.clear();
    lista = [];
    for (var i = 0; i < carga.length; i++) {
        if (nombre != carga[i].nombre) {
            LocalStorage(carga[i]);
        }
    }
    mostrarEmpleados();
}
function filtrarPorHorario() {
    $("modal-title").text("Filtrar por horario");
    var listaFiltrada = new Array();
    var horario = String($("#horario2").val());
    var toParse = localStorage.getItem("lista");
    var carga = JSON.parse(toParse);
    listaFiltrada = carga.filter(function (a) { return a.horario === horario; });
    localStorage.setItem('listaFiltradaxHorario', JSON.stringify(listaFiltrada));
    $("#tbody").empty();
    for (var i = 0; i < listaFiltrada.length; i++) {
        var fila = $("<tr>");
        var obj = listaFiltrada[i];
        var columnas = Object.keys(obj);
        for (var j = 0; j < columnas.length + 1; j++) {
            if (j != columnas.length) {
                var cel = $('<td>');
                $(fila).append(cel);
                $(cel).text(obj[columnas[j]]);
            }
            else {
                var cel = $('<td>');
                var mod = $('<td>');
                var bor = $('<td>');
                $(bor).addClass("far fa-trash-alt");
                $(mod).addClass("far fa-edit");
                $(bor).attr('id', 'tdBorrar');
                $(mod).attr('id', 'tdModificar');
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
function promedioDeEdadPorHorario() {
    var horario = String($("#horario2").val());
    var aux;
    var toParse = localStorage.getItem("lista");
    var carga = JSON.parse(toParse);
    var div = carga.filter(function (a) { return a.horario === horario; });
    aux = carga.filter(function (a) { return a.horario === horario; }).reduce(function (sum, persona) { return sum + persona.edad; }, 0) / div.length;
    $("#MBody").text(aux);
}
function SoloNombreyApellido() {
    var aux = [];
    var toParse = localStorage.getItem("lista");
    var carga = JSON.parse(toParse);
    aux = carga.map(function (a) { return aux = [a.nombre, a.apellido]; });
    localStorage.setItem('listaFiltrada', JSON.stringify(aux));
    $("#tbody").empty();
    for (var i = 0; i < aux.length; i++) {
        var fila = $("<tr>");
        var obj = aux[i];
        var columnas = Object.keys(obj);
        for (var j = 0; j < columnas.length + 1; j++) {
            if (j != columnas.length) {
                var cel = $('<td>');
                $(fila).append(cel);
                $(cel).text(aux[i][j]);
            }
            else {
                var cel = $('<td>');
                var cel1 = $('<td>');
                var cel2 = $('<td>');
                var cel3 = $('<td>');
                $(fila).append(cel1);
                $(fila).append(cel2);
                $(fila).append(cel3);
                var mod = $('<td>');
                var bor = $('<td>');
                $(bor).addClass("far fa-trash-alt");
                $(mod).addClass("far fa-edit");
                $(bor).attr('id', 'tdBorrar');
                $(mod).attr('id', 'tdModificar');
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
function LocalStorage(empleado) {
    if (localStorage.getItem("lista") === null) {
        lista.push(empleado);
        localStorage.setItem('lista', JSON.stringify(lista));
    }
    else {
        var toParse = localStorage.getItem('lista');
        lista = JSON.parse(toParse);
        lista.push(empleado);
        localStorage.setItem('lista', JSON.stringify(lista));
    }
}
function limpiarFormulario() {
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
