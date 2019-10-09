import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomePageComponent, HelpPageComponent, ServerPageComponent, SettingsPageComponent, PlayerListPageComponent} from "./pages";

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "help",
    component: HelpPageComponent
  },
  {
    path: "s/:address/:port",
    component: ServerPageComponent
  },
  {
    path: "settings",
    component: SettingsPageComponent
  },
  {
    path: "players",
    component: PlayerListPageComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
