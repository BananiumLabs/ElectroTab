import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfoPageComponent } from 'app/info/info-page/info-page.component';
import { FaqPageComponent } from 'app/info/faq-page/faq-page.component';
import { SupportPageComponent } from 'app/info/support-page/support-page.component';
import {MaterializeModule} from "angular2-materialize";
import {Ng2PageScrollModule} from 'ng2-page-scroll';

@NgModule({
    declarations: [
        InfoPageComponent,
        FaqPageComponent,
        SupportPageComponent
    ],
    imports: [
        CommonModule,
        MaterializeModule,
        Ng2PageScrollModule,

        RouterModule.forChild([
            { path: '', component: InfoPageComponent },
            { path: 'faq', component: FaqPageComponent },
            { path: 'support', component: SupportPageComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class InfoModule {
}