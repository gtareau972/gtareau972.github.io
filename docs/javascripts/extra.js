/* Animations du site — relancées à chaque page grâce à la navigation instantanée */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let typedTimer = null;

  /* Apparition progressive des blocs au défilement */
  function initReveal() {
    const targets = document.querySelectorAll(
      ".md-content .md-typeset > h2, .md-content .md-typeset > table, .md-content .md-typeset > .admonition, " +
      ".md-content .md-typeset .grid.cards > ul > li, .stat, .timeline h3, .md-content .md-typeset > .tabbed-set"
    );
    if (reduce || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  }

  /* Compteurs animés */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    const fmt = new Intl.NumberFormat("fr-FR");
    const run = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      if (reduce) { el.textContent = fmt.format(target) + suffix; return; }
      const start = performance.now(), duration = 1600;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt.format(Math.round(target * eased)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { counters.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach((el) => io.observe(el));
  }

  /* Texte qui s'écrit dans le bandeau d'accueil */
  function initTyped() {
    clearTimeout(typedTimer);
    const el = document.querySelector(".hero__typed");
    if (!el) return;
    const words = (el.dataset.words || "").split("|").filter(Boolean);
    if (!words.length) return;
    if (reduce) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      if (!document.body.contains(el)) return;
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 45 : 90;
      if (!deleting && c === word.length) { deleting = true; delay = 1800; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      typedTimer = setTimeout(tick, delay);
    };
    tick();
  }

  function init() { initReveal(); initCounters(); initTyped(); }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(init);
  } else if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
