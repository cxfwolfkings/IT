# 模板语法

Vue.js 使用了基于 HTML 的模版语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。

Vue.js 的核心是一个允许你采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。

结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

## 插值

文本：数据绑定最常见的形式就是使用 {{...}}（双大括号）的文本插值：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    })
  </script>
</body>
</html>
```

Html：使用v-html指令用于输出html代码。这里要注意，如果将用户产生的内容使用v-html 输出后，有可能导致xss 攻击，所以要在服务端对用户提交的内容进行处理，一般可将尖括号"<>"转义。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    <div v-html="message"></div>
  </div>
  <script>
  new Vue({
    el: '#app',
    data: {
      message: '<h1>菜鸟教程</h1>'
    }
  })
  </script>
</body>
</html>
```

属性：HTML属性中的值应使用 v-bind 指令。以下实例判断 class1 的值，如果为 true 使用 class1 类的样式，否则不使用该类：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <style>
  .class1{
    background: #444;
    color: #eee;
  }
  </style>
</head>
<body>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
  <div id="app">
    <label for="r1">修改颜色</label><input type="checkbox" v-model="use" id="r1">
    <br><br>
    <div v-bind:class="{'class1': use}">
      v-bind:class 指令
    </div>
  </div>
  <script>
  new Vue({
      el: '#app',
      data:{
          use: false
      }
  });
  </script>
</body>
</html>
```

给元素绑定href时可以也绑一个target，新窗口打开页面。

```html
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<div id="app">
  <h2><a v-bind:href="url" v-bind:target="target">菜鸟教程</a></h2>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    url: 'http://www.runoob.com',
    target:'_blank'
  }
})
</script>
```

表达式：Vue提供了完全的 JavaScript 表达式支持。Vue只支持单个表达式，不支持语句和流控制。另外，在表达式中，不能使用用户自定义的全局变量，只能使用Vue白名单内的全局变量，例如Math和Date。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    {{5+5}}<br>
    {{ ok ? 'YES' : 'NO' }}<br>
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id">菜鸟教程</div>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        ok: true,
        message: 'RUNOOB',
        id : 1
      }
    })
  </script>
</body>
</html>
```

当我们给一个比如 props 中，或者 data 中被观测的对象添加一个新的属性的时候，不能直接添加，必须使用 Vue.set 方法。

Vue.set 方法用来新增对象的属性。如果要增加属性的对象是响应式的，那该方法可以确保属性被创建后也是响应式的，同时触发视图更新

这里本来 food 对象是没有 count 属性的，我们要给其添加 count 属性就必须使用 Vue.set 方法，而不能写成this.food.count = 1

如果想显示{{}}标签，而不进行替换，使用v-pre 即可跳过这个元素和它的子元素的编译过程。

## 过滤器

- content | 过滤器，vue中没有提供相关的内置过滤器，可以自定义过滤器
- 组件内的过滤器 + 全局过滤器
- 组件内过滤器就是options中的一个filters的属性（一个对象）
  - 多个key就是不同过滤器名，多个value就是与key对应的过滤方式函数体
  - `Vue.filter(名,fn)`
- 输入的内容帮我做一个反转
- 例子：父已托我帮你办点事
- 总结
  - 全局 ：范围大，如果出现同名时，权利小
  - 组件内: 如果出现同名时，权利大，范围小

Vue允许你自定义过滤器，被用作一些常见的文本格式化。由“管道符”指示；过滤器函数接受表达式的值作为第一个参数。

以下实例对输入的字符串第一个字母转为大写：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    {{ message | capitalize }}
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'runoob'
      },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      }
    })
  </script>
