@echo off
chcp 65001 >nul
title 词义三选一
cd /d "%~dp0"
node serve.js
if errorlevel 1 (
  echo.
  echo 没有找到 Node.js，或者启动失败。
  echo 请确认电脑上装了 Node.js，再双击这个文件。
  pause
)
