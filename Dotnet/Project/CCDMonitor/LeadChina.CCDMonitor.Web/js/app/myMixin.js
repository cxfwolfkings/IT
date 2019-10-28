define(["zui"], function () {
    return {
        data: {
            error_msg_500: "系统异常",
            error_msg_404: "404 PAGE NOT FOUND"

        },
        methods: {
            error: function (msg) {
                console.error(msg);
            }
        }
    }
})