</body>
</html>
```

过滤器可以串联：{{ message | filterA | filterB }}。

过滤器是 JavaScript 函数，因此可以接受参数：{{ message | filterA('arg1', arg2) }}。这里，message 是第一个参数，字符串 'arg1' 将传给过滤器作为第二个参数，arg2 表达式的值将被求值然后传给过滤器作为第三个参数。

过滤器可以接收多个表达式，如下示例，message 和 mesage2 将作为过滤器的前两个参数：

```html
<div id="app">
  {{ message,message2 | capitalize('aa') }}
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      message: 'runoob',
      message2: 'runoob'
    },
    filters: {
      capitalize: function (value,value2,value3) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)+value.substring(0,value2.length-1)+value2.charAt(value2.length-1).toUpperCase()+'<br>'+value3
      }
    }
  })
</script>
```

结果为：RunoobrunooB aa

过滤器应当用于处理简单的文本转换，如果要实现更为复杂的数据变换，应该使用计算属性。

## 指令

指令是带有 v- 前缀的特殊属性。用于在表达式的值改变时，将某些行为应用到DOM上。例如，v-if指令可以根据表达式seen的值(true或false)来决定是否插入p元素。

参数：在指令后以冒号指明。例如，v-bind指令被用来响应地更新HTML属性：

```html
<a v-bind:href="url">菜鸟教程</a>
```

在这里href是参数，告知v-bind指令将该元素的href属性与表达式url的值绑定。给元素绑定href时可以也绑一个target，新窗口打开页面。

另一个例子是v-on 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">
```

在这里参数是监听的事件名。表达式可以是一个方法名，这些方法都写在Vue实例的methods属性内，并且是函数的形式，函数内的this指向的是当Vue实例本身，因此可以直接使用this.xxx的形式来访问或修改数据。表达式除了方法名，也可以直接是一个内联语句。Vue将methods里的方法也代理了，所以也可以像访问Vue数据那样来调用方法。

修饰符：以半角句号.指明的特殊后缀，用于指出一个指定应该以特殊方式绑定。例如，.prevent修饰符告诉v-on指令对于触发的事件调用 event.preventDefault()：

```html
<form v-on:submit.prevent="onSubmit"></form>
```

## 语法糖

语法糖是指在不影响功能的情况下，添加某种方法实现同样的效果，从而方便程序开发。

Vue.js为两个最为常用的指令提供了特别的缩写：

v-bind缩写：v-bind:xxx -> :xxx

v-on 缩写：v-on:evnetName -> @evnetName

## 用户输入

在 input 输入框中我们可以使用 v-model 指令来实现双向数据绑定：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Runoob!'
      }
    })
  </script>
</body>
</html>
```

v-model 指令用来在 input、select、textarea、checkbox、radio 等表单控件元素上创建双向数据绑定，根据表单上的值，自动更新绑定的元素的值。

按钮的事件我们可以使用 v-on 监听，并对用户的输入进行响应。

以下实例在用户点击按钮后对字符串进行反转操作：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
  <script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
  <div id="app">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">反转字符串</button>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Runoob!'
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('')
        }
      }
    })
  </script>
</body>
</html>
```

## 周期事件

- 声明周期事件（钩子）回调函数
  - created: 数据的初始化、DOM没有生成
  - mounted: 将数据装载到DOM元素上，此时有DOM

## 计算属性

模板内的表达式常用于简单的运算，当其过长或逻辑复杂时，会难以维护，计算属性就是用于解决该问题的。

***computed***

计算属性关键词: computed。计算属性在处理一些复杂逻辑时是很有用的。

示例：反转字符串

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  {{ message.split('').reverse().join('') }}
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  }
})
</script>
</body>
</html>
```

模板变的复杂，不容易看懂。接下来看使用了计算属性的实例：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <p>原始字符串: {{ message }}</p>
  <p>计算后反转字符串: {{ reversedMessage }}</p>
</div>

<script>
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
</body>
</html>
```

声明一个计算属性reversedMessage。每一个计算属性都包含－个getter和setter，上面的示例是计算属性的默认用法，只是利用getter来读取。提供的函数将用作属性vm.reversedMessage的getter。vm.reversedMessage依赖于vm.message，在vm.message发生改变时，vm.reversedMessage也会更新。

***computed vs methods***

