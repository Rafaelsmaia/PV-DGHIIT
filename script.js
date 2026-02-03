// Timer de Contagem Regressiva
function initTimer() {
    // Define o tempo final (24 horas a partir de agora)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Se o tempo acabou, reseta para mais 24 horas
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Atualiza os elementos do timer
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    // Atualiza o timer a cada segundo
    updateTimer();
    setInterval(updateTimer, 1000);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle do item atual
            item.classList.toggle('active');
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.problema-item, .solucao-content, .depoimento-card, .conteudo-item, .garantia-content, .preco-box');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

// Smooth Scroll para Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Botão de Compra - Tracking
function initPurchaseButton() {
    const purchaseButton = document.getElementById('btn-comprar');
    
    if (purchaseButton) {
        purchaseButton.addEventListener('click', function(e) {
            // Aqui você pode adicionar tracking do Google Analytics, Facebook Pixel, etc.
            console.log('Botão de compra clicado');
            
            // Exemplo de tracking (descomente e configure conforme necessário):
            /*
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 197.00,
                    'currency': 'BRL'
                });
            }
            
            if (typeof fbq !== 'undefined') {
                fbq('track', 'InitiateCheckout', {
                    value: 197.00,
                    currency: 'BRL'
                });
            }
            */
        });
    }
}

// Animação de Números (contador)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Lazy Loading de Imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Adiciona classe de scroll no body para efeitos visuais
function initScrollEffects() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Validação de Formulário (se houver)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Adicione sua lógica de validação aqui
            const formData = new FormData(form);
            
            // Exemplo de validação
            let isValid = true;
            form.querySelectorAll('input[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Enviar formulário ou redirecionar
                console.log('Formulário válido:', Object.fromEntries(formData));
            }
        });
    });
}

// Efeito de Parallax Suave
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Botão Voltar ao Topo
function initBackToTop() {
    // Cria o botão
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 200, 83, 0.4);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostra/oculta o botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll suave ao clicar
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    initTimer();
    initFAQ();
    initScrollReveal();
    initSmoothScroll();
    initPurchaseButton();
    initScrollEffects();
    initBackToTop();
    
    // Adiciona animação de entrada aos elementos principais
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    console.log('Página de vendas DG HIIT carregada com sucesso!');
});

// Tratamento de erros
window.addEventListener('error', function(e) {
    console.error('Erro na página:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Tempo de carregamento da página:', pageLoadTime, 'ms');
    }
});
