import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from "./app.component";
import {HelpPageComponent} from "./HelpPage/helpPage.component";
import {ServersComponent} from "./Servers/servers.component";
import {ServerDialog} from "./ServerDialog/serverDialog.component";
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    HelpPageComponent,
    ServersComponent,
    ServerDialog
  ],
  entryComponents: [
    ServerDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{

}