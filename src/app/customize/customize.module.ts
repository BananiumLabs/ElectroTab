import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdIconModule,
  MdButtonModule,
  MdSelectModule,
  MdSliderModule,
  MdInputModule,
  MdTooltipModule,
  MdCheckboxModule,
  MdDialogModule,
  MdDialogRef,
  MdFormFieldModule
} from '@angular/material';

import { GridsterModule } from 'angular-gridster2';
import { MaterializeModule } from "angular2-materialize";
import 'hammerjs';

import { GridEditPageComponent } from 'app/customize/grid-edit-page/grid-edit-page.component';
import { ThemePageComponent } from 'app/customize/theme-page/theme-page.component';
import { SettingsPageComponent } from 'app/customize/settings-page/settings-page.component';
import { CompileService } from 'app/shared/compile/compile.service';
import { CompileModule } from 'app/shared/compile/compile.module';
import { HomeModule } from 'app/home/home.module';

@NgModule({
    declarations: [
        GridEditPageComponent,
        ThemePageComponent,
        SettingsPageComponent
    ],
    imports: [
        CommonModule,
        GridsterModule,
        FormsModule, ReactiveFormsModule,
        MdIconModule, MdButtonModule, MdSelectModule, MdSliderModule, MdInputModule, MdTooltipModule, MdCheckboxModule, MdFormFieldModule,
        MaterializeModule,
        MdDialogModule,
        HomeModule,

        CompileModule.forRoot({
            module: {
                imports: []
            }
        }),

        RouterModule.forChild([
            { path: 'settings', component: SettingsPageComponent },
            { path: 'theme', component: ThemePageComponent },
            { path: 'grid', component: GridEditPageComponent },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [

      CompileService,
      HomeModule,
      MdDialogModule

    ]
})
export class CustomizeModule {
}
