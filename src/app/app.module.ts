// npm packages: DO NOT PUT ANY HERE UNLESS THEY ARE USED BY EVERY SINGLE PAGE!
import { CommonModule } from '@angular/common';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { GridsterModule } from 'angular-gridster2';
import { AlertModule } from "ngx-bootstrap";
import { Routes, RouterModule } from "@angular/router";
import { MaterializeModule } from "angular2-materialize";
import {HttpModule, JsonpModule, Jsonp, Response} from "@angular/http";

import { firebaseConfig } from "environments/firebaseConfig";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

// scripts
import { LoggedInGuard } from "app/shared/logged-in-guard";
import { AuthService } from "app/shared/auth.service";

const routes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'info', loadChildren: 'app/info/info.module#InfoModule' },
    { path: 'account', loadChildren: 'app/account/account.module#AccountModule' }, 
    // { path: 'customize', loadChildren: 'app/customize/customize.module#CustomizeModule' }
]

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        GridsterModule,
        AlertModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig, "ElectroTab"),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
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
    providers: [AuthService, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// // Below is a list of all the imports needed. Move them to other modules if they require these dependencies.
// import {BrowserModule} from "@angular/platform-browser";
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {NgModule} from "@angular/core";
// import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {GridsterModule} from 'angular-gridster2';
// import {HttpModule, JsonpModule, Jsonp, Response} from "@angular/http";
// import {AlertModule} from "ngx-bootstrap";
// import {Routes, RouterModule} from "@angular/router";
// import { MaterializeModule } from "angular2-materialize";

// import {firebaseConfig} from "environments/firebaseConfig";
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

// // scripts
// import { LoggedInGuard } from "app/shared/logged-in-guard";
// import {AuthService} from "app/shared/auth.service";

// import 'hammerjs';
// import {
//   MdIconModule,
//   MdButtonModule,
//   MdSelectModule,
//   MdSliderModule,
//   MdInputModule,
//   MdTooltipModule,
//   MdCheckboxModule
// } from '@angular/material';

// @NgModule({
//   
//     imports: [
//         BrowserModule,
//         BrowserAnimationsModule,
//         FormsModule,
//         JsonpModule,
//         MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule,
//         GridsterModule,
//         ReactiveFormsModule,
//         HttpModule,
//         AlertModule.forRoot(),
//         AngularFireModule.initializeApp(firebaseConfig, "ElectroTab"),
//         AngularFireDatabaseModule,
//         AngularFireAuthModule,
//         RouterModule.forRoot(routes),
//         MaterializeModule
//       ],
//     providers: [AuthService, LoggedInGuard],
//     bootstrap: [AppComponent]
// })
// export class AppModule {
// }
