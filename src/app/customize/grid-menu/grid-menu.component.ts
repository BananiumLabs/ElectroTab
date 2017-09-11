import { Component, Inject, AfterViewInit, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from 'app/shared/user-info';
import {MaterializeModule} from "angular2-materialize";
import {HomeModule} from 'app/home/home.module';
import { WidgetService } from 'app/grid/widget.service';

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

  

	constructor(private authService: AuthService, private router: Router, private widgets: WidgetService) {
      
   }

  getWidgets() {
    return this.widgets;
  }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }

}
