// npm packages: DO NOT PUT ANY HERE UNLESS THEY ARE USED BY EVERY SINGLE PAGE!
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { AlertModule } from "ngx-bootstrap";
import { Routes, RouterModule } from "@angular/router";
import { MaterializeModule } from "angular2-materialize";
import {HttpModule, JsonpModule, Jsonp, Response} from "@angular/http";

import { AppComponent } from './app.component';

//Put your module routes here
const routes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'module1', loadChildren: 'app/module1/one.module#ModuleOne' },
    { path: 'module2', loadChildren: 'app/module2/two.module#ModuleTwo' }
]

//Don't forget to import everything!
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        AlertModule.forRoot(),
        RouterModule.forRoot(routes),
        MaterializeModule,
        JsonpModule,
        HttpModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}