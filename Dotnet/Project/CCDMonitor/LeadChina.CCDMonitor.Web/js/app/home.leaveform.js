require(["/js/config.js"], function () {
    "use strict";
    require(['vue', "underscore","./myMixin"], function (Vue, _, myMixin) {
        var item = {
            no: 22841,
            name: "董光鹏",
            days:0
        }
        var app = new Vue({
            el: "#app",
            data: item,
            mixins: [myMixin],
            methods: {
                onSubmit: function () {
                    console.log(JSON.stringify(this.$data));
                    this.error(this.$data.error_msg_500);
                }
            },
            created: function () {
                console.log("created;");
            }
        })
    })
})