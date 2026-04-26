const themeToggle = document.getElementById('themeToggle');
const tocPanel = document.getElementById('tocPanel');
const mobileTocToggle = document.getElementById('mobileTocToggle');
const backToTop = document.getElementById('backToTop');
const tocLinks = [...document.querySelectorAll('.toc-sticky a')];
const sections = tocLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', systemDark ? 'dark' : 'light');

function updateThemeIcon() {
  const current = document.documentElement.getAttribute('data-theme');
  themeToggle.textContent = current === 'dark' ? '☀' : '☾';
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  updateThemeIcon();
});

mobileTocToggle?.addEventListener('click', () => {
  tocPanel.classList.toggle('open');
});

tocLinks.forEach(link => {
  link.addEventListener('click', () => {
    tocPanel.classList.remove('open');
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === id);
      });
    });
  },
  {
    rootMargin: '-25% 0px -60% 0px',
    threshold: 0.1,
  }
);

sections.forEach(section => observer.observe(section));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 700);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
