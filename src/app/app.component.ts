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
    // if there is a service worker update available automatically update
    swUpdate.available.subscribe(event => {
      // once updated refresh the page
      swUpdate.activateUpdate().then(document.location.reload);
    });

    // automatically set dark mode at startup
    this.setDarkMode(this.settingsService.darkMode);
  }

  setDarkMode(value: boolean): void{
    // and transition to document
    document.documentElement.classList.add("transition");
    setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 300);

    // set data-theme
    if(value){
      document.documentElement.setAttribute("data-theme", "dark");
    }else{
      document.documentElement.setAttribute("data-theme", "light");
    }
  }
}
