import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

import {ServersComponent} from './Servers/servers.component';
import {HelpPageComponent} from './HelpPage/helpPage.component';

const routes: Routes = [
  {
    path: "",
    component: ServersComponent
  },
  {
    path: "help",
    component: HelpPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }