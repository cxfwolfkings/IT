using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using Aspose.Words;
using Aspose.Words.Saving;
using Aspose.Words.Lists;
namespace WordToPDF
{
    public partial class Word : Form
    {
        public Word()
        {
            InitializeComponent();
        }

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

        /// <summary> 将word文档加入列表 </summary>
        private void lbWordAdd(string[] strAdd)
        {
            if (strAdd.Length < 1) return;

            for (int i = 0; i < strAdd.Length; i++)
            {
                lbWord.Items.Add(strAdd[i]);
            }
        }
    }
}