我们可以使用methods来替代computed，效果上两个都是一样的，但是computed是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用methods，在重新渲染的时候，函数总会重新调用执行。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <p>原始字符串: {{ message }}</p>
  <p>计算后反转字符串: {{ reversedMessage }}</p>
  <p>使用方法后反转字符串: {{ reversedMessage2() }}</p>
</div>

<script>
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    reversedMessage2: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
</script>
</body>
</html>
```

可以说使用computed性能会更好，但是如果你不希望缓存，你可以使用methods属性。

把代码改了改，应该可以体现 computer 属性“依赖缓存”的概念以及与 method 的差别。

如下面代码，cnt 是独立于 vm 对象的变量。在使用 reversedMessage 这个计算属性的时候，第一次会执行代码，得到一个值，以后再使用 reversedMessage 这个计算属性，因为 vm 对象没有发生改变，于是界面渲染就直接用这个值，不再重复执行代码。而 reversedMessage2 没有这个缓存，只要用一次，函数代码就执行一次，于是每次返回值都不一样。

```js
var cnt=1;
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Runoob!'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      cnt+=1;
      return cnt+this.message.split('').reverse().join('')
    }
  },
  methods: {
    reversedMessage2: function () {
      cnt+=1;
      return cnt+this.message.split('').reverse().join('')
    }
  }
})
```

当你没有使用到计算属性的依赖缓存的时候，可以使用定义方法来代替计算属性，在 methods 里定义一个方法可以实现相同的效果，甚至该方法还可以接受参数，使用起来更灵活。

```html
<div id ="app">My Runoob Application
    <p>原始数据：{{text}}</p>
    <!-- 注意，这里的reversedText是方法，所以要带()-->
    <p>变化后数据：{{reversedText()}}</p>
</div>
<script>
var app = new Vue({
    el: '#app',
    data: {
        text:'123,456',
    },
    methods:{
        reversedText: function(){
            return this.text.split(',').reverse().join(',');
        }
    },
});
</script>
```

***computed setter**

computed属性默认只有getter，不过在需要时你也可以提供一个setter：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.4.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <p>{{ site }}</p>
</div>

<script>
var vm = new Vue({
  el: '#app',
  data: {
    name: 'Google',
    url: 'http://www.google.com'
  },
  computed: {
    site: {
      // getter
      get: function () {
        return this.name + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
})
// 调用 setter， vm.name 和 vm.url 也会被对应更新
vm.site = '菜鸟教程 http://www.runoob.com';
document.write('name: ' + vm.name);
document.write('<br>');
document.write('url: ' + vm.url);
</script>
</body>
</html>
```

从实例运行结果看，在运行 `vm.site = '菜鸟教程 http://www.runoob.com';` 时，setter会被调用，vm.name 和 vm.url也会被对应更新。

计算属性除了简单的文本插值外，还经常用于动态地设置元素的样式名称class和内联样式style。当使用组件时，计算属性也经常用来动态传递props。

计算属性还有两个很实用的小技巧容易被忽略：一是计算属性可以依赖其他计算属性；二是计算属性不仅可以依赖当前Vue实例的数据，还可以依赖其他实例的数据

- 案例：
  - 计算器
  - options:

    ```javascript
    computed:{ getResult:function(){ return obj||str } }`
    // 利用相关参数的属性发生改变触发函数，逻辑入口点太多，不方便  
    // 如果当属性没有发生改变也会触发（性能不太好）  
    // 计算属性可以根据当前值如果没有发生改变，取缓存中的值，不触发计算函数  
    // 凡是与this相关的属性在计算属性中出现，任意一个发生改变，就会触发
    ```

## 样式绑定

v-bind的主要用法是动态更新HTML元素上的属性。在数据绑定中，最常见的两个需求就是元素的样式名称class和内联样式style的动态绑定，它们也是HTML的属性，因此可以使用v-bind指令。

我们只需要用v-bind计算出表达式最终的字符串就可以，不过有时候表达式的逻辑较复杂，使用字符串拼接方法较难阅读和维护，所以Vue.js增强了对class和style的绑定。

### class属性绑定

我们可以为 v-bind:class 设置一个对象，从而动态的切换 class

下面实例中将 isActive 设置为 true 显示一个绿色的 div 块，如果设置为 false 则不显示：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.active {
    width: 100px;
    height: 100px;
    background: green;
}
</style>
</head>
<body>
<div id="app">
  <div v-bind:class="{ active: isActive }"></div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    isActive: true
  }
})
</script>
</body>
</html>
```

