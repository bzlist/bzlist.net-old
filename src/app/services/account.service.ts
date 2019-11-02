import {Injectable} from "@angular/core";

import {environment} from "@env/environment";

@Injectable({
  providedIn: "root"
})
export class AccountService{
  get callsign(): string{
    try{
      return localStorage.getItem("callsign");
    }catch(err){
    }
  }
  set callsign(value: string){
    try{
      if(value === null){
        localStorage.removeItem("callsign");
      }else{
        localStorage.setItem("callsign", value);
      }
    }catch(err){
    }
  }

  get token(): string{
    try{
      return localStorage.getItem("token");
    }catch(err){
    }
  }
  set token(value: string){
    try{
      if(value === null){
        localStorage.removeItem("token");
      }else{
        localStorage.setItem("token", value);
      }
    }catch(err){
    }
  }

  signedIn = false;
  bzid: string;
  error: string;

  constructor(){
    this.checkToken();
  }

  async checkToken(){
    this.error = "";

    if(!this.callsign || !this.token){
      this.signedIn = false;
      return;
    }

    const data = await this.api("", {callsign: this.callsign, token: this.token});

    if(data.error){
      console.error("error checking token:", data.error);
      this.error = data.error;
      this.signedIn = false;
      return;
    }

    this.signedIn = data.valid;
    this.bzid = data.bzid;
  }

  async login(callsign: string, token: string){
    if(callsign === this.callsign && this.token){
      await this.checkToken();
      if(this.signedIn){
        return;
      }
    }

    const data = await this.api("token", {callsign, token});

    if(data.token){
      this.callsign = callsign;
      this.token = data.token;
      this.checkToken();
      console.log(`signed in as ${this.callsign} with token ${this.token}`);
    }

    if(data.error){
      console.error("error signing in:", data.error);
      this.error = data.error;
    }
  }

  signin(): void{
    window.location.href = environment.bzWebLoginURL;
  }

  async getSettings(){
    if(!this.callsign || !this.token){
      return;
    }

    return this.api("settings", {callsign: this.callsign, token: this.token});
  }

  setSettings(settings: Object): void{
    if(!this.callsign || !this.token){
      return;
    }

    this.api("settings", {callsign: this.callsign, token: this.token, settings}, "PATCH");
  }

  async signout(){
    const data = await this.api("token", {callsign: this.callsign, token: this.token}, "DELETE");

    if(data.error){
      console.error("error signing out:", data.error);
      this.error = data.error;
    }else{
      this.callsign = null;
      this.token = null;
      this.signedIn = false;
    }
  }

  async delete(){
    const data = await this.api("", {callsign: this.callsign, token: this.token}, "DELETE");

    if(data.error){
      console.error("error delete account:", data.error);
      this.error = data.error;
    }else{
      this.callsign = null;
      this.token = null;
      this.signedIn = false;
    }
  }

  private async api(endpoint: string, body: Object, method = "POST"): Promise<any>{
    return fetch(`https://api.bzlist.net/users/${endpoint}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method,
      body: JSON.stringify(body)
    }).then((res: Response) => res.json()).catch(console.error);
  }
}
