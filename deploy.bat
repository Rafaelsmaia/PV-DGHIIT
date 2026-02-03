@echo off
if not exist .git git init
git add .
git commit -m "Deploy inicial" 2>nul
echo Pronto! Execute: push-to-github.bat
pause
