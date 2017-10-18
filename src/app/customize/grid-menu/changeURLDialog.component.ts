import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdFormFieldModule, MdInput, MdInputModule } from '@angular/material';
import { NgModel, FormsModule } from '@angular/forms';

import { AuthService } from 'app/shared/auth.service';

@Component({
    selector: 'changeURL-dialog',
    templateUrl: '../../customize/grid-menu/changeURLDialog.html',
    styleUrls: ['changeURLDialog.component.css']
})
export class ChangeURLDialog {

    constructor(
        public dialogRef: MdDialogRef<ChangeURLDialog>,
        @Inject(MD_DIALOG_DATA) public data: any, private authService: AuthService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getAuthService() : AuthService {
        return this.authService;
    }

}