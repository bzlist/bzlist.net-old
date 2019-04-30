import {Component, OnInit} from "@angular/core";

import {SeoService} from "../../services/seo.service";

@Component({
  selector: "home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"]
})
export class HomePageComponent implements OnInit{
  constructor(private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "BZList",
      description: "BZList is an online service providing real-time BZFlag server information."
    });
  }
}
