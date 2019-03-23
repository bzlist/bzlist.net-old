import {Component, Inject, ViewChild} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource} from "@angular/material";

import {Server, Player} from "../server";
import {Time} from "../time";

@Component({
  selector: "server-dialog",
  templateUrl: "./serverDialog.component.html",
  styleUrls: ["./serverDialog.component.scss"]
})
export class ServerDialog{
  playerCollumns: string[] = ["callsign", "team", "score", "winsLosses"];
  playerData = new MatTableDataSource<Player>(this.server.players);
  @ViewChild(MatSort) playerSort: MatSort;

  updated = "";

  constructor(public dialogRef: MatDialogRef<ServerDialog>, @Inject(MAT_DIALOG_DATA) public server: Server){
  }
  
  ngAfterViewInit(): void{
    this.updated = `${Time.autoFormatTime(Math.floor(new Date().getTime() / 1000 - this.server.timestamp))} ago (${Time.format(this.server.timestamp)})`;
    this.playerData.sort = this.playerSort;
  }
}