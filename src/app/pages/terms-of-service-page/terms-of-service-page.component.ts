import {Component, OnInit} from "@angular/core";

import {SeoService} from "@app/services";

@Component({
  selector: "app-terms-of-service-page",
  templateUrl: "./terms-of-service-page.component.html"
})
export class TermsOfServicePageComponent implements OnInit{
  constructor(private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Terms of Service - BZList",
      description: "BZList's terms of service"
    });
  }
}
