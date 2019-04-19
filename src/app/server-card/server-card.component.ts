import {Component, Input} from "@angular/core";

import {Server} from "../server";

@Component({
  selector: "app-server-card",
  templateUrl: "./server-card.component.html",
  styleUrls: ["./server-card.component.scss"]
})
export class ServerCardComponent{
  @Input() server: Server;
}
