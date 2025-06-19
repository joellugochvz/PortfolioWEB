const overlay = document.getElementById("lightbox-overlay");
  const lightboxImg = overlay.querySelector(".lightbox-img");
  const closeBtn = overlay.querySelector(".close-btn");
  const lightboxPrev = overlay.querySelector(".lightbox-prev");
  const lightboxNext = overlay.querySelector(".lightbox-next");

  let lightboxIndex = 0;

  const openLightbox = (index) => {
    const img = slides[index].querySelector("img");
    if (img) {
      overlay.classList.remove("hidden");
      lightboxImg.src = img.src;
      lightboxIndex = index;
    }
  };

  const closeLightbox = () => overlay.classList.add("hidden");

  const updateLightboxImage = () => {
    const img = slides[lightboxIndex]?.querySelector("img");
    if (img) lightboxImg.src = img.src;
  };

  lightboxPrev.addEventListener("click", () => {
    if (lightboxIndex > 0) {
      lightboxIndex--;
      updateLightboxImage();
    }
  });

  lightboxNext.addEventListener("click", () => {
    if (lightboxIndex < slides.length - 1) {
      lightboxIndex++;
      updateLightboxImage();
    }
  });

  closeBtn.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      closeLightbox();
    }
  });

  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
    lightboxImg.classList.toggle("zoomed");
  });

  slides.forEach((slide, i) => {
    slide.addEventListener("click", () => openLightbox(i));//*************+
    // Double click to show/hide description
    // slide.addEventListener("dblclick", (e) => {
    //   e.stopPropagation();
    //   let card = slide.querySelector(".description-card");
    //   if (!card) {
    //     card = document.createElement("div");
    //     card.className = "description-card";
    //     card.textContent = slide.dataset.description;
    //     slide.appendChild(card);
    //     setTimeout(() => card.classList.add("visible"), 10);
    //   } else {
    //     card.classList.remove("visible");
    //     setTimeout(() => card.remove(), 300);
    //   }
    // });
  });

  updateButtons();
  highlightThumbnail();
