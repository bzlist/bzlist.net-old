import {Component, ViewChild} from "@angular/core";
import {MatTableDataSource, MatSort, MatDialog, MatMenuTrigger} from "@angular/material";

import {ApiService} from "../api.service";
import {ServerDialog} from "../ServerDialog/serverDialog.component";
import {Server, ServerHelper} from "../server";
import {Time} from "../time";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent{
  lastDBUpdate = "";
  status = "Fetch Data";

  api: number = 0;
  servers: Server[];
  displayedColumns: string[] = ["players", "address", "country", "gameStyle", "title"];
  serverData = new MatTableDataSource<Server>(this.servers);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private dialog: MatDialog){}

  ngAfterViewInit(): void{
    this.getServers();

    this.serverData.sort = this.sort;
    this.serverData.filterPredicate = (data: Server, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      const columns = [data.address, data.ip, data.title, data.country, data.protocol, data.owner, data.configuration.gameStyle];
      
      filterArray.forEach(filter => {
        filter = filter.trim().toLocaleLowerCase();
        const customFilter = [];
        
        columns.forEach(column => customFilter.push(column.trim().toLocaleLowerCase().includes(filter)));
        matchFilter.push(customFilter.some(Boolean));
      });

      return matchFilter.every(Boolean);
    }
  }

  getServers(): void{
    this.status = "Refreshing";

    this.apiService.getServers(this.api).subscribe((data: Server[]) => {
      this.servers = data;
      this.serverData.data = this.servers;

      let timestamp = 0;
      for(let i: number = 0; i < this.servers.length; i++){
        if(this.servers[i].timestamp > timestamp){
          timestamp = this.servers[i].timestamp;
        }
      }
      this.lastDBUpdate = Time.autoFormatTime(Math.floor(new Date().getTime() / 1000 - timestamp)) + ` ago (${Time.format(timestamp)})`;

      for(let i = 0; i < this.servers.length; i++){
        this.servers[i] = ServerHelper.verbose(this.servers[i]);
      }

      this.status = "Refreshed";
      setTimeout(() => this.status = "", 5000);
    });
  }

  showServerDialog(server: Server): void{
    this.dialog.open(ServerDialog, {
      minWidth: "700px",
      data: server
    });
  }

  searchServers(filter: string): void{
    this.serverData.filter = filter.trim().toLocaleLowerCase();
  }
}