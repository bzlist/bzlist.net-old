import {Component, Input, ChangeDetectionStrategy} from "@angular/core";

import {Server} from "@app/models";

@Component({
  selector: "app-server-card",
  templateUrl: "./server-card.component.html",
  styleUrls: ["./server-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServerCardComponent{
  @Input() server: Server;
}
