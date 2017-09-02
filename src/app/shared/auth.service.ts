import {Injectable, Inject} from "@angular/core";
import { Http, Response, Headers, RequestOptions,  Jsonp} from '@angular/http';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {UserInfo} from "./user-info";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';
import {dbconnect} from "./dbconnect";
import { URLSearchParams } from "@angular/http"


@Injectable()
export class AuthService {
    public database: dbconnect;
    public authed: boolean;
    static UNKNOWN_USER = {
        // Default Values
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null,
        isActive: false,
		color: null,
		emailVerified: null
    };

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(private angularFireAuth: AngularFireAuth, private jsonp: Jsonp, private http: Http, private db: AngularFireDatabase) {
        console.log("%cHi! :)", "color: green;font-size: x-large");
        console.log("%cIf there are any errors below, please file an issue at https://github.com/dbqeo/ElectroTab/issues. Thanks!", "color:red;font-size: medium");
    this.database = new dbconnect(db);

        this.angularFireAuth.authState.subscribe(user => {
            //console.log("user: ", JSON.stringify(user));
            //Initialize User Info
            this.user = user;
            let userInfo = new UserInfo();
            this.authed = false;
            if (user != null) { //User is logged in
                userInfo.isAnonymous = user.isAnonymous;
                userInfo.email = user.email;
                userInfo.displayName = user.displayName;
                userInfo.providerId = user.providerId;
                userInfo.photoURL = user.photoURL;
                userInfo.uid = user.uid;
                userInfo.emailVerified = user.emailVerified;

                //Sync user info with database
                this.saveCustom('email', user.email);
                this.getDB().verify(user.uid);
                userInfo.isActive = true;
                this.authed = true;

            } else { //User is not logged in
                this.user = null;
                userInfo.isAnonymous = true;
            }
            this.userInfo.next(userInfo);
        });



    }

/////////////////////////////Getters/////////////////////////////////////
    //Get user object
    getUID(): string {
          if (this.user != undefined && this.user != null)
          return this.user.uid;

    }

    //Get database object
    getDB(): dbconnect  {
      return this.database;
    }

    getCustom(item: string): any {
        var val;
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getCustom(this.getUID(), item, function(returnValue) {
                val = returnValue;
            });
        }
        return val;
    }

    getSetting(setting: string): any {
        var val;
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getSetting(this.getUID(), setting, function(returnValue) {
                val = returnValue;
            });
        }
        return val;
    }

    getCustomUID(uid: string, item: string): any {
        var val;
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getCustom(uid, item, function(returnValue) {
                val = returnValue;
            });
        }
        return val;
    }

    getAsyncCustom(item: string, callback) {
        var val;
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getCustom(this.getUID(), item, function(returnValue) {
                val = returnValue;
                callback(val);
            });
        }
    }

    getAsyncCustomUID(uid: string, item: string, callback) {
        if(this.currentUser() !== undefined && this.isLoggedInBool() !== undefined) {
            this.getDB().getCustomOnce(uid, item, function(returnValue) {
                callback(returnValue);
            });
        }
    }


/////////////////////////////Setters/////////////////////////////////////

    saveVersion(input: string) {
      this.saveCustom("version", input);
    }

    saveCustom(item: string, input: any) {
        this.getDB().saveCustom(item, input);
    }
    saveSetting(item: string, input: any) {
        this.getDB().saveSetting(item, input);
    }
    saveCustomUID(uid: string, item: string, input: any) {
        this.getDB().saveCustom(item, input);
    }

    checkData(uid: string, value: string, callback) {
        this.getDB().checkExist(uid, value, function(returnValue) {
 				 callback(returnValue);
 			 });
    }

///////////////////////////Oauth Functions////////////////////////////

    login(email: string, password: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        let result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userInfo.map(userInfo => !userInfo.isAnonymous);
    }
    isLoggedInBool(): boolean {
        return this.authed;
    }

    updateDisplayName(displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateProfile({displayName: displayName, photoURL: null})
            .then(() => {result.next("success")})
            .catch(err => result.error(err));
        return result;
    }

	sendEmailConfirm() {
	var user = this.angularFireAuth.auth.currentUser;
	user.sendEmailVerification().then(function() {
	  alert("Confirmation Email has been successfully sent!");
	  alert("P.S: Ignore this ugly popup. Material design/Better UI for popups coming soon! Bear with us :)");
	}).catch(function(error) {
	  alert("OH NO! An unexpected error has occured. please contact contact@enumc.com");
	});

	}

  currentUserAsVar() : any {
    return this.angularFireAuth.auth.currentUser;
  }


    createUser(email: string, password: string, displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({displayName: displayName, photoURL: null});
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                //auth.auth.updateProfile({displayName: displayName, photoURL: null});
                result.next("success");
            })
            .catch(err => result.error(err));

        return result.asObservable();
    }

    updateEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updateEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    updatePassword(password: string): Observable<string> {
        let result = new Subject<string>();
        this.user.updatePassword(password)
                .then(a => {
                    result.next("success");
                })
                .catch(err => result.error(err));
        return result.asObservable();
    }

    sendPasswordResetEmail(email: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.sendPasswordResetEmail(email)
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result;
    }

    loginViaProvider(provider: string): Observable<String> {
        let result = new Subject<string>();
        if (provider === "google") {
            this.angularFireAuth
                .auth
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(auth => result.next("success"))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        else if (provider === "github") {

            this.angularFireAuth
                .auth
                .signInWithPopup(new firebase.auth.GithubAuthProvider())
                .then(auth => result.next("success"))
                .catch(err => result.error(err));
            return result.asObservable();
        }
        result.error("Not a supported authentication method: " + provider)
        return result.asObservable();
    }
}
