import * as firebase from 'firebase';
import {UserInfo} from "./user-info";
import { AuthService } from "app/shared/auth.service";
import {AppComponent} from "app/app.component";

export class dbconnect {

  constructor(){
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
    var db = firebase.database().ref('users').child(uid);
    var usersRef = firebase.database().ref('users');
		var theme : string;
		var gridInvalid : boolean;

    if(uid == undefined || uid == null)
      return;
		  //Get initial database values
			this.getUID(uid, function(returnValue) {
				theme = returnValue.theme;
        gridInvalid = returnValue.gridOptions.swap !== undefined;
	 		});


          db.once('value', function(snapshot) {

            //First time setup


            if (!snapshot.hasChild("settings"))
              db.update({
                "settings": {
                  theme: 'vanilla',
                  color: 'green',
                  modifier: 'none',
                  engine: 'Google',
                  clock: 0
                }
              });

            if(!snapshot.hasChild("gridOptions"))
              db.update( {
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
              db.update({
                "grid": [{ cols: 2, rows: 2, y: 0, x: 0, id: 0 }]
              });

          });
	}

	//Read from database
  getUID(uid: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid);
      db.on('value', function(data) {
          if(data.val() != undefined && data.val() != null )
            callback(data.val());
      });
    }
  }

  //Add custom field( ex. dynamic name, ip list )
  saveCustom(uid: string, name: string, data: any) {
      var db = firebase.database().ref('users').child(uid);
      db.update({
        [name]: data
      });
  }

  //Add custom setting
  saveSetting(uid: string, name: string, data: any) {
      var db = firebase.database().ref('users').child(uid).child('settings');
      db.update({
        [name]: data
      });
  }

  //read custom value from database
  getCustom(uid: string, name: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid).child(name);
      db.on('value', function(rtrn) {
          //if(rtrn.val() != undefined && rtrn.val() != null )
            callback(rtrn.val());
      });
    }
  }

  getCustomOnce(uid: string, name: string, callback) {
      if(uid != undefined) {
      var db = firebase.database().ref('users').child(uid).child(name);
      db.once('value', function(rtrn) {
          //if(rtrn.val() != undefined && rtrn.val() != null )
            callback(rtrn.val());
      });
    }
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

  checkExist(uid: string, value: string, callback) {
    var db = firebase.database().ref('users').child(uid);
    db.once('value', function(snapshot) {
      if (snapshot.hasChild(value))
        callback(true);

      else
        callback(false);
    });
  }

}
