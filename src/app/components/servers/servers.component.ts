import {Component, AfterViewInit} from "@angular/core";
import {Router} from "@angular/router";

import {SettingsService, ServersService} from "@app/services";
import {Server} from "@app/models/server.model";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent implements AfterViewInit{
  ready = false;

  constructor(private router: Router,
              private settingsService: SettingsService,
              public serversService: ServersService){
    // if the window width is smaller then the mobile threshold then use grid view
    try{
      if(window.innerWidth <= 768){
      this.settingsService.gridView = true;
      }
    }catch(err){
    }
  }

  ngAfterViewInit(): void{
    setTimeout(() => this.ready = true);
  }

  showServerDetails(server: Server): void{
    this.router.navigate(["/s", server.address, server.port]);
  }

  trackByTimestamp(index: number, item: Server): number{
    return item.timestamp;
  }
}
