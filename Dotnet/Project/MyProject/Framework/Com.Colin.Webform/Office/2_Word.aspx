<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="2_Word.aspx.cs" Inherits="SC.WebformSamples.Office._2_Word" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>

            1、html(包含图片)导出为Word文档<br />
&nbsp; 1.1 Aspose.Words <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="点击测试" />
            <br />
&nbsp; 1.2 NPOI
            <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Text="点击测试" />
            <br />
&nbsp; 1.3 通过浏览器输出的方式 
            <asp:Button ID="Button3" runat="server" OnClick="Button3_Click" Text="点击测试" />
            <br />
&nbsp; 1.4 直接转换保存为word
            <asp:Button ID="Button4" runat="server" OnClick="Button4_Click" Text="点击测试" />
        </div>
    </form>
</body>
</html>
