import { Component } from '@angular/core';

/**
 * @Component 是一个 Decorator（装饰器），其作用类似于 Java 里面的 Annotation（注解）。
 * selector：组件的标签名，外部使用者可以这样来使用以上组件：<app-root>。
 *   默认情况下，ng 命令生成出来的组件都会带上一个 app 前缀，如果你不喜欢，
 *   可以在 angular-cli.json 里面修改 prefix 配置项，设置为空字符串将会不带任何前缀。
 * templateUrl：引用外部 HTML 模板。如果你想直接编写内联模板，可以使用 template，
 *   支持 ES6 引入的“模板字符串”写法。
 * styleUrls：引用外部 CSS 样式文件，这是一个数组，也就意味着可以引用多份 CSS 文件
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { // 这是 ES6 里面引入的模块和 class 定义方式
  title = 'beauty';
}
