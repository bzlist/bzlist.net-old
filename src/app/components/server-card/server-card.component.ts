import {Component, Input} from "@angular/core";

import {Server} from "../../models/server.model";

@Component({
  selector: "app-server-card",
  templateUrl: "./server-card.component.html",
  styleUrls: ["./server-card.component.scss"]
})
export class ServerCardComponent{
  @Input() server: Server;
}
