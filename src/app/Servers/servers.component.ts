import {Component, ViewChild, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

import {SettingsService} from "../settings.service";
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

  get displayedColumns(): string[]{
    return this.settingsService.displayedServerColumns;
  }

  totalPlayers = 0;
  totalObservers = 0;

  constructor(private apiService: ApiService,
              private router: Router,
              private snackBar: MatSnackBar,
              private db: AngularFirestore,
              private settingsService: SettingsService){
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
}
