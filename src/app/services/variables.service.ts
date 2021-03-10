import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VariableService {

    indicadorShared: intIndicador

    constructor() { }
}

export interface intIndicador {
    codigo: string,
    nombre: string,
    unidad_medida: string,
    fecha: Date,
    valor: string
}
