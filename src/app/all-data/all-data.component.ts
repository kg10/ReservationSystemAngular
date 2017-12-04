import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpService } from "../login.service";
import { ServiceRequest } from "../model/serviceRequest.model";
import { Service } from "../model/service.model";
import { Personnel } from "../model/personnel.model";
import { TimeTable } from '../model/timeTable.model';
import { TimeRequest } from '../model/timeRequest.model';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css'],
  providers: [HttpService],
})
export class AllDataComponent implements OnInit {
  alert: any = {};
  personForm: FormGroup;
  serviceForm: FormGroup;
  timeForm: FormGroup;
  urlName: string;
  serviceList: Service[] = [];
  personnel: Personnel;
  timeList: TimeTable[] = [];
  idPersonnel: any;
  timeRequest: TimeRequest;
  @Input('loginSave') loginSave: String;

  constructor(fb: FormBuilder, private _httpService: HttpService) {
    this.urlName = "http://localhost:8072";
    this.personForm = fb.group({
      'firstName': '',
      'lastName': '',
      'descriptionPerson': '',
      'timeTable': '',
    });
    this.serviceForm = fb.group({
      'descriptionService': '',
      'duration': '',
      'price': '',
    });
    this.timeForm = fb.group({
      'day': '',
      'timeFrom': '',
      'timeTo': '',
    });
    console.log(this.loginSave);
  }

  ngOnInit() {
  }

  createService() {
    this.serviceList.push(new Service(this.serviceForm.value.descriptionService, this.serviceForm.value.duration + ":00", this.serviceForm.value.price));
    console.log("time" + this.timeForm.value);
    this._httpService
      .createService(this.urlName + "/reg/addService", this.serviceList)
      .subscribe(
      value => {
        this.serviceForm.reset()
      },
      error => alert(error),
      () => {
        console.log("Finished"),
        this.serviceList = [];
      }
      )
  }

  createPerson() {
    this.timeList.forEach(element => {
      console.log(element);
    });
    //this.personnel.push(new Service(this.serviceForm.value.descriptionService, this.serviceForm.value.duration+":00", this.serviceForm.value.price));
    console.log("time" + this.timeForm.value.timeForm);
    this._httpService
      .createPerson(this.urlName + "/reg/addPersonnel", this.personForm.value)
      .subscribe(
      value => {
        this.idPersonnel = value;
        this.personForm.reset()
      },
      error => alert(error),
      () => {
        console.log("Finished"),
          this.insertTime()
      }
      )
  }

  addTime() {
    this.timeList.forEach(element => {

      if (this.timeForm.value.day === element.day) {
        this.newAlert('danger', 'This day was set earlier');
        this.timeForm.reset();
      }
    });
    //cos do poprawy 
    if (this.timeForm.value.day !== null && this.timeForm.value.timeFrom !== null && this.timeForm.value.timeTo !== null) {
      this.timeList.push(new TimeTable(this.timeForm.value.day, this.timeForm.value.timeFrom + ":00", this.timeForm.value.timeTo + ":00"));
      this.timeForm.reset();
    }
    else
      this.newAlert('info', 'Please set all value');
  }

  insertTime() {
    this.timeRequest = new TimeRequest(this.idPersonnel, this.timeList);
    this._httpService
      .addTime(this.urlName + "/reg/addTimeTable", this.timeRequest)
      .subscribe(
      value => {
        // this.serviceForm.reset()
      },
      error => alert(error),
      () => console.log("Finished"),
    )

  }

  newAlert(type: string, message: string) {
    this.alert = {
      type: type,
      message: message
    }
  }



}
