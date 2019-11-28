using Aspose.Words;
using Aspose.Words.Fonts;
using System;
using System.ComponentModel;
using System.Windows.Forms;

namespace SC.Cube.Office.Word
{
    public partial class WordSetting : Form
    {
        public WordSetting()
        {
            InitializeComponent();
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {
            var fileName = openFileDialog1.FileName;
            Document doc = new Document(fileName);
            Aspose.Words.Saving.SaveOptions saveOptions = Aspose.Words.Saving.SaveOptions.CreateSaveOptions(SaveFormat.Doc);
            doc.Save("Z:\\World\\1.doc", saveOptions);
            this.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            openFileDialog1.ShowDialog();
        }
    }
}
