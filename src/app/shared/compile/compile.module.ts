//All credit for this source goes to Patrik Laszlo under the MIT license terms. Original repository https://github.com/patrikx3/angular-compile.
import { CompileService, CompileServiceConfig,    } from "./compile.service";
import { CompileAttribute} from "./compile.attribute";

import {
    NgModule,
    ModuleWithProviders
} from '@angular/core';

import { Compiler } from '@angular/core';
import {JitCompilerFactory} from '@angular/compiler';
export function createJitCompiler () {
    return new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
}

// exports = component
@NgModule({
    imports: [
    ],
    declarations: [
        CompileAttribute,
    ],
    providers: [
        CompileService,
        { provide: Compiler, useFactory:  createJitCompiler},
    ],
    exports: [
        CompileAttribute,
    ],
    entryComponents: [
    ]
})
export class CompileModule {

    static forRoot(config: CompileServiceConfig) : ModuleWithProviders {
        return {
            ngModule: CompileModule,
            providers: [
                {provide: CompileServiceConfig, useValue: config }
            ]
        };
    }

}
