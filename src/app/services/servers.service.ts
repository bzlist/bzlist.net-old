import {Injectable} from "@angular/core";

import {SettingsService} from "./settings.service";
import {SocketService} from "./socket.service";
import {Server} from "@app/models";

@Injectable({
  providedIn: "root"
})
export class ServersService{
  private _servers: Server[];

  lastUpdate = -1;
  playerCount = 0;
  observerCount = 0;

  constructor(private settingsService: SettingsService,
              private socketService: SocketService){
    try{
      this.setServers(JSON.parse(localStorage.getItem("serversCache")));
    }catch(err){
    }

    this.socketService.on<Server[]>("servers").subscribe((data: Server[]) => this.setServers(data));
    this.socketService.emit("servers", {onlinePlayers: this.settingsService.onlyServersWithPlayers});
  }

  get servers(): Server[]{
    return this._servers;
  }

  private setServers(servers: Server[]): void{
    this.playerCount = 0;
    this.observerCount = 0;

    let timestamp = 0;
    for(let i = 0; i < servers.length; i++){
      this.playerCount += servers[i].playersCount;

      const observerTeam = servers[i].teams.find((team) => team.name === "Observer");
      if(observerTeam){
        this.observerCount += observerTeam.players;
        this.playerCount -= observerTeam.players;
      }

      if(servers[i].timestamp > timestamp){
        timestamp = servers[i].timestamp;
      }
    }

    servers.sort((a, b) => a.playersCount > b.playersCount ? -1 : 1);
    this._servers = servers;

    this.lastUpdate = timestamp;

    try{
      return localStorage.setItem("serversCache", JSON.stringify(this.servers));
    }catch(err){
    }

    console.log("servers updated");
  }
}
