import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions, RequestMethod } from "@angular/http";
import { DataLogin } from "./model/dataLogin.model";
import { Personnel } from "./model/personnel.model";
import { Service } from "./model/service.model";
import { ServiceRequest } from "./model/serviceRequest.model";
import { TimeTable } from "./model/timeTable.model";
import { Registration } from "./model/registration.model";
import { ReservationResponse } from "./model/reservation.response";
import { HistoryReservation } from './model/historyReservation.model';
import { Router } from '@angular/router';
import { TimeRequest } from './model/timeRequest.model';
import { Assign } from './model/listOfAssign.model';
import { HistoryAllReservation } from './model/historyAllReservation.model';
import { RegistrationAddress } from './model/registrationAddress.model';
import { Client } from './model/client.model';
import { Address } from './model/address.model';

@Injectable()
export class HttpService {
    constructor(private _http: Http, private router: Router) { }

    signIn(url: string, dataLogin: DataLogin): Observable<String> {
        let headers: Headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(dataLogin.login + ':' + dataLogin.password));
        // headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        // headers.append('X-Requested-With', 'XMLHttpRequest');
        localStorage.setItem("headers", JSON.stringify(headers));
        console.log(dataLogin.login + " " + dataLogin.password)

        let headersNew: Headers = new Headers();
        let storedToken: string = localStorage.getItem("headers");

        return this._http
            // .get(url, { headers: JSON.parse(storedToken) })
            .get(url, new RequestOptions({ headers: headers }))
            .do(res => {
                if (res.status === 200) {
                    this.router.navigate(['../nav/reservation']);
                }
                else if (res.status === 202)
                    this.router.navigate(['../panel']);

            })
            .map(this.extractData) //res => JSON.parse(JSON.stringify(res.json()))
            .catch(error => {
                return Observable.throw(error);
            })
    }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    getPersonnel(url: string): Observable<Personnel> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    // getTabPersonnel(url: string): Observable<Personnel[]> {
    //     let storedToken: string = localStorage.getItem("headers");
    //     return this._http
    //         .get(url, { headers: JSON.parse(storedToken) })
    //         .map(res => res.json());
    // }

    getService(url: string): Observable<Service> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    getClient(url: string): Observable<Client> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    getAddress(url: string): Observable<Address> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            // .map(res => res.json());
            .map(this.extractData);
    }

    getServiceTable(url: string): Observable<Service[]> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    getTimeTable(url: string): Observable<String[]> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => <String[]>res.json())
            .do(res => console.log("User data" + JSON.stringify(res)));
    }

    getTimeTab(url: string): Observable<TimeTable[]> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    sendEditTime(url: string, time: TimeRequest): Observable<TimeRequest> {
        let storedToken: string = localStorage.getItem("headers");
        let body = JSON.stringify(time);
        return this._http
            .put(url, body, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }


    register(url: string, reg: Registration): Observable<Registration> {
        let head: Headers = new Headers();
        head.append('Content-Type', 'application/json');
        head.append('Access-Control-Allow-Origin', '*');

        return this._http
            .post(url, reg, { headers: head } )
            .map(this.extractData);
    }

    registerAddress(url: string, reg: RegistrationAddress): Observable<RegistrationAddress> {
        return this._http
            .post(url, reg)
            .map(this.extractData);
    }

    createService(url: string, services: Service[]): Observable<Service[]> {
        let storedToken: string = localStorage.getItem("headers");
        let body = JSON.stringify({ services });

        return this._http
            .post(url, body, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    createPerson(url: string, person: Personnel): Observable<Personnel> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .post(url, person, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    addTime(url: string, person: TimeRequest): Observable<TimeRequest> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .post(url, person, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    editService(url: string, service: Service): Observable<Service> {
        let storedToken: string = localStorage.getItem("headers");
        service.duration = service.duration.substring(0,8);
        return this._http
            .put(url + "/" + service.id, service, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    editAddress(url: string, address: Address): Observable<Address> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .put(url, address, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    editClient(url: string, client: Client): Observable<Client> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .put(url, client, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    editPersonnel(url: string, person: Personnel): Observable<Personnel> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .put(url + "/" + person.id, person, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    deleteReservation(url: string, status: Boolean): Observable<Boolean> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .put(url, status, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    disablePersonnel(url: string, person: Personnel): Observable<Personnel> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url + "/" + person.id, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    deleteTime(url: string): Observable<TimeTable> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    reservation(url: string, reserv: ReservationResponse): Observable<ReservationResponse> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .post(url, reserv, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }

    getHistory(url: string): Observable<HistoryReservation[]> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    getAllHistory(url: string): Observable<HistoryAllReservation[]> {
        let storedToken: string = localStorage.getItem("headers");
        return this._http
            .get(url, { headers: JSON.parse(storedToken) })
            .map(res => res.json());
    }

    assignServToPers(url: string, listString: Assign): Observable<Assign> {
        let storedToken: string = localStorage.getItem("headers");
        let body = JSON.stringify(listString);
        return this._http
            .put(url, body, { headers: JSON.parse(storedToken) })
            .map(this.extractData);
    }
}