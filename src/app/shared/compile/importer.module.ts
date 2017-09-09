import {NgModule} from '@angular/core';
import { ChangeURLDialog } from 'app/customize/grid-menu/changeURLDialog.component';
import { MdDialogRef, MD_DIALOG_DATA, MdFormFieldModule, MdDialogModule, MdInputModule } from '@angular/material';
import { NgModel, FormsModule } from '@angular/forms';

/** Dummy module to declare imports for CompileModule. */
@NgModule({
    imports: [
        MdFormFieldModule,
        FormsModule,
        MdDialogModule,
        MdInputModule
    ],
    exports: [
        ChangeURLDialog
    ],
    declarations: [
        ChangeURLDialog
    ],
    entryComponents: [
        ChangeURLDialog
    ]
})
export class ImporterModule {
}