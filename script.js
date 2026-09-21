// Timer de Contagem Regressiva
const FIREBASE_CONFIG = window.FIREBASE_CONFIG || {};
const LEAD_STORAGE_KEY = 'dg-hiit-lead-captured';

let firestoreDb = null;

function initFirebase() {
    if (!FIREBASE_CONFIG.apiKey || typeof firebase === 'undefined') {
        console.warn('Firebase não configurado — leads não serão salvos.');
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    firestoreDb = firebase.firestore();
}

function initTimer() {
    // Define o tempo final (10 minutos a partir de agora)
    let endTime = new Date().getTime() + (10 * 60 * 1000);
    
    function updateTimer() {
        const now = new Date().getTime();
        let distance = endTime - now;
        
        if (distance < 0) {
            // Se o tempo acabou, reseta para mais 10 minutos
            endTime = new Date().getTime() + (10 * 60 * 1000);
            distance = endTime - now;
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

// Captura de leads antes do checkout
function initLeadCapture() {
    const modal = document.getElementById('lead-modal');
    const form = document.getElementById('lead-form');
    const errorEl = document.getElementById('lead-form-error');
    const submitBtn = document.getElementById('lead-form-submit');
    const phoneInput = document.getElementById('lead-telefone');

    if (!modal || !form) return;

    let pendingCheckoutUrl = '';

    function formatPhone(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        }
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return phone.replace(/\D/g, '').length >= 10;
    }

    function openModal(checkoutUrl) {
        pendingCheckoutUrl = checkoutUrl;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lead-modal-open');

        const firstInput = form.querySelector('input');
        if (firstInput) {
            window.setTimeout(() => firstInput.focus(), 100);
        }
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lead-modal-open');
        pendingCheckoutUrl = '';
        errorEl.hidden = true;
        errorEl.textContent = '';
    }

    function goToCheckout(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    async function sendLead(data) {
        if (!firestoreDb) {
            console.warn('Firebase não configurado — lead não enviado:', data);
            return true;
        }

        await firestoreDb.collection('leads').add({
            nome: data.nome,
            email: data.email,
            telefone: data.telefone,
            origem: 'DG HIIT Landing Page',
            pagina: window.location.href,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        return true;
    }

    document.querySelectorAll('.js-checkout').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const checkoutUrl = this.getAttribute('href');
            if (!checkoutUrl) return;

            if (sessionStorage.getItem(LEAD_STORAGE_KEY) === 'true') {
                goToCheckout(checkoutUrl);
                return;
            }

            openModal(checkoutUrl);
        });
    });

    modal.querySelectorAll('[data-lead-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = formatPhone(phoneInput.value);
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        errorEl.hidden = true;
        errorEl.textContent = '';

        const nome = form.nome.value.trim();
        const email = form.email.value.trim();
        const telefone = form.telefone.value.trim();

        form.querySelectorAll('input').forEach(input => input.classList.remove('error'));

        if (!nome || !email || !telefone) {
            errorEl.textContent = 'Preencha todos os campos para continuar.';
            errorEl.hidden = false;
            form.querySelectorAll('input').forEach(input => {
                if (!input.value.trim()) input.classList.add('error');
            });
            return;
        }

        if (!isValidEmail(email)) {
            errorEl.textContent = 'Informe um e-mail válido.';
            errorEl.hidden = false;
            form.email.classList.add('error');
            return;
        }

        if (!isValidPhone(telefone)) {
            errorEl.textContent = 'Informe um WhatsApp válido com DDD.';
            errorEl.hidden = false;
            form.telefone.classList.add('error');
            return;
        }

        const checkoutUrl = pendingCheckoutUrl;
        if (!checkoutUrl) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            await sendLead({ nome, email, telefone });
            sessionStorage.setItem(LEAD_STORAGE_KEY, 'true');
            closeModal();
            goToCheckout(checkoutUrl);
        } catch (err) {
            console.error(err);
            errorEl.textContent = 'Não foi possível enviar seus dados. Tente novamente.';
            errorEl.hidden = false;
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Continuar para o checkout';
        }
    });
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
        bottom: 100px;
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
    initFirebase();
    initTimer();
    initScrollReveal();
    initSmoothScroll();
    initLeadCapture();
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
