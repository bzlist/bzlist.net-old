import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

import {Subscription} from "rxjs";

import {AngularFirestore} from "@angular/fire/firestore";

import {SeoService} from "../../services/seo.service";

import {Server, Player} from "../../models/server.model";

@Component({
  selector: "app-server-page",
  templateUrl: "./server-page.component.html",
  styleUrls: ["./server-page.component.scss"]
})
export class ServerPageComponent implements OnInit, OnDestroy{
  routeSub: Subscription;
  serverDataSub: Subscription;
  playerDataSub: Subscription;

  address: string;
  port: number;

  server: Server;
  players: Player[];
  badAddress = false;

  playerCount = 0;
  observerCount = 0;

  selectTeam = false;

  constructor(private route: ActivatedRoute,
              private afs: AngularFirestore,
              private seo: SeoService,
              private sanitizer: DomSanitizer){
  }

  ngOnInit(){
    // get the route params
    this.routeSub = this.route.params.subscribe(params => {
      // get the address and port
      this.address = params["address"];
      this.port = +params["port"];

      // subscribe the the server data
      this.serverDataSub = this.afs.doc<Server>(`servers/${this.address}:${this.port}`).valueChanges().subscribe((data: Server) => {
        this.setData(data);
      });

      // subscribe the the player data
      this.playerDataSub = this.afs.collection<Player>("players", ref =>
        ref.where("server", "==", `${this.address}:${this.port}`).orderBy("callsign", "asc")
      ).valueChanges().subscribe((data: Player[]) => {
        this.setPlayers(data);
      });
    });
  }

  ngOnDestroy(){
    // clean up subscriptions
    this.routeSub.unsubscribe();
    this.serverDataSub.unsubscribe();
    this.playerDataSub.unsubscribe();
  }

  // sets the server data and metadata
  setData(server: Server): void{
    this.server = server;

    if(this.server == null){
      this.badAddress = true;

      this.seo.generateTags({
        title: "Unknown Server - BZList",
        description: `${this.address}:${this.port} is not in the database`
      });

      return;
    }

    this.seo.generateTags({
      title: `${this.server.title} - BZList`,
      description: `${this.server.title} (${this.server.address}:${this.server.port}) is currently ${this.server.online ? "online" : "offline"} and owned by ${this.server.owner}`
    });
  }

  // set player data
  private setPlayers(players: Player[]): void{
    this.playerCount = 0;
    this.observerCount = 0;

    for(let i = 0; i < players.length; i++){
      players[i].score = players[i].wins - players[i].losses;

      if(players[i].team === "Observer"){
        this.observerCount++;
      }else{
        this.playerCount++;
      }
    }

    this.players = players;
  }

  joinTeam(team: string){
    window.location.href = `bzflag-launcher:${this.server.address}:${this.server.port} ${team}`;
    this.selectTeam = false;
  }

  sanitize(url: string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
