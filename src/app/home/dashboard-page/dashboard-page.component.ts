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


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],

})
export class DashboardPageComponent implements AfterViewInit, OnInit {
  options: GridsterConfig;
  dashboard: Array<Object>;
  gridLoaded: boolean;

  userInfo: Observable<UserInfo>;
  isLoggedIn = new BehaviorSubject(false);

  private myUrl:any;

	@ViewChild("search")
  private _inputElement: ElementRef;

	constructor(private authService: AuthService, private router: Router) {

    this.redirect();

    this.userInfo = authService.userInfo;
    this.userInfo
      .map(userInfo => !userInfo.isAnonymous)
      .subscribe(this.isLoggedIn);
   }

   currentUser(): Observable<UserInfo> {
 		return this.authService.currentUser();
   }

  ngAfterViewInit() {
	 var that = this;
	 if(this._inputElement)
		this._inputElement.nativeElement.focus();

   if(document.getElementById("version_no")) {
		var version_no = document.getElementById("version_no").innerText;
		this.authService.saveVersion(version_no);
		console.log(version_no);
   }
   else {
     this.authService.saveVersion("NO_EXT");
	  console.log('Version Number Invalid!');
   }
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
  }

  searchFor(value: string) {
    if (value !== "" && value !== undefined && value !== null)
      if (this.getSetting('engine') !== "DuckDuckGo")
        window.location.href = 'https://' + this.getSetting('engine') + '.com/search?q=' + value;
    if (this.getSetting('engine') === "DuckDuckGo")
      window.location.href = 'https://' + this.getSetting('engine') + '.com/?q=' + value;
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

  getEngine(): string {
    return this.authService.getSetting("engine").charAt(0).toUpperCase() + this.authService.getSetting("engine").slice(1);
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  redirect() {
    setTimeout(() => {
      // console.log('redirect ran');
      console.log(this.isLoggedIn);
      if(!this.isLoggedIn.value)
        this.router.navigate(['info']);
    }, 1000)
      
  }

}
