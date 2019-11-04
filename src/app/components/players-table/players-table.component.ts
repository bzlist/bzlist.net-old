import {Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges} from "@angular/core";

import {SettingsService} from "@app/services";
import {Player} from "@app/models";

@Component({
  selector: "app-players-table",
  templateUrl: "./players-table.component.html",
  styleUrls: ["./players-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayersTableComponent implements OnChanges{
  @Input() players: Player[];
  @Input() showServerColumn = false;
  @Input() showTkColumn = true;

  private sort: string;
  private sortOrder: number;

  constructor(public settingsService: SettingsService){
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(!changes.players){
      return;
    }

    if(!changes.players.previousValue){
      this.sortOrder = this.settingsService.playerSort.sortOrder;
      this.sortBy(this.settingsService.playerSort.sort);
    }else{
      this.sortBy();
    }
  }

  getServerLink(server: string): string{
    const address = server.split(":");
    return `/s/${address[0]}/${address[1]}`;
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedPlayerColumns.includes(column);
  }

  sortBy(sort?: string): void{
    if(sort){
      if(sort === this.sort){
        this.sortOrder = -this.sortOrder;
      }else{
        this.sortOrder = 1;
      }
      this.sort = sort;
    }

    switch(this.sort){
      case "callsign":
        this.players.sort((a, b) => a.callsign.toLowerCase() > b.callsign.toLowerCase() ? this.sortOrder : -this.sortOrder);
        break;
      case "server":
        this.players.sort((a, b) => a.server.toLowerCase() > b.server.toLowerCase() ? this.sortOrder : -this.sortOrder);
        break;
      case "team":
        this.players.sort((a, b) => a.team > b.team ? this.sortOrder : -this.sortOrder);
        break;
      case "score":
        this.players.sort((a, b) => a.score > b.score ? -this.sortOrder : this.sortOrder);
        break;
      case "winsLosses":
        this.players.sort((a, b) => a.wins > b.wins ? -this.sortOrder : this.sortOrder);
        break;
      case "tks":
        this.players.sort((a, b) => a.tks > b.tks ? -this.sortOrder : this.sortOrder);
        break;
      default:
        break;
    }

    if(this.settingsService.playerSort.sort !== this.sort || this.settingsService.playerSort.sortOrder !== this.sortOrder){
      this.settingsService.playerSort = {sort: this.sort, sortOrder: this.sortOrder};
    }
  }
}
