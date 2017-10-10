import {Component} from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";

import { AuthService } from "app/shared/auth.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    public isLoggedIn = new BehaviorSubject<boolean>(false);
	 public register: boolean;
    public errorLogin: boolean;

    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
    }

    navigateToResetPassword($event) {
        this.router.navigate(['reset-password']);
    }

    navigateToHome() {
        this.router.navigate(['/']);
    }

	 showRegister() {
		 this.register = true;
	 }
   showError() {
		 this.errorLogin = true;
	 }
}
