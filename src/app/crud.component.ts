import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { HttpService } from "./crud.service";
import { Person } from "./person.model";
import { OnInit } from '@angular/core';

import { AccordionModule } from 'primeng/components/accordion/accordion';
import { MenuItem } from 'primeng/components/common/api';
//chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security 
@Component({
    selector: 'crud-person',
    templateUrl: './crud.html',
    providers: [HttpService],
})
export class CrudPerson implements OnInit {
    persons: Person;
    complexForm: FormGroup;
    fbb: FormBuilder;
    constructor(fb: FormBuilder, private _httpService: HttpService) {
        this.complexForm = fb.group({
            'id': '',
            'firstName': '',
            'lastName': '',
            'age': '',
        })
    }

    ngOnInit() {
        this.getPerson();
    }

    getDate(value: any){
        console.log(value);
    }

    getPerson() {
        this._httpService
            .getListPerson('http://localhost:8080/findall')
            .subscribe(
            persons => this.persons = persons,
            error => alert(error),
            () => console.log("Finished"),
        );
    }

    deletePerson() {
        this._httpService
            .deletePersonById('http://localhost:8080/deletebyid', '7')
            .subscribe(
            error => alert(error),
            () => console.log("Finished"),
        );
    }

    deletePerson2(id: any) {
        this._httpService
            .deletePersonById('http://localhost:8080/deletebyid', id)
            .subscribe(
            error => alert(error),
            () => console.log("Finished"),
        );
        this.getPerson();
    }

    submitForm(value: any): any {
        this._httpService
            .insertPerson("http://localhost:8080/addperson", value)
            .subscribe(
            value => value = value,
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    updatePerson(object: any) {


        if (object.id == "") {
            //insert
            this._httpService
                .insertPerson("http://localhost:8080/addperson", object)
                .subscribe(
                object => object = object,
                error => alert(error),
                () => console.log("Finished"),
            )
        }
        else {
            //update
            this._httpService
                .updatePerson('http://localhost:8080/editperson', object.id, object)
                .subscribe(
                error => alert(error),
                () => console.log("Finished"),

            );
        }
        this.complexForm.reset();
    }

    selectPerson(id: any) {
        this._httpService
            .selectPerson('http://localhost:8080/findbyid', id)
            .subscribe(
            persons => this.complexForm.setValue({
                'id': persons.id,
                'firstName': persons.firstName,
                'lastName': persons.lastName,
                'age': persons.age,
            }),
            error => alert(error),
            () => console.log("Finished"),
        );
    }
}