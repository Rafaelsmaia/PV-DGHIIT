# Página de Vendas DG HIIT

Página de vendas completa e profissional criada para deploy no Vercel.

## 📋 Estrutura do Projeto

- `index.html` - Estrutura HTML completa da página
- `styles.css` - Estilos CSS modernos e responsivos
- `script.js` - JavaScript com interatividade e funcionalidades
- `vercel.json` - Configuração do Vercel
- `package.json` - Configuração do projeto

## 🚀 Deploy no Vercel

**📖 Instruções completas estão no arquivo `DEPLOY_VERCEL.md`**

### Deploy Rápido:

1. **Via GitHub (Recomendado)**:
   - Crie um repositório no GitHub
   - Envie os arquivos do projeto
   - Conecte ao Vercel e faça o deploy

2. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

## 🔗 Usar no Greenn Sales

### Passo 1: Acessar o Editor
1. Acesse o editor do Greenn Sales (como mostrado na imagem)
2. Você verá dois campos principais: **CSS** e **JavaScript**

### Passo 2: Copiar o Código CSS
1. Abra o arquivo `styles.css` deste projeto
2. Selecione todo o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Cole no campo **CSS** do editor do Greenn Sales

### Passo 3: Copiar o Código JavaScript
1. Abra o arquivo `script.js` deste projeto
2. Selecione todo o conteúdo (Ctrl+A)
3. Copie (Ctrl+C)
4. Cole no campo **JavaScript** do editor do Greenn Sales

### Passo 4: Adicionar o HTML
O HTML precisa ser adicionado no campo de conteúdo visual do editor. Você pode:
- **Opção 1**: Usar o editor visual para criar a estrutura baseada no `index.html`
- **Opção 2**: Se o Greenn Sales permitir código HTML diretamente, copie o conteúdo do `<body>` do arquivo `index.html`

### Passo 5: Personalizar
Antes de publicar, personalize:
- ✅ Substitua as imagens placeholder pelos seus próprios recursos
- ✅ Ajuste os preços e valores conforme necessário
- ✅ Modifique textos e depoimentos
- ✅ Configure o link do botão de compra para sua página de checkout
- ✅ Adicione seus pixels de rastreamento (Google Analytics, Facebook Pixel) no JavaScript

## 🎨 Funcionalidades Incluídas

### ✨ Design Moderno
- Layout responsivo (funciona em desktop, tablet e mobile)
- Animações suaves e profissionais
- Cores e gradientes modernos
- Tipografia otimizada

### ⚡ Interatividade
- Timer de contagem regressiva (24 horas)
- FAQ com accordion interativo
- Scroll suave entre seções
- Animações de entrada ao rolar a página
- Botão "Voltar ao topo"

### 📱 Responsividade
- Totalmente responsivo
- Otimizado para todos os dispositivos
- Layout adaptativo

## 🔧 Personalização

### Alterar Cores
No arquivo `styles.css`, procure por `:root` no início do arquivo e altere as variáveis:

```css
:root {
    --primary-color: #00C853;    /* Cor principal (verde) */
    --secondary-color: #FF6B35;  /* Cor secundária (laranja) */
    --dark-color: #1a1a1a;       /* Cor escura */
    /* ... */
}
```

### Alterar Preços
No HTML, procure pela seção `.oferta` e altere os valores:
- Preço antigo: `R$ 497,00`
- Preço novo: `R$ 197,00`
- Parcelamento: `12x de R$ 19,70`

### Adicionar Rastreamento
No arquivo `script.js`, na função `initPurchaseButton()`, descomente e configure:

```javascript
// Google Analytics
if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 197.00,
        'currency': 'BRL'
    });
}

// Facebook Pixel
if (typeof fbq !== 'undefined') {
    fbq('track', 'InitiateCheckout', {
        value: 197.00,
        currency: 'BRL'
    });
}
```

## 📸 Imagens

Substitua as URLs placeholder (`https://via.placeholder.com/...`) por suas próprias imagens:
- Imagem do hero (banner principal)
- Imagem da seção solução
- Fotos de depoimentos (opcional)

## 🎯 Seções da Página

1. **Hero** - Banner principal com título e CTA
2. **Problema** - Dores do cliente
3. **Solução** - Apresentação do produto
4. **Depoimentos** - Social proof
5. **Conteúdo** - O que está incluído
6. **Garantia** - Destaque da garantia
7. **Oferta** - Preço e timer
8. **FAQ** - Perguntas frequentes
9. **Footer** - Rodapé

## ⚠️ Importante

- Sempre teste a página usando o botão **Preview** antes de publicar
- Verifique se todos os links estão funcionando
- Teste em diferentes dispositivos
- Certifique-se de que o botão de compra redireciona para a página correta

## 📞 Suporte

Se tiver dúvidas sobre como usar no Greenn Sales, consulte a documentação da plataforma ou entre em contato com o suporte.

---

**Boa sorte com suas vendas! 🚀**
