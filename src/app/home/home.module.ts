import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from 'app/home/home-page.component';


@NgModule({
    declarations: [
        HomePageComponent
    ],
    imports: [
        CommonModule,

        RouterModule.forChild([
            { path: '', component: HomePageComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class HomeModule {
}