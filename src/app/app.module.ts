import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ServiceWorkerModule} from "@angular/service-worker";

import {environment} from "@env/environment";

// modules
import {AppRoutingModule} from "./app-routing.module";

// services
import {SettingsService, AuthService, SeoService} from "@app/services";

// pipes
import {TimeAgoPipe, BooleanYesNoPipe, NumberZeroNoPipe, VerboseGameStylePipe, AutoPluralPipe} from "@app/pipes";

// components
import {AppComponent} from "./app.component";
import {ServersComponent, ServerCardComponent, ServersTableComponent, PlayersTableComponent} from "@app/components";
import {TableComponent, CheckboxComponent, DropdownComponent, DropdownOptionComponent, SearchComponent, SpinnerComponent} from "@app/components/ui";

import {HomePageComponent, HelpPageComponent, ServerPageComponent, SettingsPageComponent, PlayerListPageComponent} from "@app/pages";

@NgModule({
  declarations: [
    // components
    AppComponent,
    ServersComponent,
    ServerCardComponent,
    ServersTableComponent,
    TableComponent,
    PlayersTableComponent,
    CheckboxComponent,
    SpinnerComponent,
    DropdownComponent,
    DropdownOptionComponent,
    SearchComponent,
    // pages
    HomePageComponent,
    HelpPageComponent,
    ServerPageComponent,
    SettingsPageComponent,
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
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {enabled: environment.production})
  ],
  providers: [SettingsService, AuthService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
