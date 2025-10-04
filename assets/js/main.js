// JavaScript consolidado para el portfolio
document.addEventListener('DOMContentLoaded', function() {
    initPortfolio();
});

function initPortfolio() {
    initSmoothScroll();
    //initAnimations();
    initProjectInteractions();
    initRoleCards();
}

// Smooth scroll para el indicador
function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                experienceSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    }
}

// Animaciones principales
function initAnimations() {
    // Efecto de escritura para el tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline && !tagline.dataset.animated) {
        const originalText = tagline.textContent;
        tagline.textContent = '';
        tagline.dataset.animated = 'true';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                tagline.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Observer para animaciones al hacer scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observar elementos animables
    const animatedElements = document.querySelectorAll('.project-item, .role-card, .tool-item');
    animatedElements.forEach(function(item) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Interacciones de proyectos
function initProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        // Efectos hover
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
    });
}

// Animaciones para tarjetas de roles
function initRoleCards() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

// Función para expandir/contraer información (CORREGIDA)
function toggleInfo(button) {
  const projectItem = button.closest('.project-item');
  const additionalInfo = projectItem.querySelector('.additional-info');
  const buttonText = button.querySelector('.button-text') || button;
  const buttonIcon = button.querySelector('.button-icon');
  
  // Alternar estados
  additionalInfo.classList.toggle('expanded');
  button.classList.toggle('expanded');
  
  // Cambiar texto
  if (additionalInfo.classList.contains('expanded')) {
    buttonText.textContent = 'View Less Information';
    // Scroll suave a la sección expandida (opcional)
    additionalInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    buttonText.textContent = 'View More Information';
  }
  
  // Animación del ícono si existe
  if (buttonIcon) {
    buttonIcon.style.transform = additionalInfo.classList.contains('expanded') 
      ? 'rotate(180deg)' 
      : 'rotate(0deg)';
  }
}
function downloadCV(language) {
    const filename = language === 'Eng' 
        ? 'Ruben_Severino_CV_Eng.pdf' 
        : 'Ruben_Severino_CV_Esp.pdf';
    
    // Crear enlace temporal
    const link = document.createElement('a');
    link.href = `/assets/${filename}`;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Opcional: Tracking
    console.log(`CV descargado: ${filename}`);
}
