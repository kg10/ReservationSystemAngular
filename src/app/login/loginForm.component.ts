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
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
    selector: 'loginForm',
    templateUrl: './loginForm.html',
    styleUrls: ['./login.css'],
    providers: [HttpService, MessageService],
})
export class LoginForm implements OnInit {
    loginForm: FormGroup;
    registerForm: FormGroup;
    addressForm: FormGroup;
    urlName: String;
    isValid: boolean;
    role: String;
    msgs: Message[] = [];
    toggleButton: boolean = true;
    id: any;

    ngOnInit() {
        window.alert = function alert(msg) {
            console.log('Hidden Alert ' + msg);
        };

    }

    constructor(private messageService: MessageService, fb: FormBuilder, private _httpService: HttpService, private router: Router) {
        this.loginForm = fb.group({
            'login': [null, Validators.required],
            'password': [null, Validators.required],
            'descriptionPerson': '',
        });
        this.registerForm = fb.group({
            'login': [null, Validators.required],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(15)])],
            'email': [null, Validators.compose([Validators.email, Validators.required])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
        })

        this.addressForm = fb.group({
            'city': [null, Validators.required],
            'street': [null, Validators.required],
            'numberStreet': [null, Validators.required],
            'postalCode': [null, Validators.required],
            'personnelId': [null],
        })

        // this.urlName = "http://localhost:8072";
        this.urlName = "http://192.168.99.100:8073/api";

    }

    showAlert(type: string, text: string) {
        this.messageService.add({ severity: type, summary: 'Error', detail: text });
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
            error => {
                alert(error),
                    this.showAlert("error", "Invalid password or user doesn`t exist")
            },
            () => console.log("Finished")
            )
    }

    register(registerForm: NgForm) {
        this._httpService
            .register(this.urlName + "/reg/register", this.registerForm.value)
            .subscribe(
            value => {
                //this.showAlert("success", "User " + this.registerForm.value.login + " has been registered."),
                this.registerForm.reset(),
                    this.id = value,
                    this.addressForm.value.personnelId = this.id,
                    this.registerAddress()
            },
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    registerAddress() {
        console.log("wyslanie adresu: " + this.addressForm.value.personnelId)
        this._httpService
            .registerAddress(this.urlName + "/addAddress", this.addressForm.value)
            .subscribe(
            value => {
                this.showAlert("success", "User " + this.registerForm.value.login + " has been registered."),
                    this.addressForm.reset(),
                    value = value
            },
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    resolved(captchaResponse: string) {
        //console.log(`Resolved captcha with response ${captchaResponse}:`);
        this.toggleButton = false;
    }

}