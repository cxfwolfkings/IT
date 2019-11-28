using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace Com.Colin.Forms.Template
{
    /// <summary>
    /// 个人信息模块
    /// </summary>
    public partial class UserTemplate : UserControl
    {
        public UserTemplate()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 画一条直线
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void tableLayoutPanel1_Paint(object sender, PaintEventArgs e)
        {
            Pen pen = new Pen(Color.LightGray, (float)1.5);
            e.Graphics.DrawLine(pen, tableLayoutPanel1.Left + 10, button1.Bottom, tableLayoutPanel1.Right, button1.Bottom);
        }
    }
}
