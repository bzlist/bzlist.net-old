import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService{
  static readonly prefix = "setting_";

  static readonly serverColumnsDefault = ["players", "address", "owner", "country", "gameStyle", "title"];
  static readonly playerColumnsDefault = ["callsign", "team", "score", "winsLosses", "tks"];

  readonly serverColumns = ["players", "address", "owner", "protocol", "country", "gameStyle", "title"];
  readonly serverColumnNames = ["Players", "Address", "Owner", "Protocol", "Country", "Game Style", "Title"];

  readonly playerColumns = ["callsign", "team", "score", "winsLosses", "tks"];
  readonly playerColumnNames = ["Callsign", "Team", "Score", "Wins / Losses", "Team Kills"];

  private getList(key: string, defaults: string[] = []): string[]{
    const data = localStorage.getItem(`${SettingsService.prefix}${key}`);
    if(!data){
      return defaults;
    }

    return JSON.parse(data);
  }

  private setList(key: string, value: string[], defaults: string[] = []): void{
    if(JSON.stringify(value) === JSON.stringify(defaults)){
      return localStorage.removeItem(`${SettingsService.prefix}${key}`);
    }

    localStorage.setItem(`${SettingsService.prefix}${key}`, JSON.stringify(value));
  }

  private getBool(key: string): boolean{
    return localStorage.getItem(`${SettingsService.prefix}${key}`) === "true" ? true : false;
  }

  private setBool(key: string, value: boolean): void{
    if(!value){
      return localStorage.removeItem(`${SettingsService.prefix}${key}`);
    }

    localStorage.setItem(`${SettingsService.prefix}${key}`, value.toString());
  }

  get displayedServerColumns(): string[]{
    return this.getList("serverColumns", SettingsService.serverColumnsDefault);
  }
  get displayedPlayerColumns(): string[]{
    return this.getList("playerColumns", SettingsService.playerColumnsDefault);
  }

  get darkMode(): boolean{
    return this.getBool("darkMode");
  }
  set darkMode(value: boolean){
    this.setBool("darkMode", value);
  }

  get compact(): boolean{
    return this.getBool("compact");
  }
  set compact(value: boolean){
    this.setBool("compact", value);
  }

  get gridView(): boolean{
    return this.getBool("gridView");
  }
  set gridView(value: boolean){
    this.setBool("gridView", value);
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

    this.setList("serverColumns", columns, SettingsService.serverColumnsDefault);
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

    this.setList("playerColumns", columns, SettingsService.playerColumnsDefault);
  }
}
