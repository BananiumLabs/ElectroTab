import * as firebase from 'firebase';
import {UserInfo} from "./user-info";
import { AuthService } from "app/shared/auth.service";
import {AppComponent} from "app/app.component";
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

export class dbconnect {

  user : FirebaseObjectObservable<any>;
  uid : string;
  db : AngularFireDatabase;

  constructor(db: AngularFireDatabase){
    this.db = db;

    var app = firebase.initializeApp({
      apiKey: "AIzaSyBjPOhHoGlvgBvgtr6Sfpg9OsIao2Ux8a8",
      authDomain: "electrotab-project.firebaseapp.com",
      databaseURL: "https://electrotab-project.firebaseio.com",
      projectId: "electrotab-project",
      storageBucket: "electrotab-project.appspot.com",
      messagingSenderId: "503957073726"
    });

	}


	//Make sure all database items are valid
  verify(uid: string) {

    if(!uid)
      return;

    this.user = this.db.object('/users/' + uid, { preserveSnapshot: true });

    this.uid = uid;

    this.user.subscribe(snapshot => {
      console.log(snapshot.val())

        if (!snapshot.hasChild("settings"))
          this.user.update({
            "settings": {
              theme: 'vanilla',
              color: 'green',
              modifier: 'none',
              engine: 'Google',
              clock: 0
            }
          });

        if (!snapshot.hasChild("gridOptions"))
          this.user.update({
            "gridOptions": {
              gridType: 'fit',
              compactType: 'none',
              margin: 10,
              outerMargin: true,
              minCols: 1,
              maxCols: 100,
              minRows: 1,
              maxRows: 100,
              maxItemCols: 50,
              minItemCols: 1,
              maxItemRows: 50,
              minItemRows: 1,
              defaultItemCols: 1,
              defaultItemRows: 1,
              fixedColWidth: 250,
              fixedRowHeight: 250,
              displayGrid: 'none',
            }
          });

        if (!snapshot.hasChild("grid"))
          this.user.update({
            "grid": [{ cols: 2, rows: 2, y: 0, x: 0, id: 0 }]
          });

      });

	}

  //Add custom field( ex. dynamic name, ip list )
  saveCustom(name: string, data: any) {
    this.user.update({
      [name]: data
    });
  }

  //Add custom setting
  saveSetting(name: string, data: any) {
    this.db.object('/users/' + this.uid + '/settings/').update({
      [name]: data
    });
  }


  template(uid: string) {

    if(!uid)
      return;

    this.user = this.db.object('/users/' + uid, { preserveSnapshot: true });

    this.uid = uid;

    this.user.subscribe(snapshot => {
      console.log(snapshot.val())
      if (!snapshot.hasChild("settings"))
        this.user.update({
          "settings": {
            theme: 'vanilla',
            color: 'green',
            modifier: 'none',
            engine: 'Google',
            clock: 0
          }
        });
        });
      }






  //read custom value from database
  getCustom(name: string, callback) {
    console.log(name);
    this.db.object('users/' + this.uid + `/${name}`, { preserveSnapshot: true }).subscribe(snapshot => {
      console.log(snapshot.val());
      callback(snapshot.val());
    });
  }

  getCustomOnce(uid: string, name: string, callback) {
      this.getCustom(name, function(rtrn) {
        return rtrn;
      });
  }

  //read custom value from settings object
  getSetting(uid: string, name: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid).child('settings').child(name);
      db.on('value', function(rtrn) {
          //if(rtrn.val() != undefined && rtrn.val() != null )
            callback(rtrn.val());
      });
    }
  }
}
