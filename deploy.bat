@echo off
echo.
echo ========================================
echo   Deploy DG HIIT - Preparacao Git
echo ========================================
echo.

REM Verificar se git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Git nao encontrado. Por favor, instale o Git primeiro.
    pause
    exit /b 1
)

echo [1/4] Verificando repositorio Git...
if not exist .git (
    echo [2/4] Inicializando repositorio Git...
    git init
    echo [OK] Repositorio inicializado!
) else (
    echo [OK] Repositorio Git ja existe!
)

echo.
echo [3/4] Adicionando arquivos...
git add .
echo [OK] Arquivos adicionados!

echo.
echo [4/4] Fazendo commit...
git commit -m "Pagina de vendas DG HIIT - Deploy inicial"
echo [OK] Commit realizado!

echo.
echo ========================================
echo   Preparacao concluida!
echo ========================================
echo.
echo Proximos passos:
echo 1. Crie um repositorio no GitHub (github.com/new)
echo 2. Execute os comandos que o GitHub mostrar
echo 3. Acesse vercel.com e importe o repositorio
echo.
echo Veja o arquivo DEPLOY_VERCEL.md para instrucoes detalhadas!
echo.
pause
