import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BusyModule} from '../../src/busy.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BusyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
