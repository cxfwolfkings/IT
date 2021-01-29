@echo off
ping -n 1 10.30.100.101 > nul
if errorlevel 1 (echo 101连接异常) else (echo 101连接正常)
ping -n 1 10.30.100.102 > nul
if errorlevel 1 (echo 102连接异常) else (echo 102连接正常)
ping -n 1 10.30.100.103 > nul
if errorlevel 1 (echo 103连接异常) else (echo 103连接正常)
ping -n 1 10.30.100.104 > nul
if errorlevel 1 (echo 104连接异常) else (echo 104连接正常)
ping -n 1 10.30.100.105 > nul
if errorlevel 1 (echo 105连接异常) else (echo 105连接正常)
ping -n 1 10.30.100.106 > nul
if errorlevel 1 (echo 106连接异常) else (echo 106连接正常)
pause