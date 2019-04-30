import {Component, OnInit, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
// import {Title} from "@angular/platform-browser";

import {Subscription} from "rxjs";

import {AngularFirestore} from "@angular/fire/firestore";

import {SettingsService} from "../../services/settings.service";
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

  address: string;
  port: number;

  server: Server;
  badAddress = false;

  playerCount = 0;
  observerCount = 0;

  constructor(private route: ActivatedRoute,
              // private title: Title,
              private afs: AngularFirestore,
              private settingsService: SettingsService,
              private seo: SeoService){
  }

  ngOnInit(){
    // get the route params
    this.routeSub = this.route.params.subscribe(params => {
      // get the address and port
      this.address = params["address"];
      this.port = +params["port"];

      // subscrive the the server data
      this.serverDataSub = this.afs.doc<Server>(`servers/${this.address}:${this.port}`).valueChanges().subscribe((data: Server) => {
        this.setData(data);
      });
    });
  }

  ngOnDestroy(){
    // clean up subscriptions
    this.routeSub.unsubscribe();
    this.serverDataSub.unsubscribe();
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
      description: `${this.server.title} is hosted at ${this.server.address}:${this.server.port} and owned by ${this.server.owner}`
    });

    // this.title.setTitle(this.server.title + " - BZList");

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

  // adds score value to a player
  addPlayerScore(player: Player): Player{
    player.score = player.wins - player.losses;
    return player;
  }
}
