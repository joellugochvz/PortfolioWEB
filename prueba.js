console.log("Sitio cargado correctamente");

  // Actualizar año en el footer
document.querySelector('.current-year').textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  // Agrega clase si JS está activo
  document.documentElement.classList.add('js-enabled');

});

  //=====================================================================
  //COPIAR CORREO AL PORTAPAPELES CON ICONO EMAIL
  //=====================================================================
function copiarCorreo(event) {
  const correo = "joel.lugo.chvz@outlook.com";
  navigator.clipboard.writeText(correo).then(() => {
    const msg = document.getElementById("copiado-msg");

    // Posiciona el span cerca del cursor
      const offsetX = 70; // separacion horizontal respecto al mouse
      const offsetY = 70; // separacion vertical respecto al mouse
      msg.style.left = `${event.pageX + offsetX}px`;
      msg.style.top = `${event.pageY + offsetY}px`;

      msg.classList.add("visible");
    // Oculta el mensaje después de tiempo
    setTimeout(() => {
      msg.classList.remove("visible");
    }, 1200);
  }).catch(err => {
    alert("Error al copiar al portapapeles.");
    console.error("Error:", err);
  });
}

  //=====================================================================
  // Lightbox para imágenes
  //=====================================================================
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

  //=====================================================================
  // Lightbox para video
  //=====================================================================
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
window.onclick = function (event) {
  const lightbox = document.getElementById('lightbox');
  const videoLightbox = document.getElementById('video-lightbox');

  if (event.target === lightbox) {
    closeLightbox();
  }

  if (event.target === videoLightbox) {
    closeVideo();
  }
}