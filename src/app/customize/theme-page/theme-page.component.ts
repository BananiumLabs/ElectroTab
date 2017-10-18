import {Component, ViewChild, ElementRef} from "@angular/core";
import { NgClass } from '@angular/common';

import {AuthService} from "app/shared/auth.service";
import {UserInfo} from 'app/shared/user-info';

@Component({
    selector: 'app-theme-page',
    templateUrl: './theme-page.component.html',
    styleUrls: ['./theme-page.component.css']
})
export class ThemePageComponent {

    @ViewChild("color")
    private _colorElement: ElementRef;

    @ViewChild("dark")
    private _darkElement: ElementRef;
    
    constructor(private authService: AuthService) {
        
    }

    ngAfterViewInit() {

        if(this.getSetting('modifier') === 'dark')
            this._darkElement.nativeElement.checked = true;
        if(this.getSetting('modifier') === 'color') 
            this._colorElement.nativeElement.checked = true;
    }

    setModifier(mod : string) {
        if(( !this._darkElement.nativeElement.checked && mod === 'dark') || ( !this._colorElement.nativeElement.checked && mod === 'color'))
            this.authService.saveSetting('modifier', 'none');
        else
            this.authService.saveSetting('modifier', mod);
    }

    reload() {
        location.reload();
    }

    getSetting(setting: string) {
        return this.authService.getSetting(setting);
    }

    setSetting(setting: string, value: any) {
        this.authService.saveSetting(setting, value);
    }
}
