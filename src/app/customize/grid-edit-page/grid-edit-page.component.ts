import {Component, OnInit} from '@angular/core';
import {GridsterConfig} from 'angular-gridster2/dist/gridsterConfig.interface';
import { Observable } from "rxjs";
import { AuthService } from "app/shared/auth.service";
import { UserInfo } from 'app/shared/user-info';
import { NgClass, NgSwitch } from '@angular/common';
import { Router } from "@angular/router";

/**Delay, in milliseconds, of database methods which need to wait for initialization. */
const DELAY = 750;

@Component({
  selector: 'grid-edit-page',
  templateUrl: './grid-edit-page.component.html',
  styleUrls: ['./grid-edit-page.component.css']
})

export class GridEditPageComponent implements OnInit {
options: GridsterConfig;
dashboard: Array<Object>;
gridLoaded: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

 ngOnInit() {
   this.options = {
    //  gridType: 'fit',
    //  compactType: 'none',
    //  margin: 10,
    //   outerMargin: true,
    //   minCols: 1,
    //   maxCols: 100,
    //   minRows: 1,
    //   maxRows: 100,
    //   maxItemCols: 50,
    //   minItemCols: 1,
    //   maxItemRows: 50,
    //   minItemRows: 1,
    //   defaultItemCols: 1,
    //   defaultItemRows: 1,
    //   fixedColWidth: 250,
    //   fixedRowHeight: 250,
      keepFixedHeightInMobile: false,
     displayGrid: 'none',
     draggable: {
       enabled: true,
       ignoreContent: true, // if true drag will start only from elements from `dragHandleClass`
       dragHandleClass: 'drag-handler' // drag event only from this class. If `ignoreContent` is true.
     },
     resizable: {
       enabled: true
     },
     swap: true,
     pushItems: true
   };

   this.dashboard = [
      
    ];

   setTimeout(() => {
     this.getOptions();
     
     this.getGrid();
     this.gridLoaded = true;
   }, DELAY)
   setTimeout(() => {
     Observable.interval(2000).subscribe(x => {
       this.saveGrid();
     });
   }, DELAY * 2)
 }

 changedOptions() {
   this.options.api.optionsChanged();
   setTimeout(() => {
    //  console.log("options changed");
     this.saveOptions();
   }, DELAY)
   
 }

 removeItem($event, item) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

 addItem(id: number, height: number, width: number, hasMenu: boolean) {
   this.dashboard.push({id: id, cols: height, rows: width, menu: hasMenu});
 };

 //Adds an item with a custom setting value
 addItemCustom(id: number, height: number, width: number, hasMenu: boolean, settingValue: any) {
   this.dashboard.push({id: id, cols: height, rows: width, menu: hasMenu, setting: settingValue});
 };

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

 getOptions() {
   console.log("got options");
   Object.assign(this.options, this.authService.getCustom("gridOptions"));
 }

 getGrid() {
   var gridArr = this.authService.getCustom("grid");

   if(!this.gridLoaded && gridArr !== undefined) {
    for(var i = 0; i < gridArr.length; i++) 
      this.dashboard.push(gridArr[i]);
    // this.changedOptions();
   }
 }

 resetGrid() {
   this.dashboard = [{ cols: 2, rows: 2, y: 0, x: 0, id: 0 }];
   this.saveGrid();
 }

 resetOptions() {
   var defaultOptions = {
     gridType: 'fixed',
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
     keepFixedHeightInMobile: false,
     displayGrid: 'none',
     draggable: {
       enabled: true
     },
     resizable: {
       enabled: true
     },
     swap: true,
     pushItems: true
   };

   Object.assign(this.options, defaultOptions);
   this.saveOptions();
 }

 saveOptions() {
   
   var temp = JSON.parse(JSON.stringify(this.options));
   delete(temp.api);
   this.authService.saveCustom("gridOptions", temp);
 }

 saveGrid() {
   
   if(this.dashboard !== [] && this.authService.getCustom('grid') && JSON.stringify(this.authService.getCustom('grid')) !== JSON.stringify(this.dashboard)) {
     console.log('autosave grid');
     this.authService.saveCustom("grid", this.dashboard);
   }
    
 }

 searchFor(value: string) {
   if (value !== "" && value !== undefined && value !== null)
     if (this.getSetting('engine') !== "DuckDuckGo")
       window.location.href = 'https://' + this.getSetting('engine') + '.com/search?q=' + value;
   if (this.getSetting('engine') === "DuckDuckGo")
     window.location.href = 'https://' + this.getSetting('engine') + '.com/?q=' + value;
 }
}
