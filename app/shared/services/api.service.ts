import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }from 'rxjs/internal/Observable';
import { Configuration } from '../../app.constants';

@Injectable({
    providedIn:'root'
})
export class ApiService{
    constructor(private http: HttpClient){

    }

    getAllMessages(){
        const url_api =  Configuration.server + '/getmessages';
        
        return this.http.get(url_api,{
            headers: {'Access-Control-Allow-Origin':'*','header2':'value2'}
        });
    }

    login(user, pass){
        const url_api =  Configuration.server + '/login?username='+ user + '&password='+ pass;
        return this.http.get(url_api);
    }

    createUser(username, firstname, lastname, password){
        const url_api =  Configuration.server + '/register?username='+ username +'&firstName='+ firstname + '&lastName='+ lastname + '&password='+ password;
        return this.http.get(url_api);
    }
}