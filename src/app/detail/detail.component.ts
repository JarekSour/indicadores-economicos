import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpService } from '../services/http.service';
import { intIndicador, VariableService } from '../services/variables.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

    indicador: intIndicador
    valoresList: Valores[] = []
    selectedType: string = 'last'

    loading: any;

    constructor(
        public http: HttpService,
        public variableService: VariableService,
        private _snackBar: MatSnackBar,
        public loadingController: LoadingController,
        public router: Router
    ) { }

    ngOnInit() {
        this.indicador = this.variableService.indicadorShared

        if (!this.indicador)
            this.router.navigate(['/home']);
        else
            this.getData(false)
    }

    getData(date) {
        this.presentLoading()
        let url = date ? `${environment.apiURL}/${this.indicador.codigo}/${date}` : `${environment.apiURL}/${this.indicador.codigo}`

        this.valoresList = []
        this.http.httpGet(url).then(response => {
            this.valoresList = response['serie']

            this.valoresList.map(val => {

                if (this.indicador.unidad_medida == 'Pesos')
                    val.valor = `$${val.valor}`
                if (this.indicador.unidad_medida == 'Dólar')
                    val.valor = `USD${val.valor}`
                if (this.indicador.unidad_medida == 'Porcentaje')
                    val.valor = `${val.valor}%`
            })

            if (this.valoresList.length == 0) {
                this._snackBar.open('No se encontraron registros', '', {
                    duration: 5000,
                    panelClass: ['red-snackbar']
                });
            }

            setTimeout(() => {
                this.dismissLoading()
            }, 1000);
        })
    }

    dateReady(e) {
        let date = new Date(e.target.value)
        let d = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        this.getData(d)
    }

    yearReady(e) {
        let d = new Date(e.target.value).getFullYear()
        this.getData(d)
    }

    changeSelectedType() {
        this.valoresList = []

        if (this.selectedType == 'last')
            this.getData(false)
    }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Obteniendo datos...',
            cssClass: 'white-loading',
        });
        return await this.loading.present();
    }

    async dismissLoading() {
        return await this.loadingController.dismiss();
    }
}

export interface Valores {
    fecha: string,
    valor: string
}


