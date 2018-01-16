import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import {NgxLoaderBackdropComponent} from './ngx-loader-backdrop.component';
import {NgxLoaderComponent} from './ngx-loader.component';
import {NgxLoaderConfig} from './ngx-loader.config';
import {MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxLoaderDirective} from './ngx-loader.directive';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  declarations: [
    NgxLoaderComponent,
    NgxLoaderBackdropComponent,
    NgxLoaderDirective,
  ],
  exports: [
    NgxLoaderDirective],
  entryComponents: [
    NgxLoaderComponent,
    NgxLoaderBackdropComponent,
  ]
})

export class NgxLoaderModule {
  static forRoot(config: NgxLoaderConfig): ModuleWithProviders {
    return {
      ngModule: NgxLoaderModule,
      providers: [
        {provide: NgxLoaderConfig, useValue: config}
      ]
    };
  }
}
