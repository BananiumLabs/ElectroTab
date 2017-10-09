import {Component, OnInit, Input} from '@angular/core';
import {GridsterConfig} from 'angular-gridster2/dist/gridsterConfig.interface';
import { Observable } from "rxjs";
import { AuthService } from "app/shared/auth.service";
import { UserInfo } from 'app/shared/user-info';
import { NgClass, NgSwitch } from '@angular/common';
import { Router } from "@angular/router";
import { WidgetService } from 'app/grid/widget.service';
import { GridService } from 'app/grid/grid.service';

/**Delay, in milliseconds, of database methods which need to wait for initialization. */
const DELAY = 750;

@Component({
  selector: 'grid-edit-page',
  templateUrl: './grid-edit-page.component.html',
  styleUrls: ['./grid-edit-page.component.css']
})

export class GridEditPageComponent {

@Input()
widgetSearch: any;

  constructor(private authService: AuthService, private router: Router, private widgetService: WidgetService, public grid: GridService ) {
  }

  getWidgets(): WidgetService {
    return this.widgetService;
  }


 isLoggedIn(): Observable<boolean> {
   return this.authService.isLoggedIn();
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

 refresh() {
   location.reload();
 }
}
