using Com.Colin.Forms.Properties;
using System;
using System.Collections;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Windows.Forms;

namespace Com.Colin.Forms.Common
{
    public class CommonFuc
    {
        //    [DllImport("gdi32.dll")]
        //    public static extern int CreateRoundRectRgn(int x1, int y1, int x2, int y2, int x3, int y3);

        //    [DllImport("user32.dll")]
        //    public static extern int SetWindowRgn(IntPtr hwnd, int hRgn, Boolean bRedraw);

        [DllImport("gdi32.dll", EntryPoint = "DeleteObject", CharSet = CharSet.Ansi)]
        public static extern int DeleteObject(int hObject);

        [DllImport("user32.dll", EntryPoint = "GetWindowLong")]
        public static extern long GetWindowLong(IntPtr hwnd, int nIndex);
        [DllImport("user32.dll", EntryPoint = "SetWindowLong")]
        public static extern long SetWindowLong(IntPtr hwnd, int nIndex, long dwNewLong);

        [DllImport("user32.dll", CharSet = CharSet.Auto)]
        private static extern int SetWindowPos(IntPtr hWnd, int hWndInsertAfter, int x, int y, int Width, int Height, int flags);

        [DllImportAttribute("gdi32.dll")]
        public static extern IntPtr CreateRoundRectRgn(int nLeftRect, int nTopRect, int nRightRect, int nBottomRect, int nWidthEllipse, int nHeightEllipse);

        [DllImportAttribute("user32.dll")]
        public static extern int SetWindowRgn(IntPtr hWnd, IntPtr hRgn, bool bRedraw);

        public const int GWL_EXSTYLE = -20;
        public const int WS_EX_TRANSPARENT = 0x20;
        public const int WS_EX_LAYERED = 0x80000;
        public const int LWA_ALPHA = 2;

        public const int GWL_STYLE = (-16);
        public const int WS_CAPTION = 0xC00000;

        public static int hRgn = 0;
        public static int rgnRadius = 6;

        public static bool IsDrawAll = true;

        [DllImport("user32.dll")]
        public static extern bool ReleaseCapture();
        [DllImport("user32.dll")]
        public static extern bool SendMessage(IntPtr hwnd, int wMsg, int wParam, int lParam);
        public const int WM_SYSCOMMAND = 0x0112;
        public const int SC_MOVE = 0xF010;
        public const int HTCAPTION = 0x0002;

        public static void MouseDown(Form form)
        {
            ReleaseCapture();
            SendMessage(form.Handle, WM_SYSCOMMAND, SC_MOVE + HTCAPTION, 0);
        }

        /// <summary>
        /// 以07：00：00-1的格式显示日期
        /// </summary>
        /// <param name="standardTime">用以帮助判断第一天还是第二天的基准时间</param>
        /// <param name="showTime"></param>
        /// <returns></returns>
        public static string ShowTime(DateTime standardTime, DateTime showTime)
        {
            int days = (showTime.Date - standardTime.Date).Days;
            if (days > 0)
            {
                return showTime.ToString("HH:mm:ss") + "-" + (days + 1).ToString() + "日";
            }
            else
            {
                return showTime.ToString("HH:mm:ss");
            }
        }

        /// <summary>
        /// 以07：00-1的格式显示日期，只显示到分钟
        /// </summary>
        /// <param name="standardTime">用以帮助判断第一天还是第二天的基准时间</param>
        /// <param name="showTime"></param>
        /// <returns></returns>
        public static string ShowShortTime(DateTime standardTime, DateTime showTime)
        {
            int days = (showTime.Date - standardTime.Date).Days;
            if (days > 0)
            {
                return showTime.ToString("HH:mm") + "-" + (days + 1).ToString() + "日";
            }
            else
            {
                return showTime.ToString("HH:mm");
            }
        }

