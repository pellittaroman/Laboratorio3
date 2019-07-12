
import { Persona } from "./Persona"
export class Empleado extends Persona
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
