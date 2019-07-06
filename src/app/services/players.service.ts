import {Injectable, Inject, PLATFORM_ID} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

import {AngularFirestore} from "@angular/fire/firestore";

import {Player} from "../models/server.model";

@Injectable({
  providedIn: "root"
})
export class PlayersService{
  private _players: Player[];

  lastUpdate = -1;

  totalPlayers = 0;
  totalObservers = 0;

  constructor(@Inject(PLATFORM_ID) platformId: string,
              private afs: AngularFirestore){
    // only get data if being rendered in a browser
    if(isPlatformBrowser(platformId)){
      this.afs.collection<Player>("players", ref =>
        ref.orderBy("callsign", "asc")
      ).valueChanges().subscribe((data: Player[]) => {
        this.setPlayers(data);
      });
    }
  }

  get players(): Player[]{
    return this._players;
  }

  private setPlayers(players: Player[]): void{
    this.totalPlayers = 0;
    this.totalObservers = 0;

    let timestamp = -1;
    for(let i = 0; i < players.length; i++){
      players[i].score = players[i].wins - players[i].losses;

      if(players[i].team === "Observer"){
        this.totalObservers++;
      }else{
        this.totalPlayers++;
      }

      if(players[i].timestamp > timestamp){
        timestamp = players[i].timestamp;
      }
    }

    this._players = players;
    this.lastUpdate = timestamp;
  }
}