        //获取文件创建时间
        public static string GetFileCreateTime(string fileName)
        {
            //string result = "";
            //FileInfo fi = new FileInfo(fileName);
            //result = fi.LastWriteTime.ToString("yyyy-MM-dd HH:mm");
            string result = "";
            FileInfo fi = new FileInfo(fileName);
            result = fi.Name;

            DateTime time = new DateTime(
             int.Parse(result.Substring(0, 4)),
             int.Parse(result.Substring(4, 2)),
             int.Parse(result.Substring(6, 2)),
            int.Parse(result.Substring(8, 2)),
            int.Parse(result.Substring(10, 2)),
            int.Parse(result.Substring(12, 2)));
            result = time.ToString();
            return result;

        }

        #region MD5函数
        /// <summary>    
        /// MD5函数    
        /// </summary>    
        /// <param name="str">原始字符串</param>    
        /// <returns>MD5结果</returns>    
        public static string MD5(string str)
        {
            byte[] b = Encoding.Default.GetBytes(str);
            b = new MD5CryptoServiceProvider().ComputeHash(b);
            string ret = "";
            for (int i = 0; i < b.Length; i++)
                ret += b[i].ToString("x").PadLeft(2, '0');
            return ret;
        }
        #endregion

        public static void FillRoundRectangle(Graphics g, Rectangle rectangle, Color backColor, int r)
        {
            rectangle = new Rectangle(rectangle.X, rectangle.Y, rectangle.Width - 1, rectangle.Height - 1);
            Brush b = new SolidBrush(backColor);
            g.FillPath(b, CommonFuc.GetRoundRectangle(rectangle, r));
        }


        /// <summary>  
        /// 根据普通矩形得到圆角矩形的路径  
        /// </summary>  
        /// <param name="rectangle">原始矩形</param>  
        /// <param name="r">半径</param>  
        /// <returns>图形路径</returns>  
        public static GraphicsPath GetRoundRectangle(Rectangle rectangle, int r)
        {
            int l = 2 * r;
            // 把圆角矩形分成八段直线、弧的组合，依次加到路径中  
            GraphicsPath gp = new GraphicsPath();
            //右上角
            gp.AddLine(new Point(rectangle.X + r, rectangle.Y), new Point(rectangle.Right - r, rectangle.Y));
            gp.AddArc(new Rectangle(rectangle.Right - l, rectangle.Y, l, l), 270F, 90F);

            //右下角
            gp.AddLine(new Point(rectangle.Right, rectangle.Y + r), new Point(rectangle.Right, rectangle.Bottom));

            //左下角
            gp.AddLine(new Point(rectangle.Right, rectangle.Bottom), new Point(rectangle.X, rectangle.Bottom));

            //左上角
            gp.AddLine(new Point(rectangle.X, rectangle.Bottom - r), new Point(rectangle.X, rectangle.Y + r));
            gp.AddArc(new Rectangle(rectangle.X, rectangle.Y, l, l), 180F, 90F);
            return gp;
        }

        public static void FillRoundAllRectangle(Graphics g, Rectangle rectangle, Color backColor, int r)
        {
            rectangle = new Rectangle(rectangle.X, rectangle.Y, rectangle.Width - 1, rectangle.Height - 1);
            Brush b = new SolidBrush(backColor);
            g.FillPath(b, CommonFuc.GetRoundRectangle(rectangle, r));
        }

        public static GraphicsPath GetRoundAllRectangle(Rectangle rectangle, int r)
        {
            int l = 2 * r;
            // 把圆角矩形分成八段直线、弧的组合，依次加到路径中  
            GraphicsPath gp = new GraphicsPath();
            gp.AddLine(new Point(rectangle.X + r, rectangle.Y), new Point(rectangle.Right - r, rectangle.Y));
            gp.AddArc(new Rectangle(rectangle.Right - l, rectangle.Y, l, l), 270F, 90F);

            gp.AddLine(new Point(rectangle.Right, rectangle.Y + r), new Point(rectangle.Right, rectangle.Bottom - r));
            gp.AddArc(new Rectangle(rectangle.Right - l, rectangle.Bottom - l, l, l), 0F, 90F);

            gp.AddLine(new Point(rectangle.Right - r, rectangle.Bottom), new Point(rectangle.X + r, rectangle.Bottom));
            gp.AddArc(new Rectangle(rectangle.X, rectangle.Bottom - l, l, l), 90F, 90F);

            gp.AddLine(new Point(rectangle.X, rectangle.Bottom - r), new Point(rectangle.X, rectangle.Y + r));
            gp.AddArc(new Rectangle(rectangle.X, rectangle.Y, l, l), 180F, 90F);
            return gp;
        }

