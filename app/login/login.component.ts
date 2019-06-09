import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Configuration} from '../app.constants';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { User } from 'src/app/user.model';

@Component({
    selector: 'app-wrong-pass',
    template: `
        <span class="example-pizza-party">
            Wrong Username or Password
        </span>
    `,
    styles: []
})
export class WrongPassComponent {}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor(private router: Router, private dataApi: ApiService, private snackBar: MatSnackBar) {}
    pass: string;
    user: string;
    public response: any;
    ngOnInit() {   }

    onLogin() {
        this.response = this.login(this.user, this.pass);
        if(this.response){
            localStorage.setItem('isLoggedin', 'true');
            this.dataApi.getUser(this.user).subscribe( (userE:User) =>  {
            	 localStorage.setItem('isAdmin', userE.admin.toString());
            });
            this.router.navigate(['/charts'] );
        }else{
            this.openWrongPass();
        }
    }
    login( user,  pass):boolean{
         this.dataApi.login(user, pass).subscribe(
            res=> {
                console.log(res);
                this.response = res;
                return res;
            });
            return this.response;
    }
    openWrongPass(){
        this.snackBar.openFromComponent(WrongPassComponent, {
        duration:  1000,
    });
    }
}
