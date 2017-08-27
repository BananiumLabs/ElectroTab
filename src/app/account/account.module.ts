import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from 'app/account/login-page/login-page.component';
import { RegisterPageComponent } from 'app/account/register-page/register-page.component';
import { LoginUserComponent } from 'app/account/login-user/login-user.component';
import { RegisterUserComponent } from 'app/account/register-user/register-user.component';
import { ResetPasswordComponent } from 'app/account/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        LoginUserComponent,
        RegisterUserComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        RouterModule.forChild([
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
        ]),
    ],
    exports: [
        RouterModule
    ]
})
export class AccountModule {
} 