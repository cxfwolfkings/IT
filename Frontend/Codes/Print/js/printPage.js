// 页面设置
function setupPage() {
    try {
        // 设置打印页的边距和页眉页脚
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "margin_left";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39"); //0.39相当于页边距设置为9.91
        hkey_key = "margin_right";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39");
        hkey_key = "margin_top";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39");
        hkey_key = "margin_bottom";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39");
    } catch (e) {
        alert("打印设置失败!");
    }
}

/**
 * 打印预览
 */
function doPrintView() {
    document.getElementById('webrowser').ExecWB(7, 1);
}
