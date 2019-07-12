"use strict";
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
exports.__esModule = true;
var Persona_1 = require("./Persona");
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
}(Persona_1.Persona));
exports.Empleado = Empleado;
