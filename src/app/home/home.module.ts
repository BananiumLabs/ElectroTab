import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from 'app/home/dashboard-page/dashboard-page.component';
import { GridsterModule } from 'angular-gridster2';
import { GridContentComponent } from 'app/grid/grid-content.component';
import { WidgetService } from 'app/grid/widget.service';
import { CompileService } from 'app/shared/compile/compile.service';
import { CompileModule } from 'app/shared/compile/compile.module';

@NgModule({
    declarations: [
        DashboardPageComponent,
        GridContentComponent
    ],
    imports: [
        CommonModule,
        GridsterModule,

        RouterModule.forChild([
            { path: '', component: DashboardPageComponent },
        ]),

        CompileModule.forRoot({
            module: {
                imports: []
            }
        }),
    ],
    exports: [
        RouterModule,
        GridContentComponent
    ],
    providers: [
        WidgetService,
        CompileService
    ]
})
export class HomeModule {
}