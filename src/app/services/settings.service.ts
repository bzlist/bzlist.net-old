import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService{
  static readonly prefix = "setting_";

  static readonly serverColumnsDefault = ["players", "address", "owner", "country", "gameStyle", "title"];
  static readonly playerColumnsDefault = ["callsign", "motto", "team", "score", "winsLosses", "tks"];

  readonly serverColumns = ["players", "address", "owner", "protocol", "country", "gameStyle", "title"];
  readonly serverColumnNames = ["Players", "Address", "Owner", "Protocol", "Country", "Game Style", "Title"];

  readonly playerColumns = ["callsign", "motto", "team", "score", "winsLosses", "tks"];
  readonly playerColumnNames = ["Callsign", "Motto", "Team", "Score", "Wins / Losses", "Team Kills"];

  getItem(key: string){
    try{
      return localStorage.getItem(key);
    }catch(err){
    }
  }

  setItem(key: string, value: string){
    try{
      return localStorage.setItem(key, value);
    }catch(err){
    }
  }

  removeItem(key: string){
    try{
      return localStorage.removeItem(key);
    }catch(err){
    }
  }

  private getList(key: string, defaults: string[] = []): string[]{
    const data = this.getItem(`${SettingsService.prefix}${key}`);
    if(!data){
      return [...defaults];
    }

    return JSON.parse(data);
  }

  private setList(key: string, value: string[], defaults: string[] = []): void{
    if(JSON.stringify(value) === JSON.stringify(defaults)){
      return this.removeItem(`${SettingsService.prefix}${key}`);
    }

    this.setItem(`${SettingsService.prefix}${key}`, JSON.stringify(value));
  }

  private getBool(key: string): boolean{
    return this.getItem(`${SettingsService.prefix}${key}`) === "true" ? true : false;
  }

  private setBool(key: string, value: boolean): void{
    if(!value){
      return this.removeItem(`${SettingsService.prefix}${key}`);
    }

    this.setItem(`${SettingsService.prefix}${key}`, value.toString());
  }

  get displayedServerColumns(): string[]{
    return this.getList("serverColumns", SettingsService.serverColumnsDefault);
  }
  get displayedPlayerColumns(): string[]{
    return this.getList("playerColumns", SettingsService.playerColumnsDefault);
  }

  get theme(): string{
    return this.getItem("theme");
  }
  set theme(value: string){
    this.setItem("theme", value);
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

  get newTables(): boolean{
    return this.getBool("newTables");
  }
  set newTables(value: boolean){
    this.setBool("newTables", value);
  }

  get onlyServersWithPlayers(): boolean{
    return this.getBool("onlyServersWithPlayers");
  }
  set onlyServersWithPlayers(value: boolean){
    this.setBool("onlyServersWithPlayers", value);
    location.reload();
  }

  get serverSort(): any{
    const data = this.getItem("serverSort");
    return data ? JSON.parse(data) : {sort: "playersCount", sortOrder: 1};
  }
  set serverSort(value: any){
    this.setItem("serverSort", JSON.stringify(value));
  }

  get playerSort(): any{
    const data = this.getItem("playerSort");
    return data ? JSON.parse(data) : {sort: "score", sortOrder: 1};
  }
  set playerSort(value: any){
    this.setItem("playerSort", JSON.stringify(value));
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
