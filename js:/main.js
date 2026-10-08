document.addEventListener('DOMContentLoaded', () => {
  // GSAP ScrollTrigger Registration
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animazione del filo SVG sullo scroll
    const thread = document.getElementById('scroll-thread');
    if (thread) {
      const pathLength = thread.getTotalLength();
      thread.style.strokeDasharray = pathLength;
      thread.style.strokeDashoffset = pathLength;

      gsap.to(thread, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5
        }
      });
    }
  }

  // 1. Cursore Personalizzato Ad Ago (Desktop)
  const cursor = document.getElementById('custom-cursor');
  if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // 2. Filtri Categoria Galleria
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-salvia-dark', 'text-latte');
        b.classList.add('bg-latte', 'text-inchiostro');
      });
      btn.classList.add('bg-salvia-dark', 'text-latte');
      btn.classList.remove('bg-latte', 'text-inchiostro');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Modale Lightbox
  const modal = document.getElementById('modal-lightbox');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeModal = document.getElementById('close-modal');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img').src;
      const title = card.querySelector('h4').innerText;
      const desc = card.querySelector('p').innerText;

      modalImg.src = img;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;

      modal.classList.remove('hidden');
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }
});