我们也可以在对象中传入更多属性用来动态切换多个 class 。

下面示例text-danger 类背景颜色覆盖了 active 类的背景色：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.active {
    width: 100px;
    height: 100px;
    background: green;
}
.text-danger {
    background: red;
}
</style>
</head>
<body>
<div id="app">
  <div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
  </div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    isActive: true,
    hasError: true
  }
})
</script>
</body>
</html>
```

我们也可以直接绑定数据里的一个对象

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.active {
    width: 100px;
    height: 100px;
    background: green;
}
.text-danger {
    background: red;
}
</style>
</head>
<body>
<div id="app">
  <div v-bind:class="classObject"></div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    classObject: {
      active: true,
      'text-danger': true
    }
  }
})
</script>
</body>
</html>
```

此外，我们也可以在这里绑定返回对象的计算属性。这是一个常用且强大的模式。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.base {
  width: 100px;
  height: 100px;
}

.active {
  background: green;
}

.text-danger {
  background: red;
}
</style>
</head>
<body>
<div id="app">
  <div v-bind:class="classObject"></div>
</div>
<script>

new Vue({
  el: '#app',
  data: {
    isActive: true,
    error: {
      value: true,
      type: 'fatal'
    }
  },
  computed: {
    classObject: function () {
      return {
        base: true,
        active: this.isActive && !this.error.value,
        'text-danger': this.error.value && this.error.type === 'fatal',
      }
    }
  }
})
</script>
</body>
</html>
```

我们可以把一个数组传给 v-bind:class

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.active {
    width: 100px;
    height: 100px;
    background: green;
}
.text-danger {
    background: red;
}
</style>
</head>
<body>
<div id="app">
    <div v-bind:class="[activeClass, errorClass]"></div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
})
</script>
</body>
</html>
```

我们还可以使用三元表达式来切换列表中的class：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
<style>
.text-danger {
    width: 100px;
    height: 100px;
    background: red;
}
.active {
    width: 100px;
    height: 100px;
    background: green;
}
</style>
</head>
<body>
<div id="app">
    <div v-bind:class="[errorClass, isActive ? activeClass : '']"></div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    isActive: true,
    activeClass: 'active',
    errorClass: 'text-danger'
  }
})
</script>
</body>
</html>
```

如果直接在自定义组件上使用class 或 :class，样式规则会直接应用到这个组件的根元素上，这种用法仅适用于自定义组件的最外层是一个根元素，否则会无效，当不满足这种条件或需要给具体的子元素设置类名时，应当使用组件的props来传递。这些用法同样适用于绑定内联样式style的内容。

### style（内联样式）

我们可以在v-bind:style直接设置样式：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">菜鸟教程</div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    activeColor: 'green',
    fontSize: 30
  }
})
</script>
</body>
</html>
```

css属性名称使用驼峰命名(camelCase)或短横分隔命名(kebab-case)。也可以直接绑定到一个样式对象，让模板更清晰：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <div v-bind:style="styleObject">菜鸟教程</div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    styleObject: {
      color: 'green',
      fontSize: '30px'
    }
  }
})
</script>
</body>
</html>
```

v-bind:style 可以使用数组将多个样式对象应用到一个元素上：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <div v-bind:style="[baseStyles, overridingStyles]">菜鸟教程</div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    baseStyles: {
      color: 'green',
      fontSize: '30px'
    },
    overridingStyles: {
      'font-weight': 'bold'
    }
  }
})
</script>
</body>
</html>
```

