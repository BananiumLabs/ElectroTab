import {Component, ViewChild, ElementRef} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "app/shared/auth.service";
import {UserInfo} from 'app/shared/user-info';
import { NgClass } from '@angular/common';
import {Router} from "@angular/router";

@Component({
    selector: 'app-plugin-page',
    templateUrl: './support-page.component.html',
    styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent {

    @ViewChild("color")
    private _colorElement: ElementRef;
    engineChoice: string;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngAfterViewInit() {

    }

    isLoggedIn(): Observable<boolean> {
        return this.authService.isLoggedIn();
    }

    currentUser(): Observable<UserInfo> {
        return this.authService.currentUser();
    }

    getSetting(setting: string) {
        return this.authService.getSetting(setting);
    }

    setSetting(setting: string, value: any) {
        this.authService.saveSetting(setting, value);
    }
    getEngine(): string {
        return this.authService.getSetting("engine").charAt(0).toUpperCase() + this.authService.getSetting("engine").slice(1);
    }
    setEngine() {
        console.log(this.engineChoice);
        //var engine = (this.getEngine() === 'Google') ? 'Bing' : 'Google';
        this.authService.saveSetting("engine", String(this.engineChoice));
        //this.engineChoice = selected;
        //console.log(this.engineChoice);
    }

    reload() {
        location.reload();
    }

    setColor() {
        if(this._colorElement.nativeElement.value !== undefined)
            this.authService.saveSetting("color", this._colorElement.nativeElement.value);
    }
}
