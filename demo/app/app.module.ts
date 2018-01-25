import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxLoaderModule} from '../../dist';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    NgxLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
