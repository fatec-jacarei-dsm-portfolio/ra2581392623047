document.addEventListener('DOMContentLoaded', () => {
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const zoomableImages = document.querySelectorAll('.cert-img, .project-img');


    if (modal && modalImg && closeBtn) {
        zoomableImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('active');
                modalImg.src = this.src; 
                modalImg.alt = this.alt;
                document.body.style.overflow = 'hidden'; 
                
                console.info(`[UI Event] Imagem expandida: ${this.alt}`);
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
            
            setTimeout(() => {
                if(!modal.classList.contains('active')) {
                    modalImg.src = ''; 
                }
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    console.info(
        '%c Portfolio Inicializado com Sucesso ', 
        'background: #00E5FF; color: #000; font-weight: bold; border-radius: 2px;'
    );
    console.log(
        'Todos os módulos Vanilla carregados sem dependências externas. Pronto para Vercel Edge Network.'
    );
});