注意：当 v-bind:style使用需要特定前缀的CSS属性时，如transform，Vue.js会自动侦测并添加相应的前缀。

Mustache（双大括号写法）不能在HTML属性中使用，应使用v-bind指令，这对布尔值的属性也有效——如果条件被求值为false的话该属性会被移除。

- v-bind动态绑定指令，默认情况下标签自带属性的值是固定的，在为了能够动态的给这些属性添加值，可以使用v-bind:你要动态变化的值="表达式"
- v-bind用于绑定属性和数据，其缩写为":" 也就是v-bind:id === :id
- v-model用在表单控件上的，用于实现双向数据绑定，所以如果你用在除了表单控件以外的标签是没有任何效果的。

动态调节示例：

```html
<div id="dynamic">  
    <div v-bind:style="{color: 'red', fontSize: fontSize + 'px'}">可以动态调节</div>  
    <div v-bind:style="objectStyle"> 不可以动态调节</div>
    {{fontSize}}
    <button @click="++fontSize">+</button>
    <button @click="--fontSize">-</button>
</div>
<script>
var app = new Vue({
    el: '#dynamic',
    data: {
        fontSize: 20,
        objectStyle: {
            color: 'green',
            fontSize: this.fontSize + 'px'
        }
    }
})
</script>
```

#### 监视

我们可以通过 watch 来响应数据的变化。以下实例通过使用 watch 实现计数器：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.4.2/vue.min.js"></script>
</head>
<body>
<div id = "app">
 <p style = "font-size:25px;">计数器: {{ counter }}</p>
 <button @click = "counter++" style = "font-size:25px;">点我</button>
</div>
<script type = "text/javascript">
 var vm = new Vue({
    el: '#app',
    data: {
       counter: 1
    }
 });
 vm.$watch('counter', function(nval, oval) {
    alert('计数器值的变化 :' + oval + ' 变为 ' + nval + '!');
 });
</script>
</body>
</html>
```

以下实例进行千米与米之间的换算：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
    <script src="https://cdn.staticfile.org/vue/2.4.2/vue.min.js"></script>
</head>
   <body>
      <div id = "computed_props">
         千米 : <input type = "text" v-model = "kilometers">
         米 : <input type = "text" v-model = "meters">
      </div>
       <p id="info"></p>
      <script type = "text/javascript">
         var vm = new Vue({
            el: '#computed_props',
            data: {
               kilometers : 0,
               meters:0
            },
            methods: {
            },
            computed :{
            },
            watch : {
               kilometers:function(val) {
                  this.kilometers = val;
                  this.meters = this.kilometers * 1000
               },
               meters : function (val) {
                  this.kilometers = val/ 1000;
                  this.meters = val;
               }
            }
         });
         // $watch 是一个实例方法
        vm.$watch('kilometers', function (newValue, oldValue) {
            // 这个回调将在 vm.kilometers 改变后调用
            document.getElementById ("info").innerHTML = "修改前值为: " + oldValue + "，修改后值为: " + newValue;
        })
      </script>
   </body>
</html>
```

以上代码中我们创建了两个输入框，data 属性中， kilometers 和 meters 初始值都为 0。watch 对象创建了两个方法 kilometers 和 meters。

当我们在输入框输入数据时，watch 会实时监听数据变化并改变自身的值。

通过vue监听事件实现一个简单的购物车

