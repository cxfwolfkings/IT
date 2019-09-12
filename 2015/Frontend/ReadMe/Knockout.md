# Knockout

## 目录

1. [简介](简介)
   - [下载与安装](#下载与安装)
   - [入门](#入门)
2. [参考](#参考)

## 简介

***Knockout.js是什么？***

Knockout是一个轻量级的UI类库，通过应用MVVM模式使JavaScript前端UI简单化。

MVVM是Model-View-ViewModel的简写。它本质上就是MVC的改进版。MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图UI和业务逻辑分开。当然这些事 ViewModel 已经帮我们做了，它可以取出 Model 的数据同时帮忙处理 View 中由于需要展示内容而涉及的业务逻辑。

### 下载与安装

下载Knockout的最新版本，在正式开发和产品使用中，推荐使用默认的压缩版本（knockout.x.x.js）

下载地址：`http://knockoutjs.com/downloads/index.html`

对于调试使用，推荐使用完整的未压缩版本(knockout-x.x.debug.js)，压缩版和未压缩版功能相同，但是未压缩版本具有全变量名和注释，也没有隐藏内部的API，使得源代码更具可读性。

***插件***

Knockout也有丰富的插件可以使用，例如：

你可以使用集成JQueryUI功能的插件来实现autoComplete功能：

```html
<input type="text" data-bind="autocomplete: autocompleteConfig"/>
```

而没必要每次都要声明下面这样的代码：

```js
$( "#inputId" ).autocomplete({
source: availableTags
});
```

或者如果你想用表单验证功能，你可以使用验证插件:

```js
var myObj = ko.observable('').extend({ max: 99 });
```

或者

```js
<input type="text" data-bind="value: myProp" max="99"/>
```

而不是每次在点击提交按钮的时候或者离开焦点的时候都去检查。

结论：

使用Knockout将极大减少JavaScript的开发量，是需要使用简单的绑定语法就可以很快速地应用到你的站点上。

### 入门

Knockout有如下4大重要概念：

- 声明式绑定 (Declarative Bindings)：使用简明易读的语法很容易地将模型(model)数据关联到DOM元素上。
- UI界面自动刷新 (Automatic UI Refresh)：当您的模型状态(model state)改变时，您的UI界面将自动更新。
- 依赖跟踪 (Dependency Tracking)：为转变和联合数据，在你的模型数据之间隐式建立关系。
- 模板 (Templating)：为您的模型数据快速编写复杂的可嵌套的UI。

Knockout是一个以数据模型（data model）为基础的能够帮助你创建富文本，响应显示和编辑用户界面的JavaScript类库。任何时候如果你的UI需要自动更新（比如：更新依赖于用户的行为或者外部数据源的改变），KO能够很简单的帮你实现并且很容易维护。

重要特性:

- 优雅的依赖追踪- 不管任何时候你的数据模型更新，都会自动更新相应的内容。
- 声明式绑定- 浅显易懂的方式将你的用户界面指定部分关联到你的数据模型上。
- 灵活全面的模板- 使用嵌套模板可以构建复杂的动态界面。
- 轻易可扩展- 几行代码就可以实现自定义行为作为新的声明式绑定。

额外的好处：

- 纯JavaScript类库 – 兼容任何服务器端和客户端技术
- 可添加到Web程序最上部 – 不需要大的架构改变
- 简洁的 – Gzip之前大约25kb
- 兼容任何主流浏览器 (IE 6+、Firefox 2+、Chrome、Safari、其它)
- Comprehensive suite of specifications （采用行为驱动开发） - 意味着在新的浏览器和平台上可以很容易通过验证。

开发人员如果用过Silverlight或者WPF可能会知道KO是MVVM模式的一个例子。如果熟悉 Ruby on Rails 或其它MVC技术可能会发现它是一个带有声明式语法的MVC实时form。换句话说，你可以把KO当成通过编辑JSON数据来制作UI用户界面的一种方式… 不管它为你做什么

OK, 如何使用它？

简单来说：声明你的数据作为一个JavaScript 模型对象（model object），然后将DOM 元素或者模板（templates）绑定到它上面.

让我们来看一个例子

想想在一个页面上，航空旅客可以为他们的旅行升级高级食物套餐，当他们选择一个套餐的时候，页面立即显示套餐的描述和价格。首先，声明可用的套餐:

```js
var availableMeals = [
 { mealName: 'Standard', description: 'Dry crusts of bread', extraCost: 0 },
 { mealName: 'Premium', description: 'Fresh bread with cheese', extraCost: 9.95 },
 { mealName: 'Deluxe', description: 'Caviar and vintage Dr Pepper', extraCost: 18.50 }
];
```

如果想让这3个选项显示到页面上，我们可以绑定一个下拉菜单（例如：`<select>`元素）到这个数据上。例如：

```html
<h3>Meal upgrades</h3>
<p>Make your flight more bearable by selecting a meal to match your social and economic status.</p>
Chosen meal: <select data-bind="options: availableMeals,
                                optionsText: 'mealName'"></select>
```

启用Knockout并使你的绑定生效，在availableMeals变量声明之后添加如下代码：

```js
var viewModel = {
  /* we'll populate this in a moment */
};
ko.applyBindings(viewModel); // Makes Knockout get to work
// 注意：ko.applyBindings需要在上述HTML之后应用才有效
```

响应选择

下一步，声明一个简单的data model来描述旅客已经选择的套餐，添加一个属性到当前的view model上：

```js
var viewModel = {
  chosenMeal: ko.observable(availableMeals[0])
};
```

ko.observable是什么？它是KO里的一个基础概念。UI可以监控（observe）它的值并且回应它的变化。这里我们设置chosenMeal是UI可以监控已经选择的套餐，并初始化它，使用availableMeal里的第一个值作为它的默认值（例如：Standard）。

让我们将chosenMeal 关联到下拉菜单上，仅仅是更新`<select>`的data-bind属性，告诉它让`<select>`元素的值读取/写入chosenMeal这个模型属性：

```html
Chosen meal: <select data-bind="options: availableMeals,
                                    optionsText: 'mealName',
                                    value: chosenMeal"></select>
```

理论上说，我们现在可以读/写chosenMeal 属性了，但是我们不知道它的作用。让我们来显示已选择套餐的描述和价格：

```html
<p>
  You've chosen:
  <b data-bind="text: chosenMeal().description"></b>
  (price: <span data-bind='text: chosenMeal().extraCost'></span>)
</p>
```

于是，套餐信息和价格，将根据用户选择不同的套餐项而自动更新

更多关于observables和dependency tracking的使用

最后一件事：如果能将价格格式化成带有货币符号的就好了，声明一个JavaScript函数就可以实现了…

```js
function formatPrice(price) {
  return price == 0 ? "Free" : "$" + price.toFixed(2);
}
```

… 然后更新绑定信息使用这个函数 …

`(price: <span data-bind='text: formatPrice(chosenMeal().extraCost)'></span>)`

… 界面显示结果将变得好看多了

Price的格式化展示了，你可以在你的绑定里写任何JavaScript代码，KO仍然能探测到你的绑定依赖代码。这就展示了当你的model改变时，KO如何只进行局部更新而不用重新render整个页面 – 仅仅是有依赖值改变的那部分。

链式的observables也是支持的（例如：总价依赖于价格和数量）。当链改变的时候，依赖的下游部分将会重新执行，同时所有相关的UI将自动更新。不需要在各个observables之间声明关联关系，KO框架会在运行时自动执行的。

你可以从 observables 和 observable arrays 获取更多信息。上面的例子非常简单，没有覆盖很多KO的功能。你可以获取更多的内嵌的绑定和模板绑定。

KO和jQuery (或Prototype等)是竞争关系还是能一起使用？

所有人都喜欢jQuery! 它是一个在页面里操作元素和事件的框架，非常出色并且易使用，在DOM操作上肯定使用jQuery，KO解决不同的问题。

如果页面要求复杂，仅仅使用jQuery需要花费更多的代码。 例如：一个表格里显示一个列表，然后统计列表的数量，Add按钮在数据行TR小于5调的时候启用，否则就禁用。jQuery 没有基本的数据模型的概念，所以需要获取数据的数量（从table/div或者专门定义的CSS class），如果需要在某些SPAN里显示数据的数量，当添加新数据的时候，你还要记得更新这个SPAN的text。当然，你还要判断当总数>=5条的时候禁用Add按钮。 然后，如果还要实现Delete功能的时候，你不得不指出哪一个DOM元素被点击以后需要改变。

Knockout的实现有何不同？

使用KO非常简单。将你的数据描绘成一个JavaScript数组对象myItems，然后使用模板（template）转化这个数组到表格里（或者一组DIV）。不管什么时候数组改变，UI界面也会响应改变（不用指出如何插入新行`<tr>`或在哪里插入），剩余的工作就是同步了。例如：你可以声明绑定如下一个SPAN显示数据数量（可以放在页面的任何地方，不一定非要在template里）：

```html
There are <span data-bind="text: myItems().count"></span> items
```

就是这些！你不需要写代码去更新它，它的更新依赖于数组myItems的改变。同样，Add按钮的启用和禁用依赖于数组myItems的长度，如下：

```html
<button data-bind="enable: myItems().count < 5">Add</button>
```

之后，如果你要实现Delete功能，不必指出如何操作UI元素，只需要修改数据模型就可以了。

总结：KO没有和jQuery或类似的DOM 操作API对抗竞争。KO提供了一个关联数据模型和用户界面的高级功能。KO本身不依赖jQuery，但是你可以一起同时使用jQuery， 生动平缓的UI改变需要真正使用jQuery。

开启模板绑定

除非你想使用模板绑定功能（您很有可能使用它，因为非常有用），那你需要再引用两个JavaScript文件。 KO1.3版的默认模板引擎是依赖jQuery 的jquery.tmpl.js（最新版2.0版已经不依赖jquery tmp了）。所以你需要下载下面的2个文件并在引用KO之前引用：

- jQuery 1.4.2 或更高版本
- jquery-tmpl.js — 此版本 可以很容易使用，或者你访问官方网站 查找最新版本。

正确的引用顺序：

```html
<script type='text/javascript' src='jquery-1.4.2.min.js'></script>
<script type='text/javascript' src='jquery-tmpl.js'></script>
<script type='text/javascript' src='knockout-1.2.1.js'></script>
```

（当然，您要根据你的文件路径累更新上面的文件路径和文件名。）

监控属性(Observables)

关于Knockout的3个重要概念（Observables,DependentObservables,ObservableArray），暂定翻译为（监控属性、依赖监控属性和监控数组）。

1、创建带有监控属性的view model

Observables

Knockout是在下面三个核心功能上建立起来的：

1. 监控属性（Observables）和依赖跟踪（Dependency tracking）
2. 声明式绑定（Declarative bindings）
3. 模板（Templating）

在本节中，我们将学习3个核心里面的第一个。但在这之前，先让我们学习一下MVVM设计模式和View Model的概念。

MVVM and View Models

Model-View-View Model (MVVM)是一种创建用户界面的设计模式。通过它只要将UI界面分成以下3个部分，就可以使复杂的界面变得简单：

1、Model，用于存储你应用程序数据，这些数据表示你业务领域的对象和数据操作（例如：银行可以进行资金转账），并且独立于任何界面。当使用KO的时候，通常是使用Ajax向服务器请求数据来读写这个数据模型。用于存储你应用程序数据，这些数据表示你业务领域的对象和数据操作（例如：银行可以进行资金转账），并且独立于任何界面。当使用KO的时候，通常是使用Ajax向服务器请求数据来读写这个数据模型。

2、View Model，纯粹用于描述数据内容和页面操作的数据模型。例如，如果你想实现一个列表编辑器，你的ViewModel（数据模型）就是项目清单对象和你所暴露出来的添加和删除列表项的方法。 注意：这不是UI本身，它不具有任何按钮和显示样式的概念。这不是持久化的数据模型—它仅是用户当前使用的未保存的数据。当使用KO时，你的View Model（数据模型）是纯粹的不包含HTML知识的JavaScript对象，保持View Model（数据模型）抽象在使用时可以保持简单，因此你可以更简单的操作管理更复杂的行为。

3、View，代表View Model状态的一个可见、互动的UI界面。它主要用于显示View Model的数据信息、发送用户命令（例如，当用户点击按钮）以及在View Model发生变化时保持自动更新。

使用KO时，你的View层主要就是简单的将HTML文档声明式的绑定到View Model，将它们关联起来。另外，你也可以利用模版从View Model获取数据动态生成HTML。

使用KO创建一个View Model，仅仅只需要声明一个JavaScript对象，例如：

```js
var myViewModel = {
  personName: 'Colin',
  personAge: 15
};
```

你可以创建一个简单的视图声明式绑定到这个View Model上，例如，下面的代码显示personName的值：

```html
The name is <span data-bind="text: personName"></span>
```

激活Knockout

data-bind属性尽快好用但它不是HTML的原生属性（它严格遵从HTML5语法，虽然HTML4验证器提示有不可识别的属性但依然可用）。由于浏览器不识别它是什么意思，所以你需要激活Knockout 来让他起作用。

激活Knockout，需要添加如下的 `<script>` 代码块：

ko.applyBindings(myViewModel);

你可以将这个代码块放在HTML底部，或者放在jQuery的$函数或者ready 函数里

你可能奇怪ko.applyBindings使用的是什么样的参数：

第一个参数是你想激活KO时用于声明式绑定的View Model对象；

第二个参数（可选），你可以使用第二个参数来设置要使用data-bind属性的HTML元素或容器。例如：

```js
ko.applyBindings(myViewModel, document.getElementById('someElementId'))
```

它限制了只有ID为someElementId的元素才能激活使用KO功能，当你在一个页面中声明了多个View Model来绑定不同的界面区域时，这样限制是很有好处的。

Observables

现在已经知道如何创建一个简单的view model并且通过binding显示它的属性了。但是KO一个重要的功能是当你的view model改变的时候能自动更新你的界面。当你的view model部分改变的时候KO是如何知道的呢？答案是：你需要将你的model属性声明成observable的, 因为它是非常特殊的JavaScript objects，能够通知订阅者它的改变以及自动探测到相关的依赖。

例如：重写上述例子中的View Model为以下代码：

```js
var myViewModel = {
  personName: ko.observable('Colin'),
  personAge: ko.observable('15')
};
```

你根本不需要对View进行更改，所有的data-bind语法依然正常工作。所不同的是，现在它能够自动检测变化，并通知它自动更新界面View。

Reading and writing observables

并不是所有的浏览器都支持JavaScript的getters and setters (比如IE)，所以，为了兼容，ko.observable监控的对象都是方法。

1、读取当前监控的属性值，只需要直接调用observable（不需要参数），在这个例子当中，调用myViewModel.personName()将会返回'Colin'，调用myViewModel.personAge() 将会返回'15'

2、写一个新值到监控属性上，调用observable方法，将要写的值作为一个参数传入即可。例如，调用myViewModel.personName('Mary') 将会把名称改变成 'Mary'。

3、一次性改变Model对象监控的多个属性值，你可以使用链式方法。例如：myViewModel.personName('Mary').personAge(50) 将会把名称改变成'Mary'将年龄设置为50

监控属性最重要的一点就是可以随时监控，也就是说，其他代码可以告诉它哪些是需要通知发生变化的。这就是为什么KO会有如此多的内置绑定语法。所以，当你在页面中编写data-bind="text: personName"，text 会绑定注册到自身，当personName发生变化时，它能够立即得到通知。

当你通过调用 myViewModel.personName('Mary') 将名称的值改变成为'Mary'时，text绑定会自动更新新值到其对应的DOM对象元素上，这就是为什么改变数据模型能够自动刷新View页面。

监控属性的显示订阅

通常情况下，你不需要手工订阅，如果你想要注册自己的订阅来通知监控属性的变化，你可以使用subscribe 方法。例如：

```js
myViewModel.personName.subscribe(function (newValue) {
  alert("The person's new name is " + newValue);
});
```

subscribe 方法在KO内部很多地方都有用到。你也可以终止自己的订阅：首先获取到这个订阅，然后调用dispose 方法即可。例如：

```js
var subscription = myViewModel.personName.subscribe(function (newValue) {
  alert("The person's new name is " + newValue);
});
// ...then later...
subscription.dispose(); // I no longer want notifications
```

大多数时间，你不需要这么做，因为内置的绑定和模版系统功能在管理订阅上已经做了很多工作，可以直接使用它们。

2、使用依赖监控属性(Dependent Observables)

如果你已经有了监控属性firstName和lastName，你想显示全称怎么办？ 这就需要用到依赖监控属性了 – 这些函数是一个或多个监控属性， 如果他们的依赖对象改变，他们会自动跟着改变。

例如，下面的view model,

```js
var viewModel = {
  firstName: ko.observable('Bob'),
  lastName: ko.observable('Smith')
};
```

… 你可以添加一个依赖监控属性来返回姓名全称：

```js
viewModel.fullName = ko.dependentObservable(function () {
  return this.firstName() + " " + this.lastName();
}, viewModel);
```

并且绑定到UI的元素上，例如：

```html
The name is <span data-bind="text: fullName"></span>
```

… 不管firstName还是lastName改变，全称fullName都会自动更新（不管谁改变，执行函数都会调用一次，不管改变成什么，他的值都会更新到UI或者其他依赖监控属性上）。

管理'this'

你可能疑惑ko.dependentObservable的第二个参数是做什么用的（上面的例子中我传的是viewModel）, 它是声明执行依赖监控属性的this用的。 没有它，你不能引用到this.firstName() 和this.lastName()。 老练的JavaScript 开发人员不觉得this怎么样，但是如果你不熟悉JavaScript，那就对它就会很陌生。(C#和Java不需要为set一个值为设置this，但是JavaScript 需要，因为默认情况下他们的函数自身不是任何对象的一部分)。

不幸的是，JavaScript对象没有任何办法能引用他们自身，所以你需要通过myViewModelObject.myDependentObservable = ... 的形式添加依赖监控属性到view model对象上。你不能直接在view model里声明他们，换句话说，你不能写成下面这样：

```js
var viewModel = {
    myDependentObservable: ko.dependentObservable(function() {
        ...
    }, /* can't refer to viewModel from here, so this doesn't work */)
}
```

… 相反你必须写成如下这样：

```js
var viewModel = {
    // Add other properties here as you wish
};

viewModel.myDependentObservable = ko.dependentObservable(function() {
    ...
}, viewModel); // This is OK
```

只要你知道期望什么，它确实不是个问题。

依赖链

理所当然，如果你想你可以创建一个依赖监控属性的链。例如：

- 监控属性items表述一组列表项
- 监控属性selectedIndexes保存着被用户选上的列表项的索引
- 依赖监控属性selectedItems 返回的是selectedIndexes 对应的列表项数组
- 另一个依赖监控属性返回的true或false依赖于 selectedItems 的各个列表项是否包含一些属性（例如，是否新的或者还未保存的）。一些UI element（像按钮的启用/禁用）的状态取决于这个值）。

  然后，items或者selectedIndexes 的改变将会影响到所有依赖监控属性的链，所有绑定这些属性的UI元素都会自动更新。多么整齐与优雅！

可写的依赖监控属性

可写依赖监控属性真的是太advanced了，而且大部分情况下都用不到。

正如所学到的，依赖监控属性是通过计算其它的监控属性而得到的。感觉是依赖监控属性正常情况下应该是只读的。那么，有可能让依赖监控属性支持可写么？你只需要声明自己的callback函数然后利用写入的值再处理一下相应的逻辑即可。

你可以像使用普通的监控属性一样使用依赖监控属性 – 数据双向绑定到DOM元素上，并且通过自定义的逻辑拦截所有的读和写操作。这是非常牛逼的特性并且可以在大范围内使用。

例1：分解用户的输入

返回到经典的"first name + last name = full name" 例子上，你可以让事情调回来看: 让依赖监控属性fullName可写，让用户直接输入姓名全称，然后输入的值将被解析并映射写入到基本的监控属性firstName和lastName上：

```js
var viewModel = {
    firstName: ko.observable("Planet"),
    lastName: ko.observable("Earth")
};

viewModel.fullName = ko.dependentObservable({
    read: function () {
        return this.firstName() + " " + this.lastName();
    },
    write: function (value) {
        var lastSpacePos = value.lastIndexOf(" ");
        if (lastSpacePos > 0) { // Ignore values with no space character
            this.firstName(value.substring(0, lastSpacePos)); // Update "firstName"
            this.lastName(value.substring(lastSpacePos + 1)); // Update "lastName"
        }
    },
    owner: viewModel
});
```

这个例子里，写操作的callback接受写入的值，把值分离出来，分别写入到"firstName"和"lastName"上。 你可以像普通情况一样将这个view model绑定到DOM元素上，如下：

```html
<p>First name: <span data-bind="text: firstName"></span></p>
<p>Last name: <span data-bind="text: lastName"></span></p>
<h2>Hello, <input data-bind="value: fullName"/>!</h2>
```

这是一个Hello World 例子的反例子，姓和名都不可编辑，相反姓和名组成的姓名全称却是可编辑的。
上面的view model演示的是通过一个简单的参数来初始化依赖监控属性。你可以给下面的属性传入任何JavaScript对象：

- read — 必选，一个用来执行取得依赖监控属性当前值的函数。
- write — 可选，如果声明将使你的依赖监控属性可写，别的代码如果这个可写功能写入新值，通过自定义逻辑将值再写入各个基础的监控属性上。
- owner — 可选，如果声明，它就是KO调用read或write的callback时用到的this。查看“管理this”获取更新信息。

例2：Value转换器

有时候你可能需要显示一些不同格式的数据，从基础的数据转化成显示格式。比如，你存储价格为float类型，但是允许用户编辑的字段需要支持货币单位和小数点。你可以用可写的依赖监控属性来实现，然后解析传入的数据到基本 float类型里：

```js
viewModel.formattedPrice = ko.dependentObservable({

    read: function () {
        return "$" + this.price().toFixed(2);
    },

    write: function (value) {
        // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
        value = parseFloat(value.replace(/[^\.\d]/g, ""));
        this.price(isNaN(value) ? 0 : value); // Write to underlying storage
    },
    owner: viewModel
});
```

然后我们绑定formattedPrice到text box上:

```html
<p>Enter bid price: <input data-bind="value: formattedPrice"/></p>
```

所以，不管用户什么时候输入新价格，输入什么格式，text box里会自动更新为带有2位小数点和货币符号的数值。这样用户可以看到你的程序有多聪明，来告诉用户只能输入2位小数，否则的话自动删除多余的位数，当然也不能输入负数，因为write的callback函数会自动删除负号。

例3：过滤并验证用户输入

例1展示的是写操作过滤的功能，如果你写的值不符合条件的话将不会被写入，忽略所有不包括空格的值。

再多走一步，你可以声明一个监控属性isValid 来表示最后一次写入是否合法，然后根据真假值显示相应的提示信息。稍后仔细介绍，先参考如下代码：

```js
var viewModel = {
    acceptedNumericValue: ko.observable(123),
    lastInputWasValid: ko.observable(true)
};

viewModel.attemptedValue = ko.dependentObservable({
    read: viewModel.acceptedNumericValue,
    write: function (value) {
        if (isNaN(value))
            this.lastInputWasValid(false);
        else {
            this.lastInputWasValid(true);
            this.acceptedNumericValue(value); // Write to underlying storage
        }
    },
    owner: viewModel
});
```

… 按照如下格式声明绑定元素：

```html
<p>Enter a numeric value: <input data-bind="value: attemptedValue"/></p>
<div data-bind="visible: !lastInputWasValid()">That's not a number!</div>
```

现在，acceptedNumericValue 将只接受数字，其它任何输入的值都会触发显示验证信息，而会更新acceptedNumericValue。

备注：上面的例子显得杀伤力太强了，更简单的方式是在`<input>`上使用jQuery Validation和number class。Knockout可以和jQuery Validation一起很好的使用，参考例子：grid editor 。当然，上面的例子依然展示了一个如何使用自定义逻辑进行过滤和验证数据，如果验证很复杂而jQuery Validation很难使用的话，你就可以用它。

依赖跟踪如何工作的

为什么依赖监控属性能够自动跟踪并且自动更新UI…

事实上，非常简单，甚至说可爱。跟踪的逻辑是这样的：

1. 当你声明一个依赖监控属性的时候，KO会立即调用执行函数并且获取初始化值。
2. 当你的执行函数运行的时候，KO会把所有需要依赖的依赖属性（或者监控依赖属性）都记录到一个Log列表里。
3. 执行函数结束以后，KO会向所有Log里需要依赖到的对象进行订阅。订阅的callback函数是重新运行你的执行函数。然后回头重新执行上面的第一步操作（并且注销不再使用的订阅）。
4. 最后KO会通知上游所有订阅它的订阅者，告诉它们我已经设置了新值。

所有说，KO不仅仅是在第一次执行函数执行时候探测你的依赖项，每次它都会探测。举例来说，你的依赖属性可以是动态的：依赖属性A代表你是否依赖于依赖属性B或者C，这时候只有当A或者你当前的选择B或者C改变的时候执行函数才重新执行。你不需要再声明其它的依赖：运行时会自动探测到的。

另外一个技巧是：一个模板输出的绑定是依赖监控属性的简单实现，如果模板读取一个监控属性的值，那模板绑定就会自动变成依赖监控属性依赖于那个监控属性，监控属性一旦改变，模板绑定的依赖监控属性就会自动执行。嵌套的模板也是自动的：如果模板X render模板 Y，并且Y需要显示监控属性Z的值，当Z改变的时候，由于只有Y依赖它，所以只有Y这部分进行了重新绘制（render）。

3、使用observable数组

如果你要探测和响应一个对象的变化，你应该用observables。如果你需要探测和响应一个集合对象的变化，你应该用observableArray 。在很多场景下，它都非常有用，比如你要在UI上需要显示/编辑的一个列表数据集合，然后对集合进行添加和删除。

```js
var myObservableArray = ko.observableArray();    // Initially an empty array
myObservableArray.push('Some value');            // Adds the value and notifies observers
```

关键点：监控数组跟踪的是数组里的对象，而不是这些对象自身的状态。

简单说，将一对象放在observableArray 里不会使这个对象本身的属性变化可监控的。当然你自己也可以声明这个对象的属性为observable的，但它就成了一个依赖监控对象了。一个observableArray 仅仅监控他拥有的对象，并在这些对象添加或者删除的时候发出通知。

预加载一个监控数组observableArray

如果你想让你的监控数组在开始的时候就有一些初始值，那么在声明的时候，你可以在构造器里加入这些初始对象。例如：

```js
// This observable array initially contains three objects
var anotherObservableArray = ko.observableArray([
    { name: "Bungle", type: "Bear" },
    { name: "George", type: "Hippo" },
    { name: "Zippy", type: "Unknown" }
]);
```

从observableArray里读取信息

一个observableArray其实就是一个observable的监控对象，只不过他的值是一个数组（observableArray还加了很多其他特性，稍后介绍）。所以你可以像获取普通的observable的值一样，只需要调用无参函数就可以获取自身的值了。 例如，你可以像下面这样获取它的值：

```js
alert('The length of the array is ' + myObservableArray().length);
alert('The first element is ' + myObservableArray()[0]);
```

理论上你可以使用任何原生的JavaScript数组函数来操作这些数组，但是KO提供了更好的功能等价函数，他们非常有用是因为：

1. 兼容所有浏览器。（例如indexOf不能在IE8和早期版本上使用，但KO自己的indexOf 可以在所有浏览器上使用）
2. 在数组操作函数方面（例如push和splice），KO自己的方式可以自动触发依赖跟踪，并且通知所有的订阅者它的变化，然后让UI界面也相应的自动更新。
3. 语法更方便，调用KO的push方法，只需要这样写：myObservableArray.push(...)。 比如原生数组的myObservableArray().push(...)好用多了。

下面讲解的均是observableArray的读取和写入的相关函数。

indexOf

indexOf 函数返回的是第一个等于你参数数组项的索引。例如：myObservableArray.indexOf('Blah')将返回以0为第一个索引的第一个等于Blah的数组项的索引。如果没有找到相等的，将返回-1。

slice

slice函数是observableArray相对于JavaScript原生函数slice的等价函数（返回给定的从开始索引到结束索引之间所有的对象集合）。 调用myObservableArray.slice(...)等价于调用JavaScript原生函数（例如：myObservableArray().slice(...)）。

操作observableArray

observableArray 展现的是数组对象相似的函数并通知订阅者的功能。

pop, push, shift, unshift, reverse, sort, splice

所有这些函数都是和JavaScript数组原生函数等价的，唯一不同的数组改变可以通知订阅者：

```js
myObservableArray.push('Some new value') 在数组末尾添加一个新项
myObservableArray.pop() 删除数组最后一个项并返回该项
myObservableArray.unshift('Some new value') 在数组头部添加一个项
myObservableArray.shift() 删除数组头部第一项并返回该项
myObservableArray.reverse() 翻转整个数组的顺序
myObservableArray.sort() 给数组排序
```

默认情况下，是按照字符排序（如果是字符）或者数字排序（如果是数字）。

你可以排序传入一个排序函数进行排序，该排序函数需要接受2个参数（代表该数组里需要比较的项），如果第一个项小于第二个项，返回-1，大于则返回1，等于返回0。例如：用lastname给person排序，你可以这样写：

```js
myObservableArray.sort (function (left, right) {return left.lastName == right.lastName? 0: (left.lastName < right.lastName? -1: 1) })
myObservableArray.splice() 删除指定开始索引和指定数目的数组对象元素。例如myObservableArray.splice(1, 3) 从索引1开始删除3个元素（第2,3,4个元素）然后将这些元素作为一个数组对象返回。
```

更多observableArray 函数的信息，请参考等价的JavaScript数组标准函数。

remove和removeAll

observableArray 添加了一些JavaScript数组默认没有但非常有用的函数：

```js
myObservableArray.remove(someItem) //删除所有等于someItem的元素并将被删除元素作为一个数组返回
myObservableArray.remove(function(item) { return item.age < 18 }) //删除所有age属性小于18的元素并将被删除元素作为一个数组返回
myObservableArray.removeAll(['Chad', 132, undefined]) //删除所有等于'Chad', 123, or undefined的元素并将被删除元素作为一个数组返回
```

destroy和destroyAll（注：通常只和和Ruby on Rails开发者有关)

destroy和destroyAll函数是为Ruby on Rails开发者方便使用为开发的：

```js
myObservableArray.destroy(someItem) //找出所有等于someItem的元素并给他们添加一个属性_destroy，并赋值为true
myObservableArray.destroy(function(someItem) { return someItem.age < 18 }) //找出所有age属性小于18的元素并给他们添加一个属性_destroy，并赋值为true
myObservableArray.destroyAll(['Chad', 132, undefined]) //找出所有等于'Chad', 123, 或undefined 的元素并给他们添加一个属性_destroy，并赋值为true
```

那么，_destroy是做什么用的？正如我提到的，这只是为Rails 开发者准备的。在Rails 开发过程中，如果你传入一个JSON对象，Rails 框架会自动转换成ActiveRecord对象并且保存到数据库。Rails 框架知道哪些对象以及在数据库中存在，哪些需要添加或更新， 标记_destroy为true就是告诉框架删除这条记录。

注意的是：在KO render一个foreach模板的时候，会自动隐藏带有_destroy属性并且值为true的元素。所以如果你的"delete"按钮调用destroy(someItem) 方法的话，UI界面上的相对应的元素将自动隐藏，然后等你提交这个JSON对象到Rails上的时候，这个元素项将从数据库删除（同时其它的元素项将正常的插入或者更新）。

## 参考

`http://www.aizhengli.com/knockoutjs/52/knockout-viewmodels-observables.html`
`http://www.cnblogs.com/TomXu/archive/2011/11/21/2257154.html`
