import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import { UserInfo } from "app/shared/user-info";

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent {
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
}
