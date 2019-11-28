namespace Com.Colin.Forms.Template
{
    partial class MainTemplate
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要修改
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.titleTemplate1 = new Template.TitleTemplate();
            this.tableTemplate1 = new Template.TableTemplate2();
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.SuspendLayout();
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = new System.Drawing.Point(0, 0);
            this.splitContainer1.Margin = new System.Windows.Forms.Padding(0);
            this.splitContainer1.Name = "splitContainer1";
            this.splitContainer1.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.BackColor = System.Drawing.SystemColors.Control;
            this.splitContainer1.Panel1.BackgroundImage = global::Com.Colin.Forms.Properties.Resources._0130切片_58;
            this.splitContainer1.Panel1.Controls.Add(this.titleTemplate1);
            this.splitContainer1.Panel1MinSize = 0;
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tableTemplate1);
            this.splitContainer1.Panel2MinSize = 0;
            this.splitContainer1.Size = new System.Drawing.Size(1050, 653);
            this.splitContainer1.SplitterDistance = 90;
            this.splitContainer1.TabIndex = 0;
            // 
            // titleTemplate1
            // 
            this.titleTemplate1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.titleTemplate1.Location = new System.Drawing.Point(0, 0);
            this.titleTemplate1.Margin = new System.Windows.Forms.Padding(0);
            this.titleTemplate1.Name = "titleTemplate1";
            this.titleTemplate1.Size = new System.Drawing.Size(1050, 90);
            this.titleTemplate1.TabIndex = 0;
            // 
            // tableTemplate1
            // 
            this.tableTemplate1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableTemplate1.Location = new System.Drawing.Point(0, 0);
            this.tableTemplate1.Margin = new System.Windows.Forms.Padding(0);
            this.tableTemplate1.Name = "tableTemplate1";
            this.tableTemplate1.Size = new System.Drawing.Size(1050, 559);
            this.tableTemplate1.TabIndex = 0;
            // 
            // MainTemplate
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.splitContainer1);
            this.Name = "MainTemplate";
            this.Size = new System.Drawing.Size(1050, 653);
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.SplitContainer splitContainer1;
        private TitleTemplate titleTemplate1;
        private TableTemplate2 tableTemplate1;
    }
}
