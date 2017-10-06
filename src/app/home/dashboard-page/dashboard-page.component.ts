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

import {GridService} from 'app/grid/grid.service'
import {WidgetService} from 'app/grid/widget.service'

/**Delay, in milliseconds, of database methods which need to wait for initialization. */
const DELAY = 500;

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],

})
export class DashboardPageComponent {
  options: GridsterConfig;
  dashboard: Array<Object>;
  gridLoaded: boolean;

  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);

  private myUrl:any;

  constructor(private authService: AuthService, private router: Router, private widgets: WidgetService, public grid: GridService) {
   }

  
  getSetting(setting) {
    return this.authService.getSetting(setting);
  }

  getWidgets() {
    return this.widgets;
  }
}
