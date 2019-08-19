import {Injectable} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {environment} from "@env/environment";

// user data structure
interface User{
  callsign: string;
  bzid: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService{
  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient){
    // get route query params when connecting to bzflag
    this.route.queryParams.subscribe(params => {
      if(params.username && params.token){
        this.connectBZFlag(params.username, params.token);
      }
    });
  }

  bzflagSignin(){
    window.location.href = environment.bzWebLoginURL;
  }

  // connect to bzflag account and make sure token is valid
  connectBZFlag(callsign: string, token: string){
    // make request to cloud function
    this.http.get(`https://us-central1-bzlist-api.cloudfunctions.net/checkToken?callsign=${encodeURI(callsign)}&token=${token}`).subscribe((data: any) => {
      if(data.ok){
        // if the token is valid update the user information
        // this.userDoc.update({
        //   callsign,
        //   bzid: data.bzid
        // });
      }else if(data.error){
        console.error("BZFlag check token error: ", data.error);
      }else{
        console.error("Unknown BZFlag check token error");
      }

      // remove the query params
      this.router.navigate([]);
    });
  }
}
