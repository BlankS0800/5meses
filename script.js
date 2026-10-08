// ==========================================
// RENDERIZADO MODULAR DE MESES
// ==========================================
function renderMeses() {
  const timelineContainer = document.getElementById('timeline');
  if (!timelineContainer) return;

  const listaMeses = window.meses || [];
  // Ordenar por orden si está definido
  listaMeses.sort((a, b) => (a.order || 0) - (b.order || 0));

  timelineContainer.innerHTML = '';

  listaMeses.forEach(item => {
    // Si el módulo define su propia función de renderizado personalizado:
    if (typeof item.render === 'function') {
      const customEl = item.render();
      if (typeof customEl === 'string') {
        timelineContainer.insertAdjacentHTML('beforeend', customEl);
      } else if (customEl instanceof HTMLElement) {
        timelineContainer.appendChild(customEl);
      }
      return;
    }

    // Renderizado estándar de tarjeta estilo Polaroid
    const article = document.createElement('article');
    article.className = 'month-node';
    if (item.id) article.id = item.id;

    const washiTapeHtml = item.washiTape !== false ? '<div class="washi-tape"></div>' : '';
    const stickerHtml = item.sticker 
      ? `<div class="sticker ${item.stickerPos || 'sticker-top-left'}">${item.sticker}</div>` 
      : '';

    article.innerHTML = `
      <div class="month-tag">
        <span>${item.tag || ''}</span>
      </div>
      <div class="polaroid-card">
        ${washiTapeHtml}
        ${stickerHtml}
        <div class="polaroid-img-wrapper">
          <img src="${item.image}" alt="${item.alt || ''}" loading="lazy" />
        </div>
        <p class="polaroid-caption">${item.caption || ''}</p>
        <p class="polaroid-sub">${item.sub || ''}</p>
      </div>
    `;

    timelineContainer.appendChild(article);
  });
}

// ==========================================
// ELEMENTOS DECORATIVOS FLOTANTES (DOODLES)
// ==========================================
function createDoodles() {
  const container = document.getElementById('bgDoodles');
  if (!container) return;

  const symbols = ['⭐', '🩷', '✨', '🐸', '🩷'];
  const count = 28;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = i % 2 === 0 ? 'doodle-star' : 'doodle-heart';
    span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = `${Math.random() * 95}%`;
    span.style.top = `${Math.random() * 95}%`;
    span.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
    span.style.animationDelay = `${Math.random() * 5}s`;
    span.style.animationDuration = `${Math.random() * 4 + 4}s`;
    container.appendChild(span);
  }
}

// ==========================================
// ANIMACIÓN DE SCROLL INTERSECTION OBSERVER
// ==========================================
function setupScrollObserver() {
  const nodes = document.querySelectorAll('.month-node');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  nodes.forEach(node => observer.observe(node));
}

// ==========================================
// REPRODUCTOR DE MÚSICA
// ==========================================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
  if (!music || !musicBtn) return;

  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = '<span class="music-icon-pulse">⏸️</span><span>Música pausada</span>';
    isPlaying = false;
  } else {
    music.play().then(() => {
      musicBtn.innerHTML = '<span class="music-icon-pulse">🩷🎵</span><span>YOKO</span>';
      isPlaying = true;
    }).catch(err => {
      console.warn('Interacción requerida para reproducir audio:', err);
    });
  }
}

if (musicBtn) {
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
  });
}

document.addEventListener('click', () => {
  if (!isPlaying) {
    toggleMusic();
  }
}, { once: true });

// Listener opcional protegido contra null
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// INICIALIZACIÓN GENERAL
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  createDoodles();
  renderMeses();
  setupScrollObserver();
});