```html
<style>
  table {
    border: 1px solid black;
  }

  table {
    width: 100%;
  }

  th {
    height: 50px;
  }

  th,
  td {
    border-bottom: 1px solid #ddd;
  }
</style>
<div id="app">
  <table>
    <tr>
      <th>序号</th>
      <th>商品名称</th>
      <th>商品价格</th>
      <th>购买数量</th>
      <th>操作</th>
    </tr>
    <tr v-for="iphone in Ip_Json">
      <td>{{ iphone.id }}</td>
      <td>{{ iphone.name }}</td>
      <td>{{ iphone.price }}</td>
      <td>
        <button v-bind:disabled="iphone.count === 0" v-on:click="iphone.count-=1">-</button>
        {{ iphone.count }}
        <button v-on:click="iphone.count+=1">+</button>
      </td>
      <td>
        <button v-on:click="iphone.count=0">移除</button>
      </td>
    </tr>
  </table>
  总价：${{totalPrice()}}
</div>
<script>
  var app = new Vue({
    el: '#app',
    data: {
      Ip_Json: [{
        id: 1,
        name: 'iphone 8',
        price: 5099,
        count: 1
      },
      {
        id: 2,
        name: 'iphone xs',
        price: 8699,
        count: 1
      },
      {
        id: 3,
        name: 'iphone xr',
        price: 6499,
        count: 1
      }]
    },
    methods: {
      totalPrice: function () {
        var totalP = 0;
        for (var i = 0, len = this.Ip_Json.length; i < len; i++) {
          totalP += this.Ip_Json[i].price * this.Ip_Json[i].count;
        }
        return totalP;
      }
    }
  })
</script>
```

- watch 可以对（单个）变量进行监视，也可以深度监视
- 如果需求是对于10个变量进行监视？
- 计算属性 computed 可以监视多个值，并且指定返回数据，并且可以显示
- options 中的根属性
  - watch 监视单个
  - computed 可以监视多个 this 相关属性值的改变，如果和原值一样不会触发函数的调用，并且可以返回对象

## 条件语句

### v-if

条件判断使用 v-if 指令：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <p v-if="seen">现在你看到我了</p>
    <template v-if="ok">
      <h1>菜鸟教程</h1>
      <p>学的不仅是技术，更是梦想！</p>
      <p>哈哈哈，打字辛苦啊！！！</p>
    </template>
</div>
<script>
new Vue({
  el: '#app',
  data: {
    seen: true,
    ok: true
  }
})
</script>
</body>
</html>
```

这里，v-if 指令将根据表达式 seen 的值（true 或 false）来决定是否插入 p 元素。

在字符串模板中，如 Handlebars ，我们得像这样写一个条件块：

```html
<!-- Handlebars 模板 -->
{{#if ok}}
  <h1>Yes</h1>
{{/if}}
```

### v-else

可以用 v-else 指令给 v-if 添加一个 "else" 块：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <div v-if="Math.random() > 0.5">
      Sorry
    </div>
    <div v-else>
      Not sorry
    </div>
</div>

<script>
new Vue({
  el: '#app'
})
</script>
</body>
</html>
```

### v-else-if

v-else-if 在 2.1.0 新增，顾名思义，用作 v-if 的 else-if 块。可以链式的多次使用：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    type: 'C'
  }
})
</script>
</body>
</html>
```

v-else 、v-else-if 必须跟在 v-if 或者 v-else-if之后。

### v-show

我们也可以使用 v-show 指令来根据条件展示元素：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
    <h1 v-show="ok">Hello!</h1>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    ok: true
  }
})
</script>
</body>
</html>
```

### v-if与v-show的区别

在切换 v-if 块时，Vue.js 有一个局部编译/卸载过程，因为 v-if 之中的模板也可能包括数据绑定或子组件。v-if是真实的条件渲染，因为它会确保条件块在切换当中合适地销毁与重建条件块内的事件监听器和子组件。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——在条件第一次变为真时才开始局部编译（编译会被缓存起来）。

相比之下，v-show 简单得多——元素始终被编译并保留，只是简单地基于 CSS 切换。

v-if 是动态添加，当值为 false 时，是完全移除该元素，即 dom 树中不存在该元素。

v-show 仅是隐藏/显示，值为 false 时，该元素依旧存在于 dom 树中。若其原有样式设置了 display: none 则会导致其无法正常显示。

一般来说，v-if 有更高的切换消耗而 v-show 有更高的初始渲染消耗。因此，如果需要频繁切换 v-show 较好，如果在运行时条件不大可能改变 v-if 较好。

简单来说：

- v-if：判断是否加载，可以减轻服务器压力，在需要时加载
- v-show：调整css display属性，可以使客户端操作更加流畅

