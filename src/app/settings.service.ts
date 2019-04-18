import {Injectable} from "@angular/core";

import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SettingsService{
  readonly serverColumns = ["players", "address", "owner", "protocol", "country", "gameStyle", "title"];
  readonly serverColumnNames = ["Players", "Address", "Owner", "Protocol", "Country", "Game Style", "Title/Description"];

  readonly playerColumns = ["callsign", "team", "score", "winsLosses", "tks"];
  readonly playerColumnNames = ["Callsign", "Team", "Score", "Wins / Losses", "Team Kills"];

  get displayedServerColumns(): string[]{
    if(!this.cookieService.check("serverColumns")){
      return ["players", "address", "owner", "country", "gameStyle", "title"];
    }

    return JSON.parse(this.cookieService.get("serverColumns"));
  }
  get displayedPlayerColumns(): string[]{
    if(!this.cookieService.check("playerColumns")){
      return ["callsign", "team", "score", "winsLosses", "tks"];
    }

    return JSON.parse(this.cookieService.get("playerColumns"));
  }

  get compact(): boolean{
    return this.cookieService.get("compact") === "true" ? true : false;
  }
  set compact(value: boolean){
    this.cookieService.set("compact", value.toString());
  }

  constructor(private cookieService: CookieService){
  }

  toggleDisplayedServerColumn(column: string): void{
    if(!this.serverColumns.includes(column)){
      return;
    }

    const columns = this.displayedServerColumns;

    if(columns.includes(column)){
      columns.splice(columns.indexOf(column), 1);
    }else{
      columns.splice(this.serverColumns.indexOf(column), 0, column);
    }

    this.cookieService.set("serverColumns", JSON.stringify(columns));
  }

  toggleDisplayedPlayerColumn(column: string): void{
    if(!this.playerColumns.includes(column)){
      return;
    }

    const columns = this.displayedPlayerColumns;

    if(columns.includes(column)){
      columns.splice(columns.indexOf(column), 1);
    }else{
      columns.splice(this.playerColumns.indexOf(column), 0, column);
    }

    this.cookieService.set("playerColumns", JSON.stringify(columns));
  }
}
