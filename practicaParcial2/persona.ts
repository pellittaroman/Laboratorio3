
   export class Persona
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
