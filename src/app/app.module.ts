import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ServiceWorkerModule} from "@angular/service-worker";

import {environment} from "../environments/environment";

// modules
import {AppRoutingModule} from "./app-routing.module";
import {MaterialModule} from "./material.module";

// firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {firebase} from "./firebase.config";

// services
import {SettingsService} from "./services/settings.service";
import {AuthService} from "./services/auth.service";
import {SeoService} from "./services/seo.service";

// pipes
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {BooleanYesNoPipe} from "./pipes/boolean-yes-no.pipe";
import {NumberZeroNoPipe} from "./pipes/number-zero-no.pipe";
import {VerboseGameStylePipe} from "./pipes/verbose-game-style.pipe";

// components
import {AppComponent} from "./app.component";
import {ServersComponent} from "./components/servers/servers.component";
import {NavigationToolbarComponent} from "./components/navigation-toolbar/navigation-toolbar.component";
import {ServerCardComponent} from "./components/server-card/server-card.component";
import {ServersTableComponent} from "./components/servers-table/servers-table.component";
import {TableComponent} from "./components/table/table.component";
import {PlayersTableComponent} from "./components/players-table/players-table.component";
import {CheckboxComponent} from "./components/checkbox/checkbox.component";

// pages
import {ServerPageComponent} from "./pages/server-page/server-page.component";
import {SettingsPageComponent} from "./pages/settings-page/settings-page.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HelpPageComponent} from "./pages/help-page/help-page.component";
import {AccountPageComponent} from "./pages/account-page/account-page.component";

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
    // pages
    HomePageComponent,
    HelpPageComponent,
    ServerPageComponent,
    SettingsPageComponent,
    AccountPageComponent,
    // pipes
    TimeAgoPipe,
    BooleanYesNoPipe,
    NumberZeroNoPipe,
    VerboseGameStylePipe
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "bzlist"}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production}),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule.enablePersistence({experimentalTabSynchronization: true}),
    AngularFireAuthModule
  ],
  providers: [SettingsService, AuthService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
