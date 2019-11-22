module.exports = {
    code: 0,
    message: "success",
    data: {
        // name: "Alice",
        // mobile: "182xxxx9999",
        // age: 30
        name: "@cname", // 随机生成中文姓名
        mobile: /^1[385]\d{9}$/, // 手机号我们指定一个简单的正则表达式，Mock.js 会根据正则表达式生成相应的手机号。
        "age|18-50": 1, // 会在 18-50 这个区间生成一个随机的整数。
        "orders|5-10": [ // 会以数组中的数据为模板随机生成 5-10 个订单。
            {
                id: "@id", // 使用了 ID 的占位符，随机生成 订单 id。
                from: "@county(true)", // 使用 @county 占位符随机生成具体到县的地址。
                to: "@county(true)"
            }
        ]
    }
};