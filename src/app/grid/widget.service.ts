import { Injectable } from '@angular/core';
import { Widget } from './widget';

/** Manages the database of valid Widgets. Includes the `widget` array and the `getWidget()` method to get a widget based on the ID. */
@Injectable()
export class HeroService {

    widgets: Widget[] = [
        {id: -1, name: "Invalid", html:'<div class="red-text">Invalid ID!</div>'},
        {id: 0, name:"test", html:""}
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