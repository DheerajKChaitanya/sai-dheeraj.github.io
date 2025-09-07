document.addEventListener('DOMContentLoaded', () => {
  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme management
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');

  function setToggleIconForTheme(theme) {
    if (theme === 'light') {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    setToggleIconForTheme(theme);
  }

  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Reveal animation
  const revealEls = document.querySelectorAll('.timeline-item, .project, .skill-card, .contact-card, .cert-card, .list li');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
});
