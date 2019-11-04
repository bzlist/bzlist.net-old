import {Injectable} from "@angular/core";

import {AccountService} from "./account.service";

@Injectable({
  providedIn: "root"
})
export class SettingsService{
  static readonly prefix = "setting_";

  static readonly serverColumnsDefault = ["players", "address", "owner", "country", "gameStyle", "title"];
  static readonly playerColumnsDefault = ["callsign", "motto", "server", "team", "score", "winsLosses", "tks"];

  readonly serverColumns = ["players", "address", "owner", "protocol", "country", "gameStyle", "title"];
  readonly serverColumnNames = ["Players", "Address", "Owner", "Protocol", "Country", "Game Style", "Title"];

  readonly playerColumns = ["callsign", "motto", "server", "team", "score", "winsLosses", "tks"];
  readonly playerColumnNames = ["Callsign", "Motto", "Server", "Team", "Score", "Wins / Losses", "Team Kills"];

  private syncReady = false;

  getItem(key: string){
    try{
      return localStorage.getItem(key);
    }catch(err){
    }
  }

  setItem(key: string, value: string){
    try{
      localStorage.setItem(key, value);
    }catch(err){
    }

    this.updateSync();
  }

  removeItem(key: string){
    try{
      localStorage.removeItem(key);
    }catch(err){
    }

    this.updateSync();
  }

  getList(key: string, defaults: string[] = []): string[]{
    const data = this.getItem(`${SettingsService.prefix}${key}`);
    if(!data){
      return [...defaults];
    }

    return JSON.parse(data);
  }

  setList(key: string, value: string[], defaults: string[] = []): void{
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
    return this.getItem(`${SettingsService.prefix}theme`) ?
      this.getItem(`${SettingsService.prefix}theme`) : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  set theme(value: string){
    this.setItem(`${SettingsService.prefix}theme`, value);
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

  get showHiddenServers(): boolean{
    return this.getBool("showHiddenServers");
  }
  set showHiddenServers(value: boolean){
    this.setBool("showHiddenServers", value);
  }

  get syncSettings(): boolean{
    return this.getBool("syncSettings");
  }
  set syncSettings(value: boolean){
    this.setBool("syncSettings", value);
  }

  constructor(private accountService: AccountService){
    this.fetchSync();
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

  updateSync(): void{
    if(!this.syncSettings || !this.syncReady){
      return;
    }

    console.log("updating sync");

    const settings = {};
    for(let i = 0; i < localStorage.length; i++){
      const settingKey = localStorage.key(i);
      if(settingKey.startsWith(SettingsService.prefix) && settingKey !== SettingsService.prefix+"syncSettings"){
        settings[settingKey.replace(SettingsService.prefix, "")] = localStorage.getItem(settingKey);
      }
    }

    this.accountService.setSettings(settings);
  }

  async fetchSync(){
    if(!this.syncSettings){
      return;
    }

    // fetch settings
    const data = await this.accountService.getSettings();

    if(!data){
      return;
    }
    if(data.error){
      console.error("error getting settings:", data.error);
      return;
    }

    // clear local settings first
    const settings = [];
    for(let i = 0; i < localStorage.length; i++){
      if(localStorage.key(i).startsWith(SettingsService.prefix) && localStorage.key(i) !== SettingsService.prefix+"syncSettings"){
        settings.push(localStorage.key(i));
      }
    }
    for(let i = 0; i < settings.length; i++){
      localStorage.removeItem(settings[i]);
    }

    // set new settings
    for(const key in data){
      if(data.hasOwnProperty(key)){
        localStorage.setItem(SettingsService.prefix+key, data[key]);

        if(key === "theme"){
          // and transition to document
          document.documentElement.classList.add("transition");
          setTimeout(() => {
            document.documentElement.classList.remove("transition");
          }, 100);

          // set data-theme
          document.documentElement.setAttribute("data-theme", data[key]);
        }
      }
    }

    this.syncReady = true;
    console.log("sync ready");
  }
}
