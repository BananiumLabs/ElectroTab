import {Component} from "@angular/core";
import {AuthService} from "app/shared/auth.service";
import { Observable, BehaviorSubject } from "rxjs";
import {Router} from "@angular/router";
import {UserInfo} from 'app/shared/user-info';
import {MaterializeModule} from "angular2-materialize";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private alertType = null;
    private alertMessage = "";
    private color;
    public isLoggedIn = new BehaviorSubject<boolean>(false);

    constructor(private authService: AuthService, private router: Router) {
        this.authService.isLoggedIn().subscribe(this.isLoggedIn);
        this.color = this.getSetting('color');
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    getAuthService() : AuthService {
        return this.authService;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    onResetPasswordSuccess() {
        this.alertType = "success";
        this.alertMessage = "Reset Password Sent!";
    }

    onLoginSuccess() {
        this.alertType = "success";
        this.alertMessage = "Login Success!";
    }

    onRegisterSuccess() {
        this.alertType = "success";
        this.alertMessage = "User registered!";
    }

    onError(err) {
        this.alertType = "danger";
        this.alertMessage = err;
    }

    onLoggedOut() {
        // Just reset any displayed messsage.
        this.alertType = null;
        this.alertMessage = "";
    }

    alertClosed() {
        this.alertType = null;
        this.alertMessage = "";
    }

    getSetting(setting : string) {
        return this.authService.getSetting(setting);
    }

    setSetting(setting : string, value : any) {
        this.authService.saveSetting(setting, value);
    }

    migrateSettings() {
        this.authService.saveSetting('engine', this.authService.getCustom("engine").charAt(0).toUpperCase() + this.authService.getCustom("engine").slice(1));
        this.authService.saveCustom('engine', null);
        this.migrate('theme');
        this.migrate('modifier');
        this.migrate('clock');
        this.migrate('color');
    }

    migrate(item:string) {
        if(item) {
            this.authService.saveSetting(item, this.authService.getCustom(item));
            this.authService.saveCustom(item, null);
        }
        
    }


}
