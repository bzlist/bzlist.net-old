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
  constructor(swUpdate: SwUpdate,
              private settingsService: SettingsService){
    // if there is a service worker update available automatically update
    swUpdate.available.subscribe(() => {
      // once updated refresh the page
      swUpdate.activateUpdate().then(() => window.location.reload());
    });
    if(swUpdate.isEnabled){
      swUpdate.checkForUpdate();
    }

    // automatically set dark mode at startup
    try{
      document.documentElement.setAttribute("data-theme", this.settingsService.theme);
    }catch(err){
    }
  }
}
