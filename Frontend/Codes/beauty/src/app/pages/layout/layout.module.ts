import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MiddleComponent } from './middle/middle.component';
import { FooterComponent } from './footer/footer.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, MiddleComponent, ErrorComponent]
})

export class LayoutModule { }
