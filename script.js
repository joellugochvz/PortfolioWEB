console.log("Sitio cargado correctamente");
// Actualizar año en el footer
document.querySelector('.current-year').textContent = new Date().getFullYear();

// Lightbox para imágenes
function openLightbox(element) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = element.querySelector('img').src;
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Lightbox para video
function openVideo(videoSrc) {
  const videoLightbox = document.getElementById('video-lightbox');
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.src = videoSrc;
  videoLightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  videoPlayer.play();
}

function closeVideo() {
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.pause();
  document.getElementById('video-lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Abrir PDF
function openPdf(pdfUrl) {
  window.open(pdfUrl, '_blank');
}

// Cerrar al hacer clic fuera del contenido
window.onclick = function(event) {
  const lightbox = document.getElementById('lightbox');
  const videoLightbox = document.getElementById('video-lightbox');
  
  if (event.target === lightbox) {
    closeLightbox();
  }
  
  if (event.target === videoLightbox) {
    closeVideo();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Marcar que JS está activo
  document.documentElement.classList.add('js-enabled');
  
  const video = document.createElement('video');
  const canvas = document.querySelector('#video-thumbnail');
  const ctx = canvas.getContext('2d');
  
  video.src = 'Videos/Demo_App_Audi.mp4';
  video.muted = true; // Necesario para autoplay en algunos navegadores
  video.playsInline = true;
  
  // Configurar canvas con las mismas dimensiones del contenedor
  const preview = document.querySelector('.video-preview');
  canvas.width = preview.offsetWidth;
  canvas.height = preview.offsetHeight;
  
  video.addEventListener('loadedmetadata', function() {
    // Capturar frame en el segundo 2 (ajustable)
    video.currentTime = Math.min(2, video.duration);
  });
  
  video.addEventListener('seeked', function() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  });
  
  // Forzar carga (importante para CORS)
  video.load();
  
  // Fallback si hay error
  video.addEventListener('error', function() {
    document.documentElement.classList.remove('js-enabled');
  });
});