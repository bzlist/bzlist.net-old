import {Component} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";

import {fadeAnimation} from "./animations";

import {SettingsService} from "./services/settings.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent{
  constructor(private swUpdate: SwUpdate,
              private settingsService: SettingsService){
    swUpdate.available.subscribe(event => {
      swUpdate.activateUpdate().then(document.location.reload);
    });

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
