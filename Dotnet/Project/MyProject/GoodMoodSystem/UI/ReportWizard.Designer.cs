namespace Com.Colin.Forms.UI
{
    partial class ReportWizard
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ReportWizard));
            this.wizardMain = new Gui.Wizard.Wizard();
            this.wizardPage2 = new Gui.Wizard.WizardPage();
            this.header1 = new Gui.Wizard.Header();
            this.labelProcessHint = new System.Windows.Forms.Label();
            this.wizardPage1 = new Gui.Wizard.WizardPage();
            this.header2 = new Gui.Wizard.Header();
            this.buttonBrowseFile = new System.Windows.Forms.Button();
            this.textBoxDataFile = new System.Windows.Forms.TextBox();
            this.labelDataHint = new System.Windows.Forms.Label();
            this.wizardMain.SuspendLayout();
            this.wizardPage2.SuspendLayout();
            this.wizardPage1.SuspendLayout();
            this.SuspendLayout();
            // 
            // wizardMain
            // 
            this.wizardMain.Controls.Add(this.wizardPage2);
            this.wizardMain.Controls.Add(this.wizardPage1);
            this.wizardMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.wizardMain.Font = new System.Drawing.Font("Tahoma", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.wizardMain.Location = new System.Drawing.Point(0, 0);
            this.wizardMain.Name = "wizardMain";
            this.wizardMain.Pages.AddRange(new Gui.Wizard.WizardPage[] {
            this.wizardPage1,
            this.wizardPage2});
            this.wizardMain.Size = new System.Drawing.Size(571, 374);
            this.wizardMain.TabIndex = 0;
            // 
            // wizardPage2
            // 
            this.wizardPage2.Controls.Add(this.header1);
            this.wizardPage2.Controls.Add(this.labelProcessHint);
            this.wizardPage2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.wizardPage2.IsFinishPage = true;
            this.wizardPage2.Location = new System.Drawing.Point(0, 0);
            this.wizardPage2.Name = "wizardPage2";
            this.wizardPage2.Size = new System.Drawing.Size(571, 326);
            this.wizardPage2.TabIndex = 3;
            this.wizardPage2.CloseFromNext += new Gui.Wizard.PageEventHandler(this.processPage_CloseFromNext);
            this.wizardPage2.ShowFromNext += new System.EventHandler(this.processPage_ShowFromNext);
            // 
            // header1
            // 
            this.header1.BackColor = System.Drawing.SystemColors.Control;
            this.header1.CausesValidation = false;
            this.header1.Description = "正在分析文件";
            this.header1.Dock = System.Windows.Forms.DockStyle.Top;
            this.header1.Image = ((System.Drawing.Image)(resources.GetObject("header1.Image")));
            this.header1.Location = new System.Drawing.Point(0, 0);
            this.header1.Name = "header1";
            this.header1.Size = new System.Drawing.Size(571, 64);
            this.header1.TabIndex = 3;
            this.header1.Title = "欢迎使用减压系统";
            // 
            // labelProcessHint
            // 
            this.labelProcessHint.AutoSize = true;
            this.labelProcessHint.Location = new System.Drawing.Point(155, 114);
            this.labelProcessHint.Name = "labelProcessHint";
            this.labelProcessHint.Size = new System.Drawing.Size(230, 13);
            this.labelProcessHint.TabIndex = 2;
            this.labelProcessHint.Text = "正在读入数据:     已读入 0 小时 0 分钟 0 秒";
            // 
            // wizardPage1
            // 
            this.wizardPage1.Controls.Add(this.header2);
            this.wizardPage1.Controls.Add(this.buttonBrowseFile);
            this.wizardPage1.Controls.Add(this.textBoxDataFile);
            this.wizardPage1.Controls.Add(this.labelDataHint);
            this.wizardPage1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.wizardPage1.IsFinishPage = false;
            this.wizardPage1.Location = new System.Drawing.Point(0, 0);
            this.wizardPage1.Name = "wizardPage1";
            this.wizardPage1.Size = new System.Drawing.Size(571, 326);
            this.wizardPage1.TabIndex = 2;
            this.wizardPage1.CloseFromNext += new Gui.Wizard.PageEventHandler(this.wizardPage1_CloseFromNext);
            // 
            // header2
            // 
            this.header2.BackColor = System.Drawing.SystemColors.Control;
            this.header2.CausesValidation = false;
            this.header2.Description = "请选择分析文件";
            this.header2.Dock = System.Windows.Forms.DockStyle.Top;
            this.header2.Image = ((System.Drawing.Image)(resources.GetObject("header2.Image")));
            this.header2.Location = new System.Drawing.Point(0, 0);
            this.header2.Name = "header2";
            this.header2.Size = new System.Drawing.Size(571, 64);
            this.header2.TabIndex = 6;
            this.header2.Title = "欢迎使用减压系统";
            // 
            // buttonBrowseFile
            // 
            this.buttonBrowseFile.Location = new System.Drawing.Point(400, 135);
            this.buttonBrowseFile.Name = "buttonBrowseFile";
            this.buttonBrowseFile.Size = new System.Drawing.Size(75, 23);
            this.buttonBrowseFile.TabIndex = 5;
            this.buttonBrowseFile.Text = "浏览";
            this.buttonBrowseFile.UseVisualStyleBackColor = true;
            this.buttonBrowseFile.Click += new System.EventHandler(this.buttonBrowseFile_Click);
            // 
            // textBoxDataFile
            // 
            this.textBoxDataFile.Location = new System.Drawing.Point(99, 136);
            this.textBoxDataFile.Name = "textBoxDataFile";
            this.textBoxDataFile.Size = new System.Drawing.Size(295, 21);
            this.textBoxDataFile.TabIndex = 3;
            // 
            // labelDataHint
            // 
            this.labelDataHint.AutoSize = true;
            this.labelDataHint.Location = new System.Drawing.Point(96, 105);
            this.labelDataHint.Name = "labelDataHint";
            this.labelDataHint.Size = new System.Drawing.Size(139, 13);
            this.labelDataHint.TabIndex = 4;
            this.labelDataHint.Text = "请选择待分析的数据文件";
            // 
            // ReportWizard
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(571, 374);
            this.Controls.Add(this.wizardMain);
            this.Name = "ReportWizard";
            this.Text = "ReportWizard";
            this.wizardMain.ResumeLayout(false);
            this.wizardPage2.ResumeLayout(false);
            this.wizardPage2.PerformLayout();
            this.wizardPage1.ResumeLayout(false);
            this.wizardPage1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private Gui.Wizard.Wizard wizardMain;
        private Gui.Wizard.WizardPage wizardPage1;
        private Gui.Wizard.Header header2;
        private System.Windows.Forms.Button buttonBrowseFile;
        private System.Windows.Forms.TextBox textBoxDataFile;
        private System.Windows.Forms.Label labelDataHint;
        private Gui.Wizard.WizardPage wizardPage2;
        private Gui.Wizard.Header header1;
        private System.Windows.Forms.Label labelProcessHint;
    }
}