        public static void DrawFromTitle(Graphics g, string title, int width, int height)
        {
            //画表头
            Brush b = new SolidBrush(Color.FromArgb(228, 238, 248));
            int tHeight = 47;
            int left = 20;
            int top = 0;
            int r = 1;
            int buttom = 88;

            //画左右上角的圆角矩形
            //g.SmoothingMode = SmoothingMode.AntiAlias;
            Rectangle rt = new Rectangle(0, top, width, tHeight);
            g.FillRectangle(new SolidBrush(Color.FromArgb(0, 102, 187)), rt);
            //CommonFuc.FillRoundRectangle(g, rt, Color.FromArgb(0, 102, 187), r);

            rt = new Rectangle(1, top, width - 2, tHeight);
            //CommonFuc.FillRoundRectangle(g, rt, Color.FromArgb(45, 145, 226), r);
            g.FillRectangle(new SolidBrush(Color.FromArgb(45, 145, 226)), rt);

            //画线
            g.SmoothingMode = SmoothingMode.Default;
            Pen pen = new Pen(new SolidBrush(Color.FromArgb(119, 204, 255)));
            g.DrawLine(pen, r, top, width - r, top);

            //画背景颜色
            rt = new Rectangle(0, tHeight, width, height - tHeight);

            g.FillRectangle(b, rt);


            if (IsDrawAll)
            {
                //画矩形
                pen = new Pen(new SolidBrush(Color.FromArgb(165, 203, 248)));
                rt = new Rectangle(left, left + tHeight, width - 2 * left, height - tHeight - left - buttom);
                g.DrawRectangle(pen, rt);

                b = new SolidBrush(Color.FromArgb(246, 249, 254));
                rt = new Rectangle(left + 1, left + tHeight + 1, width - 2 * left - 1, height - tHeight - left - buttom - 1);
                g.FillRectangle(b, rt);
            }
            Font font = new Font("微软雅黑", 14);
            g.DrawString(title, font, Brushes.White, left, (tHeight - font.Height) / 2);
        }

        /// <summary>
        /// 设置窗体的圆角矩形
        /// </summary>
        /// <param name="form">需要设置的窗体</param>
        /// <param name="rgnRadius">圆角矩形的半径</param>
        public static void SetFormRoundRectRgn(Form form, int rgnRadius)
        {
            //int hRgn = 0;
            //hRgn = CreateRoundRectRgn(0, 0, form.Width, form.Height, rgnRadius, rgnRadius);
            //SetWindowRgn(form.Handle, hRgn, true);
            //DeleteObject(hRgn);

        }

