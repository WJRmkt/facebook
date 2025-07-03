// Função para rolar até a seção de preços
function scrollToPrice() {
    document.getElementById('pricing').scrollIntoView({
        behavior: 'smooth'
    });
}

// Função para alternar FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir o FAQ clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Animação de entrada dos elementos quando entram na viewport
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-item, .trigger-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Contador regressivo simples (opcional)
function startCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;
    
    let timeLeft = 24 * 60 * 60; // 24 horas em segundos
    
    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            timeLeft = 24 * 60 * 60; // Reinicia o contador
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Efeito de parallax suave no hero
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (!hero || !heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < hero.offsetHeight) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Smooth scroll para todos os links internos
function setupSmoothScroll() {
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

// Adicionar classe ativa aos botões CTA quando clicados
function setupCTAButtons() {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // Adicionar efeito visual de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Aqui você pode adicionar o código para redirecionar para a página de checkout
            // Por exemplo: window.location.href = 'https://checkout.exemplo.com';
            console.log('Redirecionando para checkout...');
        });
    });
}

// Lazy loading para imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Adicionar efeito de typing na headline (opcional)
function typewriterEffect() {
    const headline = document.querySelector('.headline');
    if (!headline) return;
    
    const text = headline.textContent;
    headline.textContent = '';
    headline.style.borderRight = '2px solid #ffd700';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            headline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            headline.style.borderRight = 'none';
        }
    }
    
    // Iniciar o efeito após um pequeno delay
    setTimeout(typeWriter, 1000);
}

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
function setupMobileOptimizations() {
    if (isMobile()) {
        // Reduzir animações em dispositivos móveis para melhor performance
        document.querySelectorAll('.benefit-item, .trigger-card').forEach(element => {
            element.style.transition = 'none';
        });
        
        // Ajustar tamanho de fonte dinamicamente
        const viewport = window.innerWidth;
        const scaleFactor = viewport / 375; // Base: iPhone SE
        document.documentElement.style.fontSize = `${Math.max(14, 16 * scaleFactor)}px`;
    }
}

// Inicializar todas as funcionalidades quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    parallaxEffect();
    setupSmoothScroll();
    setupCTAButtons();
    setupLazyLoading();
    setupMobileOptimizations();
    
    // Opcional: ativar efeito de typing
    // typewriterEffect();
    
    // Opcional: ativar contador regressivo
    // startCountdown();
});

// Otimização de performance: debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
window.addEventListener('scroll', debounce(() => {
    // Código de scroll otimizado aqui
}, 10));

// Preloader simples (opcional)
function setupPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #007bff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2rem;
        ">
            <div>Carregando...</div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Ativar preloader (descomente se desejar usar)
// setupPreloader();

