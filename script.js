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

    if (event.target === lightbox) {
      closeLightbox();
    } else if (event.target === videoLightbox) {
      closeVideo();
    }
  });
});

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
// LIGHTBOX PARA IMÁGENES
// =============================================
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const img = element.querySelector('img');

  if (!lightbox || !lightboxImg || !img) {
    console.error("Elementos del lightbox no encontrados");
    return;
  }

  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
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
// PCTURES CAROUSEL
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
  const overlay = document.getElementById(overlayId);
  const scrollPoints = document.getElementById(scrollPointsId);
  
  let currentIndex = 0;

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

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      overlay.textContent = slide.dataset.description;
      overlay.style.display = "block";
      setTimeout(() => (overlay.style.display = "none"), 3000);
    });
  });

  carousel.addEventListener("scroll", () => {
    const newIndex = Math.round(carousel.scrollLeft / slides[0].offsetWidth);
    currentIndex = newIndex;
    updateButtons();
    highlightThumbnail(); 
  });

  updateButtons();
  // Resalta el punto inicial al cargar
  highlightThumbnail(); 

}
