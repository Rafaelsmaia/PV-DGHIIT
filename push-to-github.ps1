# Push para GitHub - Rafaelsmaia/PV-DGHIIT

git remote add origin https://github.com/Rafaelsmaia/PV-DGHIIT.git 2>$null
git remote set-url origin https://github.com/Rafaelsmaia/PV-DGHIIT.git 2>$null
git branch -M main
git push -u origin main

Write-Host "`nPronto! Proximo passo: Deploy no Vercel (vercel.com)" -ForegroundColor Green
