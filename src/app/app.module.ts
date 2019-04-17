import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import {AppRoutingModule} from "./app-routing.module";

import {CookieService} from "ngx-cookie-service";

import {AppComponent} from "./app.component";
import {HomePageComponent} from "./HomePage/homePage.component";
import {HelpPageComponent} from "./HelpPage/helpPage.component";
import {ThirdPartyLicensesPageComponent} from "./ThirdPartyLicensesPage/thirdPartyLicensesPage.component";
import {ServersComponent} from "./Servers/servers.component";
import {ServerDialog} from "./ServerDialog/serverDialog.component";
import {MaterialModule} from "./material.module";
import {NavigationToolbarComponent} from "./navigation-toolbar/navigation-toolbar.component";
import {ServerPageComponent} from "./server-page/server-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HelpPageComponent,
    ThirdPartyLicensesPageComponent,
    ServersComponent,
    ServerDialog,
    NavigationToolbarComponent,
    ServerPageComponent
  ],
  entryComponents: [
    ServerDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule{
}
