import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ServiceWorkerModule} from "@angular/service-worker";

import {environment} from "@env/environment";

// modules
import {AppRoutingModule} from "./app-routing.module";

import {SocketIoModule} from "ngx-socket-io";

// services
import {SettingsService, AuthService, SeoService} from "@app/services";

// pipes
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {BooleanYesNoPipe} from "./pipes/boolean-yes-no.pipe";
import {NumberZeroNoPipe} from "./pipes/number-zero-no.pipe";
import {VerboseGameStylePipe} from "./pipes/verbose-game-style.pipe";
import {AutoPluralPipe} from "./pipes/auto-plural.pipe";

// components
import {AppComponent} from "./app.component";
import {ServersComponent} from "./components/servers/servers.component";
import {NavigationToolbarComponent} from "./components/navigation-toolbar/navigation-toolbar.component";
import {ServerCardComponent} from "./components/server-card/server-card.component";
import {ServersTableComponent} from "./components/servers-table/servers-table.component";
import {PlayersTableComponent} from "./components/players-table/players-table.component";
// ui
import {TableComponent} from "./components/ui/table/table.component";
import {CheckboxComponent} from "./components/ui/checkbox/checkbox.component";
import {SpinnerComponent} from "./components/ui/spinner/spinner.component";

// pages
import {ServerPageComponent} from "./pages/server-page/server-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HelpPageComponent} from "./pages/help-page/help-page.component";
import {AccountPageComponent} from "./pages/account-page/account-page.component";
import {PlayerListPageComponent} from "./pages/player-list-page/player-list-page.component";

@NgModule({
  declarations: [
    // components
    AppComponent,
    ServersComponent,
    NavigationToolbarComponent,
    ServerCardComponent,
    ServersTableComponent,
    TableComponent,
    PlayersTableComponent,
    CheckboxComponent,
    SpinnerComponent,
    // pages
    HomePageComponent,
    HelpPageComponent,
    ServerPageComponent,
    SettingsPageComponent,
    AccountPageComponent,
    PlayerListPageComponent,
    // pipes
    TimeAgoPipe,
    BooleanYesNoPipe,
    NumberZeroNoPipe,
    VerboseGameStylePipe,
    AutoPluralPipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "bzlist"}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production}),
    SocketIoModule.forRoot({url: "http://api.bzlist.net"})
  ],
  providers: [SettingsService, AuthService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
