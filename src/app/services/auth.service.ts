import {Injectable} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

import * as firebase from "firebase/app";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";

interface User{
  uid: string;
  email: string;
  username?: string;
  bzid?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService{
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
          this.userDoc = this.afs.doc<User>(`users/${user.uid}`);
          return this.userDoc.valueChanges();
        }else{
          return of(null);
        }
      })
    );

    this.route.queryParams.subscribe(params => {
      if(params.username && params.token){
        this.connectBZFlag(params.username, params.token);
      }
    });
  }

  async googleSignin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async githubSignin(){
    const provider = new firebase.auth.GithubAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  bzflagSignin(){
    // window.location = "https://my.bzflag.org/weblogin.php?action=weblogin&url=https%3A%2F%2Fbzlist.net%2Faccount%3Fusername%3D%25USERNAME%25%26token%3D%25TOKEN%25"; // production
    // window.location = "https://my.bzflag.org/weblogin.php?action=weblogin&url=https%3A%2F%2Fdev.bzlist.net%2Faccount%3Fusername%3D%25USERNAME%25%26token%3D%25TOKEN%25"; // bleeding edge
    window.location = "https://my.bzflag.org/weblogin.php?action=weblogin&url=http%3A%2F%2Flocalhost%3A4200%2Faccount%3Fusername%3D%25USERNAME%25%26token%3D%25TOKEN%25"; // dev
  }

  connectBZFlag(username: string, token: string){
    this.http.get(`https://us-central1-bzlist-api.cloudfunctions.net/checkToken?callsign=${encodeURI(username)}&token=${token}`).subscribe((data: any) => {
      if(data.ok){
        this.userDoc.update({
          username,
          bzid: data.bzid
        });
      }else if(data.error){
        console.error("BZFlag check token error: ", data.error);
      }else{
        console.error("Unknown BZFlag check token error");
      }

      this.router.navigate([]);
    });
  }

  disconnectBZFlag(){
    this.userDoc.update({
      username: firebase.firestore.FieldValue.delete(),
      bzid: firebase.firestore.FieldValue.delete()
    })
  }

  updateUserData(user){
    this.userDoc = this.afs.doc<User>(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      settings: user.settings
    };

    return this.userDoc.set(data, {merge: true});
  }

  async signOut(){
    await this.afAuth.auth.signOut();
    this.router.navigate(["/"]);
  }
}
