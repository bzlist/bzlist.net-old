import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";

import {AngularFirestore} from "@angular/fire/firestore";

import {SettingsService} from "../services/settings.service";
import {Server, Player} from "../models/server.model";

@Component({
  selector: "app-server-page",
  templateUrl: "./server-page.component.html",
  styleUrls: ["./server-page.component.scss"]
})
export class ServerPageComponent implements OnInit, OnDestroy{
  routeSub: Subscription;
  serverDataSub: Subscription;

  address: string;
  port: number;

  server: Server;
  badAddress = false;

  playerCount = 0;
  observerCount = 0;

  constructor(private route: ActivatedRoute,
              private db: AngularFirestore,
              private settingsService: SettingsService){
  }

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.address = params["address"];
      this.port = +params["port"];

      this.serverDataSub = this.db.doc<Server>(`servers/${this.address}:${this.port}`).valueChanges().subscribe((data: Server) => {
        this.setData(data);
      });
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.serverDataSub.unsubscribe();
  }

  setData(server: Server): void{
    if(server == null){
      this.badAddress = true;
      return;
    }

    this.server = server;

    this.playerCount = 0;
    this.observerCount = 0;

    this.server.players = this.server.players.map(player => {
      if(player.team === "Observer"){
        this.observerCount++;
      }else{
        this.playerCount++;
      }

      return this.addPlayerScore(player);
    });
  }

  addPlayerScore(player: Player): Player{
    player.score = player.wins - player.losses;
    return player;
  }
}
