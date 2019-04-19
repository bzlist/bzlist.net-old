import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatSort, MatTableDataSource} from "@angular/material";

import {Subscription} from "rxjs";

import {AngularFirestore} from "@angular/fire/firestore";

import {SettingsService} from "../settings.service";
import {Server, Player, ServerHelper} from "../server";

@Component({
  selector: "app-server-page",
  templateUrl: "./server-page.component.html",
  styleUrls: ["./server-page.component.scss"]
})
export class ServerPageComponent implements OnInit, OnDestroy{
  @ViewChild(MatSort) playerSort: MatSort;

  routeSub: Subscription;

  address: string;
  port: number;

  serverDataSub: Subscription;

  server: Server;
  status: string = "";

  playerCount: number = 0;
  observerCount: number = 0;

  playerCollumns: string[] = ["callsign", "team", "score", "winsLosses"];
  playerData = new MatTableDataSource<Player>();

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

    setTimeout(() => this.playerData.sort = this.playerSort);
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.serverDataSub.unsubscribe();
  }

  setData(server: Server): void{
    this.observerCount = 0;
    this.playerCount = 0;

    if(server == null){
      this.status = "Server not found";
      this.playerData.data = null;

      return;
    }

    this.server = ServerHelper.verbose(server);

    this.playerData.data = this.server.players.map(player => {
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
