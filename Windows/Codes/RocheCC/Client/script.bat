@echo off

call :loading 初始化环境
set root=%~dp0
set temp=%~dp0temp
set form=%~dp0form

rem 清空本地temp文件夹下全部文件
rem del只能删除文件，rd只能删除空文件夹
if exist %temp% (echo y|del %temp%\*.*)
if exist %temp% (echo y|rd /S %temp%)
rem 创建一个空的temp文件夹
md %temp%
for /f "delims=" %%i in ('dir /ah/b "%root%"') do (if exist %root%%%i (attrib -h %root%%%i))
set libServerVersion=0
set libLocalVersion=0
set indexServerVersion=0
set indexLocalVersion=0
set scriptServerVersion=0
set scriptLocalVersion=0
for /r %root% %%i in (*.version.*) do (if %%~ni==lib.version (set libLocalVersion=%%~xi) else (if %%~ni==index.version (set indexLocalVersion=%%~xi) else (set scriptLocalVersion=%%~xi)))
if %libLocalVersion:~0,1%==. set libLocalVersion=%libLocalVersion:~1%
if %indexLocalVersion:~0,1%==. set indexLocalVersion=%indexLocalVersion:~1%
if %scriptLocalVersion:~0,1%==. set scriptLocalVersion=%scriptLocalVersion:~1%
for /r %root% %%i in (*.version.*) do (attrib +h %%i)
set localLibFileName=lib.version.%libLocalVersion%
set localIndexFileName=index.version.%indexLocalVersion%
set localScriptFileName=script.version.%scriptLocalVersion%
rem if exist %root%lib.version (attrib -h %root%lib.version)
rem if exist %root%index.version (attrib -h %root%index.version)
rem if exist %root%script.version (attrib -h %root%script.version)
for /r H: %%i in (*.version.*) do (if %%~ni==lib.version (set libServerVersion=%%~xi) else (if %%~ni==index.version (set indexServerVersion=%%~xi) else (set scriptServerVersion=%%~xi)))
if %libServerVersion:~0,1%==. set libServerVersion=%libServerVersion:~1%
if %indexServerVersion:~0,1%==. set indexServerVersion=%indexServerVersion:~1%
if %scriptServerVersion:~0,1%==. set scriptServerVersion=%scriptServerVersion:~1%
set ServerLibFileName=lib.version.%libServerVersion%
set ServerIndexFileName=index.version.%indexServerVersion%
set ServerScriptFileName=script.version.%scriptServerVersion%

if %1==jumpStep1 goto step2


:step1
call :echoStep 1、现在执行步骤1，同步sharepoint服务器上的文件
call :echoStep 1.1、连接sharepoint服务器...
call :loading 连接sharepoint服务器
rem if exist H:\ (net use H: /D)
rem set shareFolder="http://ap.boost.roche.com/rdcn/CCWorkspace/CC SFFE/electronic_form"
rem set shareFolder="\\172.16.97.127\ShareFolder"
rem net use H: %shareFolder% 
rem if not %errorlevel% equ 0 goto linkServerFail

call :echoStep 1.2、服务器映射成功，准备更新本地文件...
call :echoStep 1.2.1、开始同步form目录...
for /r H:\form %%i in (*.*) do (if not exist %form%\%%~ni%%~xi ((if not exist %temp%\form md %temp%\form) && copy "%%i" %temp%\form))
rem 如果同步过程出错，跳转到步骤2
if not %errorlevel% equ 0 goto formUpdFail
if exist %temp%\form (call :echoStep 1.2.2、form目录同步完毕，开始同步lib目录...) else (call :echoStep 1.2.2、form目录无需更新，开始同步lib目录...)

rem if exist H:\lib.version for /F %%i in (H:\lib.version) do set libServerVersion=%%i
rem if exist %root%lib.version for /F %%i in (%root%lib.version) do set libLocalVersion=%%i
if %libServerVersion% gtr %libLocalVersion% (call :updLib) else (call :updLib2)
rem 如果同步过程出错，跳转到步骤2
if not %errorlevel% equ 0 (goto libUpdFail)

rem if exist H:\index.version for /F %%i in (H:\index.version) do set indexServerVersion=%%i
rem if exist %root%index.version for /F %%i in (%root%index.version) do set indexLocalVersion=%%i
if %indexServerVersion% gtr %indexLocalVersion% (call :updIndex) else (call :updIndex2)
rem 如果同步过程出错，跳转到步骤2
if not %errorlevel% equ 0 (goto indexUpdFail)
rem 将temp下的文件全部移动到工作目录
call :moveTemp

