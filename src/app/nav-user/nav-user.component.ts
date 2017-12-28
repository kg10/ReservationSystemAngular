import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "../login.service";
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { Address } from '../model/address.model';


@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css'],
  providers: [HttpService]
})
export class NavUserComponent implements OnInit {
  loginSave: String = '';
  urlName: string;
  client: Client;
  address: Address;
  clientForm: FormGroup;
 // addressForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private _httpService: HttpService) {
    this.loginSave = localStorage.getItem("login");
    // localStorage.removeItem("login");
    this.clientForm = fb.group({
      'id': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'city': [null, Validators.required],
      'street': [null, Validators.required],
      'postalCode': [null, Validators.required],
      'numberStreet': [null, Validators.required],
      'personnelId': [null, Validators.required],
    });
    // this.addressForm = fb.group({
    //   'city': [null, Validators.required],
    //   'street': [null, Validators.required],
    //   'postalCode': [null, Validators.required],
    //   'numberStreet': [null, Validators.required],
    //   'personnelId': [null, Validators.required],
    // });
    this.urlName = "http://192.168.99.100:8073/api";
  }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['../nav/logowanie']);
    localStorage.clear();
  }

  selectClientData() {
    this._httpService
      .getClient(this.urlName + "/reg/getClient?login=" + localStorage.getItem("login"))
      .subscribe(
      data => {
        this.client = data,
          this.getAddress(this.client.id)
      },
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  getAddress(id: number) {
    this._httpService
      .getAddress(this.urlName + "/getAddress/" + id)
      .subscribe(
      data =>{
        this.address = data,
        this.parseToForm()
      },
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  parseToForm() {
    this.clientForm.setValue({
      'id': this.client.id,
      'firstName': this.client.firstName,
      'lastName': this.client.lastName,
      'email': this.client.email,
      'city': this.address.city,
      'street': this.address.street,
      'postalCode': this.address.postalCode,
      'numberStreet': this.address.numberStreet,
      'personnelId': this.address.personnelId,
    })
  }

  editData(){

  }

}
