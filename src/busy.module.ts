import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders} from '@angular/core';

import {BusyDirective} from './busy.directive';
import {BusyService} from './busy.service';
import {BusyBackdropComponent} from './busy-backdrop.component';
import {BusyComponent} from './busy.component';
import {BusyConfig} from './busy.config';
import {MatProgressBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatProgressBarModule,
  ],
  declarations: [
    BusyDirective,
    BusyComponent,
    BusyBackdropComponent,
  ],
  providers: [
    BusyService,
  ],
  exports: [BusyDirective],
  entryComponents: [
    BusyComponent,
    BusyBackdropComponent,
  ]
})

export class BusyModule {
  static forRoot(config: BusyConfig): ModuleWithProviders {
    return {
      ngModule: BusyModule,
      providers: [
        {provide: BusyConfig, useValue: config}
      ]
    };
  }
}
