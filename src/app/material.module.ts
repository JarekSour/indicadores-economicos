import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    declarations: [],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatGridListModule

    ]
})
export class MaterialModule { }
