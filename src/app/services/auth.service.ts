import {Injectable} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {environment} from "@env/environment";

import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

import {auth, firestore} from "firebase/app";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

// user data structure
interface User{
  uid: string;
  email: string;
  username?: any;
  bzid?: any;
}

@Injectable({
  providedIn: "root"
})
export class AuthService{
  // user data
  user: Observable<User>;
  private userDoc: AngularFirestoreDocument<User>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore){
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if(user){
          // get the document for the authed user
          this.userDoc = this.afs.doc<User>(`users/${user.uid}`);
          return this.userDoc.valueChanges();
        }else{
          return of(null);
        }
      })
    );

    // get route query params when connecting to bzflag
    this.route.queryParams.subscribe(params => {
      if(params.username && params.token){
        this.connectBZFlag(params.username, params.token);
      }
    });
  }

  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async githubSignin(){
    const provider = new auth.GithubAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  bzflagSignin(){
    window.location.href = environment.bzWebLoginURL;
  }

  // connect to bzflag account and make sure token is valid
  connectBZFlag(username: string, token: string){
    // make request to cloud function
    this.http.get(`https://us-central1-bzlist-api.cloudfunctions.net/checkToken?callsign=${encodeURI(username)}&token=${token}`).subscribe((data: any) => {
      if(data.ok){
        // if the token is valid update the user information
        this.userDoc.update({
          username,
          bzid: data.bzid
        });
      }else if(data.error){
        console.error("BZFlag check token error: ", data.error);
      }else{
        console.error("Unknown BZFlag check token error");
      }

      // remove the query params
      this.router.navigate([]);
    });
  }

  disconnectBZFlag(){
    this.userDoc.update({
      username: firestore.FieldValue.delete(),
      bzid: firestore.FieldValue.delete()
    });
  }

  private updateUserData(user){
    this.userDoc = this.afs.doc<User>(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email
    };

    return this.userDoc.set(data, {merge: true});
  }

  async signOut(){
    await this.afAuth.auth.signOut();
  }
}
