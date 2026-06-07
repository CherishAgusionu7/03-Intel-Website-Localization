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

const rtlLanguageCodes = new Set([
  'ar', 'he', 'fa', 'ur', 'ps', 'ku', 'sd', 'ug', 'yi', 'dv'
]);

const rtlCharRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

function getPrimaryLanguage(langValue) {
  if (!langValue) return '';
  return langValue.split('-')[0].toLowerCase();
}

function isRtlLanguageCode(langValue) {
  const primary = getPrimaryLanguage(langValue);
  return rtlLanguageCodes.has(primary);
}

function inferDirectionFromText(text) {
  if (!text) return 'ltr';
  return rtlCharRegex.test(text) ? 'rtl' : 'ltr';
}

function getVisibleTextSample() {
  const text = (document.body.innerText || document.body.textContent || '').trim();
  return text.replace(/\s+/g, ' ').slice(0, 250);
}

function detectPageDirection() {
  const htmlLang = document.documentElement.lang || document.documentElement.getAttribute('lang');
  const bodyLang = document.body.lang || document.body.getAttribute('lang');
  if (isRtlLanguageCode(htmlLang || bodyLang)) {
    return 'rtl';
  }

  const sample = getVisibleTextSample();
  return inferDirectionFromText(sample);
}

function applyPageDirection() {
  const direction = detectPageDirection();
  const html = document.documentElement;
  const body = document.body;
  if (html.dir !== direction) {
    html.dir = direction;
    body.dir = direction;
    html.classList.toggle('rtl-mode', direction === 'rtl');
  }
}

function watchForLanguageChanges() {
  const observer = new MutationObserver(() => applyPageDirection());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir']
  });
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['lang', 'dir'],
    childList: true,
    subtree: true
  });

  setInterval(applyPageDirection, 1800);
}

applyPageDirection();
watchForLanguageChanges();
