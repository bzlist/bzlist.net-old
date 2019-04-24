import {Component, OnInit} from "@angular/core";

import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.scss"]
})
export class AccountPageComponent implements OnInit{
  constructor(public auth: AuthService){
  }
}
