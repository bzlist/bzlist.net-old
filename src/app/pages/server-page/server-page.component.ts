import {Component, OnInit, OnDestroy, HostListener, ViewChild, AfterViewInit} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

import {Subscription} from "rxjs";

import {Socket} from "ngx-socket-io";

import {SeoService} from "@app/services";
import {Server, Player} from "@app/models";

@Component({
  selector: "app-server-page",
  templateUrl: "./server-page.component.html",
  styleUrls: ["./server-page.component.scss"]
})
export class ServerPageComponent implements OnInit, AfterViewInit, OnDestroy{
  routeSub: Subscription;
  serverDataSub: Subscription;

  address: string;
  port: number;

  server: Server;
  badAddress = false;

  playerCount = 0;
  observerCount = 0;

  selectTeam = false;

  fixedHeader = false;
  @ViewChild("header", {static: false}) header;
  headerPosition: number;

  private teamSort: string;
  private teamSortOrder = 1;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private socket: Socket,
              private seo: SeoService){
  }

  ngOnInit(): void{
    // get the route params
    this.routeSub = this.route.params.subscribe(params => {
      // get the address and port
      this.address = params["address"];
      this.port = +params["port"];

      try{
        const servers = JSON.parse(localStorage.getItem(`serversCache`));
        const players = JSON.parse(localStorage.getItem(`playersCache`));

        if(servers && players){
          const _server = servers.filter((server: Server) => server.address === this.address && server.port === this.port)[0];
          _server.players = players.filter((player: Player) => player.server === `${this.address}:${this.port}`);
          this.setData(_server);
        }
      }catch(err){
      }

      this.serverDataSub = this.socket.fromEvent<Server>("data").subscribe((data: Server) => this.setData(data));
      this.socket.emit("server", {address: this.address, port: this.port});
    });
  }

  ngAfterViewInit(): void{
    this.headerPosition = this.header.nativeElement.offsetTop;
  }

  ngOnDestroy(): void{
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

    this.setPlayers();

    this.seo.generateTags({
      title: `${this.server.title} - BZList`,
      description: `${this.server.title} (${this.server.address}:${this.server.port}) is currently ${this.server.online ? "online" : "offline"} and owned by ${this.server.owner}`
    });

    this.teamSort = "";
    this.teamSortBy("score");

    console.log("server updated");
  }

  // set player data
  private setPlayers(): void{
    this.playerCount = 0;
    this.observerCount = 0;

    for(let i = 0; i < this.server.players.length; i++){
      this.server.players[i].score = this.server.players[i].wins - this.server.players[i].losses;

      if(this.server.players[i].team === "Observer"){
        this.observerCount++;
      }else{
        this.playerCount++;
      }
    }
  }

  teamSortBy(sort: string): void{
    if(sort === this.teamSort){
      this.teamSortOrder = -this.teamSortOrder;
    }else{
      this.teamSortOrder = 1;
    }
    this.teamSort = sort;

    switch(this.teamSort){
      case "name":
        this.server.teams.sort((a, b) => a.name > b.name ? this.teamSortOrder : -this.teamSortOrder);
        break;
      case "score":
        this.server.teams.sort((a, b) => a.wins - a.losses > b.wins - b.losses ? -this.teamSortOrder : this.teamSortOrder);
        break;
      case "players":
        this.server.teams.sort((a, b) => a.players > b.players ? -this.teamSortOrder : this.teamSortOrder);
        break;
      case "wins":
        this.server.teams.sort((a, b) => a.wins > b.wins ? -this.teamSortOrder : this.teamSortOrder);
        break;
      case "losses":
        this.server.teams.sort((a, b) => a.losses > b.losses ? -this.teamSortOrder : this.teamSortOrder);
        break;
      default:
        break;
    }
  }

  joinTeam(team: string){
    window.location.href = `bzflag-launcher:${this.server.address}:${this.server.port} ${team.toLowerCase()}`;
    this.selectTeam = false;
  }

  @HostListener("window:scroll", ["$event"])
  checkScroll(): void{
    this.fixedHeader = window.pageYOffset >= this.headerPosition;
  }
}
