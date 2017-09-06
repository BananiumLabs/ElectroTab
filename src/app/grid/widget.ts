/** Template to create a Widget object. */
export class Widget {
    /**The numeric ID of this widget. Must be unique! */
    id: number;
    /**The name that will be displayed. Make sure the capitalization, spaces, and punctuation are accurate. */
    name: string;
    /**The widget's HTML data. This will be injected into the grid when called. All Angular2 directives, all custom methods in our Widget API, and all Materialize directives are allowed. */
    html: string;
}