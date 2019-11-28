<%@ Page Title="" Language="C#" MasterPageFile="~/Master.master" AutoEventWireup="true" CodeFile="EditNote.aspx.cs" Inherits="editNote" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <input type="button" onclick="saveHtml()" value="保存"/>
    <!-- 必须使用<textarea></textarea>这种方式，<textarea/>不可以 -->
    <textarea cols="80" rows="15" name="content" id="note"></textarea>
    <script src="../Public/Js/ckeditor/ckeditor.js"></script> 
    <script>
        CKEDITOR.replace('note', { height: 600 });
        function saveHtml() {
            var fileName = window.prompt("Please enter your name","");
            if(fileName)
            {
                var data = CKEDITOR.instances.note.getData();
                var win = window.open('', '', 'top=10000,left=10000');
                win.document.write(data);
                win.document.execCommand('SaveAs', '', fileName)
                win.close();
            }
        }
        /*
        function BrowseFolder() {
            try {
                var Message = "Please select the folder path.";  //选择框提示信息
                var Shell = new ActiveXObject("Shell.Application");
                var Folder = Shell.BrowseForFolder(0, Message, 0x0040, 0x11); //起始目录为：我的电脑
                //var Folder = Shell.BrowseForFolder(0,Message,0); //起始目录为：桌面
                if (Folder != null) {
                    Folder = Folder.items();  // 返回 FolderItems 对象
                    Folder = Folder.item();  // 返回 Folderitem 对象
                    Folder = Folder.Path;   // 返回路径
                    if (Folder.charAt(Folder.length - 1) != "\\") {
                        Folder = Folder + "\\";
                    }
                    return Folder;
                }
            } catch (e) {
                alert(e.message);
            }
        }
        function SaveInfoToFile(folder, fileName, fileInfo) {
            if(folder){
                var filePath = folder + fileName;
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var file = fso.CreateTextFile(filePath, true);
                file.Write(fileInfo);
                file.Close();
            }
        }
        */
    </script>
</asp:Content>


