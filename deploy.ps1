# Script de Deploy para Vercel
# Execute este script no PowerShell

Write-Host "Iniciando preparacao para deploy..." -ForegroundColor Green

# Verificar se git esta instalado
Write-Host ""
Write-Host "Verificando Git..." -ForegroundColor Yellow
git --version
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERRO: Git nao encontrado. Por favor, instale o Git primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se esta em um repositorio git
Write-Host ""
Write-Host "Verificando repositorio Git..." -ForegroundColor Yellow
if (-not (Test-Path .git)) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "OK: Repositorio inicializado!" -ForegroundColor Green
} else {
    Write-Host "OK: Repositorio Git ja existe!" -ForegroundColor Green
}

# Adicionar arquivos
Write-Host ""
Write-Host "Adicionando arquivos..." -ForegroundColor Yellow
git add .
Write-Host "OK: Arquivos adicionados!" -ForegroundColor Green

# Verificar status
Write-Host ""
Write-Host "Status do repositorio:" -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Fazendo commit..." -ForegroundColor Yellow
git commit -m "Pagina de vendas DG HIIT - Deploy inicial"
Write-Host "OK: Commit realizado!" -ForegroundColor Green

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Preparacao concluida!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Crie um repositorio no GitHub (github.com/new)" -ForegroundColor White
Write-Host "2. Execute os comandos que o GitHub mostrar:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host "3. Acesse vercel.com e importe o repositorio" -ForegroundColor White
Write-Host ""
Write-Host "Dica: Veja o arquivo DEPLOY_VERCEL.md para instrucoes detalhadas!" -ForegroundColor Cyan
