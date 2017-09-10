//All credit for this source goes to Patrik Laszlo under the MIT license terms. Original repository https://github.com/patrikx3/angular-compile.
import {
    Directive,
    Input,
    Injectable,
    ViewContainerRef,
    OnInit,
    OnChanges,
    SimpleChanges,
    Type,
    ModuleWithProviders,
    NgModule,
} from '@angular/core';

import { CompileService } from './compile.service';

@Directive({ selector: '[p3x-compile]' })
@Injectable()
export class CompileAttribute implements OnInit, OnChanges{

    @Input('p3x-compile')
    html: string;

    @Input('p3x-compile-ctx')
    context:  any;

    @Input('p3x-compile-module')
    module:  NgModule;

    @Input('p3x-compile-imports')
    imports: Array<Type<any> | ModuleWithProviders | any[]>;

    @Input('item')
    item: any;

    async update() {
        if (this.html === undefined || this.html.trim() === '') {
            this.container.clear();
            return;
        }
        await this.service.compile({
            template: this.html,
            container: this.container,
            context: this.context,
            imports: this.imports,
            module: this.module,
            item: this.item
        })
    }

    ngOnInit() {
        this.update();
    }

    ngOnChanges(changes: SimpleChanges) {
        //fixme only update with the required changes
        this.update();
    }

    constructor(
        private container: ViewContainerRef,
        private service: CompileService
    ) {}
}