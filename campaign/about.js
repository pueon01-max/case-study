AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: false,
  mirror: true,
  offset: 90,
  anchorPlacement: 'top-bottom'
});

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('#aboutHero');
  const parallaxItems = document.querySelectorAll('.parallax-item');

  if (hero && parallaxItems.length) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;

      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 6);
        const moveX = px * speed;
        const moveY = py * speed;

        if (item.classList.contains('about-hero-cup')) {
          item.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
        } else if (item.classList.contains('data-app')) {
          item.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
        } else if (item.classList.contains('vision-logo')) {
          item.style.transform = `translateX(calc(-50% + ${moveX * 0.7}px)) translateY(${moveY * 0.7}px)`;
        }
      });
    });

    hero.addEventListener('mouseleave', () => {
      parallaxItems.forEach((item) => {
        item.style.transform = '';
      });
    });
  }
});
