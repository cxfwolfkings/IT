using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using Aspose.Words;
using Aspose.Words.Saving;
using Aspose.Words.Lists;
namespace PicsToPDF
{
    public partial class FrmMain : Form
    {
        public FrmMain()
        {
            InitializeComponent();
        }

        #region 选择图片
        private void btnSelectPics_Click(object sender, EventArgs e)
        {
            string[] imagesPath;//图片路径数据

            //打开文件
            OpenFileDialog ofd = new OpenFileDialog();
            //ofd.InitialDirectory = "C:";//默认初始目录
            ofd.Filter = "图片 (*.jpg,*.jpeg,*.bmp)|*.jpg;*.jpeg;*.bmp";
            ofd.Multiselect = true;//可以多选文件
            ofd.RestoreDirectory = false;//不还原当前目录，方便下次继续从相同地方添加图片
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                imagesPath = ofd.FileNames;
                if (imagesPath != null && imagesPath.Length < 1)
                    return;

                //将图片加入图片列表
                lbPicAdd(imagesPath);
            }
        }

        /// <summary> 将图片加入图片列表 </summary>
        private void lbPicAdd(string[] strAdd)
        {
            if (strAdd.Length < 1) return;

            for (int i = 0; i < strAdd.Length; i++)
            {
                lbPic.Items.Add(strAdd[i]);
            }
        }
        #endregion

        #region 转换PDF
        private void btnTurn_Click(object sender, EventArgs e)
        {
            //保存PDF的路径
            string savePath = string.Empty;
            //保存文件
            SaveFileDialog sfd = new SaveFileDialog();
            //sfd.InitialDirectory = "C:";//默认初始目录
            sfd.Filter = "PDF文件 (*.pdf)|*.pdf";
            sfd.RestoreDirectory = false;//记住保存目录
            if (sfd.ShowDialog() == DialogResult.OK)
            {
                savePath = sfd.FileName;
            }
            if (string.IsNullOrEmpty(savePath)) return;

            //图片转换PDF
            try
            {
                Cursor = Cursors.WaitCursor;
                string[] jpgs = GetPicsPath();//获取列表中已排序的路径数组
                if (jpgs == null || jpgs.Length < 1) { Cursor = Cursors.Default; return; }
                ImagesToPDF.ConvertJPG2PDF(jpgs, savePath);
                MessageBox.Show("转换完成！", "提示信息");
            }
            catch (Exception ex)
            {
                MessageBox.Show("程序出错！错误信息：\r\n" + ex.Message, "提示信息");
            }
            finally
            {
                Cursor = Cursors.Default;
            }
        }

        private string[] GetPicsPath()
        {
            string[] pics = new string[lbPic.Items.Count];
            for (int i = 0; i < pics.Length; i++)
            {
                pics[i] = lbPic.GetItemText(lbPic.Items[i]);
            }
            return pics;
        }
        #endregion

        #region 图片列表控制
        //上移
        private void btnMoveUp_Click(object sender, EventArgs e)
        {
            moveUp(lbPic);
        }
        //下移
        private void btnMoveDown_Click(object sender, EventArgs e)
        {
            MoveDown(lbPic);
        }
        //删除
        private void btnDeletePic_Click(object sender, EventArgs e)
        {
            Delete(lbPic);
        }
        #endregion

        #region 选择word文档
        private void button1_Click(object sender, EventArgs e)
        {
            string[] FilePath;//文档数据路径
            //打开文件
            OpenFileDialog ofd = new OpenFileDialog();
            //ofd.InitialDirectory = "C:";//默认初始目录
            ofd.Filter = "Word(*.doc,*.docx,*.dot)|*.doc;*.docx;*.dot";
            ofd.Multiselect = true;//可以多选文件
            ofd.RestoreDirectory = false;//不还原当前目录，方便下次继续从相同地方添加图片
            if (ofd.ShowDialog() == DialogResult.OK)
            {
                FilePath = ofd.FileNames;
                if (FilePath == null)
                    return;
               lbWordAdd(FilePath);
            }
        }
        #endregion

        #region 转换为PDF
        private void button2_Click(object sender, EventArgs e)
        {
            string savePath = string.Empty;
            //保存文件
            SaveFileDialog sfd = new SaveFileDialog();
            //sfd.InitialDirectory = "C:";//默认初始目录
            sfd.Filter = "PDF文件 (*.pdf)|*.pdf";
            sfd.RestoreDirectory = false;//记住保存目录
            if (sfd.ShowDialog() == DialogResult.OK)
            {
                savePath = sfd.FileName;
            }
            if (string.IsNullOrEmpty(savePath)) return;
            try
            {
                Document doc = new Document(lbWord.GetItemText(lbWord.Items[0]));
                doc.RemoveAllChildren();

                string[] filepath = new string[lbWord.Items.Count];
                for (int i = 0; i < filepath.Length; i++)
                {
                    filepath[i] = lbWord.GetItemText(lbWord.Items[i]);
                    Document srcDoc = new Document(filepath[i]);
                    doc.AppendDocument(srcDoc, ImportFormatMode.UseDestinationStyles);
                }
                    doc.Save(savePath, SaveFormat.Pdf);
                    MessageBox.Show("转换完成！", "提示信息");
            }
            catch (Exception ex)
            {
                MessageBox.Show("程序出错！错误信息：\r\n" + ex.Message, "提示信息");
            }
            finally
            {
                Cursor = Cursors.Default;
            }
        }
        #endregion
        /// <summary> 将word文档加入列表 </summary>
        private void lbWordAdd(string[] strAdd)
        {
            if (strAdd.Length < 1) return;

            for (int i = 0; i < strAdd.Length; i++)
            {
               lbWord.Items.Add(strAdd[i]);
            }
        }


        private void moveUp(ListBox lb)
        {
            //第一项则不动
            if (lb.SelectedIndex == 0) return;

            int sIndex = lb.SelectedIndex;//选择项索引
            object obj1 = lb.Items[sIndex - 1];
            lb.Items[sIndex - 1] = lbPic.SelectedItem;//交换
            lb.Items[sIndex] = obj1;

            //设置焦点
            lb.SelectedIndex = --sIndex;
        }

        private void MoveDown(ListBox lb)
        {
            //最后一项则不动
            if (lb.SelectedIndex == lb.Items.Count - 1) return;
            int sIndex = lb.SelectedIndex;//选择项索引
            object obj1 = lb.Items[sIndex + 1];
            lb.Items[sIndex + 1] = lb.SelectedItem;//交换
            lb.Items[sIndex] = obj1;
            //设置焦点
            lb.SelectedIndex = ++sIndex;
        }
        private void Delete(ListBox lb)
        {
            //未选中任何项则返回
            if (lb.SelectedItem == null) return;
            int sIndex = lb.SelectedIndex;
            //删除当前选中项
            lb.Items.RemoveAt(sIndex);
            //设置焦点
            lb.SelectedIndex = sIndex > lb.Items.Count - 1 ? --sIndex : sIndex;
        }
    }
}
