import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }from 'rxjs/internal/Observable';
import { Configuration } from '../../app.constants';
import { Message } from '../../message.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) {

    }

    getAllMessages(): any {
        const url_api =  Configuration.server + '/getmessages';
        return this.http.get(url_api);
    }

    login(user, pass) {
        const url_api =  Configuration.server + '/login?username=' + user + '&password=' + pass;
        return this.http.get(url_api);
    }


    createUser(username, firstname, lastname, admin, password) {
        const url_api =  Configuration.server + '/register?admin=' + admin + '&firstName=' + firstname + '&lastName=' + lastname + '&username=' + username + '&pasword=' + password;
        return this.http.get(url_api);
    }

    getLastMsjPerDev() {
        const url_api =   Configuration.server + '/getlastmessagesperdevice';
        return this.http.get(url_api);
    }

    getLastWeek(typeOfData, username) {
        const url_api =   Configuration.server + '/getlastweek?name=' + typeOfData + '&username=' + username;
        return this.http.get(url_api);
    }
    getTypeOfData() {
        const url_api =   Configuration.server + '/gettypeofdata';
        return this.http.get(url_api);
    }
    getLast24hours(typeOfData, username) {
        const url_api =   Configuration.server + '/getlast24hours?name=' + typeOfData + '&username=' + username;
        return this.http.get(url_api);
    }
    getUsers() {
    	const url_api =   Configuration.server + '/getusers';
        return this.http.get(url_api);
    }
    getUser(username) {
    	const url_api =   Configuration.server + '/getuser?username=' + username;
        return this.http.get(url_api);
    }
    subscribeToDevice(username, devices: string[]) {
		const url_api =   Configuration.server + '/setrelation?username=' + username + '&devices=' + devices;
        return this.http.get(url_api);
    }
    getSubscriptions(username) {
    	const url_api =   Configuration.server + '/getrelation?username=' + username;
        return this.http.get(url_api);
    }

}
