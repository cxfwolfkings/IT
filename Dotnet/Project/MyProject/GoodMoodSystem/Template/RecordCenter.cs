using Com.Colin.Forms.Common;
using Com.Colin.Forms.DB;
using Com.Colin.Forms.Logic;
using Com.Colin.Forms.Model;
using Com.Colin.Forms.Properties;
using Com.Colin.Forms.UI;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.SQLite;
using System.Drawing;
using System.Windows.Forms;
using XPTable.Models;

namespace Com.Colin.Forms.Template
{
    public partial class RecordCenter : UserControl
    {
        /// <summary>
        /// 代表"记录缩略"3个按钮
        /// </summary>
        Hashtable recordMap = new Hashtable();
        /// <summary>
        /// 每页记录数
        /// </summary>
        private int pageSize;
        /// <summary>
        /// 页码
        /// </summary>
        private int pageIndex;
        /// <summary>
        /// 总页数
        /// </summary>
        private int totalPages;
        /// <summary>
        /// 当前用户
        /// </summary>
        private int userId;

        public RecordCenter()
        {
            InitializeComponent();
            recordMap = new Hashtable()
            {
                { myButton9, 1 }, { myButton10, 0 }, { myButton11, 0 }
            };
            CommonFuc.displayTabByButton(recordMap, null, null, new Hashtable()
            {
                { "BackgroundImage", Resources._0130切片_36 },
                { "ForeColor", Color.White }
            });
            myButton11.Location = new Point(panel12.Width - myButton11.Width, myButton11.Location.Y);
            myButton10.Location = new Point(panel12.Width - myButton11.Width - myButton10.Width, myButton10.Location.Y);
            myButton9.Location = new Point(panel12.Width - myButton11.Width - myButton10.Width - myButton9.Width, myButton9.Location.Y);

            myButton1.Location = new Point(panel13.Width - myButton1.Width, myButton1.Location.Y);
            myButton2.Location = new Point(panel13.Width - myButton1.Width * 2 - 15, myButton2.Location.Y);
            myButton3.Location = new Point(panel13.Width - myButton1.Width * 3 - 30, myButton3.Location.Y);
            myButton4.Location = new Point(panel13.Width - myButton1.Width * 4 - 45, myButton4.Location.Y);
            myButton5.Location = new Point(panel13.Width - myButton1.Width * 5 - 60, myButton5.Location.Y);

            // 这里要根据实际情况改正
            userId = 1;
            pageSize = 6;
            pageIndex = 1;
            // 加载数据库中数据
            List<Record> records = HistoryMapper.GetRecordsByUserPerPage(userId, pageSize, pageSize * (pageIndex - 1), ref totalPages);
            updateXPTable(records);
        }

        private void panel9_Paint(object sender, PaintEventArgs e)
        {
            CommonFuc.drawHRV(panel9, e.Graphics);
        }

        private void myButton10_Click(object sender, EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, recordMap, null, 2);
        }