        public static void SetFormRoundRectRgn(Form form)
        {
            //SetWindowLong(form.Handle, GWL_STYLE, GetWindowLong(form.Handle, GWL_STYLE) & ~WS_CAPTION).ToString();
            //SetWindowPos(form.Handle, 0, 0, 0, 0, 0, 1 | 2);
            //IntPtr regionHandle = CreateRoundRectRgn(0, 0, form.Width, form.Height, 20, 20);
            //Region roundRegion = null;
            //roundRegion = Region.FromHrgn(regionHandle);
            //SetWindowRgn(form.Handle, regionHandle, true);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="container"></param>
        /// <param name="g"></param>
        public static void drawHRV(Control container, Graphics g)
        {
            // 画图
            int baseHeight = container.Height;
            int baseWidth = container.Width;
            int top = (int)(baseHeight * 0.1);
            int left = (int)(baseWidth * 0.1);
            int bmpHeight = (int)(baseHeight * 0.8);
            int bmpWidth = (int)(baseWidth * 0.8);
            Pen grayPen = new Pen(Color.LightGray, 1);
            g.DrawRectangle(grayPen, left, top, bmpWidth, bmpHeight);
            Font font = new Font("微软雅黑", 10);
            // 画Y轴
            for (int j = 0; j < 6; j++)
            {
                g.DrawLine(grayPen, left - 5, top + (float)((1 - j * 0.19) * bmpHeight), left + bmpWidth, top + (float)((1 - j * 0.19) * bmpHeight));
                g.DrawString(40 + 10 * j + "", font, Brushes.Black, left - 25, top + (float)((1 - j * 0.19) * bmpHeight) - 9);
            }
            string[] xAxis = new string[] { "00:30", "01:00", "01:30", "02:00" };
            // 画X轴
            for (int i = 0; i < 4; i++)
            {
                g.DrawLine(grayPen, left + (float)((i + 1) * 0.25 * bmpWidth), top, left + (float)((i + 1) * 0.25 * bmpWidth), top + bmpHeight);
                g.DrawString(xAxis[i], font, Brushes.Black, left + (float)((i + 1) * 0.25 * bmpWidth) - 15, top + bmpHeight + 2);
            }
        }

        /// <summary>
        /// 根据点击的按钮改变显示界面，模拟页签效果
        /// </summary>
        /// <param name="map">页签模块集合</param>
        /// <param name="tabMap">页签是否显示集合</param>
        /// <param name="unCheckState">不选时样式</param>
        /// <param name="checkState">选中时样式</param>
        public static void displayTabByButton(Hashtable map, Hashtable tabMap = null,
            Hashtable unCheckState = null, Hashtable checkState = null)
        {
            // 遍历页签模块集合
            foreach (Control button in map.Keys)
            {
                // 获取该页签是否显示
                int state = (int)map[button];
                if (state == 1) //显示
                {
                    if (tabMap != null)
                    {
                        ((Control)(tabMap[button])).Dock = DockStyle.Fill;
                        ((Control)(tabMap[button])).Visible = true;
                    }
                    // 样式设置
                    if (checkState == null)
                    {
                        button.BackgroundImage = Resources._0130切片_63;
                        button.ForeColor = Color.White;
                    }
                    else
                    {
                        button.BackgroundImage = (Image)checkState["BackgroundImage"];
                        button.ForeColor = (Color)checkState["ForeColor"];
                    }
                }
                else //不显示
                {
                    if (tabMap != null)
                    {
                        ((Control)(tabMap[button])).Visible = false;
                    }
                    // 样式设置
                    if (unCheckState == null)
                    {
                        button.BackgroundImage = Resources._0130切片_38;
                        button.ForeColor = Color.Gray;
                    }
                    else
                    {
                        button.BackgroundImage = (Image)unCheckState["BackgroundImage"];
                        button.ForeColor = (Color)unCheckState["ForeColor"];
                    }
                }
            }
        }

        /// <summary>
        /// “页签”按钮点击处理
        /// </summary>
        /// <param name="button"></param>
        public static void ButtonClickHandler(Button button, Hashtable map,
            Hashtable tabMap, int group = 0)
        {
            if ((int)map[button] == 1)
                return;
            ArrayList controls = new ArrayList(map.Keys);
            for (int i = 0; i < controls.Count; i++)
            {
                Control key = (Control)controls[i];
                if (key.Equals(button))
                {
                    map[key] = 1;
                }
                else
                {
                    map[key] = 0;
                }
            }
            switch (group)
            {
                case 0: displayTabByButton(map, tabMap); break;
                case 1:
                    displayTabByButton(map, tabMap,
                new Hashtable() {
                        { "BackgroundImage",null},
                        { "ForeColor",Color.Black}
                });
                    break;
                case 2:
                    displayTabByButton(map, tabMap, null,
            new Hashtable() {
                        { "BackgroundImage",Resources._0130切片_36},
                        { "ForeColor",Color.White}
            });
                    break;
            }
        }
        /// <summary>
        /// 递归算法获取界面
        /// </summary>
        /// <param name="control"></param>
        /// <returns></returns>
        public static Control getUIForm(Control control)
        {
            if (control is Form)
                return control;
            if (control.Parent != null)
                return getUIForm(control.Parent);
            return control;
        }
    }
}
