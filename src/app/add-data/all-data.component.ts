import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from "@angular/forms";
import { HttpService } from "../login.service";
import { ServiceRequest } from "../model/serviceRequest.model";
import { Service } from "../model/service.model";
import { Personnel } from "../model/personnel.model";
import { TimeTable } from '../model/timeTable.model';
import { TimeRequest } from '../model/timeRequest.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css'],
  providers: [HttpService, MessageService],
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

  constructor(private messageService: MessageService, fb: FormBuilder, private _httpService: HttpService) {
    // this.urlName = "http://localhost:8072";
    this.urlName = "http://192.168.99.100:8073/api";
    this.personForm = fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'descriptionPerson': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
      'timeTable': '',
    });
    this.serviceForm = fb.group({
      'descriptionService': [null, Validators.required],
      'duration': [null, Validators.required],
      'price': [null, Validators.required],
    });
    this.timeForm = fb.group({
      'day': [null, Validators.required],
      'timeFrom': [null, Validators.required],
      'timeTo': [null, Validators.required],
    });
    console.log(this.loginSave);
  }

  ngOnInit() {
  }

  createService() {
    this.serviceList.push(new Service(this.serviceForm.value.descriptionService, this.serviceForm.value.duration, this.serviceForm.value.price));
    console.log("time" + this.timeForm.value);
    this._httpService
      .createService(this.urlName + "/reg/addService", this.serviceList)
      .subscribe(
      value => {
        this.serviceForm.reset(),
        this.showAlert("success", "The service has been added")
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
        this.timeForm.reset();
      }
    });
    //cos do poprawy 
    if (this.timeForm.value.day !== null && this.timeForm.value.timeFrom !== null && this.timeForm.value.timeTo !== null) {
      this.timeList.push(new TimeTable(this.timeForm.value.day, this.timeForm.value.timeFrom + ":00", this.timeForm.value.timeTo + ":00"));
      this.timeForm.reset();
    }
    else{}
      
  }

  insertTime() {
    this.timeRequest = new TimeRequest(this.idPersonnel, this.timeList);
    this._httpService
      .addTime(this.urlName + "/reg/addTimeTable", this.timeRequest)
      .subscribe(
      value => {
        // this.serviceForm.reset()
        this.showAlert("success", "The person has been added")
      },
      error => alert(error),
      () => console.log("Finished"),
    )

  }

  showAlert(type: string, text: string) {
    this.messageService.add({ severity: type, summary: 'Error', detail: text });
}

 
}
