import {Component, Input} from "@angular/core";

import {SettingsService} from "../settings.service";

import {Player} from "../server";

@Component({
  selector: "app-players-table",
  templateUrl: "./players-table.component.html",
  styleUrls: ["./players-table.component.scss"]
})
export class PlayersTableComponent{
  @Input() players: Player[];

  constructor(public settingsService: SettingsService){
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }
}
