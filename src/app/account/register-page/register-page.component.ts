import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "app/shared/auth.service";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
     errorRegister: boolean;
     successRegister: boolean;

    constructor(private authService: AuthService) {
    }

    isLoggedIn(): Observable<boolean> {
        return this.authService.isLoggedIn();
    }

    showError() {
 		 this.errorRegister = true;
 	 }

    showSuccess() {
      this.successRegister = true;
    }
}
