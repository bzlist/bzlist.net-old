import {Component, OnInit} from "@angular/core";

import {SeoService} from "../../services/seo.service";

@Component({
  selector: "help-page",
  templateUrl: "./help-page.component.html"
})
export class HelpPageComponent implements OnInit{
  constructor(private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Help - BZList",
      description: "Help information for BZList"
    });
  }
}
