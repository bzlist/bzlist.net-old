import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {share} from "rxjs/operators";

import {Server} from "./server";

@Injectable({
  providedIn: "root"
})
export class ApiService{
  readonly API_ROOT_URL: string = "https://gist.githubusercontent.com/The-Noah/020e7550a55ae88c5fd9e856e7afed65/raw/db.json";
  
  constructor(private http: HttpClient){}

  getServers(): Observable<Server[]>{
    return this.http.get<Server[]>(this.API_ROOT_URL).pipe(share());
  }
}