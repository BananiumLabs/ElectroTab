import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Input} from '@angular/core';
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


  engines = ["Google", "Bing", "DuckDuckGo"];
  clocks = ["AnalogWhite", "AnalogGreen", "DigitalBlue"];

	constructor(private authService: AuthService, private router: Router, private widgets: WidgetService) {

   }

  currentUser(): Observable<UserInfo> {
    return this.authService.currentUser();
  }

  getSetting(setting: string) {
    return this.authService.getSetting(setting);
  }
  changeURL() {
    alert("Original: " + this.item.setting);
    var txt;
    var url = prompt("Please enter the website's url:", "https://www.google.com");
    if (url == null || url == "") {
        alert("User cancelled the prompt.");
        return;
    } else {
        txt = url;
    this.item.setting = url;
    }
  }

  setSetting(setting: string, value: any) {
    this.authService.saveSetting(setting, value);
  }
}
