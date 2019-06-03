import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }from 'rxjs/internal/Observable';
import { Configuration } from '../../app.constants';
import { Message } from '../../message.model';

@Injectable({
    providedIn:'root'
})
export class ApiService{
    constructor(private http: HttpClient){

    }

    getAllMessages(): any {
        const url_api =  Configuration.server + '/getmessages';
        return this.http.get(url_api);
    }

    login(user, pass){
        const url_api =  Configuration.server + '/login?username='+ user + '&password='+ pass;
        return this.http.get(url_api);
    }

    createUser(username, firstname, lastname, password){
        const url_api =  Configuration.server + '/register?username='+ username +'&firstName='+ firstname + '&lastName='+ lastname + '&password='+ password;
        return this.http.get(url_api);
    }

    getLastMsjPerDev(){
        const url_api =   Configuration.server + '/getlastmessagesperdevice';
        return this.http.get(url_api);
    }

    getLastWeek(){
        const url_api =   Configuration.server + '/getlastweek';
        return this.http.get(url_api);
    }

}