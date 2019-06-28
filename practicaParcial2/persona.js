"use strict";
exports.__esModule = true;
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
exports.Persona = Persona;
