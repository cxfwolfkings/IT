# ES6

## 目录

1. [简介](#简介)

## 简介

### 模块

* 默认
  * 导入 `import [,..xxx] [,..from] './xxx.ext'`
  * 导出 `export default obj;`
* 声明式
  1. 导出 `export var obj = xxx;`
  2. 导出 `export var obj2 = {};`
  3. 单独导出 `export {stu};`
  4. 导入 `import {obj,obj2,stu} from './xxx.js';  直接使用obj`
* 全体
* 默认导出和声明式导入在使用上的区别
  * 要注意，声明式导入的时候，必须{名称} 名称要一致（按需导入)
  * 默认导入，可以随意的使用变量名

```javascript
{
  default: "我是默认导出的结果"
  import xxx from './cal.js' // 会获取到整个对象的default属性
  obj1: "我是声明式导出1"
  obj2: "我是声明式导出2"
  obj3: "我是声明式导出3"
  import {obj1,obj2}
  obj4: "我是声明式导出4"
}
import * as allObj from './cal.js';  // 获取的就是一整个对象
```

* import 和 export 一定写在顶级，不要包含在 {} 内

### 代码变化

* 对象属性的声明

  ```javascript
  var name = 'abc';
  var person = {name}; //简写 -> var person = {name:name};
  //声明函数
  var cal = {
    add:function(){
      return 1;
    },
    add2(){
      return 2;
    },
    add3:funtion(n1,n2){
      return n1 + n2;
    },
    add4(n1,n2){  //干掉了function
      return n1 + n2;
    }
  }
  ```

* 当属性的key和变量的名相同，而要使用变量的值做value，就可以简写{name}->{name:name}
* es6中的函数声明，就是干掉了`function`，add(){ }
