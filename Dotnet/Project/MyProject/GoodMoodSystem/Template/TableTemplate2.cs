using Com.Colin.Forms.Common;
using System.Collections;
using System.Drawing;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    /// <summary>
    /// “中间”模块
    /// </summary>
    public partial class TableTemplate2 : UserControl
    {
        // 代表“测评中心”，“调息中心”，“记录中心”3个界面模块，模拟页签效果
        TestCenter testCenter;
        PranayamaCenter pranayamaCenter;
        RecordCenter recordCenter;

        // key:页签按钮  value:页签模块
        Hashtable CenterMap = new Hashtable();
        // key:页签按钮  value:是否显示
        Hashtable CenterTabMap = new Hashtable();

        // 代表“帮助信息”，“训练信息”2个按钮，模拟页签效果
        // key:页签按钮  value:页签模块
        Hashtable InfoMap = new Hashtable();
        // key:页签按钮  value:是否显示
        Hashtable InfoTabMap = new Hashtable();

        public TableTemplate2()
        {
            InitializeComponent();

            testCenter = new TestCenter();
            pranayamaCenter = new PranayamaCenter();
            recordCenter = new RecordCenter();

            panel10.Controls.Add(testCenter);
            panel10.Controls.Add(pranayamaCenter);
            panel10.Controls.Add(recordCenter);

            CenterTabMap = new Hashtable()
            {
                { myButton3, testCenter },
                { myButton4, pranayamaCenter },
                { myButton5, recordCenter }
            };

            CenterMap = new Hashtable()
            {
                { myButton3, 1 }, { myButton4, 0 }, { myButton5, 0 }
            };

            // 初始化页签显示
            CommonFuc.displayTabByButton(CenterMap, CenterTabMap, new Hashtable() {
                { "BackgroundImage", null },
                { "ForeColor", Color.Black }
            });

            InfoTabMap = new Hashtable()
            {
                { myButton1, panel5 },
                { myButton2, tableLayoutPanel2 }
            };

            InfoMap = new Hashtable()
            {
                { myButton1, 1 },
                { myButton2, 0 }
            };

            // 初始化页签显示
            CommonFuc.displayTabByButton(InfoMap, InfoTabMap);
        }

        /// <summary>
        /// “停止检测”按钮事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, System.EventArgs e)
        {
            Button button = (Button)sender;
            string value = button.Text;
            if (value.Equals("查看记录"))
            {
                button.Text = "停止检测";
            }
            else
            {
                button.Text = "查看记录";
            }
        }

        #region 页签按钮点击事件

        private void myButton3_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, CenterMap, CenterTabMap, 1);
        }

        private void myButton4_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, CenterMap, CenterTabMap, 1);
        }

        private void myButton5_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, CenterMap, CenterTabMap, 1);
        }

        private void myButton1_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, InfoMap, InfoTabMap);
        }

        private void myButton2_Click(object sender, System.EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, InfoMap, InfoTabMap);
        }

        #endregion

        private void TableTemplate2_Paint(object sender, PaintEventArgs e)
        {

        }

        private void tableLayoutPanel17_Paint(object sender, PaintEventArgs e)
        {
            Pen pen = new Pen(Color.LightGray, (float)1.5);
            e.Graphics.DrawLine(pen, tableLayoutPanel17.Left + 10, myButton1.Bottom, tableLayoutPanel17.Right, myButton1.Bottom);
        }

        private void tableLayoutPanel18_Paint(object sender, PaintEventArgs e)
        {
            Pen pen = new Pen(Color.LightGray, (float)1.5);
            e.Graphics.DrawLine(pen, tableLayoutPanel18.Left, myButton3.Bottom, tableLayoutPanel18.Right, myButton3.Bottom);
        }
    }
}
