import {Component} from "@angular/core";
import {SwUpdate} from "@angular/service-worker";

import {SettingsService} from "@app/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent{
  offline = false;

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

    try{
      // automatically set dark mode at startup
      document.documentElement.setAttribute("data-theme", this.settingsService.theme);

      // get when online status changes
      window.onoffline = () => this.offline = true;
      window.ononline = () => this.offline = false;
    }catch(err){
    }
  }
}
