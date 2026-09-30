// Photo gallery + lightbox for individual gig pages.
//
// Runs after gig-detail.js, which exposes the current gig as
// window.CURRENT_GIG. If that gig has no `gallery` field (or an
// empty photos array), this script does nothing — the gallery
// section just doesn't appear. Add gallery data in gigs-data.js
// once a gig's photos are ready; see the comment at the top of
// that file for the exact shape.

(function () {
  let photos = [];
  let currentIndex = 0;
  let lastFocused = null;

  function init() {
    const gig = window.CURRENT_GIG;
    const wrap = document.getElementById("gig-gallery-wrap");
    if (!wrap || !gig || !gig.gallery || !gig.gallery.photos || !gig.gallery.photos.length) {
      wrap?.remove();
      return;
    }

    photos = gig.gallery.photos;

    const blurbEl = document.getElementById("gig-gallery-blurb");
    if (blurbEl) {
      if (gig.gallery.blurb) {
        blurbEl.textContent = gig.gallery.blurb;
      } else {
        blurbEl.remove();
      }
    }

    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    photos.forEach((photo, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-item";
      btn.setAttribute("aria-label", `Open photo ${index + 1} of ${photos.length}`);

      const img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || "";
      img.loading = "lazy";

      btn.appendChild(img);
      btn.addEventListener("click", () => openLightbox(index, btn));
      grid.appendChild(btn);
    });

    buildLightboxShell();
  }

  function buildLightboxShell() {
    if (document.getElementById("lightbox")) return;

    const lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");

    lb.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
      <button type="button" class="lightbox-prev" aria-label="Previous photo">&#8249;</button>
      <button type="button" class="lightbox-next" aria-label="Next photo">&#8250;</button>
      <div class="lightbox-image-wrap">
        <img class="lightbox-image" id="lightbox-image" src="" alt="">
        <a class="lightbox-credit" id="lightbox-credit" href="#" target="_blank" rel="noopener"></a>
      </div>
    `;

    document.body.appendChild(lb);

    lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
    lb.querySelector(".lightbox-next").addEventListener("click", () => step(1));

    // click on the backdrop (not the image/credit) closes it
    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  function renderCurrent() {
    const photo = photos[currentIndex];
    const img = document.getElementById("lightbox-image");
    const credit = document.getElementById("lightbox-credit");

    img.src = photo.src;
    img.alt = photo.alt || "";

    if (photo.credit) {
      credit.textContent = `photo: ${photo.credit}`;
      if (photo.instagram) {
        credit.href = `https://instagram.com/${photo.instagram}`;
        credit.style.pointerEvents = "";
      } else {
        credit.removeAttribute("href");
        credit.style.pointerEvents = "none";
      }
      credit.hidden = false;
    } else {
      credit.hidden = true;
    }
  }

  function openLightbox(index, triggerEl) {
    currentIndex = index;
    lastFocused = triggerEl || document.activeElement;

    const lb = document.getElementById("lightbox");
    renderCurrent();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox");
    lb.hidden = true;
    document.body.style.overflow = "";
    lastFocused?.focus();
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    renderCurrent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
