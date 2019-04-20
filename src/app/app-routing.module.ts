import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomePageComponent} from "./HomePage/homePage.component";
import {HelpPageComponent} from "./HelpPage/helpPage.component";
import {ServerPageComponent} from "./server-page/server-page.component";
import {SettingsPageComponent} from "./settings-page/settings-page.component";

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
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
