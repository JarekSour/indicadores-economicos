import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { VariableService, intIndicador } from '../services/variables.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    listIndicador: intIndicador[] = []

    constructor(
        public http: HttpService,
        public router: Router,
        public variableService: VariableService
    ) { }

    ngOnInit() {

        const arr = ['uf', 'ivp', 'dolar', 'dolar_intercambio', 'euro', 'ipc', 'utm', 'imacec', 'tpm', 'libra_cobre', 'tasa_desempleo', 'bitcoin']

        this.http.httpGet(environment.apiURL).then(response => {

            arr.map(item => {
                if (response[item]) {

                    let val = response[item].valor
                    if (response[item].unidad_medida == 'Pesos')
                        val = `$${val}`
                    if (response[item].unidad_medida == 'Dólar')
                        val = `USD${val}`
                    if (response[item].unidad_medida == 'Porcentaje')
                        val = `${val}%`

                    this.listIndicador.push({
                        codigo: response[item].codigo,
                        nombre: response[item].nombre,
                        unidad_medida: response[item].unidad_medida,
                        fecha: response[item].fecha,
                        valor: val
                    })
                }
            })
        })
    }

    goToDetail(data) {
        this.variableService.indicadorShared = data
        this.router.navigate(['/detail']);
    }



}


