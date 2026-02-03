# 🚀 Como Fazer Deploy no Vercel

Este guia vai te ajudar a publicar sua página de vendas DG HIIT no Vercel de forma rápida e fácil.

## 📋 Pré-requisitos

1. Conta no GitHub (gratuita)
2. Conta no Vercel (gratuita) - [vercel.com](https://vercel.com)

## 🎯 Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** ou **"+"** no canto superior direito
3. Dê um nome ao repositório (ex: `dg-hiit-landing-page`)
4. Marque como **Público** ou **Privado** (sua escolha)
5. **NÃO** marque "Initialize with README"
6. Clique em **"Create repository"**

### Passo 2: Enviar Código para o GitHub

Abra o terminal na pasta do projeto e execute:

```bash
# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Página de vendas DG HIIT"

# Adicionar o repositório remoto (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### Passo 3: Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar sua conta GitHub)
2. Clique em **"Add New Project"** ou **"New Project"**
3. Importe o repositório que você acabou de criar
4. O Vercel detectará automaticamente as configurações
5. Clique em **"Deploy"**

### Passo 4: Aguardar o Deploy

- O Vercel vai fazer o build automaticamente
- Em poucos segundos sua página estará no ar!
- Você receberá uma URL tipo: `https://seu-projeto.vercel.app`

## 🎯 Método 2: Deploy via Vercel CLI (Alternativo)

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Fazer Login

```bash
vercel login
```

### Passo 3: Deploy

Na pasta do projeto, execute:

```bash
vercel
```

Siga as instruções:
- **Set up and deploy?** → Y
- **Which scope?** → Escolha sua conta
- **Link to existing project?** → N
- **What's your project's name?** → dg-hiit-landing-page (ou outro nome)
- **In which directory is your code located?** → ./

### Passo 4: Deploy em Produção

```bash
vercel --prod
```

## ✅ Verificações Pós-Deploy

1. ✅ Acesse a URL fornecida pelo Vercel
2. ✅ Teste todos os botões e links
3. ✅ Verifique se o timer está funcionando
4. ✅ Teste o FAQ (accordion)
5. ✅ Teste em mobile (responsividade)

## 🔗 Usar no Greenn Sales

Depois que a página estiver no ar no Vercel:

1. Copie a URL completa (ex: `https://dg-hiit.vercel.app`)
2. No Greenn Sales, você pode:
   - **Opção 1**: Usar a URL diretamente como link do botão de compra
   - **Opção 2**: Se o Greenn Sales permitir, incorporar via iframe
   - **Opção 3**: Redirecionar para essa página

## 🔧 Personalizações Antes do Deploy

Antes de fazer o deploy, personalize:

1. **Imagens**: Substitua os placeholders por suas imagens reais
2. **Preços**: Ajuste os valores na seção de oferta
3. **Links**: Configure o botão de compra com sua URL de checkout
4. **Textos**: Personalize conforme seu produto
5. **Domínio**: Configure um domínio personalizado no Vercel (opcional)

## 📝 Configuração de Domínio Personalizado (Opcional)

1. No painel do Vercel, vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de configuração DNS
4. Aguarde a propagação (pode levar algumas horas)

## 🐛 Solução de Problemas

### Erro no Build
- Verifique se todos os arquivos estão commitados
- Certifique-se de que `package.json` existe

### Página não carrega
- Verifique se o arquivo `index.html` está na raiz
- Confirme que os links de CSS e JS estão corretos

### Estilos não aparecem
- Verifique se `styles.css` está na mesma pasta que `index.html`
- Limpe o cache do navegador (Ctrl+F5)

## 📞 Suporte

Se tiver problemas:
- Documentação Vercel: [vercel.com/docs](https://vercel.com/docs)
- Suporte Vercel: [vercel.com/support](https://vercel.com/support)

---

**Boa sorte com o deploy! 🚀**
