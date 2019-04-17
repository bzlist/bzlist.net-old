import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {MatSort, MatTableDataSource} from "@angular/material";

import {Subscription} from "rxjs";

import {CookieService} from "ngx-cookie-service";

import {ApiService} from "../api.service";
import {Server, Player, ServerHelper} from "../server";
import {Time} from "../time";

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

  server: Server;
  status: string = "";
  updated: string = "";

  playerCount: number = 0;
  observerCount: number = 0;

  playerCollumns: string[] = ["callsign", "team", "score", "winsLosses"];
  playerData = new MatTableDataSource<Player>();

  get compact(): boolean{
    return this.cookieService.get("compact") === "true" ? true : false;
  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private cookieService: CookieService){
  }

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.address = params["address"];
      this.port = +params["port"];

      this.update();
    });

    setTimeout(() => this.playerData.sort = this.playerSort);
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  update(): void{
    this.apiService.getServers().subscribe((servers: Server[]) => {
      this.server = servers.find(server => server.address == this.address && server.port == this.port);

      if(this.server == null){
        this.status = "Server not found";
        this.playerData.data = null;

        return;
      }

      this.server = ServerHelper.verbose(this.server);

      this.playerData.data = this.server.players.map(player => {
        if(player.team === "Observer"){
          this.observerCount++;
        }else{
          this.playerCount++;
        }

        return this.addPlayerScore(player);
      });

      this.updated = `${Time.autoFormatTime(Math.floor(new Date().getTime() / 1000 - this.server.timestamp))} ago (${Time.format(this.server.timestamp)})`;
    }, error => {
      this.status = "Error";
      console.error("API Error\n", error);
    });
  }

  addPlayerScore(player: Player): Player{
    player.score = player.wins - player.losses;
    return player;
  }
}
