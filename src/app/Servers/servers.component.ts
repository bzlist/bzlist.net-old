import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {CookieService} from "ngx-cookie-service";

import {ApiService} from "../api.service";
import {Server, ServerHelper} from "../server";
import {Time} from "../time";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent implements OnInit, OnDestroy{
  lastClientUpdate: string = "never";
  lastClientUpdateTimestamp: number;

  lastDBUpdate: string = "never";
  lastDBUpdateTimestamp: number;

  serverDataSub: Subscription;

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
              private router: Router,
              private snackBar: MatSnackBar,
              private db: AngularFirestore,
              private cookieService: CookieService){
  }

  ngOnInit(): void{
    this.serverData = new MatTableDataSource<Server>();
    setTimeout(() => this.serverData.sort = this.sort, 10);
    this.serverData.paginator = this.paginator;

    this.serverDataSub = this.db.collection<Server>("servers", ref =>
      ref.orderBy("playersCount", "desc")
    ).valueChanges().subscribe((data: Server[]) => {
      this.setServers(data);
    });

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

    this._compact = this.cookieService.get("compact") === "true" ? true : false;
    if(this.cookieService.check("columns")){
      this._displayedColumns = JSON.parse(this.cookieService.get("columns"));
    }

    setInterval(() => this.updateTimestamps(), 10000);
  }

  ngOnDestroy(): void{
    this.serverDataSub.unsubscribe();
  }

  setServers(servers: Server[]): void{
    this.serverData.data = servers;

    this.totalPlayers = 0;
    this.totalObservers = 0;

    let timestamp = 0;
    for(let i = 0; i < this.serverData.data.length; i++){
      this.serverData.data[i] = ServerHelper.verbose(this.serverData.data[i]);
      for(let j = 0; j < this.serverData.data[i].players.length; j++){
        if(this.serverData.data[i].players[j].team === "Observer"){
          this.totalObservers++;
        }else{
          this.totalPlayers++;
        }
      }

      if(this.serverData.data[i].timestamp > timestamp){
        timestamp = this.serverData.data[i].timestamp;
      }
    }


    this.lastDBUpdateTimestamp = timestamp;
    this.lastClientUpdateTimestamp = new Date().getTime() / 1000;

    this.updateTimestamps();
  }

  showServerDialog(server: Server): void{
    this.router.navigate(["/s", server.address, server.port]);
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
