<template>
    <!-- <p>页面载入时，input 元素自动获取焦点：</p> -->
    <input v-focus>
</template>
 
<script>
// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 创建根实例
new Vue({
  el: '#app'
})

// 我们也可以在实例使用 directives 选项来注册局部指令，这样指令只能在这个实例中使用
/*
new Vue({
  el: '#app',
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.focus()
      }
    }
  }
})
*/
</script>
