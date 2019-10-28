define(["jquery"], function ($) {
    return {
        say: function (msg) {
            alert( msg || "say you~");
        }
    }
})