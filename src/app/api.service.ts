import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Server} from "./server";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService{
  readonly API_ROOT_URLS: string[] = ["https://bzlist.ns01.biz/api/", "http://localhost:3000/", "http://192.168.254.28:3000/"];
  
  constructor(private http: HttpClient){}

  getServers(apiIndex: number): Observable<Server[]>{
    if(apiIndex > this.API_ROOT_URLS.length || apiIndex < 0){
      apiIndex = 0;
    }

    return this.http.get<Server[]>(this.API_ROOT_URLS[apiIndex]);
  }
}