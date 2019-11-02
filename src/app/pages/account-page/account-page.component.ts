import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

import {AccountService, SettingsService} from "@app/services";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.scss"]
})
export class AccountPageComponent{
  email = "";
  password = "";

  constructor(private route: ActivatedRoute,
              private router: Router,
              public accountService: AccountService,
              public settingsService: SettingsService){
    this.route.queryParams.subscribe(params => {
      if(params.username && params.token){
        accountService.login(params.username, params.token);

        // remove the query params
        this.router.navigate([]);
      }
    });
  }
}
