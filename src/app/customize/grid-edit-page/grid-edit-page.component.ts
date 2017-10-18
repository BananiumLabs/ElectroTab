import {Component, OnInit, Input} from '@angular/core';
import { NgClass, NgSwitch } from '@angular/common';
import { Observable } from "rxjs";

import {GridsterConfig} from 'angular-gridster2/dist/gridsterConfig.interface';

import { AuthService } from "app/shared/auth.service";
import { UserInfo } from 'app/shared/user-info';
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

  constructor(private authService: AuthService, private widgetService: WidgetService, public grid: GridService ) {
  }

  getWidgets(): WidgetService {
    return this.widgetService;
  }

 getSetting(setting: string) {
   return this.authService.getSetting(setting);
 }

 refresh() {
   location.reload();
 }
}
