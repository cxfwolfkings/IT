import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// 导入路由配置文件
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // 导入路由模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
