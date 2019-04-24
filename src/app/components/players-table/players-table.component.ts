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

  constructor(public settingsService: SettingsService){
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }
}