        private void myButton9_Click(object sender, EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, recordMap, null, 2);
        }

        private void myButton11_Click(object sender, EventArgs e)
        {
            CommonFuc.ButtonClickHandler((Button)sender, recordMap, null, 2);
        }

        private void myButton4_Click(object sender, EventArgs e)
        {
            HRVFrame hrv = new HRVFrame();
            hrv.ShowDialog();
        }

        private void tableReports_AfterPaintHeader(object sender, XPTable.Events.PaintHeaderEventArgs e)
        {
            /*
            e.Graphics.DrawImage(Resources._0130切片_63, e.ClipRectangle);
            Font font = new Font("微软雅黑", 9);
            Brush brush = Brushes.White;
            string columnHeaderText = "";
            switch (e.ColumnIndex)
            {
                case 1: columnHeaderText = "序号"; break;
                case 2: columnHeaderText = "类型"; break;
                case 3: columnHeaderText = "难度"; break;
                case 4: columnHeaderText = "时间"; break;
                case 5: columnHeaderText = "心能量指数"; break;
                case 6: columnHeaderText = "M-HRT"; break;
                case 7: columnHeaderText = "SDNN"; break;
                case 8: columnHeaderText = "TP"; break;
            }
            SizeF sizeF = e.Graphics.MeasureString(columnHeaderText, font);
            e.Graphics.DrawString(columnHeaderText, font, brush, e.ClipRectangle.X + (e.ClipRectangle.Width - sizeF.Width) / 2, e.ClipRectangle.Y + (e.ClipRectangle.Height - sizeF.Height) / 2);
            */
        }

        private void myButton12_Click(object sender, EventArgs e)
        {
            pageIndex = 1;
            List<Record> records = HistoryMapper.GetRecordsByUserPerPage(userId, pageSize, pageSize * (pageIndex - 1), ref totalPages);
            updateXPTable(records);
        }

        private void myButton13_Click(object sender, EventArgs e)
        {
            pageIndex -= 1;
            List<Record> records = HistoryMapper.GetRecordsByUserPerPage(userId, pageSize, pageSize * (pageIndex - 1), ref totalPages);
            updateXPTable(records);
        }

        private void myButton14_Click(object sender, EventArgs e)
        {
            pageIndex += 1;
            List<Record> records = HistoryMapper.GetRecordsByUserPerPage(userId, pageSize, pageSize * (pageIndex - 1), ref totalPages);
            updateXPTable(records);
        }

        private void myButton15_Click(object sender, EventArgs e)
        {
            pageIndex = totalPages;
            List<Record> records = HistoryMapper.GetRecordsByUserPerPage(userId, pageSize, pageSize * (pageIndex - 1), ref totalPages);
            updateXPTable(records);
        }

        private void myButton5_Click(object sender, EventArgs e)
        {

        }

        private void myButton3_Click(object sender, EventArgs e)
        {

        }

        private void myButton2_Click(object sender, EventArgs e)
        {

        }

        private void myButton1_Click(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// 更新XPTable控件中表数据
        /// </summary>
        /// <param name="records"></param>
        private void updateXPTable(List<Record> records)
        {
            Row[] reportRows = new Row[records.Count];
            for (int i = 0; i < records.Count; i++)
            {
                reportRows[i] = new Row();
                Cell cellCheckBox = new Cell();
                reportRows[i].Cells.Add(cellCheckBox);
                Cell cellHistoryID = new Cell(i + 1 + "");
                cellHistoryID.Editable = false;
                reportRows[i].Cells.Add(cellHistoryID);
                Cell cellType = new Cell(records[i].Type.ToString());
                cellType.Editable = false;
                reportRows[i].Cells.Add(cellType);
                Cell cellLevel = new Cell(records[i].Level.ToString() == "0" ? "简单" : "困难");
                cellLevel.Editable = false;
                reportRows[i].Cells.Add(cellLevel);
                Cell cellRecordTime = new Cell(records[i].RecordTime.ToString());
                cellRecordTime.Editable = false;
                reportRows[i].Cells.Add(cellRecordTime);
                Cell cellHeartIndex = new Cell(records[i].HeartIndex.ToString());
                cellHeartIndex.Editable = false;
                reportRows[i].Cells.Add(cellHeartIndex);
                Cell cellMMRT = new Cell(records[i].Mhrt.ToString());
                cellMMRT.Editable = false;
                reportRows[i].Cells.Add(cellMMRT);
                Cell cellSDNN = new Cell(records[i].Sdnn.ToString());
                cellSDNN.Editable = false;
                reportRows[i].Cells.Add(cellSDNN);
                Cell cellTP = new Cell(records[i].Tp.ToString());
                cellTP.Editable = false;
                reportRows[i].Cells.Add(cellTP);
            }
            tableModuleReport.Rows.Clear();
            tableModuleReport.Rows.AddRange(reportRows);

            if (pageIndex == 1)
            {
                myButton12.Enabled = false;
                myButton13.Enabled = false;
            }
            else
            {
                myButton12.Enabled = true;
                myButton13.Enabled = true;
            }
            if (pageIndex == totalPages)
            {
                myButton14.Enabled = false;
                myButton15.Enabled = false;
            }
            else
            {
                myButton14.Enabled = true;
                myButton15.Enabled = true;
            }
            label25.Text = pageIndex + "/" + totalPages + " 共" + records.Count + "条记录";
        }
    }
}
