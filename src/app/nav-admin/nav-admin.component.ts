import { Component, OnInit } from '@angular/core';
import { HttpService } from "../login.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css'],
  providers: [HttpService]
})
export class NavAdminComponent implements OnInit {
  loginSave: String = '';
  constructor(private router: Router) {
    this.loginSave = localStorage.getItem("login");
  }

  ngOnInit() {
    this.router.navigate(['/panel/edit']);
  }

  logOut() {
    this.router.navigate(['../nav/logowanie']);
    localStorage.clear();
  }

}
