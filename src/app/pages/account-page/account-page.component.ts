import {Component} from "@angular/core";

import {AuthService} from "../../services/auth.service";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.scss"]
})
export class AccountPageComponent{
  constructor(public auth: AuthService){
  }
}
