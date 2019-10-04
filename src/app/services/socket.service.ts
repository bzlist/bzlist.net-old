import {Injectable, PLATFORM_ID, Inject} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

import * as io from "socket.io-client";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class SocketService{
  private socket: any;

  constructor(@Inject(PLATFORM_ID) private platformId: string){
    // do not initialize if not running in a browser
    if(!isPlatformBrowser(this.platformId)){
      return;
    }

    this.socket = io("https://api.bzlist.net");
  }

  public emit(message: string, data: any = null): void{
    this.socket.emit(message, data);
  }

  public on<T>(message: string): Observable<T>{
    return new Observable<T>((observer) => this.socket.on(message, (data: any) => observer.next(data)));
  }
}
