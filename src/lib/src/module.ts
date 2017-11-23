import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { PriceFormatComponent } from './component/price-format.component';
import { MatPriceFormatComponent } from './component/mat/mat-price-format.component';

const CommonImports = [
  CommonModule,
  FormsModule,
  TextMaskModule
];

@NgModule({
    imports: CommonImports,
    declarations: [ PriceFormatComponent ],
    exports: [ PriceFormatComponent ]
})
export class PriceFormatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PriceFormatModule,
            providers: []
        };
    }
}

@NgModule({
    imports: [
      ...CommonImports,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatInputModule
    ],
    declarations: [ MatPriceFormatComponent ],
    exports: [ MatPriceFormatComponent ]
})
export class MatPriceFormatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MatPriceFormatModule,
            providers: []
        };
    }
}
