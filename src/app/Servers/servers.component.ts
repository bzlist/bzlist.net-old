import {Component, ViewChild} from "@angular/core";
import {MatTableDataSource, MatSort, MatDialog} from "@angular/material";

import {ApiService} from "../api.service";
import {ServerDialog} from "../ServerDialog/serverDialog.component";
import {Server, ServerHelper} from "../server";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent{
  status = "Fetch Data";

  servers: Server[];
  displayedColumns: string[] = ["players", "address", "country", "gameStyle", "title"];
  serverData = new MatTableDataSource<Server>(this.servers);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService, private dialog: MatDialog){}

  ngAfterViewInit(): void{
    this.getServers();

    this.serverData.sort = this.sort;
  }

  getServers(): void{
    this.status = "Refreshing";

    this.apiService.getServers().subscribe((data: Server[]) => {
      this.servers = data;
      this.serverData.data = this.servers;

      for(let i = 0; i < this.servers.length; i++){
        this.servers[i] = ServerHelper.verbose(this.servers[i]);
      }

      this.status = "Refreshed";
      setTimeout(() => this.status = "Refresh", 1000);
    });
  }

  showServerDialog(server: Server): void{
    this.dialog.open(ServerDialog, {
      minWidth: "500px",
      data: server
    });
  }

  searchServers(search: string): void{
    this.serverData.filter = search.trim().toLowerCase();
  }
}