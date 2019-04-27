import {Injectable} from "@angular/core";

import {AngularFirestore} from "@angular/fire/firestore";

import {Server} from "../models/server.model";

@Injectable({
  providedIn: "root"
})
export class ServersService{
  private _servers: Server[];

  lastUpdate = -1;

  totalPlayers = 0;
  totalObservers = 0;

  constructor(private afs: AngularFirestore){
    this.afs.collection<Server>("servers", ref =>
      ref.orderBy("playersCount", "desc").orderBy("title")
    ).valueChanges().subscribe((data: Server[]) => {
      this.setServers(data);
    });
  }

  get servers(): Server[]{
    return this._servers;
  }

  private setServers(servers: Server[]): void{
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

    this._servers = servers;

    this.lastUpdate = timestamp;
  }
}
