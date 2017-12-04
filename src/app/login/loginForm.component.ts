import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpService } from "../login.service";
import { NgForm } from '@angular/forms';
import { Personnel } from "../model/personnel.model";
import { Service } from "../model/service.model";
import { Search } from "../model/search.model";
import { last } from 'rxjs/operator/last';
import { TimeTable } from "../model/timeTable.model";
import { Registration } from "../model/registration.model";
import { FormControl, Validators } from '@angular/forms';
import { ReservationResponse } from "../model/reservation.response";
import { Reservation } from '../model/reservation.model';
import { Router } from '@angular/router';


@Component({
    selector: 'loginForm',
    templateUrl: './loginForm.html',
    // styleUrls: ['./login.css'],
    providers: [HttpService],
})
export class LoginForm implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    urlName: String;
    isValid: boolean;
    role: String;

    ngOnInit() {
        window.alert = function alert(msg) {
            console.log('Hidden Alert ' + msg);
        };
    }

    constructor(fb: FormBuilder, private _httpService: HttpService, private router: Router) {
        this.loginForm = fb.group({
            'login': '',
            'password': '',
            'descriptionPerson': '',
        });
        this.registerForm = fb.group({
            'login': '',
            'password': '',
            'email': ['', [Validators.required, Validators.email]],
            'firstName': '',
            'lastName': '',
        })

        this.urlName = "http://localhost:8072";
    }

    isValidForm() {
        this.isValid = true;
        return this.isValid;
    }


    signIn(form: NgForm) {

        this._httpService
            .signIn(this.urlName + "/reg/login?login=" + this.loginForm.value.login, this.loginForm.value)
            .subscribe(
            value => {
                localStorage.setItem("login", this.loginForm.value.login)
                this.loginForm.reset(),
                    this.role = value,
                    localStorage.setItem("role", JSON.stringify(this.role))
            },
            error => alert(error),
            () => console.log("Finished")
            )
    }

    register(registerForm: NgForm) {
        this._httpService
            .register(this.urlName + "/reg/register", this.registerForm.value)
            .subscribe(
            value => {
                this.registerForm.reset(),
                    value = value
            },
            error => alert(error),
            () => console.log("Finished"),
        )
    }

}