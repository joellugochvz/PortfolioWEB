console.log("Sitio cargado correctamente");
console.log("Ancho del viewport:", window.innerWidth);

document.addEventListener("DOMContentLoaded", function () {
  // Agrega clase si JS está activo
  document.documentElement.classList.add('js-enabled');

  // =============================================
  // MANEJADORES DE EVENTOS GLOBALES
  // =============================================
  document.addEventListener('click', function (event) {
    const lightbox = document.getElementById('lightbox');
    const videoLightbox = document.getElementById('video-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (event.target === lightbox) {
      closeLightbox();
    } else if (event.target === videoLightbox) {
      closeVideo();
    }
    
    // Don't close lightbox when clicking on the image itself
    if (event.target === lightboxImg) {
      event.stopPropagation();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === 'flex') {
      switch(event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevLightboxImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextLightboxImage();
          break;
        case 'Escape':
          event.preventDefault();
          closeLightbox();
          break;
        case ' ': // Spacebar for zoom
          event.preventDefault();
          toggleZoom();
          break;
      }
    }
  });

  // Add profile picture animation
  const profilePicture = document.querySelector('.profile-picture img');
  const profilePictureContainer = document.querySelector('.profile-picture');
  if (profilePicture && profilePictureContainer) {
    profilePicture.addEventListener('click', function() {
      // Add only bouncing animation to the container
      profilePictureContainer.classList.add('bouncing-ball');
      setTimeout(() => {
        profilePictureContainer.classList.remove('bouncing-ball');
      }, 2000);
    });
  }
});

// =============================================
// CAROUSEL GLOBAL VARIABLES
// =============================================
let currentLightboxCarousel = null;
let currentLightboxIndex = 0;
let allCarousels = [];

// =============================================
// FUNCIÓN PARA COPIAR CORREO
// =============================================
function copiarCorreo(event) {
  const correo = "joel.lugo.chvz@outlook.com";
  const msg = document.getElementById("copiado-msg");

  navigator.clipboard.writeText(correo).then(() => {
    // Posicionamiento seguro con límites de pantalla
    const offsetX = 70;
    const offsetY = 70;

    const x = Math.min(
      event.pageX + offsetX,
      window.innerWidth - msg.offsetWidth - 10
    );

    const y = Math.min(
      event.pageY + offsetY,               // Posición Y del clic + desplazamiento
      window.innerHeight - msg.offsetHeight - 10  // Límite inferior de la pantalla
    );

    msg.style.left = `${x}px`;
    msg.style.top = `${y}px`;
    msg.classList.add("visible");
    console.log("Coordenada MSG:", msg.style.top); // Verás esto en la consola
    console.log("Coordenada y:", event.pageY); // Verás esto en la consola

    setTimeout(() => {
      msg.classList.remove("visible");
    }, 1000);
  }).catch(err => {
    alert("Error al copiar al portapapeles.");
    console.error("Error:", err);
  });
}

