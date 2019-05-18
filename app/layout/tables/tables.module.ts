import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule, MatCardModule } from '@angular/material';
import { MatFormFieldModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';

import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { DialogComponent } from './dialog/dialog.component';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule
    ],
    declarations: [TablesComponent, DialogComponent, DialogOverviewComponent],
    entryComponents: [DialogOverviewComponent],
    providers:[ApiService],
})
export class TablesModule {}
