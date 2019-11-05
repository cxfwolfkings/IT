@echo off

call :loading ��ʼ������
set root=%~dp0
set temp=%~dp0temp
set form=%~dp0form

rem ��ձ���temp�ļ�����ȫ���ļ�
rem delֻ��ɾ���ļ���rdֻ��ɾ�����ļ���
if exist %temp% (echo y|del %temp%\*.*)
if exist %temp% (echo y|rd /S %temp%)
rem ����һ���յ�temp�ļ���
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
call :echoStep 1������ִ�в���1��ͬ��sharepoint�������ϵ��ļ�
call :echoStep 1.1������sharepoint������...
call :loading ����sharepoint������
rem if exist H:\ (net use H: /D)
rem set shareFolder="http://ap.boost.roche.com/rdcn/CCWorkspace/CC SFFE/electronic_form"
rem set shareFolder="\\172.16.97.127\ShareFolder"
rem net use H: %shareFolder% 
rem if not %errorlevel% equ 0 goto linkServerFail

call :echoStep 1.2��������ӳ��ɹ���׼�����±����ļ�...
call :echoStep 1.2.1����ʼͬ��formĿ¼...
for /r H:\form %%i in (*.*) do (if not exist %form%\%%~ni%%~xi ((if not exist %temp%\form md %temp%\form) && copy "%%i" %temp%\form))
rem ���ͬ�����̳�����ת������2
if not %errorlevel% equ 0 goto formUpdFail
if exist %temp%\form (call :echoStep 1.2.2��formĿ¼ͬ����ϣ���ʼͬ��libĿ¼...) else (call :echoStep 1.2.2��formĿ¼������£���ʼͬ��libĿ¼...)

rem if exist H:\lib.version for /F %%i in (H:\lib.version) do set libServerVersion=%%i
rem if exist %root%lib.version for /F %%i in (%root%lib.version) do set libLocalVersion=%%i
if %libServerVersion% gtr %libLocalVersion% (call :updLib) else (call :updLib2)
rem ���ͬ�����̳�����ת������2
if not %errorlevel% equ 0 (goto libUpdFail)

rem if exist H:\index.version for /F %%i in (H:\index.version) do set indexServerVersion=%%i
rem if exist %root%index.version for /F %%i in (%root%index.version) do set indexLocalVersion=%%i
if %indexServerVersion% gtr %indexLocalVersion% (call :updIndex) else (call :updIndex2)
rem ���ͬ�����̳�����ת������2
if not %errorlevel% equ 0 (goto indexUpdFail)
rem ��temp�µ��ļ�ȫ���ƶ�������Ŀ¼
call :moveTemp

call :echoStep 1.2.5����ʼͬ��script�ļ�
rem if exist H:\script.version for /F %%i in (H:\script.version) do set scriptServerVersion=%%i
rem if exist %root%script.version for /F %%i in (%root%script.version) do set scriptLocalVersion=%%i
if %scriptServerVersion% gtr %scriptLocalVersion% (call :updScript) else (call :updScript2)
if not %errorlevel% equ 0 goto scriptUpdFail

goto step2


:step2
call :echoStep 2������ִ�в���2����IE�����......
start iexplore.exe %root%index.html

if exist %temp%\%ServerScriptFileName% ((echo f | xcopy %temp%\%ServerScriptFileName% %root%%ServerScriptFileName% /y) && del %root%%localScriptFileName% && del %temp%\%ServerScriptFileName%)
if exist %temp%\script.bat ((echo f | xcopy %temp%\script.bat %root%script.bat /y) && del %temp%\script.bat)

goto exit


:linkServerFail
call :echoStep 1.2������������ʧ�ܣ���ǰ���绷�����ܲ�����������������
goto step2


:formUpdFail
call :echoStep 1.2.2��formĿ¼ͬ��ʧ�ܣ���������
goto step2


:libUpdFail
call :echoStep 1.2.3��libĿ¼ͬ��ʧ�ܣ���������
goto step2


:indexUpdFail
call :echoStep 1.2.4��index�ļ�ͬ��ʧ�ܣ���������
goto step2


:scriptUpdFail
call :echoStep 1.2.5��script�ļ�ͬ��ʧ�ܣ���������
goto step2


:updLib
md %temp%\lib
xcopy H:\lib %temp%\lib /s /e
echo f | xcopy H:\%ServerLibFileName% %temp%\%ServerLibFileName%
call :echoStep 1.2.3��libĿ¼������ϣ���ʼͬ��index�ļ�...
goto :eof


:updLib2
for /r H:\lib %%i in (*.html) do (if not exist %root%lib\%%~ni%%~xi copy %%i %root%lib)
for /r H:\lib\css %%i in (*.*) do (if not exist %root%lib\css\%%~ni%%~xi ((if not exist %root%lib\css md %root%lib\css) && copy %%i %root%lib\css))
for /r H:\lib\images %%i in (*.*) do (if not exist %root%lib\images\%%~ni%%~xi ((if not exist %root%lib\images md %root%lib\images) && copy %%i %root%lib\images))
for /r H:\lib\js %%i in (*.*) do (if not exist %root%lib\js\%%~ni%%~xi ((if not exist %root%lib\js md %root%lib\js) && copy %%i %root%lib\js))
call :echoStep 1.2.3��libĿ¼������£���ʼ����index�ļ�...
goto :eof


:updIndex
echo f | xcopy H:\%ServerIndexFileName% %temp%\%ServerIndexFileName%  
echo f | xcopy H:\index.html %temp%\index.html
call :echoStep 1.2.4��index�ļ�������ϣ���ʼ�ƶ��ļ�...
goto :eof


:updIndex2
if not exist %root%index.html copy H:\index.html %root%
call :echoStep 1.2.4��index�ļ�������£���ʼ�ƶ��ļ�...
goto :eof


:updScript
echo f | xcopy H:\%ServerScriptFileName% %temp%\%ServerScriptFileName% 
echo f | xcopy H:\script\script.bat.1 %temp%\script.bat
call :echoStep 1.2.6��script�ļ�������ϣ�׼�����벽��2
goto :eof

:updScript2
call :echoStep 1.2.6��script�ļ�������£�׼�����벽��2
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
echo ���� %1 ��������Ҫ�����������ӵ�ʱ��
echo ����ʱ����������������״��������رմ���
goto :eof


:exit
net use H: /D
taskkill /F /IM msg.exe
rem pause
exit