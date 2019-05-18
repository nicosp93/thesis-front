import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {
    MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule, MatPaginatorModule } from '@angular/material';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TablesComponent } from './tables/tables.component';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule, MatDatepickerModule,
        MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
        MatSliderModule, MatSlideToggleModule,
        ChartsRoutingModule,
        MatTableModule,MatPaginatorModule,
        Ng2Charts,
        MatCardModule,
        MatGridListModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [ChartsComponent, DatePickerComponent, TablesComponent]
})
export class ChartsModule {}
