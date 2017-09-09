import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdFormFieldModule, MdInput } from '@angular/material';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
    selector: 'changeURL-dialog',
    templateUrl: '../../customize/grid-menu/changeURLDialog.html',
})
export class ChangeURLDialog {

    constructor(
        public dialogRef: MdDialogRef<ChangeURLDialog>,
        @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}