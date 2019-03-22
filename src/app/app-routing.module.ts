import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {HomePageComponent} from "./HomePage/homePage.component";
import {HelpPageComponent} from "./HelpPage/helpPage.component";
import {ThirdPartyLicensesPageComponent} from "./thirdPartyLicensesPage/thirdPartyLicensesPage.component";

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
    "component": ThirdPartyLicensesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }