import { Widget } from './widget';

 /**Array containing all declared widgets. 
    * Allowed variables include `id`, `name`, `template`, `menu_template` (optional), `height` (optional), `width` (optional), `defaultSetting` (optional). */
export const WIDGETS : Widget[] = 
[

    {
        id: -1,
        name: "Invalid",
        hidden: true,
        template:
        `<div class="red-text">Invalid ID!</div>`
    },

    {
        id: 0,
        name: "Get Started",
        height: 2,
        width: 2,
        hidden: true,
        template:
        `<img src="../../../assets/images/favicon.png" alt="" class="responsive-img size" />
            <h2 class="center-align"[ngClass] = "(authService.getSetting('modifier') === 'dark' || authService.getSetting('color') === 'black') ? 'white-text' : ''" > Welcome to ElectroTab! </h2>
            <button class="btn-large waves-effect waves-light {{authService.getSetting('color')}}" type="submit" name="action" [routerLink]="['/customize/grid']"> Start Customizing</button>`
    },

    {
        id: 1,
        name: "ElectroTab Logo",
        icon: 'favicon.png',
        template: `
        <img src="../../../assets/images/favicon.png" alt="" class="responsive-img" />
        `
    },

    {
        id: 2,
        name: "Search Bar",
        width: 5,
        icon: 'search-icon.png',
        defaultSetting: 'Google',
        template: `
        <div id="searchform">
            <div class="input-field white center-align z-depth-2 card">
                <input #search id="search" ng-focus="true" (keyup.enter)="searchFor(search.value, item)" type="search" class="flow-text" placeholder="{{item.setting}} Search" required autofocus>
                <label class="label-icon" for="search" id="search-label"><i class="material-icons">search</i></label>
                <i id="search-label" class="material-icons">close</i>
            </div>
        </div>
        `,
        menuTemplate: `
        <form>
            <p *ngFor="let engine of engines">
                <input name="engineChoose" type="radio" id="{{engine}}" (click)="item.setting = engine" [checked]="engine === item.setting"/>
                <label for="{{engine}}" class="black-text">{{engine}}</label>
            </p>
        </form>`
    },

    {
        id: 3,
        name: "Clock",
        icon: 'clock.png',
        defaultSetting: 'AnalogWhite',
        template: `
        <div>
            <div [ngSwitch]="item.setting">
            <!-- White -->
            <iframe *ngSwitchCase='AnalogWhite' src="http://free.timeanddate.com/clock/i5u1qpwv/n283/szw160/szh160/cf100/hncfff" frameborder="0" width="160" height="160"></iframe>
            <!-- Green -->
            <iframe *ngSwitchCase='AnalogGreen' src="http://free.timeanddate.com/clock/i5u1qpwv/n283/szw160/szh160/hoc090/hbw4/hfc0c0/cf100/hnc0c0/fas20/facfff/fdi86/mqcfff/mqs2/mql3/mqw4/mqd70/mhcfff/mhs2/mhl3/mhw4/mhd70/mmv0/hhcfff/hhs2/hmcfff/hms2" frameborder="0" width="160" height="160"></iframe>
            <!-- Digital Blue -->
            <iframe *ngSwitchCase='DigitalBlue' src="http://free.timeanddate.com/clock/i5u1qpwv/n283/fs16/fc06f/tc0ff/pc9ff/ftb/pa8/tt0/tw1/th1/ta1/tb4" frameborder="0" width="208" height="52"></iframe>
            <div *ngSwitchDefault>Invalid</div>
            </div>
        </div>
        `,
        menuTemplate: `
        <form>
            <p *ngFor="let clock of clocks">
                <input name="clockChoose" type="radio" id="{{clock}}" (click)="item.setting = clock" [checked]="clock === item.setting"/>
                <label for="{{clock}}" class="black-text">{{clock}}</label>
            </p>
        </form>`
    },

    {
        id: 4,
        name: "Speed Dial",
        icon: 'shortcut.png',
        template:`
        <div>
            <div (click)="redirectToCustom()" class="fit">
                <div class="card horizontal z-depth-3 fit" [ngClass]="(authService.getSetting('color') !== 'none' || authService.getSetting('color') === 'black') ? 'white' : authService.getSetting('color') + ' lighten-4'">
                    <div class="card-content">
                        <img id="p2i" class="fit" [src]=getURL() />
                        <span class="webName">{{item.setting}}</span>
                    </div>
                </div>
            </div>
        </div>
        `
        ,
        menuTemplate: `
        <div class="padded">
            <a class="waves-effect waves-light btn {{authService.getSetting('color')}}" (click)="changeURL()">Change URL</a>
            <ol>
            <li>
                <button md-raised-button (click)="openDialog()">Pick one</button>
            </li>
            <li *ngIf="url">
                Your URL: <i>{{url}}</i>
            </li>
            </ol>`
    },


]
