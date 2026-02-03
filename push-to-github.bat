@echo off
git remote add origin https://github.com/Rafaelsmaia/PV-DGHIIT.git 2>nul
git remote set-url origin https://github.com/Rafaelsmaia/PV-DGHIIT.git 2>nul
git branch -M main
git push -u origin main
echo.
echo Pronto! Proximo passo: Deploy no Vercel (vercel.com)
pause
