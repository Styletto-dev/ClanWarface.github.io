// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Observador de elementos para animações
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    // Elementos para animar
    document.querySelectorAll('.reveal, .slide-up, .slide-left, .slide-right, .fade-in, .rotate-in').forEach(el => {
        observer.observe(el);
    });

    // Contadores animados
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        observer.observe(counter);
        counter.addEventListener('animationstart', updateCount);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Formulário de Recrutamento
    const recruitmentForm = document.getElementById('recruitmentForm');
    if (recruitmentForm) {
        recruitmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                nickname: this.nickname.value,
                level: this.level.value,
                age: this.age.value,
                playtime: this.playtime.value,
                class: this.class.value,
                experience: this.experience.value,
                why: this.why.value,
                agree: this.agree.checked,
                date: new Date().toISOString()
            };

            // Salvar no banco de dados
            saveRecruitment(formData);
            
            // Feedback visual
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Inscrição Enviada!';
            submitBtn.style.background = 'var(--success)';
            
            // Reset após 3 segundos
            setTimeout(() => {
                this.reset();
                submitBtn.innerHTML = '<span>Enviar Inscrição</span><div class="btn-rays"></div>';
                submitBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
            }, 3000);
        });
    }

    // Efeito hover nos cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.pageX - card.offsetLeft;
            const y = e.pageY - card.offsetTop;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Efeito parallax
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});