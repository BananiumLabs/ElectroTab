import { Component, Inject, AfterViewInit, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from 'app/shared/user-info';
import {MaterializeModule} from "angular2-materialize";

@Component({
  selector: 'grid-menu',
  templateUrl: './grid-menu.component.html',
  styleUrls: ['./grid-menu.component.css'],

})
export class GridMenuComponent {
  dashboard: Array<Object>;
  gridLoaded: boolean;

  @Input()
  item: any;


  engines = ["Google", "Bing", "DuckDuckGo"];
  clocks = ["AnalogWhite", "AnalogGreen", "DigitalBlue"];

  url: string;

	constructor(private authService: AuthService, private router: Router, public dialog: MdDialog) {

   }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }

  getSetting(setting: string) {
    return this.authService.getSetting(setting);
  }
  changeURL() {
    this.openDialog();
    alert("Your Current URL Setting: " + this.item.setting);
    var txt;
    var url = prompt("Please enter the new website's url:");
    if (url == null || url == "") {
        alert("No changes has been made.");
        return;
    } else {
        txt = url;
    this.item.setting = url;
    }
  }


  openDialog(): void {
      let dialogRef = this.dialog.open(ChangeURLDialog, {
        width: '250px',
        data: {url: this.url }
      });
      dialogRef.componentInstance.dialogRef = dialogRef;

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.url = result;
      });
    }



  setSetting(setting: string, value: any) {
    this.authService.saveSetting(setting, value);
  }
}



@Component({
  selector: 'changeURL-dialog',
  templateUrl: 'changeURLDialog.html',
})
export class ChangeURLDialog {

  constructor(
    public dialogRef: MdDialogRef<ChangeURLDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
