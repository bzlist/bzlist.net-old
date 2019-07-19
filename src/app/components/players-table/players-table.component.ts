import {Component, Input, ChangeDetectionStrategy} from "@angular/core";

import {SettingsService} from "../../services/settings.service";

import {Player} from "../../models/server.model";

@Component({
  selector: "app-players-table",
  templateUrl: "./players-table.component.html",
  styleUrls: ["./players-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableComponent{
  @Input() players: Player[];
  @Input() showServerColumn = false;
  @Input() showTkColumn = true;

  constructor(public settingsService: SettingsService){
  }

  getServerLink(server: string){
    const address = server.split(":");
    return `/s/${address[0]}/${address[1]}`;
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }
}
