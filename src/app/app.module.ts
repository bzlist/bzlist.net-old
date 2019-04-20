import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from "@angular/service-worker";

import {environment} from "../environments/environment";

import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";

// firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {firebase} from "./firebase";

import {CookieService} from "ngx-cookie-service";
import {SettingsService} from "./services/settings.service";

// pipes
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {BooleanYesNoPipe} from "./pipes/boolean-yes-no.pipe";
import {NumberZeroNoPipe} from "./pipes/number-zero-no.pipe";
import {VerboseGameStylePipe} from "./pipes/verbose-game-style.pipe";

// components
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {HelpPageComponent} from "./help-page/help-page.component";
import {ServersComponent} from "./servers/servers.component";
import {NavigationToolbarComponent} from "./navigation-toolbar/navigation-toolbar.component";
import {ServerPageComponent} from "./server-page/server-page.component";
import {SettingsPageComponent} from "./settings-page/settings-page.component";
import {ServerCardComponent} from "./server-card/server-card.component";
import {ServersTableComponent} from "./servers-table/servers-table.component";
import {TableComponent} from "./table/table.component";
import {PlayersTableComponent} from "./players-table/players-table.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HelpPageComponent,
    ServersComponent,
    NavigationToolbarComponent,
    ServerPageComponent,
    SettingsPageComponent,
    ServerCardComponent,
    ServersTableComponent,
    TableComponent,
    PlayersTableComponent,
    TimeAgoPipe,
    BooleanYesNoPipe,
    NumberZeroNoPipe,
    VerboseGameStylePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production}),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [
    CookieService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
