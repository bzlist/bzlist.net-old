import {Component, ViewEncapsulation} from "@angular/core";

import {SettingsService} from "../../services/settings.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent{
  constructor(public settingsService: SettingsService){
  }
}
