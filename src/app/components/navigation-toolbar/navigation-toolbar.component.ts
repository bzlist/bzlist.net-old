import {Component} from "@angular/core";

import {environment} from "@env/environment";

@Component({
  selector: "app-navigation-toolbar",
  templateUrl: "./navigation-toolbar.component.html",
  styleUrls: ["./navigation-toolbar.component.scss"]
})
export class NavigationToolbarComponent{
  version = environment.version;
}
