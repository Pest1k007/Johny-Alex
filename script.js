// Функция для переключения экранов
function changeScreen(screenId) {
    // Скрыть все экраны
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показать выбранный экран
    let targetScreen;
    switch(screenId) {
        case 'main':
            targetScreen = document.getElementById('main-screen');
            break;
        case 'about':
            targetScreen = document.getElementById('about-screen');
            break;
        case 'projects':
            targetScreen = document.getElementById('projects-screen');
            break;
        default:
            targetScreen = document.getElementById('main-screen');
    }
    
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Прокрутка к верху экрана
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Создание частиц на главном экране
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    // Очищаем существующие частицы
    particlesContainer.innerHTML = '';
    
    // Создаем 20 частиц
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Случайные свойства
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Применяем стили
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(74, 125, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float-particle ${duration}s linear ${delay}s infinite;
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Добавляем стили для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Плавное появление элементов при скролле
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми анимируемыми элементами
    document.querySelectorAll('.about-card, .project-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем частицы
    createParticles();
    
    // Настраиваем анимации при скролле
    setupScrollAnimations();
    
    // Обработка кликов по ссылкам проектов (кроме Telegram)
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.getAttribute('onclick')) {
                e.preventDefault();
                alert('Этот проект скоро будет доступен! Следите за обновлениями в Telegram.');
            }
        });
    });
    
    // Анимация для кнопок при наведении
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-contact').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Добавляем интерактивность для карточек
    document.querySelectorAll('.about-card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Добавляем эффект параллакса для фона
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles');
    
    if (particles) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
