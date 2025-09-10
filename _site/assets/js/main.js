// JavaScript para smooth scroll y animaciones
function initAnimations() {
  // Smooth scroll al hacer clic en el indicador
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      document.getElementById('experience').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
  
  // Animación de aparición para los elementos de la timeline
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }, 100 * Array.from(entry.target.parentNode.children).indexOf(entry.target));
      }
    });
  }, observerOptions);
  
  // Aplicar a los elementos de la timeline
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(function(item) {
    item.style.opacity = 0;
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
  
  // Efecto de escritura para el tagline (opcional)
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
}

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Simple animation for the role cards
document.addEventListener('DOMContentLoaded', function() {
    const roleCards = document.querySelectorAll('.role-card');
    
    roleCards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Animate with delay
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
});

// JavaScript para mejorar la interactividad
document.addEventListener('DOMContentLoaded', function() {
  // Efecto hover en las tarjetas de proyecto
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
  });
  
  // Animación de aparición
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, options);
  
  // Aplicar animación a las tarjetas
  projectCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
});

function toggleInfo(button) {
  // Encontrar la tarjeta padre
  const card = button.closest('.project-item');

  // Encontrar el contenedor de información adicional
  const additionalInfo = card.querySelector('.additional-info');

  // Encontrar el botón de expandir
  const expandButton = card.querySelector('.expand-button');

  // Alternar la clase 'expanded'
  additionalInfo.classList.toggle('expanded');
  expandButton.classList.toggle('expanded');

  // Cambiar el texto del botón
  if (additionalInfo.classList.contains('expanded')) {
      expandButton.querySelector('span:first-child').textContent = 'Menos información';
  } else {
      expandButton.querySelector('span:first-child').textContent = 'Ver más información';
  }
}