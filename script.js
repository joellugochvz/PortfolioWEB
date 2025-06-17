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
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");
const descriptionOverlay = document.getElementById("descriptionOverlay");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === slides.length - 1;
}

function scrollToSlide(index) {
  const slide = slides[index];
  if (slide) {
    slide.scrollIntoView({ behavior: "smooth", inline: "center" });
    currentIndex = index;
    updateButtons();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    scrollToSlide(currentIndex - 1);
  }
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    scrollToSlide(currentIndex + 1);
  }
}

slides.forEach((slide, index) => {
  slide.addEventListener("click", () => {
    const desc = slide.dataset.description;
    descriptionOverlay.textContent = desc;
    descriptionOverlay.style.display = "block";

    setTimeout(() => {
      descriptionOverlay.style.display = "none";
    }, 3000);
  });
});

carousel.addEventListener("scroll", () => {
  const newIndex = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex = newIndex;
  updateButtons();
});

updateButtons();
scrollToSlide(0);