call :echoStep 1.2.5、开始同步script文件
rem if exist H:\script.version for /F %%i in (H:\script.version) do set scriptServerVersion=%%i
rem if exist %root%script.version for /F %%i in (%root%script.version) do set scriptLocalVersion=%%i
if %scriptServerVersion% gtr %scriptLocalVersion% (call :updScript) else (call :updScript2)
if not %errorlevel% equ 0 goto scriptUpdFail

goto step2


:step2
call :echoStep 2、现在执行步骤2，打开IE浏览器......
start iexplore.exe %root%index.html

if exist %temp%\%ServerScriptFileName% ((echo f | xcopy %temp%\%ServerScriptFileName% %root%%ServerScriptFileName% /y) && del %root%%localScriptFileName% && del %temp%\%ServerScriptFileName%)
if exist %temp%\script.bat ((echo f | xcopy %temp%\script.bat %root%script.bat /y) && del %temp%\script.bat)

goto exit


:linkServerFail
call :echoStep 1.2、服务器连接失败，当前网络环境可能不是内网，跳过更新
goto step2


:formUpdFail
call :echoStep 1.2.2、form目录同步失败，跳过更新
goto step2


:libUpdFail
call :echoStep 1.2.3、lib目录同步失败，跳过更新
goto step2


:indexUpdFail
call :echoStep 1.2.4、index文件同步失败，跳过更新
goto step2


:scriptUpdFail
call :echoStep 1.2.5、script文件同步失败，跳过更新
goto step2


:updLib
md %temp%\lib
xcopy H:\lib %temp%\lib /s /e
echo f | xcopy H:\%ServerLibFileName% %temp%\%ServerLibFileName%
call :echoStep 1.2.3、lib目录更新完毕，开始同步index文件...
goto :eof


:updLib2
for /r H:\lib %%i in (*.html) do (if not exist %root%lib\%%~ni%%~xi copy %%i %root%lib)
for /r H:\lib\css %%i in (*.*) do (if not exist %root%lib\css\%%~ni%%~xi ((if not exist %root%lib\css md %root%lib\css) && copy %%i %root%lib\css))
for /r H:\lib\images %%i in (*.*) do (if not exist %root%lib\images\%%~ni%%~xi ((if not exist %root%lib\images md %root%lib\images) && copy %%i %root%lib\images))
for /r H:\lib\js %%i in (*.*) do (if not exist %root%lib\js\%%~ni%%~xi ((if not exist %root%lib\js md %root%lib\js) && copy %%i %root%lib\js))
call :echoStep 1.2.3、lib目录无需更新，开始更新index文件...
goto :eof


:updIndex
echo f | xcopy H:\%ServerIndexFileName% %temp%\%ServerIndexFileName%  
echo f | xcopy H:\index.html %temp%\index.html
call :echoStep 1.2.4、index文件更新完毕，开始移动文件...
goto :eof


:updIndex2
if not exist %root%index.html copy H:\index.html %root%
call :echoStep 1.2.4、index文件无需更新，开始移动文件...
goto :eof


:updScript
echo f | xcopy H:\%ServerScriptFileName% %temp%\%ServerScriptFileName% 
echo f | xcopy H:\script\script.bat.1 %temp%\script.bat
call :echoStep 1.2.6、script文件更新完毕，准备进入步骤2
goto :eof

:updScript2
call :echoStep 1.2.6、script文件无需更新，准备进入步骤2
goto :eof


:moveTemp
if exist %temp%\form ((echo d | xcopy %temp%\form %root%form /s /e /y) && (echo y | del %temp%\form\*.*) && (echo y | rd /S %temp%\form))
for /r %root%form %%i in (*.*) do (if not exist H:\form\%%~ni%%~xi (del "%%i"))
if exist %temp%\lib ((echo d | xcopy %temp%\lib %root%lib /s /e /y) && (echo y | del %temp%\lib\*.*) && (echo y | rd /S %temp%\lib))
if exist %temp%\%ServerLibFileName% ((echo f | xcopy %temp%\%ServerLibFileName% %root%%ServerLibFileName% /y) && del %root%%localLibFileName% && del %temp%\%ServerLibFileName%)
if exist %temp%\%ServerIndexFileName% ((echo f | xcopy %temp%\%ServerIndexFileName% %root%%ServerIndexFileName% /y) && del %root%%localIndexFileName% && del %temp%\%ServerIndexFileName%)
if exist %temp%\index.html ((echo f | xcopy %temp%\index.html %root%index.html /y) & del %temp%\index.html)
goto :eof


:echoStep
echo.
echo -----------------------------------------------------------------------------
echo %1
echo -----------------------------------------------------------------------------
goto :eof


:loading
echo 正在 %1 ，可能需要数秒至数分钟的时间
echo 具体时长依赖于您的网络状况，请勿关闭窗口
goto :eof


:exit
net use H: /D
taskkill /F /IM msg.exe
rem pause
exit