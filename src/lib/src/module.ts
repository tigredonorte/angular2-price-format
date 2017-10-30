import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PriceFormatComponent } from './component/price-format.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TextMaskModule
    ],
    declarations: [
        PriceFormatComponent
    ],
    exports: [
        PriceFormatComponent
    ],
    providers: [
    ]
})
export class PriceFormatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PriceFormatModule,
            providers: []
        };
    }
}
