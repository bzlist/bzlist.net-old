import {Injectable, Inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

import {AngularFirestore} from "@angular/fire/firestore";

import {Server} from "../models/server.model";

@Injectable({
  providedIn: "root"
})
export class ServersService{
  private _servers: Server[];

  lastUpdate = -1;
  playerCount = 0;
  observerCount = 0;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              private afs: AngularFirestore){
    // only get data if being rendered in a browser
    if(isPlatformBrowser(platformId)){
      this.afs.collection<Server>("servers", ref =>
        ref.where("online", "==", true)
      ).valueChanges().subscribe((data: Server[]) => {
        this.setServers(data);
      });
    }
  }

  get servers(): Server[]{
    return this._servers;
  }

  private setServers(servers: Server[]): void{
    this.playerCount = 0;
    this.observerCount = 0;

    let timestamp = 0;
    for(let i = 0; i < servers.length; i++){
      this.playerCount += servers[i].playersCount;

      const observerTeam = servers[i].teams.find((team) => team.name === "Observer");
      if(observerTeam){
        this.observerCount += observerTeam.players;
        this.playerCount -= observerTeam.players;
      }

      if(servers[i].timestamp > timestamp){
        timestamp = servers[i].timestamp;
      }
    }
    
    servers.sort((a, b) => a.playersCount > b.playersCount ? -1 : 1);
    this._servers = servers;

    this.lastUpdate = timestamp;
  }
}
