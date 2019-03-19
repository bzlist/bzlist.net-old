import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Server} from "./server";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ApiService{
  readonly API_ROOT_URL = "http://192.168.254.28:3000/";
  
  constructor(private http: HttpClient){}

  getServers(): Observable<Server[]>{
    return this.http.get<Server[]>(this.API_ROOT_URL);
  }
}
