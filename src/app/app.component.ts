import {Component} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";

import {environment} from "@env/environment";

import {SettingsService} from "@app/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent{
  version = environment.version;

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
