import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from 'app/home/dashboard-page/dashboard-page.component';
import { GridsterModule } from 'angular-gridster2';
import { GridContentComponent } from 'app/grid/grid-content.component';

@NgModule({
    declarations: [
        DashboardPageComponent,
        GridContentComponent,
    ],
    imports: [
        CommonModule,
        GridsterModule,

        RouterModule.forChild([
            { path: '', component: DashboardPageComponent },
        ]),
    ],
    exports: [
        RouterModule,
        GridContentComponent
    ]
})
export class HomeModule {
}