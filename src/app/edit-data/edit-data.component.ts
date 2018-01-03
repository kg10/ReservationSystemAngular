import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { HttpService } from "../login.service";
import { Personnel } from "../model/personnel.model";
import { Service } from "../model/service.model";
import { MatTableModule } from '@angular/material';
import { Assign } from '../model/listOfAssign.model';
import { TimeTable } from '../model/timeTable.model';
import { TimeRequest } from '../model/timeRequest.model';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
// import { DataSource } from '@angular/cdk/collections';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css'],
  providers: [HttpService, MessageService],
})
export class EditDataComponent implements OnInit {
  urlName: String;
  personnel: Personnel;
  service: Service[];
  servicePersons: Service[];
  timePerson: TimeTable[];
  serviceForm: FormGroup;
  personnelForm: FormGroup;
  serviceNameForm: FormGroup;
  timeForm: FormGroup;
  alert: any = {};
  displayedColumns = ['position', 'name', 'weight'];
  descriptionList: String[] = [];
  timeTableList: TimeTable[] = [];
  serviceName: String;
  rememberId: any;
  rememberTimeId: any;
  msgs: Message[] = [];
  //dataSource = new MatTableModule;

  constructor(fb: FormBuilder, private _httpService: HttpService, private messageService: MessageService) {
    // this.urlName = "http://localhost:8072";
    this.urlName = "http://192.168.99.100:8073/api";
    this.serviceForm = fb.group({
      'id': '',
      'descriptionService': [null, Validators.required],
      'duration': [null, Validators.required],
      'price': [null, Validators.required],
    });
    this.personnelForm = fb.group({
      'id': '',
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'descriptionPerson': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
      'active': '',
    });
    this.serviceNameForm = fb.group({
      'dscr': [null, Validators.required],
    })
    this.timeForm = fb.group({
      'day': [null, Validators.required],
      'timeFrom': [null, Validators.required],
      'timeTo': [null, Validators.required],
    });
  }



  ngOnInit() {
    this.findAllService();
    this.findAllPersonnel();
  }

  showAlert(type: string, text: string) {
    this.messageService.add({ severity: type, summary: type , detail: text });
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

  findAllService() {
    this._httpService
      .getServiceTable(this.urlName + "/reg/findAllServices")
      .subscribe(
      service => {
        this.service = service,
          console.log(service)
      },
      error => alert(error),
      () => console.log("Finished")

      )
  }

  setService(name: any) {
    console.log(name.descriptionService);
    this.serviceName = name;
  }

  addServiceToList() {
    let flag: boolean = true;
    console.log(this.serviceNameForm.value.dscr)
    this.descriptionList.forEach(element => {
      if (element === this.serviceNameForm.value.dscr) {
        flag = false;
      }
    });
    if (flag === true)
      this.descriptionList.push(this.serviceNameForm.value.dscr);
  }

  addTimeToList() {
    let flag: boolean = true;
    console.log("lista");
    this.timeTableList.forEach(element => {
      console.log(element.day);
    });
    console.log("add:" + this.timeForm.value.day)
    this.timeTableList.forEach(element => {
      if (element.day === this.timeForm.value.day) {
        flag = false;
        this.showAlert("error", "Invalid data");
      }
    });
    if (flag === true && this.timeForm.value.day != null && this.timeForm.value.timeFrom != null && this.timeForm.value.timeTo != null) {
      this.timeTableList.push(new TimeTable(this.timeForm.value.day, this.timeForm.value.timeFrom + ":00", this.timeForm.value.timeTo + ":00"));
    }
    this.timeForm.reset();
  }

  deleteDescription(descr: any) {
    this.descriptionList.forEach((item, index) => {
      if (item === descr) this.descriptionList.splice(index, 1);
    });
  }

  deleteTime(object: any) {
    this.timeTableList.forEach((item, index) => {
      if (item.day === object.day) this.timeTableList.splice(index, 1);
    });
  }


  editService(service: Service) {
    this.serviceForm.setValue({
      'id': service.id,
      'descriptionService': service.descriptionService,
      'duration': service.duration,
      'price': service.price,
    })
  }

  selectServiceByPerson(id: any) {
    this.serviceNameForm.reset();
    this.descriptionList = [];
    this.servicePersons = [];
    this.rememberId = id;
    this._httpService
      .getServiceTable(this.urlName + "/reg/findServiceByPersonnelId?id=" + id)
      .subscribe(
      service => {
        this.servicePersons = service
      },
      error => alert(error),
      () => {
        console.log("Finished"),
          this.servicePersons.forEach(element => {
            this.descriptionList.push(element.descriptionService);
          });
      }
      )
  }

  selectTimeByPerson(id: any) {
    this.timeForm.reset();
    this.timeTableList = [];
    this.timePerson = [];
    this.rememberTimeId = id;
    this._httpService
      .getTimeTab(this.urlName + "/reg/findTimeByPerson?id=" + id)
      .subscribe(
      service => {
        this.timeTableList = service
      },
      error => alert(error),
      () => {
        console.log("Finished")
        // this.servicePersons.forEach(element => {
        //   this.descriptionList.push(element.descriptionService);
        // });
      }
      )
  }

  sendAssign() {
    this.serviceNameForm.reset();
    let list = new Assign(this.descriptionList);
    this.descriptionList = [];
    this._httpService
      .assignServToPers(this.urlName + "/reg/assign/" + this.rememberId, list)
      .subscribe(
      value => {
        this.showAlert("success", "Data about services has been edited");
      },
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  sendEditTime() {
    this._httpService
      .deleteTime(this.urlName + "/reg/deleteTime?id=" + this.rememberTimeId)
      .subscribe(
      value => {
      },
      error => alert(error),
      () => {
        console.log("Finished"),
          this.endEditTime()
      }
      )
  }

  endEditTime() {
    this.timeForm.reset();
    let list = new TimeRequest(this.rememberTimeId, this.timeTableList);
    this.descriptionList = [];
    this._httpService
      .addTime(this.urlName + "/reg/addTimeTable", list)
      .subscribe(
      value => {
        this.showAlert("success", "Data about time has been edited");
      },
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  editOneService(registerForm: NgForm) {
    this.serviceForm.value.duration+=":00";
    
    this._httpService
      .editService(this.urlName + "/reg/updateService", this.serviceForm.value)
      .subscribe(
      value => {
        this.serviceForm.reset(),
          value = value,
          this.showAlert("success", "Data about service has been edited")
      },
      error => alert(error),
      () => {
        console.log("Finished"),
        this.findAllService()
      }
      )
  }

  editPersonnel(person: Personnel) {
    this.personnelForm.setValue({
      'id': person.id,
      'firstName': person.firstName,
      'lastName': person.lastName,
      'descriptionPerson': person.descriptionPerson,
      'active': person.active,
    })
  }

  editOnePerson() {
    this._httpService
      .editPersonnel(this.urlName + "/reg/updatePersonnel", this.personnelForm.value)
      .subscribe(
      value => {
        this.personnelForm.reset(),
          value = value,
          this.showAlert("success", "Data about person has been edited")
      },
      error => alert(error),
      () => {
        console.log("Finished"),
          this.findAllPersonnel();
      }
      )
  }

  disablePerson() {
    this._httpService
      .disablePersonnel(this.urlName + "/reg/disablePersonnel", this.personnelForm.value)
      .subscribe(
      value => {
        this.personnelForm.reset(),
          value = value,
          this.showAlert("error", "The person has been deleted")
      },
      error => alert(error),
      () => {
        console.log("Finished"),
          this.findAllPersonnel();
      }
      )
  }
}

