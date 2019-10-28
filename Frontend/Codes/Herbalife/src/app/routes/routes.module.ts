import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {routes} from './routes';

import {LayoutModule} from '../layout/layout.module';



@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  declarations: []
})
export class RoutesModule { }




