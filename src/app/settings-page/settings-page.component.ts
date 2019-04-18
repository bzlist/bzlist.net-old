import {Component} from "@angular/core";

import {SettingsService} from "../settings.service";

@Component({
  selector: "app-settings-page",
  templateUrl: "./settings-page.component.html",
  styleUrls: ["./settings-page.component.scss"]
})
export class SettingsPageComponent{
  constructor(public settingsService: SettingsService){
  }

  serverColumnName(column: string): string{
    return this.settingsService.serverColumnNames[this.settingsService.serverColumns.indexOf(column)];
  }

  playerColumnName(column: string): string{
    return this.settingsService.playerColumnNames[this.settingsService.playerColumns.indexOf(column)];
  }

  getServerColumn(column: string): boolean{
    return this.settingsService.displayedServerColumns.includes(column);
  }

  getPlayerColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }

  toggleServerColumn(column: string): void{
    this.settingsService.toggleDisplayedServerColumn(column);
  }

  togglePlayerColumn(column: string): void{
    this.settingsService.toggleDisplayedPlayerColumn(column);
  }
}
