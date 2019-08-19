import {Component, OnInit} from "@angular/core";

import {AuthService, SeoService} from "@app/services";

@Component({
  selector: "app-account-page",
  templateUrl: "./account-page.component.html",
  styleUrls: ["./account-page.component.scss"]
})
export class AccountPageComponent implements OnInit{
  constructor(// public auth: AuthService,
              private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Account - BZList",
      description: "Manage your account"
    });
  }
}
