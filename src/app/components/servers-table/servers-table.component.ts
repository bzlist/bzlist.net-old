import {Component, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, Input, SimpleChanges} from "@angular/core";

import {SettingsService} from "@app/services";
import {Server} from "@app/models/server.model";

@Component({
  selector: "app-servers-table",
  templateUrl: "./servers-table.component.html",
  styleUrls: ["./servers-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServersTableComponent implements OnChanges{
  @Input() servers: Server[];
  @Output() rowClick = new EventEmitter<Server>();

  private sort: string;
  private sortOrder: number;

  constructor(public settingsService: SettingsService){
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(!changes.servers.previousValue){
      this.sortOrder = this.settingsService.serverSort.sortOrder;
      this.sortBy(this.settingsService.serverSort.sort);
    }else{
      this.sortBy();
    }
  }

  rowClicked(server: Server): void{
    this.rowClick.emit(server);
  }

  hasColumn(column: string): boolean{
    return this.settingsService.displayedServerColumns.includes(column);
  }

  trackByTimestamp(index: number, item: Server): number{
    return item.timestamp;
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
      case "playersCount":
        this.servers.sort((a, b) => a.playersCount > b.playersCount ? -this.sortOrder : this.sortOrder);
        break;
      case "address":
        this.servers.sort((a, b) => a.address.toLowerCase() > b.address.toLowerCase() ? this.sortOrder : -this.sortOrder);
        break;
      case "owner":
        this.servers.sort((a, b) => a.owner > b.owner ? this.sortOrder : -this.sortOrder);
        break;
      case "protocol":
        this.servers.sort((a, b) => a.protocol > b.protocol ? this.sortOrder : -this.sortOrder);
        break;
      case "country":
        this.servers.sort((a, b) => a.country > b.country ? this.sortOrder : -this.sortOrder);
        break;
      case "gameStyle":
        this.servers.sort((a, b) => a.configuration.gameStyle > b.configuration.gameStyle ? this.sortOrder : -this.sortOrder);
        break;
      case "title":
        this.servers.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? this.sortOrder : -this.sortOrder);
        break;
      default:
        break;
    }

    this.settingsService.serverSort = {sort: this.sort, sortOrder: this.sortOrder};
  }
}
