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
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.css'],
    providers: [HttpService],
})
export class Login implements OnInit {
    @HostListener("window:beforeunload", ["$event"])
    clearLocalStorage(event) {
        localStorage.clear();
    }
    from: number;
    to: Date;
    dt;
    valIdPerson: number;
    valIdService: number;
    select: number;
    urlName: String;
    loginForm: FormGroup;
    serviceForm: FormGroup;
    personnel: Personnel;
    service: Service;
    registerForm: FormGroup;
    timeTable: TimeTable[] = [];
    ifCheck = new String("");
    date: String;
    //list: string[] = ["12:00", "12:15", "12:30", "12:45", "13:00", "13:15"];
    userList: Array<TimeTable> = new Array<TimeTable>();
    times: String[] = [];
    reserv: ReservationResponse = {} as any;
    reser: Reservation = {} as any;
    role: String;
    today = new Date().toJSON().split('T')[0];
    rememberTime: any;
    timeInput: any = '';


    constructor(fb: FormBuilder, private _httpService: HttpService, private router: Router) {
        //localStorage.clear();
        this.dt = new Date();
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

        // this.urlName = "http://localhost:8072";
        this.urlName = "http://192.168.99.100:8073/api";
        this.select = this.valIdPerson = this.valIdService = 0;

    }

    // signIn(form: NgForm) {
    //     console.log(this.loginForm.value.password);
    // }
    //email = new FormControl('', [Validators.required, Validators.email]);

    //   getErrorMessage() {
    //     return this.email.hasError('required') ? 'You must enter a value' :
    //         this.email.hasError('email') ? 'Not a valid email' :
    //             '';
    //   }

    ngOnInit() {
        this.findAllPersonnel();
        this.findAllService();
        window.alert = function alert(msg) {
            console.log('Hidden Alert ' + msg);
        };
    }

    setTime(time: String) {
        this.rememberTime = time + ":00";
    }

    reserve() {
        this.reserv.idPersonnel = this.valIdPerson;
        this.reserv.idService = this.valIdService;
        this.reser.timeFrom = this.rememberTime;
        this.reser.date = this.date;
        this.reserv.reservation = this.reser;
        this.reserv.loginClient = localStorage.getItem("login");

        this.reservation(this.reserv);
        this.valIdPerson = this.valIdService = this.rememberTime = this.date = this.reser = null;
    }
    submitt(date: any) {
        this.date = date.value;
        this.findTimeTable(this.valIdPerson, this.date, this.valIdService);
    }

    signIn(form: NgForm) {

        this._httpService
            .signIn(this.urlName + "/reg/login?login=" + this.loginForm.value.login, this.loginForm.value)
            .subscribe(
            value => {
                this.role = value
                // if (this.role === '"ADMIN"')
                //     this.router.navigate(['../nav/reservation']);
                this.loginForm.reset(),


                    localStorage.setItem("role", JSON.stringify(this.role))
            },
            error => alert(error),
            () => console.log("Finished"),
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

    reservation(res: ReservationResponse) {
        this._httpService
            .reservation(this.urlName + "/reg/addReservation", res)
            .subscribe(
            value => {
                value = value,
                    this.findAllPersonnel(),
                    this.findAllService()

            },
            error => alert(error),
            () => {
                console.log("Finished"),
                    this.times = [],
                    this.router.navigate(['../nav/userHistory']),
                    this.router.navigate(['../nav/reservation'])
            }
            )

    }

    findAllPersonnel() {
        this._httpService
            .getPersonnel(this.urlName + "/reg/findAllPersonnel")
            .subscribe(
            personnel => this.personnel = personnel,
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    findPersonnelByService(id: any) {
        this._httpService
            .getPersonnel(this.urlName + "/reg/findPersonnelByServiceId?id=" + id)
            .subscribe(
            personnel => this.personnel = personnel,
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    findAllService() {
        this._httpService
            .getService(this.urlName + "/reg/findAllServices")
            .subscribe(
            service => {
                this.service = service,
                    console.log(service)
            },
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    findServiceByPersonnel(id: any) {
        this._httpService
            .getService(this.urlName + "/reg/findServiceByPersonnelId?id=" + id)
            .subscribe(
            service => {
                this.service = service,
                    console.log(this.service)
            },
            error => alert(error),
            () => console.log("Finished"),
        )
    }

    findTimeTable(valIdPerson: number, date: any, valIdService: number) {

        var flag: boolean = true;
        var i: number = 0;

        this._httpService
            .getTimeTable(this.urlName + "/reg/getFreeTime?id=" + valIdPerson + "&date=" + date + "&idService=" + valIdService)
            .subscribe(
            data => {
                // this.userList.push(data[0])
                this.times = data,
                    this.times.forEach(element => {
                        console.log(element);

                        //console.log("this: " + Number(this.from));
                        //    this.to = new Date (element)
                        //     if(element.timeFrom<element.timeTo){
                        //         console.log("ok");
                        //     }
                        //     else{
                        //         console.log("false");
                        //     }

                    });
            },
            error => alert(error),
            () => this.showTimes(),

        )
    }

    // addMinutes(date, minutes) {
    //     console.log(this.times[5]);
    // }

    showTimes() {
        console.log(this.times[5]);
        // for (i; i < this.userList.length; i++) {
        //     console.log("asd" + this.userList[i]);
        // }
    }

    // parseUser(data) {
    //     let user = new TimeTable(data.timeFrom, data.timeTo);
    //     this.userList.push(user);
    // }
    getPersonId(id: any) {
        console.log("personnel: " + id);
        if (this.select <= 0) {
            this.findServiceByPersonnel(id);
            this.select = this.select - 1;
        }
        this.valIdPerson = id;
        this.ifCheck = this.ifCheck + "0";
        this.getTimeTable()
    }

    getServiceId(id: any) {
        console.log("service" + id);
        if (this.select >= 0) {
            this.findPersonnelByService(id);
            this.select = this.select + 1;
        }
        this.valIdService = id;
        this.ifCheck = this.ifCheck + "1";
        this.getTimeTable()
    }

    getTimeTable() {
        if (this.valIdPerson != 0 && this.valIdService != 0)
            if (this.ifCheck.charAt(0) != this.ifCheck.charAt(this.ifCheck.length - 1)) {
                console.log("pełny model");

            }
    }
}