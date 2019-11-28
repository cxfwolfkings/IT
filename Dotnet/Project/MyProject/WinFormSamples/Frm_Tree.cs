using System;
using System.Windows.Forms;

namespace WindowsApplication1
{
    public partial class Form013 : Form
    {
        public Form013()
        {
            InitializeComponent();
        }

        /// <summary>
        /// 该方法用来判别命名节点的标签文本是否为空
        /// </summary>
        /// <returns></returns>
        public bool checkmess()
        {
            bool l = true;
            if (textBox2.Text == string.Empty)
            {
                MessageBox.Show("必须给结点取名", "提示信息");
                l = false;
            }
            return l;
        }

        /// <summary>
        /// 添加根节点事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button9_Click(object sender, EventArgs e)
        {
            if (checkmess())
            {
                // 建立新的TreeNode对象，命名为boot
                TreeNode boot = new TreeNode(textBox2.Text);
                // 指定提前定义好的imageList1图片列表对象中的图片为treeView2的图标列表
                treeView2.ImageList = imageList1;
                // 并且treeView2的图标列表图片编号为用户选择的comboBox2索引编号
                treeView2.ImageIndex = comboBox2.SelectedIndex;
                // 开始通过Add增加一个节点
                treeView2.Nodes.Add(boot);
                
                button7.Enabled = true;
                button8.Enabled = true;
            }
        }

        /// <summary>
        /// 添加一个子节点事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button8_Click_1(object sender, EventArgs e)
        {
            // 如果用户没有选择treeView2控件的一个节点，则提示选择一个节点
            if (treeView2.SelectedNode == null)
            {
                MessageBox.Show("请选择一个节点", "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                // 反之，如果用户选择了一个节点，则判别节点标签文本是否添加
                if (checkmess())
                {
                    TreeNode treeson = new TreeNode(textBox2.Text);
                    treeView2.ImageList = imageList1;
                    treeView2.ImageIndex = comboBox2.SelectedIndex;
                    // 注意这句话，在当前选择节点的下一级添加一个节点
                    treeView2.SelectedNode.Nodes.Add(treeson);
                    treeView2.SelectedNode = treeson;
                }
            }
        }

        /// <summary>
        /// 删除节点事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button7_Click_1(object sender, EventArgs e)
        {
            // 如果当前选择的节点的子节点统计为0，则表示为根节点
            if (treeView2.SelectedNode.Nodes.Count == 0)
            {
                // 则删除根节点
                treeView2.SelectedNode.Remove();
            }
            else
            {
                MessageBox.Show("请先删除此节点中的子节点！", "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}
