import {Component, OnInit} from "@angular/core";

import {PlayersService} from "../../services/players.service";
import {SeoService} from "../../services/seo.service";

@Component({
  selector: "app-player-list-page",
  templateUrl: "./player-list-page.component.html",
  styleUrls: ["./player-list-page.component.scss"]
})
export class PlayerListPageComponent implements OnInit{
  constructor(public playersService: PlayersService,
              private seo: SeoService){
  }

  ngOnInit(){
    this.seo.generateTags({
      title: "Players - BZList",
      description: "Information about players currently playing BZFlag."
    });
  }
}
