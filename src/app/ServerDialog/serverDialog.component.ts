import {Component, Inject, ViewChild, OnInit} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource} from "@angular/material";

import {Server, Player} from "../server";
import {Time} from "../time";

@Component({
  selector: "server-dialog",
  templateUrl: "./serverDialog.component.html",
  styleUrls: ["./serverDialog.component.scss"]
})
export class ServerDialog implements OnInit{
  playerCollumns: string[] = ["callsign", "team", "score", "winsLosses"];
  playerData = new MatTableDataSource<Player>();
  @ViewChild(MatSort) playerSort: MatSort;

  updated = "";

  constructor(public dialogRef: MatDialogRef<ServerDialog>, @Inject(MAT_DIALOG_DATA) public server: Server){
  }
  
  ngOnInit(): void{
    this.playerData.data = this.server.players.map(player => this.addPlayerScore(player));

    this.updated = `${Time.autoFormatTime(Math.floor(new Date().getTime() / 1000 - this.server.timestamp))} ago (${Time.format(this.server.timestamp)})`;
    setTimeout(() => this.playerData.sort = this.playerSort);
  }

  addPlayerScore(player: Player): Player{
    player.score = player.wins - player.losses;
    return player;
  }
}