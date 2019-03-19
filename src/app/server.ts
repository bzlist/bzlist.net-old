interface Team{
  name: string;
  players: number;
  wins: number;
  losses: number;
}

export interface Player{
  callsign: string;
  motto: string;
  team: string;
  wins: number;
  losses: number;
}

interface Configuration{
  gameStyle: string;
  timeLimit: number;
  maxShots: number;
  maxPlayers: number;
  maxPlayerScore: number;
  maxTeamScore: number;
  superflags: boolean;
  jumping: boolean;
  ricochet: boolean;
  inertia: boolean;
  shaking: boolean;
  antidoteFlags: boolean;
  handicap: boolean;
  noTeamKills: boolean;
  dropBadFlags: DropBadFlags;
}

interface DropBadFlags{
  wins: number;
  time: number;
}

export interface Server{
  address: string;
  port: number;
  ip: string;
  owner: string;
  protocol: string;
  country: string;
  timestamp: number;
  title: string;
  teams: Array<Team>;
  players: Array<Player>;
  configuration: Configuration;
}

export class ServerHelper{
  static verbose(server: Server): Server{
    server.configuration.gameStyle = this.verboseGameStyle(server);
    return server;
  }

  static verboseGameStyle(server: Server): string{
    switch(server.configuration.gameStyle){
      case "CTF":
        return "Capture The Flag";
      case "FFA":
        return "Free For All";
        case "OFFA":
          return "Open Free For All";
      default:
        console.log("Unable to verbose gameStyle: ", server.configuration.gameStyle);
        return server.configuration.gameStyle;
    }
  }
}