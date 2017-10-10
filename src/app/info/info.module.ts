import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {MaterializeModule} from "angular2-materialize";

import { InfoPageComponent } from 'app/info/info-page/info-page.component';
import { NewsPageComponent } from 'app/info/news-page/news-page.component';
import { SupportPageComponent } from 'app/info/support-page/support-page.component';

@NgModule({
    declarations: [
        InfoPageComponent,
        NewsPageComponent,
        SupportPageComponent
    ],
    imports: [
        CommonModule,
        MaterializeModule,
        Ng2PageScrollModule,

        RouterModule.forChild([
            { path: '', component: InfoPageComponent },
            { path: 'news', component: NewsPageComponent },
            { path: 'support', component: SupportPageComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class InfoModule {
}