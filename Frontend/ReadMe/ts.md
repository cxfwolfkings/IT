# typescript

## 目录

1. [5分钟上手TypeScript](#5分钟上手TypeScript)
   - [安装TypeScript](#安装TypeScript)
   - [构建你的第一个TypeScript文件](#构建你的第一个TypeScript文件)
   - [从C#到TypeScript](#从C#到TypeScript)
2. [简介](#简介)
   - [什么是TypeScript](#什么是TypeScript)
   - [TypeScript安装](#TypeScript安装)
   - [HelloWorld](#HelloWorld)
   - [类型批注](#类型批注)
   - [接口](#接口)
   - [箭头函数表达式（lambda表达式）](#箭头函数表达式（lambda表达式）)
   - [类](#类)
   - [继承](#继承)
3. [参考文档](#参考文档)

## 5分钟上手TypeScript

- 让我们使用TypeScript来创建一个简单的Web应用。

### 安装TypeScript

- 有两种主要的方式来获取TypeScript工具：

1. 通过npm（Node.js包管理器）
2. 安装Visual Studio的TypeScript插件

   Visual Studio 2017 和 Visual Studio 2015 Update 3默认包含了TypeScript。如果你的 Visual Studio 还没有安装 TypeScript，你可以下载它。

   针对使用npm的用户：`npm install -g typescript`

### 构建你的第一个TypeScript文件

- 在编辑器，将下面的代码输入到greeter.ts文件里：

  ```ts
  function greeter(person) {
    return "Hello, " + person;
  }

  let user = "Jane User";

  document.body.innerHTML = greeter(user);
  ```

  ***编译代码***

  我们使用了.ts扩展名，但是这段代码仅仅是JavaScript而已。 你可以直接从现有的JavaScript应用里复制/粘贴这段代码。
  
  在命令行上，运行TypeScript编译器：`tsc greeter.ts`

  输出结果为一个greeter.js文件，它包含了和输入文件中相同的JavsScript代码。
  
  一切准备就绪，我们可以运行这个使用TypeScript写的JavaScript应用了！

  接下来让我们看看TypeScript工具带来的高级功能。
  
  给 person 函数的参数添加 string 类型注解，如下：

  ```ts
  function greeter(person: string) {
    return "Hello, " + person;
  }

  let user = "Jane User";

  document.body.innerHTML = greeter(user);
  ```

  ***类型注解***
  
  TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。
  
  在这个例子里，我们希望 greeter 函数接收一个字符串参数。 然后尝试把 greeter 的调用改成传入一个数组：

  ```ts
  function greeter(person: string) {
    return "Hello, " + person;
  }

  let user = [0, 1, 2];

  document.body.innerHTML = greeter(user);
  ```

  重新编译，你会看到产生了一个错误。

  `greeter.ts(7,26): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.`

  类似地，尝试删除 greeter 调用的所有参数。 TypeScript会告诉你使用了非期望个数的参数调用了这个函数。
  
  在这两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

  要注意的是尽管有错误，greeter.js文件还是被创建了。就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

  ***接口***
  
  让我们开发这个示例应用。
  
  这里我们使用接口来描述一个拥有 firstName 和 lastName 字段的对象。
  
  在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用 implements语句。

  ```ts
  interface Person {
    firstName: string;
    lastName: string;
  }

  function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = { firstName: "Jane", lastName: "User" };

  document.body.innerHTML = greeter(user);
  ```

  ***类***

  最后，让我们使用类来改写这个例子。
  
  TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。
  
  让我们创建一个Student类，它带有一个构造函数和一些公共字段。注意类和接口可以一起共作，程序员可以自行决定抽象的级别。
  
  还要注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。

  ```ts
  class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
  }

  interface Person {
    firstName: string;
    lastName: string;
  }

  function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
  }

  let user = new Student("Jane", "M.", "User");

  document.body.innerHTML = greeter(user);
  ```

  重新运行 `tsc greeter.ts`，你会看到生成的JavaScript代码和原先的一样。TypeScript里的类只是JavaScript里常用的基于原型面向对象编程的简写。

  ***运行TypeScript Web应用***

  在greeter.html里输入如下内容：

  ```html
  <!DOCTYPE html>
  <html>
    <head><title>TypeScript Greeter</title></head>
    <body>
        <script src="greeter.js"></script>
    </body>
  </html>
  ```

  在浏览器里打开greeter.html运行这个应用！

  可选地：在Visual Studio里打开greeter.ts或者把代码复制到TypeScript playground。将鼠标悬停在标识符上查看它们的类型。注意在某些情况下它们的类型可以被自动地推断出来。重新输入一下最后一行代码，看一下自动补全列表和参数列表，它们会根据DOM元素类型而变化。将光标放在 greeter 函数上，点击F12可以跟踪到它的定义。还有一点，你可以右键点击标识，使用重构功能来重命名。

  这些类型信息以及工具可以很好的和JavaScript一起工作。更多的TypeScript功能演示，请查看本网站的起步部分。

  ![x](./Resource/20.png)

参考文件：[https://www.tslang.cn/samples/index.html](https://www.tslang.cn/samples/index.html)

### 从C#到TypeScript

TypeScript和C#一样是微软搞出来的，而且都是大牛Anders Hejlsberg领导开发的。

它们之间有很多共同点，现在尝试以C#程序员的角度来理解下TypeScript。

TypeScript是一门JavaScript的超集语言，除了支持最新的JS语法外，TypeScript还会增加一些其他好用的语法糖。

最重要的是它在兼顾JavaScript灵活的基础上增加了强类型系统，这样更友好的支持开发大型系统。

现在来看下TypeScript基础类型：

***数值***

C#的数字类型有好几种：int, long, float, double, byte等。

而TypeScript和JavaScript一样，所有的数字都是浮点数，都是用number表示，这样也省了很了事，少了C#里类似long转int overflow问题。

下面用不同进制方式显示数字20。

```ts
let num = 20;      // 10进制
let num = 0xa4;    // 16进制
let num = 0b10010;  // 2进制
let num = 0o24;    // 8进制
```

***布尔***

boolean，和C#的功能一样，不多说。

let isCheck: boolean = true;

***枚举***

enum，大家都知道javascript没有enum，这也是TypeScript为此作的补充。

功能上和C#差不多：

1. 目的都是为数值提供一个友好的名字，增加代码可读性和可重构性

2. 默认情况下从0开始编号

3. 也可以手动赋值

4. 可以实现类似C# Flag特性，但也有一些细节不一样：

5. C#的枚举值toString()会返回枚举的文本值，而TypeScript是数值

6. TypeScript可以通过数值下标取得枚举字符串值

```ts
enum Action{
    add = 1,
    edit = 2,
    del = 4,
    all = add | edit | del
}
console.info(Action.add);  // 返回1
console.info(Action.add.toString());  // 返回1
console.info(Action[1]);  // 返回"add"
console.info(Action[3]);  // 返回undefined
console.info(Action.all); // 返回7
console.info(Action.all & Action.add) //返回1
```

上面的Action编译成JavaScript的结果：

```js
var Action;
(function (Action) {
    Action[Action["add"] = 1] = "add";
    Action[Action["edit"] = 2] = "edit";
    Action[Action["del"] = 4] = "del";
    Action[Action["all"] = 7] = "all";
})(Action || (Action = {}));
```

***字符串***

字符串也基本和C#一样，不过由于是JavaScript的超集，所以当然也支持单引号。

C#6.0里的模板字符串语法糖$"this is {name}'s blog"在TypeScript里也有类似的支持，当然，这也是ES6的规范。

```ts
let name: string = 'brook';
let note: string = `this is ${name}'s blog`;
```

***Symbol***

这也是ES6的特性，用来当作唯一的标识，所有新建出来的Symbol都是不同的，不管传进去的值是否一样。

Symbol非常适合做唯一key。

```ts
let key1 = Symbol('key');
let key2 = Symbol('key');
console.info(key1 === key2); // return false
```

***any***

这个和C#的dynamic很相似，可以代表任何东西且在上面调用方法或属性不会在编译时期报错，当然也本来就是JavaScript最基本的东西。

```ts
let test: any = 'test';
test = false;

test.test(); //编译时期不会有报错
let arr: any[] = ['test', false];
```

***void、null、undefined和never***

void和C#的一样，表示没有任何东西。

null和undefined和JavaScript一样，分别就是它们自己的类型，个人觉得这两者功能有点重合，建议只使用undefined。

never是TypeScript引进的，个人觉得是一种语义上的类型，用来表示永远不会得到返回值，比如while(true){}或throw new Error()之类。

```ts
function test(): void{} //  void
let a: string = null;
let b: null = null; // null有自己的类型，
//并且默认可以赋值给任何类型（除never之外），
//可用--strictNullChecks标记来限制这个功能

let a: string = undefined;  
let b: undefined = undefined; // undefined， 同上
function error(): never{ // never
   throw new Error('error');
}
```

***数组***

有基本的数组:

let arr: string[] = ['a', 'b', 'c'];

也有类似C#的泛型List

```ts
let list: Array<string> = ['a', 'b', 'c'];
```

数组功能没C#配合linq那么强大，不过配合其他一些库如lodash也可以很方便的进行各种操作。

数组还可以利用扩展操作符...来把数组解开再放入其他数组中。

```ts
let arr: number[] = [1, 2, 3];
let newArr: number[] = [...arr, 4, 5];
console.info(newArr); // 1, 2, 3, 4, 5
```

***元组***

C#也有个鸡肋的Tuple，不好用，不过新版的Tuple好像已经在C#7.0的计划当中。

下面这段代码是C#7.0的，真方便，不用再new Tuple<>，item1, item2之类的。

```C#
(string first, string middle, string last) LookupName(long id)
{
    return (first:'brook', middle:'', last:'shi');
}
var name = LookupName(id);
Console.WriteLine(`first:${name.first}, middle:${name.middle}, last:${name.last}`);
```

TypeScript里的也不输给C#，不过叫法上是分开的，这里的元组只是对数组的处理，另外还有对象上的叫解构赋值，以后会写。

```ts
let tuple: [number, string] = [123, '456'];
let num = tuple[0]; //num
let str = tuple[1]: //string
tuple[3] = '789'; //可以，越界后会以联合类型来判断，后面会讲联合类型
tuple[4] = true; //不行
```

## 简介

### 什么是TypeScript

- TypeScript 是一种由微软开发的自由和开源的编程语言，它是JavaScript的一个超集，扩展了JavaScript的语法。

  语法特性：
  
  1. 类 Classes
  2. 接口 Interfaces
  3. 模块 Modules
  4. 类型注解 Type annotations
  5. 编译时类型检查 Compile time type checking
  6. Arrow 函数 (类似 C# 的 Lambda 表达式)

- JavaScript 与 TypeScript 的区别
  
  TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。
  
  TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

### TypeScript安装

- 我们可以通过以下两种方式来安装 TypeScript：

1. 通过 Node.js 包管理器 (npm)
2. 通过与 Visual Studio 2012 继承的 MSI. (Click here to download)

   通过 npm 按安装的步骤：

   1. 安装 npm

      ```sh
      curl http://npmjs.org/install.sh | sh
      npm --version
      ```

   2. 安装 TypeScript npm 包：

   ```sh
   npm install -g typescript
   ```

   安装完成后我们就可以使用 TypeScript 编译器，名称叫 tsc，可将编译结果生成 js 文件。

   要编译 TypeScript 文件，可使用如下命令：`tsc filename.ts`

   一旦编译成功，就会在相同目录下生成一个同名 js 文件，你也可以通过命令参数来修改默认的输出名称。

   默认情况下编译器以ECMAScript 3（ES3）为目标但ES5也是受支持的一个选项。TypeScript增加了对为即将到来的ECMAScript 6标准所建议的特性的支持。

### HelloWorld

- 首先，我们创建一个 index.html 文件：

  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
   <title>Learning TypeScript</title>
  </head>
  <body>
    <script src="hello.js"></script>
  </body>
  </html>
  ```

  创建 hello.ts 文件， *.ts 是 TypeScript 文件的后缀，向 hello.ts 文件添加如下代码：

  ```js
  alert('hello world in TypeScript!');
  ```

  接下来，我们打开命令行，使用 tsc 命令编译 hello.ts 文件：

  `tsc hello.ts`

  在相同目录下就会生成一个 hello.js 文件，然后打开 index.html 输出结果如下：

  ![x](./Resource/21.png)

### 类型批注

- TypeScript 通过类型批注提供静态类型以在编译时启动类型检查。这是可选的，而且可以被忽略而使用 JavaScript 常规的动态类型。

  ```ts
  function Add(left: number, right: number): number {
    return left + right;
  }
  ```

  对于基本类型的批注是number, bool和string。而弱或动态类型的结构则是any类型。

  类型批注可以被导出到一个单独的声明文件以让使用类型的已被编译为JavaScript的TypeScript脚本的类型信息可用。批注可以为一个现有的JavaScript库声明，就像已经为Node.js和jQuery所做的那样。

  当类型没有给出时，TypeScript编译器利用类型推断以推断类型。如果由于缺乏声明，没有类型可以被推断出，那么它就会默认为是动态的any类型。

  实例

  接下来我们在 TypeScript 文件 type.ts 中创建一个简单的 area() 函数：

  ```ts
  function area(shape: string, width: number, height: number) {
    var area = width * height;
    return "I'm a " + shape + " with an area of " + area + " cm squared.";
  }
  document.body.innerHTML = area("rectangle", 30, 15);
  ```

  接下来，修改 index.html 的 js 文件为 type.js 然后编译 TypeScript 文件： tsc type.ts。

  浏览器刷新 index.html 文件，输出结果如下:

  ![x](./Resource/22.png)

### 接口

- 接下来，我们通过一个接口来扩展以上实例，创建一个 interface.ts 文件，修改 index.html 的 js 文件为 interface.js。

  interface.js 文件代码如下:

  ```ts
  interface Shape {
    name: string;
    width: number;
    height: number;
    color?: string;
  }

  function area(shape : Shape) {
    var area = shape.width * shape.height;
    return "I'm " + shape.name + " with area " + area + " cm squared";
  }

  console.log( area( {name: "rectangle", width: 30, height: 15} ) );
  console.log( area( {name: "square", width: 30, height: 30, color: "blue"} ) );
  ```

  接口可以作为一个类型批注。

  编译以上代码 `tsc interface.ts` 不会出现错误，但是如果你在以上代码后面添加缺失 name 参数的语句

  ```ts
  console.log( area( {width: 30, height: 15} ) );
  ```

  则在编译时会报错：

  ```bat
  tsc hello.ts

  hello.ts(15,20): error TS2345: Argument of type '{ width: number; height: number; }' is not assignable to parameter of type 'Shape'.
  Property 'name' is missing in type '{ width: number; height: number; }'.
  ```

  浏览器访问，输出结果如下：

  ![x](./Resource/23.png)

### 箭头函数表达式（lambda表达式）

- lambda表达式 `()=>{something}` 或 `()=>something` 相当于js中的函数，它的好处是可以自动将函数中的this附加到上下文中。

  尝试执行以下：

  ```ts
  var shape = {
    name: "rectangle",
    popup: function() {
      console.log('This inside popup(): ' + this.name);
      setTimeout(function() {
        console.log('This inside setTimeout(): ' + this.name);
        console.log("I'm a " + this.name + "!");
      }, 3000);
    }
  };
  shape.popup();
  ```

  实例中的 this.name 是一个空值：

  ![x](./Resource/24.png)

  接下来我们使用 TypeScript 的箭头函数。把 function() 替换为 () =>：

  ```ts
  var shape = {
    name: "rectangle",
    popup: function() {
      console.log('This inside popup(): ' + this.name);
      setTimeout( () => {
        console.log('This inside setTimeout(): ' + this.name);
        console.log("I'm a " + this.name + "!");
      }, 3000);
    }
  };
  shape.popup();
  ```

  输出结果如下：

  ![x](./Resource/25.png)

  在以上实例编译后端 js 文件中，我们可以看到一行 var _this = this;，_this 在 setTimeout() 的回调函数引用了 name 属性。

### 类

- TypeScript支持集成了可选的类型批注支持的ECMAScript 6的类。

  接下来我们创建一个类文件 class.ts，代码如下：

  ```ts
  class Shape {
    area: number;
    color: string;
    constructor ( name: string, width: number, height: number ) {
      this.area = width * height;
      this.color = "pink";
    };
    shoutout() {
      return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
  }

  var square = new Shape("square", 30, 30);

  console.log( square.shoutout() );
  console.log( 'Area of Shape: ' + square.area );
  console.log( 'Name of Shape: ' + square.name );
  console.log( 'Color of Shape: ' + square.color );
  console.log( 'Width of Shape: ' + square.width );
  console.log( 'Height of Shape: ' + square.height );
  ```

  以上 Shape 类中有两个属性 area 和 color，一个构造器 (constructor()), 一个方法是 shoutout() 。

  构造器中参数(name, width 和 height) 的作用域是局部变量，所以编译以上文件，在浏览器输出错误结果如下所示：

  ```bat
  class.ts(12,42): The property 'name' does not exist on value of type 'Shape'
  class.ts(20,40): The property 'name' does not exist on value of type 'Shape'
  class.ts(22,41): The property 'width' does not exist on value of type 'Shape'
  class.ts(23,42): The property 'height' does not exist on value of type 'Shape'
  ```

  ![x](./Resource/26.png)

  接下来，我们添加 public 和 private 访问修饰符。Public 成员可以在任何地方访问， private 成员只允许在类中访问。

  接下来我们修改以上代码，将 color 声明为 private，构造函数的参数 name 声明为 public：

  ```ts
  ...
  private color: string;
  ...
  constructor ( public name: string, width: number, height: number ) {
  ...
  ```

  ![x](./Resource/27.png)

  由于 color 成员变量设置了 private，所以会出现以下信息：
  
  ```bat
  class.ts(24,41): The property 'color' does not exist on value of type 'Shape'
  ```

### 继承

- 最后，我们可以继承一个已存在的类并创建一个派生类，继承使用关键字 extends。

  接下来我们在 class.ts 文件末尾添加以下代码，如下所示：

  ```ts
  class Shape3D extends Shape {
    volume: number;

    constructor ( public name: string, width: number, height: number, length: number ) {
        super( name, width, height );
        this.volume = length * this.area;
    };

    shoutout() {
        return "I'm " + this.name +  " with a volume of " + this.volume + " cm cube.";
    }

    superShout() {
        return super.shoutout();
    }
  }

  var cube = new Shape3D("cube", 30, 30, 30);
  console.log( cube.shoutout() );
  console.log( cube.superShout() );
  ```

  派生类 Shape3D 说明：

  - Shape3D 继承了 Shape 类, 也继承了 Shape 类的 color 属性。
  - 构造函数中，super 方法调用了基类 Shape 的构造函数 Shape，传递了参数 name, width, 和 height 值。 继承允许我们复用 Shape 类的代码，所以我们可以通过继承 area 属性来计算 this.volume。
  - Shape3D 的 shoutout() 方法重写基类的实现。superShout() 方法通过使用 super 关键字直接返回了基类的 shoutout() 方法。
  - 其他的代码我们可以通过自己的需求来完成自己想要的功能。

  ![x](./Resource/28.png)

## 参考文档

- TypeScript 中文手册：`http://www.runoob.com/manual/gitbook/TypeScript/_book/`
- `http://code.tutsplus.com/tutorials/getting-started-with-typescript--net-28890`
- `https://zh.wikipedia.org/wiki/TypeScript`