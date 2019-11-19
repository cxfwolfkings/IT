需要的js库
  *  jquery-1.3.1.js
  *  时间插件
     *  jquery.date_input.js
     *  jquery.date_input.min.js
     
需要的css库
    * date_input.css
     
   * 在页面中操作
     * 引入以上js和css库
     * 加入输入时间的文本框  <input type="text" class="biuuu" name="date"/>
     *在<Script>中加入代码
    <script language="JavaScript">
            //改英文为中文
            jQuery.extend(DateInput.DEFAULT_OPTS, {
                month_names: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                short_month_names: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
                short_day_names: ["一", "二", "三", "四", "五", "六", "日"]
            });
            
            //改变输出格式
            $.extend(DateInput.DEFAULT_OPTS, {
                stringToDate: function(string){
                    var matches;
                    if (matches = string.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2})$/)) {
                        return new Date(matches[1], matches[2] - 1, matches[3]);
                    }
                    else {
                        return null;
                    };
                        },
                dateToString: function(date){
                    var month = (date.getMonth() + 1).toString();
                    var dom = date.getDate().toString();
                    if (month.length == 1) 
                        month = "0" + month;
                    if (dom.length == 1) 
                        dom = "0" + dom;
                    return date.getFullYear() + "-" + month + "-" + dom;
                }
            });
    
            
       //在页面调用方法   
	   $(".biuuu").date_input();   
//            $(function(){
//                $(".biuuu").date_input();
//            });
   </script>
