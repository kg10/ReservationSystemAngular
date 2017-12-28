import { Component, OnInit } from '@angular/core';
import { HttpService } from "../login.service";
import { HistoryReservation } from '../model/historyReservation.model';
@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css'],
  providers: [HttpService]
})
export class UserHistoryComponent implements OnInit {
  urlName: String;
  history: HistoryReservation[];
  constructor(private _httpService: HttpService) {
    // this.urlName = "http://localhost:8072";
    this.urlName = "http://192.168.99.100:8073/api";
  }

  ngOnInit() {
    this.findHistoryReservation();
  }

  findHistoryReservation() {
    this._httpService
      .getHistory(this.urlName + "/reg/findHistoryService?login=" + localStorage.getItem("login"))
      .subscribe(
      data => this.history = data,
      error => alert(error),
      () => console.log("Finished"),
    )
  }

  deleteReservation(id: any) {
    this._httpService
      .deleteReservation(this.urlName + "/reg/disableReservation/" + id, false)
      .subscribe(
      data => this.findHistoryReservation(),
      error => alert(error),
      () => console.log("Finished")
      )
  }

}
