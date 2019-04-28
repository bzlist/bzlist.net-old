import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {SettingsService} from "../../services/settings.service";
import {ServersService} from "../../services/servers.service";

import {Server} from "../../models/server.model";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent{
  constructor(private router: Router,
              private settingsService: SettingsService,
              public serversService: ServersService){
    // if the window width is smaller then the mobile threshold then use grid view
    if(window.innerWidth <= 768){
      this.settingsService.gridView = true;
    }
  }

  showServerDetails(server: Server): void{
    this.router.navigate(["/s", server.address, server.port]);
  }

  trackByTimestamp(index: number, item: Server): number{
    return item.timestamp;
  }
}
