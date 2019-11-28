using System.Windows.Forms;

namespace Com.Colin.Win.Customized
{
    public class TimesButton : Button
    {
        private static long times;
        //附加属性Times，只读
        public long Times
        {
            get
            {
                return times;
            }
        }
        //重载Button基类的OnClick事件
        protected override void OnClick(System.EventArgs e)
        {
            times += 1;
            base.OnClick(e);
        }
    }
}
