import {Component, OnInit} from "@angular/core";

import {SeoService} from "@app/services";

@Component({
  selector: "app-privacy-policy-page",
  templateUrl: "./privacy-policy-page.component.html"
})
export class PrivacyPolicyPageComponent implements OnInit{
  constructor(private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Privacy Policy - BZList",
      description: "BZList's privacy policy"
    });
  }
}
