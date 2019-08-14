import {Component, Input} from "@angular/core";

@Component({
  selector: "app-spinner",
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.scss"]
})
export class SpinnerComponent{
  @Input() show = true;

  text: string;

  private texts = ["A rogue tank has been located", "I win by tanking my enemies", "Tank you for using BZList!"];

  constructor(){
    this.text = this.texts[Math.floor((Math.random() * this.texts.length))];
  }
}
