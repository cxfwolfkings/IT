# jQuery

## ajax

**post提交：**

```js
$.post('http://xxx/api', 
    {
        key: 'value'
    },
    function (json, textStatus, jqXHR) {
        if (ajaxResponseIsOK(json)) {
            // ...
        }
    },
    "json"
);

$.ajax({
    type: "post",
    url: 'http://xxx/api',
    async: false,
    data: param,
    contentType: "application/json;charset=utf-8",
    dataType: "json",
    success: function (obj) {
        if (ajaxResponseIsOK(obj)) {
            // ...
        }
    }
});
```

**jquery.form.js示例：**

```js
$("#form").ajaxSubmit({
    async: true, //异步提交
    url: 'http://xxx/api', /*设置post提交到的页面*/
    type: "post", /*设置表单以post方法提交*/
    dataType: "json", /*设置返回值类型为文本*/
    success: function (res) {
        if (ajaxResponseIsOK(res)) {
            // ...
        }
    }
});
```

**返回值的通用处理：** 

简易拦截器

```js
// 需要引入jQuery.js、layer.js
// 处理ajax返回值的函数
function ajaxResponseIsOK(json) {
    if (typeof json == 'string' && json.indexOf(':') > 0) { // 如果返回的是json字符串，转换成json对象
        json = eval('(' + json + ')');
    }
    if (json.Status == 401) { // 过期，重新登录
        simpleAlert(json.Message, 2, json.TargetLink);
        return false;
    } else if (json.Status == 403) { // 权限不足
        simpleAlert(json.Message, 2);
        return false;
    }
    return true;
}

// 弹出提示框
function simpleAlert(msg, icon, url) {
    layer.msg(msg, {
        icon: icon,
        time: 2500,
        shade: [0.4, '#FFF'],
        scrollbar: false,
        offset: 350
        //shift: 6//抖动
    }, function () {
        // 返回给定页面（error.html）
        if (url && typeof url == 'string') {
            location.href = url;
        }
    });
}
```

<b style="color:yellow">说明：</b>上面的方法需要在每个ajax回掉函数中都先调用 `ajaxResponseIsOK` 函数，并不方便，也容易遗漏！