## 循环语句

***v-for***

循环使用 v-for 指令。

v-for 指令需要以 site in sites 形式的特殊语法， sites 是源数据数组并且 site 是数组元素迭代的别名。

v-for 可以绑定数据到数组来渲染一个列表：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <ol>
    <li v-for="site in sites">
      {{ site.name }}
    </li>
  </ol>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    sites: [
      { name: 'Runoob' },
      { name: 'Google' },
      { name: 'Taobao' }
    ]
  }
})
</script>
</body>
</html>
```

模板中使用 v-for：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <ul>
    <template v-for="site in sites">
      <li>{{ site.name }}</li>
      <li>--------------</li>
    </template>
  </ul>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    sites: [
      { name: 'Runoob' },
      { name: 'Google' },
      { name: 'Taobao' }
    ]
  }
})
</script>
</body>
```

***v-for 迭代对象***

v-for 可以通过一个对象的属性来迭代数据：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <ul>
    <li v-for="value in object">
    {{ value }}
    </li>
  </ul>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    object: {
      name: '菜鸟教程',
      url: 'http://www.runoob.com',
      slogan: '学的不仅是技术，更是梦想！'
    }
  }
})
</script>
</body>
</html>
```

你也可以提供第二个的参数为键名：

```html
<div id="app">
  <ul>
    <li v-for="(value, key) in object">
    {{ key }} : {{ value }}
    </li>
  </ul>
</div>
```

第三个参数为索引：

```html
<div id="app">
    <ul>
      <li v-for="(value, key, index) in object">
       {{ index }}. {{ key }} : {{ value }}
      </li>
    </ul>
 </div>
```

***v-for 迭代整数***

v-for 也可以循环整数

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <ul>
    <li v-for="n in 10">
     {{ n }}
    </li>
  </ul>
</div>

<script>
new Vue({
  el: '#app'
})
</script>
</body>
</html>
```

v-for 还可以循环数组：

```html
<div id="app">
  <ul>
    <li v-for="n in [1,3,5]">
      {{ n }}
    </li>
  </ul>
</div>
```

v-for 默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个 key 的特殊属性：

```html
<div v-for="item in items" :key="item.id">{{ item.text }}</div>
```

不仅如此，在迭代属性输出之前，v-for会对属性进行升序排序输出：

```js
new Vue({
  el: '#app',
  data: {
    object: {
      2: '学的不仅是技术，更是梦想！',
      1: '菜鸟教程',
      0: 'http://www.runoob.com'
    }
  }
})
```

遍历对象的时候可以处理嵌套：

```html
<div id="app">
  <ul>
    <li v-for="(value,key,index) in object">
        <p v-if="typeof value !='object'">{{value}}....{{ index }}</p>
        <p v-else>{{key}}....{{index}}</p>
        <ul v-if="typeof value == 'object'">
            <li v-for="(value, key, index) in value">
                {{key}}:{{value}}....{{ index }}
            </li>
        </ul>
    </li>
  </ul>
</div>
```

九九乘法是程序员的最爱:

```html
<div id="app">
    <div v-for="n in 9">
        <b v-for="m in n">
            {{m}}*{{n}}={{m*n}}
        </b>
    </div>
</div>
```

## 事件处理器

事件监听可以使用 v-on 指令：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <button v-on:click="counter += 1">增加 1</button>
  <p>这个按钮被点击了 {{ counter }} 次。</p>
</div>

<script>
new Vue({
  el: '#app',
  data: {
    counter: 0
  }
})
</script>
</body>
</html>
```

通常情况下，我们需要使用一个方法来调用JavaScript方法，v-on 可以接收一个定义的方法来调用。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
   <!-- `greet` 是在下面定义的方法名 -->
  <button v-on:click="greet">Greet</button>
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    name: 'Vue.js'
  },
  // 在 `methods` 对象中定义方法
  methods: {
    greet: function (event) {
      // `this` 在方法里指当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
          alert(event.target.tagName)
      }
    }
  }
})
// 也可以用 JavaScript 直接调用方法
app.greet() // -> 'Hello Vue.js!'
</script>
</body>
</html>
```

