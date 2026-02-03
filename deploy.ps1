# Preparar Git

if (-not (Test-Path .git)) { git init }
git add .
git commit -m "Deploy inicial" 2>$null

Write-Host "Pronto! Execute: .\push-to-github.ps1" -ForegroundColor Green
