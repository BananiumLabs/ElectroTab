import { Injectable } from '@angular/core';
import { Widget } from './widget';

/** Manages the database of valid Widgets. Includes the `widget` array and the `getWidget()` method to get a widget based on the ID. */
@Injectable()
export class WidgetService {
    
    /**Array containing all declared widgets. 
     * Allowed variables include `id`, `name`, `template`, `menu_template` (optional), `height` (optional), `width` (optional), `defaultSetting` (optional). */
    widgets: Widget[] = [

        {
            id: -1, 
            name: "Invalid",
            template:
                `<div class="red-text">Invalid ID!</div>`
        },

        {
            id: 0, 
            name: "Get Started", 
            height: 2,
            width: 2,
            template:
            `<img src="../../../assets/images/favicon.png" alt="" class="responsive-img size" />
             <h2 class="center-align"[ngClass] = "(authService.getSetting('modifier') === 'dark' || authService.getSetting('color') === 'black') ? 'white-text' : ''" > Welcome to ElectroTab! </h2>
             <button class="btn-large waves-effect waves-light {{authService.getSetting('color')}}" type="submit" name="action" [routerLink]="['/customize/grid']"> Start Customizing</button>`
        },
            
        {
            id: 1, 
            name: "ElectroTab Logo", 
            icon: 'favicon.png',
            template:`
            <img src="../../../assets/images/favicon.png" alt="" class="responsive-img" />
            `
        },

        {
            id: 2, 
            name: "Search Bar", 
            width: 5,
            icon: 'search-icon.png',
            defaultSetting: 'Google',
            template:`
            <div id="searchform">
                <div class="input-field white center-align z-depth-2 card">
                    <input #search id="search" ng-focus="true" (keyup.enter)="searchFor(search.value, item)" type="search" class="flow-text" placeholder="{{item.setting}} Search" required autofocus>
                    <label class="label-icon" for="search" id="search-label"><i class="material-icons">search</i></label>
                    <i id="search-label" class="material-icons">close</i>
                </div>
            </div>
            `,
            menuTemplate: `
            <form>
                <p *ngFor="let engine of engines">
                    <input name="engineChoose" type="radio" id="{{engine}}" (click)="item.setting = engine" [checked]="engine === item.setting"/>
                    <label for="{{engine}}" class="black-text">{{engine}}</label>
                </p>
            </form>` 
        }
        
    ]

    /** Returns the widget with the given ID number.
     * @param {number} id - The ID of the widget to be retrieved.
     */
    getWidget(id: number) : Widget {
        var result = this.widgets.filter(widget => widget.id === id)[0];

        if(result)
            return result;

        return this.getWidget(-1);
    }
}