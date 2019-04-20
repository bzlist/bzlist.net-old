import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material";

import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

import {SettingsService} from "../settings.service";
import {Server,} from "../server";

@Component({
  selector: "servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.scss"]
})
export class ServersComponent implements OnInit, OnDestroy{
  lastUpdate = -1;

  serverDataSub: Subscription;

  servers: Server[];

  totalPlayers = 0;
  totalObservers = 0;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private db: AngularFirestore,
              private settingsService: SettingsService){
    if(window.innerWidth <= 768){
      settingsService.gridView = true;
    }
  }

  ngOnInit(): void{
    this.serverDataSub = this.db.collection<Server>("servers", ref =>
      ref.orderBy("playersCount", "desc").orderBy("title")
    ).valueChanges().subscribe((data: Server[]) => {
      this.setServers(data);
    });

    // this.serverData.filterPredicate = (data: Server, filters: string) => {
    //   const matchFilter = [];
    //   const filterArray = filters.split(',');
    //   const columns = [data.address, data.ip, data.title, data.country, data.countryCode, data.owner, data.configuration.gameStyle];

    //   filterArray.forEach(filter => {
    //     filter = filter.trim().toLocaleLowerCase();
    //     const customFilter = [];

    //     columns.forEach(column => customFilter.push(column.trim().toLocaleLowerCase().includes(filter)));
    //     matchFilter.push(customFilter.some(Boolean));
    //   });

    //   return matchFilter.every(Boolean);
    // }
  }

  ngOnDestroy(): void{
    this.serverDataSub.unsubscribe();
  }

  setServers(servers: Server[]): void{
    this.totalPlayers = 0;
    this.totalObservers = 0;

    let timestamp = 0;
    for(let i = 0; i < servers.length; i++){
      for(let j = 0; j < servers[i].players.length; j++){
        if(servers[i].players[j].team === "Observer"){
          this.totalObservers++;
        }else{
          this.totalPlayers++;
        }
      }

      if(servers[i].timestamp > timestamp){
        timestamp = servers[i].timestamp;
      }
    }

    this.servers = servers;

    this.lastUpdate = timestamp;
  }

  showServerDetails(server: Server): void{
    this.router.navigate(["/s", server.address, server.port]);
  }

  openSnackBar(message: string, action: string = "Dismiss", duration: number = 3000): MatSnackBarRef<SimpleSnackBar>{
    const snackBarRef = this.snackBar.open(message, action, {
      duration
    });

    snackBarRef.onAction().subscribe(snackBarRef.dismiss);

    return snackBarRef;
  }

  trackByTimestamp(index: number, item: Server): number{
    return item.timestamp;
  }
}
