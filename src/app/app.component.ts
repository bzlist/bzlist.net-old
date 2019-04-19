import {Component} from "@angular/core";

import {SettingsService} from "./settings.service";

import {fadeAnimation} from "./animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent{
  constructor(private settingsService: SettingsService){
    this.setDarkMode(this.settingsService.darkMode);
  }

  setDarkMode(value: boolean): void{
    document.documentElement.classList.add("transition");
    setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 300);

    if(value){
      document.documentElement.setAttribute("data-theme", "dark");
    }else{
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}
