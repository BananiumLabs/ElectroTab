//All credit for this source goes to Patrik Laszlo under the MIT license terms. Original repository https://github.com/patrikx3/angular-compile.
import {
    Component,
    NgModule,
    Injectable,
    Compiler,
    ViewContainerRef,
    ModuleWithProviders,
    Type,
    Optional,
    Inject
} from '@angular/core';

import { Observable } from 'rxjs';

import { NgModel, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdFormFieldModule, MdDialogModule } from '@angular/material';

import { AuthService } from '../auth.service';
import { WidgetService } from 'app/grid/widget.service';
import { GridService } from 'app/grid/grid.service';
import { ChangeURLDialog } from 'app/customize/grid-menu/changeURLDialog.component';
import { ImporterModule } from './importer.module';

import { cloneDeep } from 'lodash';

export interface CompileOptions {
    template: string;
    container: ViewContainerRef;
    imports?: Array<Type<any> | ModuleWithProviders | any[]>;
    context?: any,
    onCompiled?: Function,
    onError?: Function;
    module?: NgModule;
    uid: string;
}

const cache : any = {};

export class CompileServiceConfig {
    module: NgModule
}

let SingletonDefaultModule: NgModule;

@Injectable()
export class CompileService  {

    constructor(
        private compiler: Compiler,
        @Optional() config: CompileServiceConfig,
    ) {
        if (config !== undefined && config !== null) {
            if (config.module !== undefined && config.module !== null) {
                SingletonDefaultModule = config.module;
            }
        }
    }

    public async compile(opts: CompileOptions) {
        try {
            const factory = await this.createFactory(opts);
            opts.container.clear();
            const cmp : any = opts.container.createComponent(factory);
            cmp.instance.context = opts.context;
        } catch (e) {
            if (opts.onError) {
                opts.onError(e)
            } else {
                console.error(e);
            }
        }
    }

    private async createFactory(opts: CompileOptions) {
        const cacheKey = opts.template;

        if (Object.keys(cache).indexOf(cacheKey) > -1) {
            return cache[cacheKey];
        }

        cache[cacheKey] = (async() => {

            try {


                @Component({
                    template: opts.template,
                    styleUrls: ['widget.css']
                })
                class TemplateComponent {
                    context: any
                    item: any 

                    constructor(private authService: AuthService, public widget: WidgetService, public dialog: MdDialog, private grid: GridService ) {
                        // console.log(opts);

                        // console.log(grid.dashboard.findIndex(x => x.uid == opts.uid));
                        this.getItem();
                        
                        // this.item = opts.item;
                        // console.log(this.item);

                        // Observable.interval(2000).subscribe(x => {
                        //     console.log(this.item.uid + ',' + this.item.setting);
                        // });
                    }

                    getItem() {
                        this.item = this.grid.dashboard[this.grid.dashboard.findIndex(x => x.uid == opts.uid)];
                    }

                    

                    //WIDGET FUNCTIONS: TEMPORARY//

                    engines = ["Google", "Bing", "DuckDuckGo"];
                    clocks = ["AnalogWhite", "AnalogGreen", "DigitalBlue"];

                    getURL(url: string): string {
                        //return "http://api.screenshotlayer.com/api/capture?access_key=a2f073b50b57b8c177482fa83b336efc&url=" + url;
                        //Above Deprecated Due To 100 calls/month limit
                        return "http://electrotab.epizy.com/getWebSnapshot.php?link="+ url;
                    }

                    refresh() {
                        location.reload();
                    }

                    navigate(url: string) {
                        if(url && url.includes('.')) {
                            if(url.charAt(6) === '/')
                                window.location.href = url;
                            else
                                window.location.href = "//" + url;
                        } else
                            console.warn('URL invalid or undefined. Cannot navigate.');

                    }

                    searchFor(value: string) {
                        if (value !== "" && value !== undefined && value !== null)
                            if (this.item.setting !== "DuckDuckGo")
                                window.location.href = 'https://' + this.item.setting + '.com/search?q=' + value;
                        if (this.item.setting === "DuckDuckGo")
                            window.location.href = 'https://' + this.item.setting + '.com/?q=' + value;
                    }

                    changeURL() {
                        this.openDialog();
                        alert("Your Current URL Setting: " + this.item.setting);
                        var url = prompt("Please enter the new website's url:");
                        if (url == null || url == "") {
                            alert("No changes has been made.");
                            return;
                        } else {
                            this.item.setting = url;
                        }
                    }


                    openDialog(): void {
                        let dialogRef = this.dialog.open(ChangeURLDialog, {
                            width: '250px',
                            data: { url: this.item.setting }
                        });
                        dialogRef.componentInstance.dialogRef = dialogRef;

                        dialogRef.afterClosed().subscribe(result => {
                            console.log('The dialog was closed');
                            this.saveSetting(result);
                        });
                    }

                    /**Sets the item setting to the given value. */
                    saveSetting(value: any) : void {
                        // var gridArray = [];
                        // gridArray = (this.authService.getCustom("grid"));
                        
                        // gridArray[gridArray.findIndex(x => x.uid == opts.item)].setting = value;

                        // console.log(gridArray);
                        // this.authService.saveCustom("grid", gridArray);

                        this.getItem();
                        // this.item.setting = value;
                        this.grid.dashboard[this.grid.dashboard.findIndex(x => x.uid == opts.uid)].setting = value;
                        // console.log(this.item);
                    }
                }



                let module : NgModule = {};
                if (opts.module !== undefined) {
                    module = cloneDeep(opts.module);
                } else if (SingletonDefaultModule !== undefined && SingletonDefaultModule !== null) {
                    module = cloneDeep(SingletonDefaultModule);
                }
                module.entryComponents = [ChangeURLDialog];
                module.imports = module.imports || [];
                module.imports.push( CommonModule );
                module.imports.push( BrowserModule );
                module.imports.push( RouterModule );
                module.imports.push( FormsModule );
                module.imports.push( MdFormFieldModule );
                module.imports.push( MdDialogModule );
                module.imports.push( ImporterModule );

                module.providers = module.providers || [];
                module.providers.push( MdDialog );

                if (opts.imports !== undefined) {
                    module.imports = module.imports.concat(opts.imports)
                }
                if (module.declarations === undefined) {
                    module.declarations = [
                        TemplateComponent
                    ];
                } else {
                    module.declarations.push(TemplateComponent);

                }
                @NgModule(module)
                class TemplateModule {
                }
                const component = await this.compiler.compileModuleAndAllComponentsAsync(TemplateModule);
                const factory = component.componentFactories.find((comp) =>
                    comp.componentType === TemplateComponent
                );
                cache[cacheKey] = factory;
                if (opts.onCompiled) {
                    opts.onCompiled(component);
                }
                return factory;
            } catch (e) {
                delete cache[cacheKey];
                throw e;
            }
        })();

        return cache[cacheKey];
    }
}
