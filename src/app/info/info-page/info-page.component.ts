import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, BehaviorSubject} from "rxjs";

import { UserInfo } from "app/shared/user-info";
import {AuthService} from "app/shared/auth.service";

@Component({
    selector: 'app-info-page',
    templateUrl: './info-page.component.html',
    styleUrls: ['./info-page.component.css']
})
export class InfoPageComponent {
    userInfo: Observable<UserInfo>;
    isLoggedIn = new BehaviorSubject(false);
    constructor(private authService: AuthService, private router: Router) {
        this.userInfo = authService.userInfo;
        this.userInfo
            .map(userInfo => !userInfo.isAnonymous)
            .subscribe(this.isLoggedIn);
    }

    navigateToLogin(e) {
        this.router.navigate(['/login']);
        e.preventDefault();
    }

    navigateToRegister(e) {
        this.router.navigate(['/register']);
        e.preventDefault();
    }

    checkLogin(): boolean {
      if (this.authService.isLoggedInBool() === undefined || this.authService.isLoggedInBool() === null) {
        //console.log("Skipping Info Page Display");
        return false;
      }
      //console.log("Showing Info Page Display");
      return !this.authService.isLoggedInBool();

    }
    
   
}
