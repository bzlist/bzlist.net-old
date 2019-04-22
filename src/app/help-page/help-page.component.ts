import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Component({
  selector: "help-page",
  templateUrl: "./help-page.component.html"
})
export class HelpPageComponent implements OnInit{
  constructor(private title: Title){
  }

  ngOnInit(){
    this.title.setTitle("Help - BZList");
  }
}
