import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Module2PageComponent } from 'app/module2/module-2-page.component';


@NgModule({
    declarations: [
        Module2PageComponent
    ],
    imports: [
        CommonModule,

        RouterModule.forChild([
            { path: '', component: Module2PageComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class ModuleTwo {
}