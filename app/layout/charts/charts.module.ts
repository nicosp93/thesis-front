import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import {
    MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule, MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerComponent2 } from './date-picker2/date-picker.component';
import { ToolTipComponent } from './tool-tip/tool-tip.component';
import { TablesComponent } from './tables/tables.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { DatePipe } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule, MatDatepickerModule,
        MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
        MatSliderModule, MatSlideToggleModule, MatTooltipModule,
        ChartsRoutingModule,
        MatTableModule,MatPaginatorModule,
        Ng2Charts,
        MatCardModule,
        MatGridListModule,
        FormsModule,ReactiveFormsModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [ChartsComponent, DatePickerComponent, DatePickerComponent2, TablesComponent, ToolTipComponent],
     providers: [ApiService, DatePipe]
})
export class ChartsModule {}
