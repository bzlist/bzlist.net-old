import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomePageComponent} from "./HomePage/homePage.component";
import {HelpPageComponent} from "./HelpPage/helpPage.component";
import {ThirdPartyLicensesPageComponent} from "./ThirdPartyLicensesPage/thirdPartyLicensesPage.component";
import {ServerPageComponent} from "./server-page/server-page.component";

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
    path: "3rdpartylicenses",
    component: ThirdPartyLicensesPageComponent
  },
  {
    path: "s/:address/:port",
    component: ServerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
