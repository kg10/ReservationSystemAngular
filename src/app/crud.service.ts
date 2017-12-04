import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions } from "@angular/http";
import { Person } from "./person.model";

@Injectable()
export class HttpService {
    headers: Headers;
    options: RequestOptions;

    constructor(private _http: Http) { 
        // this.headers = new Headers(
        //     { 'Content-Type': 'application/json', 
        //     'Accept': 'q=0.8;application/json;q=0.9',

        // }
    //);
///this.options = new RequestOptions({ headers: this.headers });
    }

    getListPerson(url: string): Observable<Person> {
        return this._http
            .get(url)
            .map(res => res.json());
    }

    deletePersonById(url: string, id: string): Observable<Person> {
        return this._http
            .delete(url + "?id=" + id)
            .map(res => res.json());
    }

    insertPerson(url: string, person: Person): Observable<Person> {
        return this._http
            .post(url, person)
            //.map(res=>res.json());
            .map(this.extractData);
    }
    private extractData(res: Response) {        
        return res.text() ? res.json() : {}; ;
    }

    updatePerson(url: string, id: string, person: Person): Observable<Person> {
        return this._http
            .put(url + "?id=" + id, person)
            .map(res => res.json());

    }
    selectPerson(url: string, id: any): Observable<Person> {
        return this._http
            .get(url + "?id=" + id)
            .map(res => res.json());
    }
}