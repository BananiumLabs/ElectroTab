import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from 'app/shared/user-info';
import {MaterializeModule} from "angular2-materialize";
import {WidgetService} from 'app/grid/widget.service'

@Component({
  selector: 'grid-content',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.css'],

})
export class GridContentComponent implements OnInit {
  dashboard: Array<Object>;
  gridLoaded: boolean;


  @Input()
  item: any;

  @Input()
  search: any;


	constructor(private authService: AuthService, private router: Router, private widgets: WidgetService) {

   }

   currentUser(): Observable<UserInfo> {
 		return this.authService.currentUser();
   }

  ngOnInit() {
    this.dashboard = [
  
    ];
  }

  getURL() : string {
    return "http://api.screenshotlayer.com/api/capture?access_key=a2f073b50b57b8c177482fa83b336efc&url=" + this.item.setting;
  }

  redirectToCustom() : any {
    window.location.href = this.item.setting;
  }

  refresh() {
    location.reload();
  }

  getGrid() {
    //console.log(this.authService.getCustom("grid"));
    var gridArr = this.authService.getCustom("grid");

    if (!this.gridLoaded && gridArr !== undefined) {
      for (var i = 0; i < gridArr.length; i++)
        this.dashboard.push(gridArr[i]);
      this.gridLoaded = true;
    }
  }

  searchFor(value: string, item: any) {
    if (value !== "" && value !== undefined && value !== null)
      if (item.setting !== "DuckDuckGo")
        window.location.href = 'https://' + item.setting + '.com/search?q=' + value;
    if (item.setting === "DuckDuckGo")
      window.location.href = 'https://' + item.setting + '.com/?q=' + value;
  }
}
