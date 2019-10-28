import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';

import { LocalStorage } from './core/local.storage';

import { HttpClientModule } from '@angular/common/http';

import {EmitService} from './core/services/EmitService';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    NgZorroAntdModule.forRoot(),
    RoutesModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    LocalStorage,
    EmitService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
