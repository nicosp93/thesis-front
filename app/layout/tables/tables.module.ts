import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule, MatCardModule } from '@angular/material';
import { MatFormFieldModule, MatPaginatorModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { DialogComponent } from './dialog/dialog.component';
import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatSnackBar } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NotAdminComponent } from './dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        MatPaginatorModule,
        MatInputModule,
        MatSnackBarModule,
        MatDialogModule,
        FlexLayoutModule
    ],
    declarations: [TablesComponent, DialogComponent, DialogOverviewComponent, NotAdminComponent],
    providers: [ApiService, MatSnackBar],
    entryComponents: [DialogOverviewComponent, NotAdminComponent]
})
export class TablesModule {}
