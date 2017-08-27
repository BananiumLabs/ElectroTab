import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from "angular2-materialize";

import 'hammerjs';
import {
  MdIconModule,
  MdButtonModule,
  MdSelectModule,
  MdSliderModule,
  MdInputModule,
  MdTooltipModule,
  MdCheckboxModule
} from '@angular/material';

import { GridEditPageComponent } from 'app/customize/grid-edit-page/grid-edit-page.component';
import { ThemePageComponent } from 'app/customize/theme-page/theme-page.component';
import { SettingsPageComponent } from 'app/customize/settings-page/settings-page.component';
import { GridMenuComponent } from 'app/customize/grid-menu/grid-menu.component';

import { HomeModule } from 'app/home/home.module';

@NgModule({
    declarations: [
        GridEditPageComponent,
        ThemePageComponent,
        SettingsPageComponent,
        GridMenuComponent,
    ],
    imports: [
        CommonModule,
        GridsterModule,
        FormsModule, ReactiveFormsModule,
        MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule,
        MaterializeModule,

        HomeModule,

        RouterModule.forChild([
            { path: 'settings', component: SettingsPageComponent },
            { path: 'theme', component: ThemePageComponent },
            { path: 'grid', component: GridEditPageComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class CustomizeModule {
}  