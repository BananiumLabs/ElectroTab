import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
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
  
	constructor(private authService: AuthService, private router: Router) {

   }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }
  
  getSetting(setting: string) {
    return this.authService.getSetting(setting);
  }

  setSetting(setting: string, value: any) {
    this.authService.saveSetting(setting, value);
  }
}
