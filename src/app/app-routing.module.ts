import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HelpPageComponent} from "./pages/help-page/help-page.component";
import {ServerPageComponent} from "./pages/server-page/server-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {AccountPageComponent} from "./pages/account-page/account-page.component";

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
    path: "account",
    component: AccountPageComponent
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
