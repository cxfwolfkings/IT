@echo off
set MYPATH=E:\Arms\VC2008
::Ҫ��ԭ�е�path���ϣ�����ܶ������޷�ֱ��ʹ�ã�
set PATH=%PATH%;%MYPATH%\bin
set INCLUDE=%MYPATH%\include;%MYPATH%\PlatformSDK\Include;%MYPATH%\atlmfc\include;%MYPATH%\DirectX_SDK\Include;
set LIB=%MYPATH%\lib;%MYPATH%\PlatformSDK\Lib;%MYPATH%\atlmfc\lib;%MYPATH%\DirectX_SDK\Lib\x86;
cl %1
call :print e --------------------------�������ķָ���-------------------------------
call :print a ִ�н��
%~n1.exe
echo.
call :print e --------------------------�������ķָ���-------------------------------
del %~n1.exe;%~n1.obj
goto :eof

:: ���Ϊ��ͬ��ɫ
:print
echo. > %2 & findstr /a:%1 . %2* & del %2
goto :eof