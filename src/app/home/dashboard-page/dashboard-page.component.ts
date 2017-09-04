import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, HostListener} from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";
import {UserInfo} from 'app/shared/user-info';
import {MaterializeModule} from "angular2-materialize";
import { GridsterConfig } from 'angular-gridster2/dist/gridsterConfig.interface';

/**Delay, in milliseconds, of database methods which need to wait for initialization. */
const DELAY = 750;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],

})
export class DashboardPageComponent implements  OnInit {
  options: GridsterConfig;
  dashboard: Array<Object>;
  gridLoaded: boolean;

  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);

  private myUrl:any;

	constructor(private authService: AuthService, private router: Router) {

    setTimeout(() => {
      if (!this.isLoggedIn.value)
        this.router.navigate(['info']);
    }, DELAY)

    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
   }

   currentUser(): Observable<UserInfo> {
 		return this.authService.currentUser();
   }

  ngOnInit() {
    this.options = {
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
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      swap: false,
      pushItems: false
    };



    this.dashboard = [

    ];

    setTimeout(() => {
      this.getGrid();
      this.getOptions();
    }, DELAY)

    
  }

  getSetting(setting: string) {
    return this.authService.getSetting(setting);
  }

  setSetting(setting: string, value: any) {
    this.authService.saveSetting(setting, value);
  }

  getOptions() {
    Object.assign(this.options, this.authService.getCustom("gridOptions"));
    Object.assign(this.options, {
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false
      },
      swap: false,
      pushItems: false
    });
  }

  getGrid() {
    //console.log(this.authService.getCustom("grid"));
    var gridArr = this.authService.getCustom("grid");

    if (!this.gridLoaded && gridArr !== undefined) {
      for (var i = 0; i < gridArr.length; i++)
        this.dashboard.push(gridArr[i]);
      this.getOptions();
      this.changedOptions();
      this.gridLoaded = true;
    }
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }
}
