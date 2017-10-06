import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from 'app/home/dashboard-page/dashboard-page.component';
import { GridsterModule } from 'angular-gridster2';
import { WidgetService } from 'app/grid/widget.service';
import { GridService } from 'app/grid/grid.service';
import { CompileService } from 'app/shared/compile/compile.service';
import { CompileModule } from 'app/shared/compile/compile.module';

@NgModule({
    declarations: [
        DashboardPageComponent
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
        RouterModule
    ],
    providers: [
        WidgetService,
        CompileService,
        GridService
    ]
})
export class HomeModule {
}