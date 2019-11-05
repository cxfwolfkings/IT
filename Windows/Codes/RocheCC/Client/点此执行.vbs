Set fso = CreateObject("Scripting.FileSystemObject")
Set netWork = CreateObject("Wscript.Network")
Set ws = CreateObject("Wscript.Shell")
currentPath = ws.CurrentDirectory & "\"
scriptFile = currentPath & "script.bat"
msgFile = currentPath & "lib\msg.exe"
If fso.DriveExists("H:") Then
    netWork.RemoveNetworkDrive "H:"
End If
Dim requireFile
requireFile = True
If Not fso.fileExists(msgFile) or Not fso.fileExists(scriptFile) Then
	requireFile = False
End If
On Error Resume Next 
netWork.MapNetworkDrive "H:","http://ap.boost.roche.com/rdcn/CCWorkspace/CC SFFE/electronic_form" 
If Err.Number <> 0 Then
	If requireFile = False Then
		MsgBox "网络连接失败，本地缺少必要文件，无法执行！"
		wscript.quit
	Else
		ws.run currentPath & "lib\msg.exe"
		ws.run "cmd /c script.bat jumpStep1",0
		wscript.quit
	End If
End If
If Not fso.folderExists(currentPath & "lib") Then
    fso.CreateFolder currentPath & "lib"
End If 
If Not fso.fileExists(msgFile) Then
    fso.CopyFile "H:\lib\msg.exe.1",currentPath & "lib\",False
	set m = fso.getfile(currentPath & "lib\msg.exe.1")
	m.name = "msg.exe"
End If
ws.run currentPath & "lib\msg.exe"
If Not fso.fileExists(scriptFile) Then
    fso.CopyFile "H:\script\script.bat.1",currentPath,False
	set f = fso.getfile(currentPath & "script.bat.1")
	f.name = "script.bat"
End If
ws.run "cmd /c script.bat notJumpStep1",0