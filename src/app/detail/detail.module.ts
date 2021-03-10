import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DetailRoutingModule } from './detail-routing.module';
import { MaterialModule } from '../material.module';
import { DetailComponent } from './detail.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailRoutingModule,
        MaterialModule,
    ],
    declarations: [DetailComponent],
})
export class DetailModule { }
