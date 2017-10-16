import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private widgets: WidgetService, private router: Router, public grid: GridService) {

    setTimeout(() => {
    if(!authService.getUID())
      router.navigate(['/info']);
    }, 750);
  }
  
  getSetting(setting) {
    return this.authService.getSetting(setting);
  }

  getWidgets() {
    return this.widgets;
  }
}
