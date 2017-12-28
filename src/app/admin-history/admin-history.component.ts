import { Component, OnInit } from '@angular/core';
import { HttpService } from "../login.service";
import { HistoryAllReservation } from '../model/historyAllReservation.model';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css'],
  providers: [HttpService]
})
export class AdminHistoryComponent implements OnInit {

  urlName: String;
  hist: HistoryAllReservation[];
  constructor(private _httpService: HttpService) {
    // this.urlName = "http://localhost:8072";
    this.urlName = "http://192.168.99.100:8073/api";
  }

  ngOnInit() {
    this.findAllHistoryReservation();
  }

  findAllHistoryReservation() {
    this._httpService
      .getAllHistory(this.urlName + "/reg/findAllHistory")
      .subscribe(
      data => this.hist = data,
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  deleteAllReservation(id: any) {
    this._httpService
      .deleteReservation(this.urlName + "/reg/disableReservation/" + id, false)
      .subscribe(
      data => { this.findAllHistoryReservation() },
      error => alert(error),
      () =>console.log("Finished")
      )
  }

}
