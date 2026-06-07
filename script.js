const exploreButton = document.getElementById('exploreTimeline');
const journeySection = document.getElementById('journey');

if (exploreButton && journeySection) {
  exploreButton.addEventListener('click', (event) => {
    event.preventDefault();
    journeySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    exploreButton.blur();
  });
}

const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 24;
    const y = (event.clientY / window.innerHeight - 0.5) * 24;
    hero.style.setProperty('--hero-move-x', `${x}px`);
    hero.style.setProperty('--hero-move-y', `${y}px`);
  });
}

const revealItems = document.querySelectorAll('.reveal-on-scroll');
const counterCards = document.querySelectorAll('.counter-number');
let countersAnimated = false;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.25,
});

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersAnimated) {
      counterCards.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const duration = 1600;
        const startTime = performance.now();

        const update = (time) => {
          const elapsed = time - startTime;
          const progress = Math.min(elapsed / duration, 1);
          counter.textContent = Math.round(progress * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
      });

      countersAnimated = true;
      observer.disconnect();
    }
  });
}, {
  threshold: 0.4,
});

const dashboard = document.getElementById('dashboard');
if (dashboard) {
  counterObserver.observe(dashboard);
}
