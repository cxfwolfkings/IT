const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");

/**
 * connect-multiparty 中间件是用来处理文件上传的模块。
 * 它会在服务器上创建临时文件，但自己不会删除临时文件，
 * 所以我们在使用的时候，最好只在需要的路由上挂载该中间件，
 * 此外，在处理完成后，记得主动删除临时文件。
 */
const multipartMiddleware = multipart();
const app = express();

/**
 * 定义mock方法
 * 
 * 我们定义了一个 mock 方法，该方法接收一个数据对象或者一个最终返回数据对象的函数作为第一个参数，第二个参数是可选的请求参数。
 * 当第一个参数是函数的时候，开发者可以根据请求参数进行个性化的数据输出。
 * mock 方法最终返回的是一个用作响应的数据对象。
 */ 
const mock = (data, params) => {
    if (Object.prototype.toString.call(data) === "[object Object]") {
        return data;
    } else if (typeof data === "function") {
        return data(params);
    } else {
        return "error: data shold be an object or a function.";
    }
};

/** 
 * mock数据
 * 
 * getUserInfo 对象是一个特定接口的响应数据。当请求路径匹配到 /api/getUserInfo 时，
 * 就会将 getUserInfo 对象 mock 的数据作为响应返给浏览器。这里我们这定义了一个接口，
 * 所以只 mock 了一个数据对象。在实际的开发中，你需要针对每个接口定义相应的数据 mock 数据对象。
 */ 
const getUserInfo = {
    code: 0,
    message: "success",
    data: {
        name: "Alice",
        mobile: "182xxxx9999",
        age: 30
    }
}

/**
 * 路由和数据的聚合
 * 
 * config 数组中，包含了请求的路径、请求的方法、请求的响应数据。
 * 我们对 config 进行遍历，将数组中所有的请求路径挂载到我们的服务，
 * 我们会根据请求方法来决定如何处理数据和返回数据。
 * 可以看到我们同时支持了 get、post 和 jsonp 三种形式的请求。
 */
const config = [
    {
        method: "get",
        url: '/api/getUserInfo',
        data: getUserInfo
    }
];

/**
 * body-parser 是 Express 内置的中间件，主要负责解析请求体，
 * 帮我们屏蔽掉了对不同请求类型，不同编码格式，代码的边界异常的复杂处理过程。
 * 它会将解析出来的内容挂在 req.body 对象，使用起来非常方便。
 * 我们需要在我们自定义的中间件或者处理器之前使用 body-parser。
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * 绑定路由信息
 */
config.forEach(({ method, url, data }) => {
    if (method === "get") {
        app.get(url, (req, res) => {
            res.json(mock(data, req.query));
        });
    } else if (method === "post") {
        app.post(url, multipartMiddleware, (req, res) => {
            res.json(mock(data, req.body));
        });
    } else if (method === "jsonp") {
        app.get(url, (req, res) => {
            const query = req.query;

            const mockData = JSON.stringify(mock(data, req.query));

            const callback =
                "typeof " +
                query.callback +
                ' === "function" && ' +
                query.callback +
                "(" +
                mockData +
                ")";

            res.send(callback);
        });
    }
});

/**
 *  支持自定义端口
 * 
 *  在 server.js 中，我们的 mock 服务器默认运行在 8081 端口，
 *  同时我们提供了配置入口，开发者可以在启动 mock 服务器的时候通过 --port 自定义。
 */
let port = 8081;
process.argv.forEach((arg, index, arr) => {
    if (arg === "--port") {
        port = arr[index + 1] || 8081;
        return false;
    }
});

module.exports = app.listen(port, () => {
    console.log("Mock Server listening on http://localhost:" + port);
});