import { Component, OnInit } from '@angular/core';
import { HttpService } from "../login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.css'],
  providers: [HttpService]
})
export class NavUserComponent implements OnInit {
  loginSave: String = '';
  constructor(private router: Router) {
    this.loginSave = localStorage.getItem("login");
    // localStorage.removeItem("login");
   }

  ngOnInit() {
  }

  logOut(){
    this.router.navigate(['../nav/logowanie']);
    localStorage.clear();
  }

}
