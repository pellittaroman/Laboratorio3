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
    //$("#btnListar").click(listar);
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
}
function limpiarFormulario() {
    $("#nombre").val("");
    $("#apellido").val("");
    $("#edad").val("");
    $("#horario").val("Mañana");
    $("#legajo").val("");
    $("#btnAgregar").text("Agregar");
    $("#btnAgregar").click(agregarEmpleado);
    $("#header").html("Alta empleado");
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
                    var bor = $('<td>');
                    var mod = $('<td>');
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
function modificarEmpleado() {
}
function eliminarEmpleado() {
}
function filtrarPorHorario() {
}
function promedioDeEdadPorHorario() {
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
