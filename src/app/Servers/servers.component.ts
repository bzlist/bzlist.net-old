import {Component, ViewChild, OnInit} from "@angular/core";
import {MatTableDataSource, MatSort, MatDialog, MatPaginator, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

import {ApiService} from "../api.service";
import {ServerDialog} from "../ServerDialog/serverDialog.component";
import {Server, ServerHelper} from "../server";
import {Time} from "../time";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent implements OnInit{
  lastClientUpdate: string = "never";
  lastClientUpdateTimestamp: number;

  lastDBUpdate: string = "never";
  lastDBUpdateTimestamp: number;

  servers: Server[];
  displayedColumns: string[] = ["players", "address", "country", "gameStyle", "title"];
  serverData: MatTableDataSource<Server>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar){
  }

  ngOnInit(): void{
    this.serverData = new MatTableDataSource<Server>();
    setTimeout(() => this.serverData.sort = this.sort);
    this.serverData.paginator = this.paginator;

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
    
    this.getServers();

    setInterval(() => this.updateTimestamps(), 10000);
  }

  getServers(): void{
    this.openSnackBar("Refreshing...");

    this.apiService.getServers().subscribe((data: Server[]) => {
      this.servers = data;
      this.serverData.data = this.servers;

      let timestamp = 0;
      for(let i: number = 0; i < this.servers.length; i++){
        if(this.servers[i].timestamp > timestamp){
          timestamp = this.servers[i].timestamp;
        }
      }
      

      for(let i = 0; i < this.servers.length; i++){
        this.servers[i] = ServerHelper.verbose(this.servers[i]);
      }

      this.lastDBUpdateTimestamp = timestamp;
      this.lastClientUpdateTimestamp = new Date().getTime() / 1000;

      this.updateTimestamps();
      this.openSnackBar("Refreshed");
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

  updateTimestamps(): void{
    this.lastDBUpdate = `${Time.autoFormatTime(new Date().getTime() / 1000 - this.lastDBUpdateTimestamp)} (${Time.format(this.lastDBUpdateTimestamp)})`;
    this.lastClientUpdate = Time.autoFormatTime(new Date().getTime() / 1000 - this.lastClientUpdateTimestamp);
  }

  openSnackBar(message: string, action: string = "Dismiss", duration: number = 3000): MatSnackBarRef<SimpleSnackBar>{
    const snackBarRef = this.snackBar.open(message, action, {
      duration
    });

    snackBarRef.onAction().subscribe(snackBarRef.dismiss);

    return snackBarRef;
  }
}