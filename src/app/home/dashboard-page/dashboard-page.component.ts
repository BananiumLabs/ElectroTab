import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Observable, BehaviorSubject } from "rxjs";

import {AuthService} from "app/shared/auth.service";
import {GridService} from 'app/grid/grid.service'
import {WidgetService} from 'app/grid/widget.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],

})
export class DashboardPageComponent {

  constructor(private authService: AuthService, private widgets: WidgetService, public grid: GridService) {
  }
  
  getSetting(setting) {
    return this.authService.getSetting(setting);
  }

  getWidgets() {
    return this.widgets;
  }
}
