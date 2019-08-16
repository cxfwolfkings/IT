# 代码规范

## 目录

1. [怎样开发可靠的软件](#怎样开发可靠的软件)
2. [ESLint配置](#ESLint配置)
3. [复杂度](#复杂度)
4. [不变性](#不变性)
5. [面向对象编程](#面向对象编程)
6. [声明式代码](#声明式代码)
7. [控制执行流程中的异常](#控制执行流程中的异常)
8. [部分应用函数](#部分应用函数)
9. [几个小技巧](#几个小技巧)
10. [总结](#总结)

***软件开发者首要的责任应该是降低代码的复杂度***

## 怎样开发可靠的软件

- 尽量节约内存
- 充分利用工具，尤其是 [ESLint](https://eslint.org/)
- 持续的重构（在重构之前最好将代码纳入自动化测试）
- 更少的代码（初级开发者编写代码，高级开发者删除代码）

## ESLint配置

可以按如下方式设置 ESLint。建议逐一熟悉这些建议，并将 ESLint 规则逐一纳入项目中。先将它们配置为 warn，习惯了可以将一些规则转为 error。

在项目的根目录中运行：

```sh
npm i -D eslint
npm i -D eslint-plugin-fp
```

然后在项目的根目录中创建一个.eslintrc.yml 文件：

```conf
env:
  es6: true

plugins:
  fp

rules:
  # rules will go in here
```

如果使用的是像 VSCode 这样的 IDE，请安装 ESLint 插件。

还可以从命令行手动运行 ESLint：`npx eslint .`

## 复杂度

超过 200 行代码的文件就太难理解、太难维护了。长文件还意味着程序可能处理的工作太多了，违反了单一责任原则。

怎么解决这个问题？只需将大文件分解为更细粒度的模块即可。

建议的 ESLint 配置：

```conf
rules:
  max-lines:
  - warn
  - 200
```

复杂度的另一大来源是漫长而复杂的函数，很难推理；而且函数的职责太多，很难测试。

推荐的 ESLint 配置：

```conf
rules:
  max-lines-per-function:
  - warn
  - 20
```

复杂函数往往就是长函数，反之亦然。函数之所以变复杂可能有很多因素，但其中嵌套回调和圈复杂度较高都是比较容易解决的。

嵌套回调往往导致回调地狱。可以用 promise 处理回调，然后使用 async-await 就能削弱其影响。

函数复杂度的另一大来源是圈复杂度。它指的是给定函数中的语句（逻辑）数，诸如 if 语句、循环和 switch 语句。这些函数很难推理，要尽量避免使用。这是一个例子：

```js
if (conditionA) {
  if (conditionB) {
    while (conditionC) {
      if (conditionD && conditionE || conditionF) {
        ...
      }
    }
  }
}
```

推荐的 ESLint 配置：

```conf
rules:
  complexity:
  - warn
  - 5

  max-nested-callbacks:
  - warn
  - 2
  max-depth:
  - warn
  - 3
```

## 不变性

状态是存储在内存中的临时数据，例如对象中的变量或字面量。状态本身是无害的，但可变状态是软件复杂度的最大源头之一，与面向对象结合时尤其如此

使用可变状态编程容易让人精神错乱。只要放弃可变状态，我们的代码就能变得更加可靠。

使用 ES6 spread 等运算符复制时会生成浅拷贝，而不是深拷贝——它不会复制任何嵌套属性。

在 JavaScript 中使用不可变状态时，一些较为稳健的方法包括 immutable.js 和 Ramda lense 等。

建议的 ESLint 配置：

```conf
rules:
  fp/no-mutation: warn
  no-param-reassign: warn
```

不确定性是说程序在输入不变的情况下输出却无法确定。明明 2 + 2 == 4，但不确定性程序不一定得出这个结果。

虽然可变状态本身并不是不确定性的，但它会使代码更容易出现不确定性（如上所示）。讽刺的是最流行的编程范式（OOP 和命令式编程）特别容易产生不确定性。

想要避免可变性的缺陷，最好的方法就是改用不变性。

建议的 ESLint 配置：

```conf
rules:
  fp/no-mutating-assign: warn
  fp/no-mutating-methods: warn
  fp/no-mutation: warn
```

我们不应该用 var 在 JavaScript 中声明变量，同样我们也应该避免使用 let 关键字。用 let 声明的变量可以被重新分配，让代码更难推理。本质上这也是人脑工作记忆的一种限制。

建议的 ESLint 配置：

```conf
rules:
  fp/no-let: warn
```

## 面向对象编程

面向对象编程是一种用来组织代码的流行编程范例。本节会讨论 Java、C#、JavaScript、TypeScript 等语言中使用的主流 OOP 的局限。不会批判正确的 OOP（例如 SmallTalk）。

OOP 代码容易出现不确定性——它严重依赖可变状态，不像函数式编程那样可以保证输出不变，让代码更难推理。涉及并发时这种问题更为严重。

可变状态很棘手，而 OOP 共享可变状态的引用（而非值）的做法让这个问题更严重了。这意味着几乎任何东西都可以改变给定对象的状态。开发者必须牢记与当前对象交互的每个对象的状态，很快就会超过人脑工作记忆的上限。人脑要推理这种复杂的可变对象是极为困难的。它消耗了宝贵且有限的认知资源，并且不可避免地会导致大量缺陷。

共享可变对象的引用是为了提高效率而做出的权衡，过去这可能还很合理。但如今硬件性能飞速提升，我们应该更加关注开发者的效率而不是代码的执行效率。而且有了现代工具的支持，不变性几乎不会影响性能。

OOP 说全局状态是万恶之源。但讽刺的是 OOP 程序基本上就是一个大型全局状态（因为一切都是可变的并且通过引用共享）。

最小知识原则没什么用途，只是鸵鸟政策而已——不管你怎样访问或改变一个状态，共享的可变状态仍然是共享的可变状态。领域驱动设计是一种有用的设计方法，能解决一些复杂度问题。但它仍然没有解决不确定性这个根本问题。

很多人都在关注 OOP 程序的不确定性引入的复杂度。他们提出了许多设计模式试图解决这些问题。但这只是自欺欺人，并引入了更加不必要的复杂度。

正如我之前所说，代码本身是复杂度的最大来源，代码总是越少越好。OOP 程序通常带有大量的样板代码，以及设计模式提供的“创可贴”，这些都会降低信噪比。这意味着代码变得更加冗长，人们更难看到程序的原始意图，使代码库变得非常复杂，不太可靠。

我坚信现代 OOP 是软件复杂度的最大来源之一。的确有使用 OOP 构建的成功项目，但这并不意味着此类项目不会受无谓的复杂度影响。

JavaScript 中的 OOP 尤其糟糕，因为这种语言缺少静态类型检查、泛型和接口等。JavaScript 中的 this 关键字相当不可靠。

如果我们的目标是编写可靠的软件，那么我们应该努力降低复杂度，理想情况下应该避免使用 OOP。如果你有兴趣了解更多信息，请务必阅读另一篇文[“OOP，万亿美元的灾难”](https://medium.com/@ilyasz/object-oriented-programming-the-trillion-dollar-disaster-%EF%B8%8F-92a4b666c7c7)

this 关键字的行为总是飘忽不定。它很挑剔，在不同的环境中可能搞出来完全不同的东西。它的行为甚至取决于谁调用了一个给定的函数。使用 this 关键字经常会导致细小而奇怪的错误，很难调试。

拿它做面试问题可能很有意思，但关于 this 关键字的知识其实也没什么意义，只能说明应聘者花了几个小时研究过最常见的 JavaScript 面试问题。

真实世界的代码不应该那么容易出错，应该是可读的，不让人感到莫名其妙。This 是一个明显的语言设计缺陷，别再用它了。

建议的 ESLint 配置：

```conf
rules:
  fp/no-this: warn
```

## 声明式代码

声明式语言看起来更简洁，更具可读性。

典型的声明式语言有 SQL 和 HTML。甚至包括 React 中的 JSX！

在声明式 JavaScript 中使用[实验性流水线运算符](https://github.com/tc39/proposal-pipeline-operator)

编写声明式代码时应优先使用表达式而非语句。表达式始终返回一个值，而语句是用来执行操作的，不返回任何结果。这在函数式编程中也称为“副作用”。顺便说一句，前面讨论的状态突变也是副作用。

常用的语句有 if、return、switch、for、while。

建议的 ESLint 配置：

```conf
rules:
  fp/no-let: warn
  fp/no-loops: warn
  fp/no-mutating-assign: warn
  fp/no-mutating-methods: warn
  fp/no-mutation: warn
  fp/no-delete: warn
```

ES6 引入了许多出色的功能，解构对象就是其中之一，它也可用于函数参数。

下面的代码很直观吗？你能立刻说出参数是什么吗？我反正不能。

```js
const total = computeShoppingCartTotal(itemList, 10.0, 'USD');
```

下面的例子呢？

```js
const computeShoppingCartTotal = ({ itemList, discount, currency }) => {...};

const total = computeShoppingCartTotal({ itemList, discount: 10.0, currency: 'USD' });
```

显然后者比前者更具可读性。从不同模块发起的函数调用尤其符合这种情况。使用参数对象还能让参数不受编写顺序的影响。

避免将多个参数传递给函数，建议的 ESLint 配置：

```conf
rules:
  max-params:
  - warn
  - 2
```

优先从函数返回对象 

下面这段代码的函数签名是什么？它返回了什么？是返回用户对象？用户 ID？操作状态？不看上下文很难回答。

```js
const result = saveUser(...);
```

从函数返回一个对象能明确开发者的意图，使代码更易读：

```js
const { user, status } = saveUser(...);

...

const saveUser = user => {
   ...

   return {
     user: savedUser,
     status: "ok"
   };
};
```

## 控制执行流程中的异常

发生意外情况时抛出异常，并不是处理错误的最佳方法。

1. 异常破坏了类型安全

   即使在静态类型语言中，异常也会破坏类型安全性。根据其签名所示，函数 fetchUser(id: number): User 应该返回一个用户。函数签名没说如果找不到用户就抛出异常。如果需要异常，那么更合适的函数签名是：fetchUser(...): User|throws UserNotFoundError。当然这种语法在任何语言中都是无效的。

   推理程序的异常是很难的——人们可能永远不会知道函数是否会抛出异常。我们是可以把函数调用都包装在 try/catch 块中，但这不怎么实用，并且会严重影响代码的可读性。

2. 异常破坏了函数组合

   异常使函数组合难以利用。下面的例子中如果某篇帖子无法获取，服务器将返回 500 内部服务器错误。

   ```js
   const fetchBlogPost = id => {
      const post = api.fetch(`/api/post/${id}`);

      if (!post) throw new Error(`Post with id ${id} not found`);

      return post;
   };

   const html = postIds |> map(fetchBlogPost) |> renderHTMLTemplate;
   ```
   如果其中一个帖子被删除，但由于一些模糊的 bug，用户仍然试图访问它怎么办？这将显著降低用户体验。

3. 用元组处理错误 

   一种简单的错误处理方法是返回包含结果和错误的元组，而不是抛出异常。JavaScript 的确不支持元组，但可以使用 [error，result] 形式的双值数组很容易地模拟它们。顺便说一下，这也是 Go 中错误处理的默认方法：

4. 有时异常也有用途 
5. 让它崩溃——避免捕获异常

   如果我们打算让程序崩溃就可以抛出错误，但永远不应该捕获这些错误。这也是 Haskell 和 Elixir 等函数式语言推荐的方法。

   唯一例外是使用第三方 API 的情况。即使在这种情况下也最好还是使用包装函数的辅助函数来返回 [error，result] 元组代替异常。你可以使用像 saferr 这样的工具。

   问问自己谁应该对错误负责。如果答案是用户，则应该正常处理错误。我们应该向用户显示友好的消息，而不是什么 500 内部服务器错误。

   可惜这里没有 no-try-catch ESLint 规则。最接近的是 no-throw 规则。出现特殊情况时，你抛出异常就应该预料到程序的崩溃。

建议的 ESLint 配置：

```conf
rules:
  fp/no-throw: warn
```

## 部分应用函数

部分应用函数（Partial function application）可能是史上最佳的代码共享机制之一。它摆脱了 OOP 依赖注入。你无需使用典型的 OOP 样板也能在代码中注入依赖项。

以下示例包装了因抛出异常（而不是返回失败的响应）而臭名昭著的 Axios 库）。这些库根本没必要，尤其是在使用 async/await 时。

下面的例子中我们使用 currying 和部分应用函数来保证一个不安全函数的安全性。

```js
// Wrapping axios to safely call the api without throwing exceptions
const safeApiCall = ({ url, method }) => data =>
  axios({ url, method, data })
    .then( result => ([null, result]) )
    .catch( error => ([error, null]) );

// Partially applying the generic function above to work with the users api
const createUser = safeApiCall({
    url: '/api/users',
    method: 'post'
  });

// Safely calling the api without worrying about exceptions.
const [error, user] = await createUser({
  email: 'ilya@suzdalnitski.com',
  password: 'Password'
});
```

注意，safeApiCall 函数写为 func = (params) => (data) => {...}。这是函数式编程中的常用技术，称为 currying；它与部分应用函数关系密切。使用 params 调用时，func 函数返回另一个实际执行作业的函数。换句话说，该函数部分应用了 params。

它也可以写成：

```js
const func = (params) => (
   (data) => {...}
);
```

请注意，依赖项（params）作为第一个参数传递，实际数据作为第二个参数传递。

为了简化操作你可以使用 saferr npm 包，它也适用于 promise 和 async/await：

```js
import saferr from "saferr";
import axios from "axios";

const safeGet = saferr(axios.get);

const testAsync = async url => {
  const [err, result] = await safeGet(url);

  if (err) {
    console.error(err.message);
    return;
  }

  console.log(result.data.results[0].email);
};


// prints: zdenka.dieckmann@example.com
testAsync("https://randomuser.me/api/?results=1");

// prints: Network Error
testAsync("https://shmoogle.com");
```

## 几个小技巧

1. 来一点类型安全 

   JavaScript 不是静态类型语言。但我们可以按需标记函数参数来使代码更加健壮。下面的代码中，所需的值没能传入时将抛出错误。请注意它不适用于空值，但仍然可以很好地防范未定义的值。

   ```js
   const req = name => {
     throw new Error(`The value ${name} is required.`);
   };

   const doStuff = ( stuff = req('stuff') ) => {
     ...
   }
   ```

2. 短路条件和评估 

   大家都熟悉短路条件，它能用来访问嵌套对象中的值。

   ```js
   const getUserCity = user =>
      user && user.address && user.address.city;

   const user = {
      address: {
        city: "San Francisco"
      }
   };

   // Returns "San Francisco"
   getUserCity(user);

   // Both return undefined
   getUserCity({});
   getUserCity();
   ```
   
   如果值为虚值（falsey），那么短路评估可以用来提供替代值：

   `const userCity = getUserCity(user) || "Detroit";`

3. 赋值两次 

   给值赋值两次可以将任何值转换为布尔值。请注意，任何虚值都将转换为 false，这可能并不总是你想要的。数字绝不能这样做，因为 0 也将被转换为 false。

   ```js
   const shouldShowTooltip = text => !!text;

   // returns true
   shouldShowTooltip('JavaScript rocks');

   // all return false
   shouldShowTooltip('');
   shouldShowTooltip(null);
   shouldShowTooltip();
   ```

4. 使用现场日志来调试 

   我们可以利用短路和 console.log 的虚值输出来调试函数代码，甚至 React 组件：

   ```js
   const add = (a, b) =>
      console.log('add', a, b)
      || (a + b);

   const User = ({email, name}) => (
      <>
        <Email value={console.log('email', email) || email} />
        <Name value={console.log('name', name) || name} />
      </>
   );
   ```

## 总结

你真的需要代码可靠性吗？答案取决于你自己的决定。你的组织是否认为开发者的效率取决于完成的 JIRA 故事？你们是不是所谓的函数工厂，工作只是生产更多的函数？如果是这样的话还是换个工作吧。

本文的内容在实践中非常有用，值得反复阅读。好好看看这些技巧，ESLint 规则也都试一试吧。

英文原文: https://medium.com/better-programming/js-reliable-fdea261012ee

## 活动推荐

GMTC 全球大前端技术大会首次落地华南，走入大湾区深圳。