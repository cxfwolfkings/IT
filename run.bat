@echo off
set MYPATH=E:\Arms\VC2008
::要将原有的path加上，否则很多命令无法直接使用！
set PATH=%PATH%;%MYPATH%\bin
set INCLUDE=%MYPATH%\include;%MYPATH%\PlatformSDK\Include;%MYPATH%\atlmfc\include;%MYPATH%\DirectX_SDK\Include;
set LIB=%MYPATH%\lib;%MYPATH%\PlatformSDK\Lib;%MYPATH%\atlmfc\lib;%MYPATH%\DirectX_SDK\Lib\x86;
cl %1
call :print e --------------------------华丽丽的分割线-------------------------------
call :print a 执行结果
%~n1.exe
echo.
call :print e --------------------------华丽丽的分割线-------------------------------
del %~n1.exe;%~n1.obj
goto :eof

:: 输出为不同颜色
:print
echo. > %2 & findstr /a:%1 . %2* & del %2
goto :eof