import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { Configuration} from '../app.constants';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { WrongPassComponent } from './login.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule,
        MatSnackBarModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [LoginComponent, WrongPassComponent],
    providers: [ApiService, Configuration, MatSnackBar ],
    entryComponents: [WrongPassComponent]
})
export class LoginModule {}
