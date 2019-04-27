import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

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
              private snackBar: MatSnackBar,
              private settingsService: SettingsService,
              private serversService: ServersService){
    if(window.innerWidth <= 768){
      this.settingsService.gridView = true;
    }
  }

  showServerDetails(server: Server): void{
    this.router.navigate(["/s", server.address, server.port]);
  }

  openSnackBar(message: string, action: string = "Dismiss", duration: number = 3000): MatSnackBarRef<SimpleSnackBar>{
    const snackBarRef = this.snackBar.open(message, action, {
      duration
    });

    snackBarRef.onAction().subscribe(snackBarRef.dismiss);

    return snackBarRef;
  }

  trackByTimestamp(index: number, item: Server): number{
    return item.timestamp;
  }
}
