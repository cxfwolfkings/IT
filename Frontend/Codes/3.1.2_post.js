
/** 
 * post请求的时候，如果数据是字符串，默认头就是键值对，
 * 否则是对象就是application/json
 */
axios.post('/user', {
    firstName: 'Fred',        // 参数 firstName
    lastName: 'Flintstone'    // 参数 lastName
}).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
});

/**
 * 执行多个并发请求
 */
axios.all([get1(), get2()])
    .then(axios.spread(function (res1, res2) {
        // 只有两个请求都完成才会成功，否则会被catch捕获
    }));
