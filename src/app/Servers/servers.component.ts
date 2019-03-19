import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource, MatSort, MatDialog} from "@angular/material";

import {ServerDialog} from "../ServerDialog/serverDialog.component";
import {Server, ServerHelper} from "../server";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent{
  status = "Load";

  servers: Server[];
  displayedColumns: string[] = ["players", "address", "country", "gameStyle", "title"];
  serverData = new MatTableDataSource<Server>(this.servers);
  @ViewChild(MatSort) sort: MatSort;

  readonly API_ROOT_URL = "http://192.168.254.28:3000/";

  constructor(private http: HttpClient, private dialog: MatDialog){}

  ngAfterViewInit(): void{
    this.getServers();

    this.serverData.sort = this.sort;
  }

  getServers(): void{
    this.status = "Loading...";

    this.http.get<Server[]>(this.API_ROOT_URL).subscribe(res => {
      this.servers = res;
      this.serverData.data = this.servers;
      
      this.status = "Refreshed";
      setTimeout(() => this.status = "Refresh", 2000);

      for(let i = 0; i < this.servers.length; i++){
        this.servers[i] = ServerHelper.verbose(this.servers[i]);
      }
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