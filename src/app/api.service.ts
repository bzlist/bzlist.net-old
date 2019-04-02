import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Server} from "./server";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService{
  readonly API_ROOT_URL: string = "https://gist.githubusercontent.com/The-Noah/020e7550a55ae88c5fd9e856e7afed65/raw/3c58ce9d6a2dfa408d19cc814248951154d9522d/db.json";
  
  constructor(private http: HttpClient){}

  getServers(): Observable<Server[]>{
    return this.http.get<Server[]>(this.API_ROOT_URL);
  }
}