import { Injectable, OnInit, Input } from '@angular/core';
import { NgClass, NgSwitch } from '@angular/common';
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { GridsterConfig } from 'angular-gridster2/dist/gridsterConfig.interface';

import { AuthService } from "app/shared/auth.service";
import { UserInfo } from 'app/shared/user-info';
import { WidgetService } from 'app/grid/widget.service';

/**Delay, in milliseconds, of database methods which need to wait for initialization. */
const DELAY = 750;

@Injectable()
/** Methods for managing the Grid using the Angular-Gridster2 API */
export class GridService  {
    options: GridsterConfig;
    dashboard: Array<any>;
    gridLoaded: boolean = false;

    height: number; //Height of the browser window

    @Input()
    widgetSearch: any;

    constructor(private authService: AuthService, private router: Router, private widgetService: WidgetService) {
        this.refreshHeight();
        this.onInit();
    }

    refreshHeight() {
        Observable.interval(2000).subscribe(x => {
            this.height = window.innerHeight - 64;
        });
        // console.log(this.height);
    }

    onInit() {
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
                enabled: false
            },
            swap: true,
            pushItems: true
        };

        this.dashboard = [

        ];
        
        //Autosave checking loop
        setTimeout(() => {

            this.getOptions();
            this.getGrid();
            
            // console.log(this.options.api);

            if(this.options.api)
                this.options.api.optionsChanged();

            if (!document.hidden)
                this.gridLoaded = true;

            Observable.interval(2000).subscribe(x => {
                //Switch between resizable and not resizable depending on if user is on edit page
                this.options.resizable.enabled = this.router.url == '/customize/grid';
                if(this.options.api)
                    this.options.api.optionsChanged();
                    
                this.getGrid();
            });
        }, DELAY);

    }

    changedOptions() {
        
        setTimeout(() => {
             console.log("options changed");
            this.saveOptions();
        }, DELAY)
    }

    removeItem($event, item) {
        $event.preventDefault();
        $event.stopPropagation();
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    addItem(id: number, height: number, width: number, hasMenu: boolean) {
        this.dashboard.push({ id: id, cols: height, rows: width, menu: hasMenu });
    };

    //Adds an item with a custom setting value
    addItemCustom(id: number, height: number, width: number, hasMenu: boolean, settingValue: any) {
        this.dashboard.push({ id: id, cols: height, rows: width, menu: hasMenu, setting: settingValue });
    };

    getOptions() {
        console.log("got options");
        Object.assign(this.options, this.authService.getCustom("gridOptions"));
    }

    getGrid() {
        var gridArr = this.authService.getCustom("grid");

        if (!this.gridLoaded && gridArr !== undefined) {
            for (var i = 0; i < gridArr.length; i++)
                this.dashboard.push(gridArr[i]);
            // this.changedOptions();
        }
    }

    resetGrid() {
        this.dashboard = [{ id: 0, cols: 2, rows: 2, y: 0, x: 0 }];
        this.saveGrid();
    }

    resetOptions() {
        var defaultOptions = {
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
            keepFixedHeightInMobile: false,
            displayGrid: 'none',
            swap: true,
            pushItems: true
        };

        Object.assign(this.options, defaultOptions);
        this.saveOptions();
    }

    saveOptions() {

        var temp = JSON.parse(JSON.stringify(this.options));
        delete (temp.api);
        this.authService.saveCustom("gridOptions", temp);
    }

    saveGrid() {
        if (this.router.url == '/customize/grid' && !document.hidden) {
            //  console.log('autosave grid');
            this.authService.saveCustom("grid", this.dashboard);
            this.getGrid();
        }
    }

    getWidgets() {
        return this.widgetService.getWidgets();
    }
}
