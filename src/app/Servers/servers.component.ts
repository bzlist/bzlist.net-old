import {Component, ViewChild, OnInit} from "@angular/core";
import {MatTableDataSource, MatSort, MatDialog, MatPaginator, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

import {CookieService} from "ngx-cookie-service";

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
  serverData: MatTableDataSource<Server>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  columns = ["players", "address", "owner", "protocol", "country", "gameStyle", "title"];
  _displayedColumns = [0, 1, 2, 4, 5, 6];

  get displayedColumns(): string[]{
    const columns: string[] = [];

    for(let i = 0; i < this._displayedColumns.length; i++){
      columns.push(this.columns[this._displayedColumns[i]]);
    }

    return columns;
  }

  totalPlayers = 0;
  totalObservers = 0;

  _compact = false;

  set compact(compact: boolean){
    this._compact = compact;
    this.cookieService.set("compact", this._compact.toString());
  }
  get compact(): boolean{
    return this._compact;
  }

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private cookieService: CookieService){
  }

  ngOnInit(): void{
    this.serverData = new MatTableDataSource<Server>();
    setTimeout(() => this.serverData.sort = this.sort, 10);
    this.serverData.paginator = this.paginator;

    this.serverData.filterPredicate = (data: Server, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      const columns = [data.address, data.ip, data.title, data.country, data.countryCode, data.owner, data.configuration.gameStyle];
      
      filterArray.forEach(filter => {
        filter = filter.trim().toLocaleLowerCase();
        const customFilter = [];
        
        columns.forEach(column => customFilter.push(column.trim().toLocaleLowerCase().includes(filter)));
        matchFilter.push(customFilter.some(Boolean));
      });

      return matchFilter.every(Boolean);
    }
    
    this.getServers();

    this._compact = this.cookieService.get("compact") === "true" ? true : false;
    if(this.cookieService.check("columns")){
      this._displayedColumns = JSON.parse(this.cookieService.get("columns"));
    }

    setInterval(() => this.updateTimestamps(), 10000);
  }

  getServers(): void{
    this.openSnackBar("Refreshing...", undefined, 10000);

    this.apiService.getServers().subscribe((data: Server[]) => {
      this.servers = data;
      this.serverData.data = this.servers;

      this.totalPlayers = 0;
      this.totalObservers = 0;

      let timestamp = 0;
      for(let i = 0; i < this.servers.length; i++){
        this.servers[i] = ServerHelper.verbose(this.servers[i]);
        for(let j = 0; j < this.servers[i].players.length; j++){
          if(this.servers[i].players[j].team === "Observer"){
            this.totalObservers++;
          }else{
            this.totalPlayers++;
          }
        }

        if(this.servers[i].timestamp > timestamp){
          timestamp = this.servers[i].timestamp;
        }
      }
      

      this.lastDBUpdateTimestamp = timestamp;
      this.lastClientUpdateTimestamp = new Date().getTime() / 1000;

      this.updateTimestamps();
      this.openSnackBar("Refreshed");
    }, error => {
      this.openSnackBar("Error fetching data", undefined, 10000);
      console.error("Update servers error", error);
    });
  }

  showServerDialog(server: Server): void{
    this.dialog.open(ServerDialog, {
      width: "1000px",
      minWidth: "500px",
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

  toggleColumn(index: number): void{
    if(this._displayedColumns.includes(index)){
      this._displayedColumns.splice(this._displayedColumns.indexOf(index), 1);
    }else{
      this._displayedColumns.splice(index, 0, index);
    }

    this.cookieService.set("columns", JSON.stringify(this._displayedColumns));
  }
}