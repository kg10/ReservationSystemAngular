import { Component, OnInit } from '@angular/core';
import { HttpService } from "../login.service";
import { HistoryReservation } from '../model/historyReservation.model';
import { Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css'],
  providers: [HttpService, MessageService]
})
export class UserHistoryComponent implements OnInit {
  msgs: Message[] = [];
  urlName: String;
  history: HistoryReservation[];
  constructor(private messageService: MessageService, private _httpService: HttpService) {
    // this.urlName = "http://localhost:8072";
    this.urlName = "http://192.168.99.100:8073/api";
  }

  ngOnInit() {
    this.findHistoryReservation();
  }

  showAlert(type: string, text: string) {
    this.messageService.add({ severity: type, summary: type, detail: text });
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
      data => {
        this.findHistoryReservation(),
        this.showAlert("error", "This reservation has been deleted")
      },
      error => alert(error),
      () => console.log("Finished")
      )
  }

}
