// 合同会社FONT サイト共通スクリプト
(() => {
  const navToggle = document.querySelector('.js-nav-toggle');
  const siteNav = document.querySelector('.js-site-nav');

  if (navToggle && siteNav) {
    const setNavState = (isOpen) => {
      siteNav.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      document.body.classList.toggle('nav-open', isOpen);
    };

    navToggle.addEventListener('click', () => {
      const willOpen = !siteNav.classList.contains('is-open');
      setNavState(willOpen);
      if (willOpen) {
        window.requestAnimationFrame(() => siteNav.querySelector('a')?.focus());
      }
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavState(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
        setNavState(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1180 && siteNav.classList.contains('is-open')) {
        setNavState(false);
      }
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) document.documentElement.classList.add('motion-ready');

  const revealTargets = document.querySelectorAll(
    '.page-home .section-head, .page-home .brand-story, .page-home .voice-preview-body, .page-home .contact-route'
  );

  if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach((target) => target.setAttribute('data-reveal', ''));
    document.documentElement.classList.add('reveal-ready');

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  }
})();
