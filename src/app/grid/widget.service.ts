import { Injectable } from '@angular/core';
import { Widget } from './widget';
import { WIDGETS } from './widget-db';

/** Manages the database of valid Widgets. Includes the `widget` array and the `getWidget()` method to get a widget based on the ID. */
@Injectable()
export class WidgetService {
    
    widgets = WIDGETS;

    /** Returns the widget with the given ID number.
     * @param {number} id - The ID of the widget to be retrieved.
     */
    getWidget(id: number) : Widget {
        var result = this.widgets.filter(widget => widget.id === id);
        
        if(result) {
            if (result.length > 1) {
                console.error("WidgetIDError: Multiple widgets with the same id " + id);
                return this.getWidget(-1);
            }

            if (result)
                return result[0];
        }

        console.error("WidgetNotFoundError: Widget with id " + id + " does not exist or is improperly defined.");
        return this.getWidget(-1);
    }

    /** Returns the contents of the 'widgets' array that are not hidden.*/
    getWidgets() : Widget[] {
        var result = [];
        for(var i = 0; i < this.widgets.length; i++)
            if(!this.widgets[i].hidden)
                result.push(this.widgets[i]);

        return result;
    }
}