// =============================================
// ENHANCED LIGHTBOX PARA IMÁGENES
// =============================================
function openLightbox(element, carouselData = null, slideIndex = 0) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (!lightbox || !lightboxImg) {
    console.error("Elementos del lightbox no encontrados");
    return;
  }

  if (carouselData) {
    currentLightboxCarousel = carouselData;
    currentLightboxIndex = slideIndex;
  } else {
    // Fallback for direct element call
    const img = element.querySelector('img');
    if (!img) return;
    
    currentLightboxCarousel = {
      slides: [{ src: img.src, description: element.dataset.description || '' }]
    };
    currentLightboxIndex = 0;
  }

  updateLightboxImage();
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  
  // Reset zoom
  lightboxImg.classList.remove('zoomed');
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxDescription = document.getElementById('lightbox-description');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const counter = document.getElementById('lightbox-counter');
  
  if (currentLightboxCarousel && currentLightboxCarousel.slides[currentLightboxIndex]) {
    const currentSlide = currentLightboxCarousel.slides[currentLightboxIndex];
    lightboxImg.src = currentSlide.src;
    
    if (lightboxDescription) {
      lightboxDescription.textContent = currentSlide.description || '';
    }
    
    if (counter) {
      counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxCarousel.slides.length}`;
    }
    
    // Update navigation buttons
    if (prevBtn) {
      prevBtn.style.display = currentLightboxCarousel.slides.length > 1 ? 'block' : 'none';
      prevBtn.disabled = currentLightboxIndex === 0;
    }
    if (nextBtn) {
      nextBtn.style.display = currentLightboxCarousel.slides.length > 1 ? 'block' : 'none';
      nextBtn.disabled = currentLightboxIndex === currentLightboxCarousel.slides.length - 1;
    }
  }
}

function prevLightboxImage() {
  if (currentLightboxCarousel && currentLightboxIndex > 0) {
    currentLightboxIndex--;
    updateLightboxImage();
  }
}

function nextLightboxImage() {
  if (currentLightboxCarousel && currentLightboxIndex < currentLightboxCarousel.slides.length - 1) {
    currentLightboxIndex++;
    updateLightboxImage();
  }
}

function toggleZoom() {
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.classList.toggle('zoomed');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  if (lightboxImg) {
    lightboxImg.classList.remove('zoomed');
  }
  
  currentLightboxCarousel = null;
  currentLightboxIndex = 0;
}

// =============================================
// LIGHTBOX PARA VIDEO
// =============================================
function openVideo(videoSrc) {
  const videoLightbox = document.getElementById('video-lightbox');
  const videoPlayer = document.getElementById('video-player');

  if (!videoLightbox || !videoPlayer) {
    console.error("Elementos del video lightbox no encontrados");
    return;
  }

  videoPlayer.src = videoSrc;
  videoLightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  videoPlayer.play().catch(e => {
    console.error("Error al reproducir video:", e);
  });
}

function closeVideo() {
  const videoPlayer = document.getElementById('video-player');
  const videoLightbox = document.getElementById('video-lightbox');

  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  if (videoLightbox) {
    videoLightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// =============================================
// FUNCIÓN PARA ABRIR PDF
// =============================================
function openPdf(pdfUrl) {
  if (!pdfUrl) {
    console.error("URL del PDF no proporcionada");
    return;
  }
  window.open(pdfUrl, '_blank', 'noopener,noreferrer');
}

// =================================================================
// PICTURES CAROUSEL
// =================================================================
// Definiciones Para galería 1
initCarousel({
  carouselId: "carousel-1",
  slideClass: "slide",
  prevBtnId: "prevBtn-1",
  nextBtnId: "nextBtn-1",
  overlayId: "descriptionOverlay-1",
  scrollPointsId: "scroll-points-1"
});
// Definiciones Para galería 2
initCarousel({
  carouselId: "carousel-2",
  slideClass: "slide",
  prevBtnId: "prevBtn-2",
  nextBtnId: "nextBtn-2",
  overlayId: "descriptionOverlay-2",
  scrollPointsId: "scroll-points-2"
});

function initCarousel({ carouselId, slideClass, prevBtnId, nextBtnId, overlayId, scrollPointsId}) {
  const carousel = document.getElementById(carouselId);
  const slides = carousel.querySelectorAll(`.${slideClass}`);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const scrollPoints = document.getElementById(scrollPointsId);
  const galleryContainer = carousel.parentElement;
  
  let currentIndex = 0;
  let clickTimer = null;
  let instructionsShown = false;

  // Add description overlay to each slide if it doesn't exist
  slides.forEach((slide, index) => {
    if (!slide.querySelector('.description-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'description-overlay';
      overlay.id = `${overlayId}-${index}`;
      slide.appendChild(overlay);
    }
  });

  // Create instructions overlay
  const instructionsOverlay = document.createElement('div');
  instructionsOverlay.className = 'carousel-instructions';
  
  // Detect if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const clickText = isTouchDevice ? 'tap' : 'click';
  const doubleClickText = isTouchDevice ? 'double tap' : 'double click';
  
  instructionsOverlay.innerHTML = `
    <div class="instruction-item">
      <div class="hand-animation single-click">
        <svg class="hand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.75 5.25C13.75 3.45507 12.2949 2 10.5 2C8.70507 2 7.25 3.45507 7.25 5.25V12.25H6.75C5.64543 12.25 4.75 13.1454 4.75 14.25V15.25C4.75 16.3546 5.64543 17.25 6.75 17.25H8.25V20.25C8.25 21.3546 9.14543 22.25 10.25 22.25H17.25C18.3546 22.25 19.25 21.3546 19.25 20.25V12.25C19.25 10.4551 17.7949 9 16 9H15.75V5.25C15.75 3.45507 14.2949 2 12.5 2C11.8096 2 11.1851 2.26124 10.7127 2.70026"/>
        </svg>
      </div>
      <span>Single ${clickText} to show description</span>
    </div>
    <div class="instruction-item">
      <div class="hand-animation double-click">
        <svg class="hand-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.75 5.25C13.75 3.45507 12.2949 2 10.5 2C8.70507 2 7.25 3.45507 7.25 5.25V12.25H6.75C5.64543 12.25 4.75 13.1454 4.75 14.25V15.25C4.75 16.3546 5.64543 17.25 6.75 17.25H8.25V20.25C8.25 21.3546 9.14543 22.25 10.25 22.25H17.25C18.3546 22.25 19.25 21.3546 19.25 20.25V12.25C19.25 10.4551 17.7949 9 16 9H15.75V5.25C15.75 3.45507 14.2949 2 12.5 2C11.8096 2 11.1851 2.26124 10.7127 2.70026"/>
        </svg>
      </div>
      <span>${doubleClickText} to view full image</span>
    </div>
  `;
  galleryContainer.appendChild(instructionsOverlay);

  // Function to hide instructions
  const hideInstructions = () => {
    if (!instructionsShown) return;
    instructionsOverlay.classList.remove('show');
    setTimeout(() => {
      instructionsOverlay.style.display = 'none';
    }, 600);
  };

  // Function to show instructions
  const showInstructions = () => {
    if (instructionsShown) return;
    instructionsShown = true;
    instructionsOverlay.style.display = 'flex';
    setTimeout(() => {
      instructionsOverlay.classList.add('show');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(hideInstructions, 5000);
  };

  // Intersection Observer to detect when carousel comes into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !instructionsShown) {
        showInstructions();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(galleryContainer);

  // Hide instructions on any click in the carousel
  galleryContainer.addEventListener('click', hideInstructions, { once: true });

  // Store carousel data for lightbox navigation
  const carouselData = {
    slides: Array.from(slides).map(slide => ({
      src: slide.querySelector('img').src,
      description: slide.dataset.description || ''
    }))
  };
  
  allCarousels.push(carouselData);

  const updateButtons = () => {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === slides.length - 1;
  };

  const scrollToSlide = (index) => {
    if (slides[index]) {
      carousel.scrollTo({
        left: slides[index].offsetLeft - (carousel.clientWidth / 2 - slides[index].clientWidth / 2),
        behavior: "smooth"
      });
      currentIndex = index;
      updateButtons();
      highlightThumbnail();
    }
  };

  // ===================== SCROLL POINTS (MINIATURAS) =====================
  // 1. Crear los puntos
  scrollPoints.innerHTML = [...slides]
    .map((slide, i) => `<div data-id="${i}"></div>`)
    .join("");
  // 2. Escuchar clics en los puntos
  scrollPoints.querySelectorAll("div").forEach((el) => {
    el.addEventListener("click", () => scrollToSlide(parseInt(el.dataset.id, 10)));
  });
  // 3. Resaltar el punto activo
  const highlightThumbnail = () => {
    scrollPoints.querySelectorAll("div.highlighted").forEach(el => el.classList.remove("highlighted"));
    const index = Math.round(carousel.scrollLeft / slides[0].offsetWidth);
    const activeDot = scrollPoints.querySelector(`div[data-id="${index}"]`);
    if (activeDot) activeDot.classList.add("highlighted");
  };
  
  // ===================== EVENTOS Y FUNCIONALIDAD =====================
  // ===================== BUTTONS ACTIONS ===============================
  prevBtn.addEventListener("click", () => scrollToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => scrollToSlide(currentIndex + 1));
  //Scroll
  carousel.addEventListener("scroll", () => {
    const newIndex = Math.round(carousel.scrollLeft / slides[0].offsetWidth);
    currentIndex = newIndex;
    updateButtons();
    highlightThumbnail(); 
  });

  // Prevent carousel from interfering with page scroll
  carousel.addEventListener("wheel", (e) => {
    // If it's a vertical scroll (normal page scrolling) and not shift+scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.shiftKey) {
      // Don't let the carousel capture the event
      e.preventDefault();
      // Manually scroll the page instead
      window.scrollBy(0, e.deltaY);
    }
    // If shift+scroll or horizontal scroll, allow carousel to handle it normally
  }, { passive: false });

  // Prevent touch scroll interference on mobile
  let touchStartY = 0;
  let touchStartX = 0;
  
  carousel.addEventListener("touchstart", (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener("touchmove", (e) => {
    const touchY = e.touches[0].clientY;
    const touchX = e.touches[0].clientX;
    const deltaY = touchStartY - touchY;
    const deltaX = touchStartX - touchX;
    
    // If it's primarily a vertical scroll, prevent carousel interference
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  // =============================== ENHANCED CLICK ACTIONS =========================
  // Single click: Show description, Double click: Open lightbox
  slides.forEach((slide, i) => {
    slide.addEventListener("click", (e) => {
      if (clickTimer) {
        // Double click detected
        clearTimeout(clickTimer);
        clickTimer = null;
        
        // Open lightbox with navigation
        openLightbox(slide, carouselData, i);
      } else {
        // Single click - wait to see if there's a double click
        clickTimer = setTimeout(() => {
          clickTimer = null;
          
          // Show description overlay for this specific slide
          const overlay = slide.querySelector('.description-overlay');
          if (overlay && slide.dataset.description) {
            // Hide any other active overlays in this carousel first
            slides.forEach(s => {
              const otherOverlay = s.querySelector('.description-overlay');
              if (otherOverlay && otherOverlay !== overlay) {
                otherOverlay.classList.remove('show');
              }
            });

            overlay.textContent = slide.dataset.description;
            overlay.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
              overlay.classList.remove('show');
            }, 5000);
          }
        }, 250); // Delay to detect double clicks
      }
    });
  });

  //Actualiza configuración inicial de botones Carousel
  updateButtons();
  // Resalta el punto inicial al cargar
  highlightThumbnail(); 
}
