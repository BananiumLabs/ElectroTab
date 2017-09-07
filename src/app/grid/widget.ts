/** Template to create a Widget object. */
export class Widget {
    /**The numeric ID of this widget. Must be unique! */
    id: number;
    /**The name that will be displayed. Make sure the capitalization, spaces, and punctuation are accurate. */
    name: string;
    /**The widget's HTML data. This will be injected into the grid when called. All Angular2 directives, all custom methods in our Widget API, and all Materialize directives are allowed. */
    template: string;
    /**Path of icon to display in the `Add Components` drawer. Path relative to `app/assets/images`. */
    icon?: string;
    /**OPTIONAL: The HTML data for the customization menu. Allowed to write to widget `setting` data, accessible using the field `item.data`. */
    menuTemplate?: string;
    /**OPTIONAL: The starting height of the widget. Default is 1 unit. */
    height?: number = 1;
    /**OPTIONAL: The starting width of the widget. Default is 1 unit. */
    width?: number = 1;
    /**OPTIONAL: The default value for the `setting` field. */
    defaultSetting?: string;
}