除了直接绑定到一个方法，也可以用内联JavaScript语句。

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Vue 测试实例 - 菜鸟教程(runoob.com)</title>
<script src="https://cdn.staticfile.org/vue/2.2.2/vue.min.js"></script>
</head>
<body>
<div id="app">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>

<script>
new Vue({
  el: '#app',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
</script>
</body>
</html>
```

Vue 提供了一个特殊变量$event，用于访问原生 DOM 事件。

### 事件修饰符

Vue.js为v-on提供了事件修饰符来处理DOM事件细节，如：event.preventDefault()或event.stopPropagation()。

Vue.js通过由点(.)表示的指令后缀来调用修饰符。

- .stop：就是js中的event.stopPropagation()的缩写，它是用来阻止冒泡的
- .prevent：就是js中event.preventDefault()的缩写，它是用来阻止默认行为的；
- .capture：在传递的父子事件中，加了这个，无论先点哪个，都先执行这个。捕获事件和冒泡事件（默认）是两种事件流，事件捕获是从document到触发事件的那个元素；冒泡事件是从下向上的触发事件；
- .self：就是防止父元素（设置了该修饰符）的子元素的事件冒泡到父元素上，只有本身触发时才会执行事件处理程序（函数）；
- .once：每次页面重载后只会执行一次。

```html
<!-- 阻止单击事件冒泡 -->
<a v-on:click.stop="doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>
<!-- 修饰符可以串联  -->
<a v-on:click.stop.prevent="doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件侦听器时使用事件捕获模式 -->
<div v-on:click.capture="doThis">...</div>
<!-- 只当事件在该元素本身（而不是子元素）触发时触发回调 -->
<div v-on:click.self="doThat">...</div>
<!-- click 事件只能点击一次，2.1.4版本新增 -->
<a v-on:click.once="doThis"></a>
```

### 按键修饰符

Vue允许为v-on在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 keyCode 是 13 时调用 vm.submit() -->
<input v-on:keyup.13="submit">
```

记住所有的 keyCode 比较困难，所以Vue为最常用的按键提供了别名：

```html
<!-- 同上 -->
<input v-on:keyup.enter="submit">
<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

全部的按键别名：

- .enter
- .tab
- .delete （捕获“删除”和“退格”键）
- .esc
- .space
- .up
- .down
- .left
- .right
- .ctrl
- .alt
- .shift
- .meta

实例：

```html
<p><!-- Alt + C -->
<input @keyup.alt.67="clear">
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

computed对象内的方法如果在初始化时绑定到元素上的事件会先执行一次这个方法 ，而methods内的方法则不会；例如以下实例初始化时会自动执行一遍name1和greet这两个方法：

```js
var app = new Vue({
    el: '#app',
    data: {
        name: 'Vue.js'
    },
    // 在 `methods` 对象中定义方法
    computed: {
        name1: function(){  alert('222') },
        greet: function (event) {
            // `this` 在方法里指当前 Vue 实例
            alert('Hello ' + this.name + '!')
            // `event` 是原生 DOM 事件
            if (event) {
                alert(event.target.tagName)
            }
        }
    }
})
// 也可以用 JavaScript 直接调用方法
```

当绑定 v-on:click 事件时，想传入参数同时也传入当前元素：

```html
<button v-on:click="say('hi',$event)">say hi</button>

methods:{
  say:function(message,e){
     alert(message);
     console.log(e.currentTarget);
  }
}
```

点击按钮的不同操作：

```html
<div id="app">
    <input type="button"
        value="单击后增加"
        @click="m +=1">
    <input type="button"
        value="绑定函数的按钮"
        @click="add">
    <input type="button"
        value="绑定可传值函数的按钮"
        @click="add2(3,4)">
    <div>这个按钮被点击了 {{ m }} 。</div>
</div>
```
