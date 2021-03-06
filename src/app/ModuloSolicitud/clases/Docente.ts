import { ListaMateria } from 'src/app/model/ListaMateria';

export class Docente {
    nombre: string;
    apellido: string;
    email: string;
    asignaturas: Array<string>;
    disponible: number;

    constructor(nombre: string, apellido: string, email: string, asignaturas: Array<string>) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.asignaturas = asignaturas;
        this.disponible = 1;
    }
}
