/* SentinelGel: navigation, footer, scroll effects and the pH demo.
   One file, no dependencies. Every effect has a correct resting state with
   scripting off or reduced motion on. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (here.indexOf('.html') < 0) here = 'index.html';

  /* ------------------------------------------------------------ site map */
  var ICON = {
    doc: '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    slider: '<path d="M4 8h16M4 16h16"/><circle cx="9" cy="8" r="2.5" fill="currentColor"/><circle cx="15" cy="16" r="2.5" fill="currentColor"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.600-7 10-7 10z"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/><path d="M7.500 15h9"/>',
    scale: '<path d="M4 6h16M12 6v14M8 20h8"/><path d="M4 6l-2 6h4zM20 6l-2 6h4z"/>',
    check: '<path d="M4 5h10M4 10h10M4 15h6"/><path d="M14 16l3 3 5-6"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'
  };
  var NAV = [
    { label: 'Project', items: [
      { t: 'Description', href: 'innovation.html', i: 'doc' },
      { t: 'How it works', href: 'index.html#how', i: 'layers' },
      { t: 'pH demo', href: 'index.html#demo', i: 'slider' },
      { t: 'Impact', href: 'impact.html', i: 'heart' } ] },
    { label: 'Lab', items: [
      { t: 'Formulation', href: 'science.html', i: 'flask' },
      { t: 'Comparison', href: 'science.html#compare', i: 'scale' },
      { t: 'Testing', href: 'testing.html', i: 'check' },
      { t: 'Safety', href: 'testing.html#safety', i: 'shield' } ] }
  ];
  var LOGO = '<svg class="sitenav__logo" viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" fill="#e2f3ec"/><path d="M0 30c8-4 14 3 22 0s14-4 22 0v14H0z" fill="#3fae8c"/><circle cx="15" cy="20" r="5" fill="#fff" stroke="#1a7a63" stroke-width="2"/><circle cx="29" cy="17" r="8" fill="#fbe9dc" stroke="#e07a3c" stroke-width="2"/></svg>';

  function svg(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICON[name] + '</svg>'; }
  function isHere(href) { return href.split('#')[0] === here && href.indexOf('#') < 0; }
  function inSection(tab) { return tab.href ? tab.href === here : tab.items.some(function (it) { return it.href.split('#')[0] === here && here !== 'index.html'; }); }

  var tabs = '', panels = '', drawer = '';
  NAV.forEach(function (tab, n) {
    var sec = inSection(tab) ? ' is-section' : '';
    if (tab.href) {
      tabs += '<a class="sitenav__tab' + sec + '" href="' + tab.href + '">' + tab.label + '</a>';
      drawer += '<h2>' + tab.label + '</h2><a href="' + tab.href + '"' + (isHere(tab.href) ? ' aria-current="page"' : '') + '>' + tab.label + '</a>';
      return;
    }
    tabs += '<button class="sitenav__tab' + sec + '" type="button" aria-expanded="false" aria-controls="navp' + n + '" data-panel="' + n + '">' + tab.label + '<span class="sitenav__chev"></span></button>';
    panels += '<div class="sitenav__panel" id="navp' + n + '" data-panel="' + n + '">';
    drawer += '<h2>' + tab.label + '</h2>';
    tab.items.forEach(function (it) {
      var cur = isHere(it.href) ? ' aria-current="page"' : '';
      panels += '<a class="sitenav__item" href="' + it.href + '"' + cur + '><span class="sitenav__ico">' + svg(it.i) + '</span>' + it.t + '</a>';
      drawer += '<a href="' + it.href + '"' + cur + '>' + it.t + '</a>';
    });
    panels += '</div>';
  });

  doc.body.insertAdjacentHTML('afterbegin',
    '<nav class="sitenav" aria-label="Site"><div class="sitenav__bar"><div class="sitenav__inner">' +
    '<a class="sitenav__brand" href="index.html" aria-label="SentinelGel home">' + LOGO + '<span class="sitenav__word">SentinelGel</span></a>' +
    '<div class="sitenav__tabs">' + tabs + '</div>' +
    '<button class="sitenav__burger" type="button" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div><div class="sitenav__drawer">' + drawer + '</div></div>' +
    '<div class="sitenav__panels">' + panels + '</div><div class="sitenav__scrim"></div></nav><div class="sitenav-spacer"></div>');

  doc.body.insertAdjacentHTML('beforeend',
    '<footer class="foot"><div class="foot__inner">' +
    '<div><p class="foot__word">SentinelGel</p><p style="margin-top:.5rem;max-width:36ch">A drinkable throat coating that releases its buffer only when acid arrives. Conrad Challenge 2026–27, Health &amp; Nutrition.</p></div>' +
    '<div><h2>Project</h2><ul><li><a href="innovation.html">Description</a></li><li><a href="impact.html">Impact</a></li></ul></div>' +
    '<div><h2>Lab</h2><ul><li><a href="science.html">Formulation</a></li><li><a href="testing.html">Testing</a></li><li><a href="testing.html#safety">Safety</a></li></ul></div>' +
    '</div><div class="foot__legal"><p>SentinelGel is a student concept in development. It is not a medical product and nothing here is medical advice. Site layout adapted from the <a href="https://gitlab.igem.org/2026/gems-taiwan">GEMS Taiwan iGEM 2026 wiki</a>, CC BY 4.0.</p></div></footer>');

  /* ------------------------------------------------------------ nav state */
  var nav = doc.querySelector('.sitenav'), closeTimer;
  function openPanel(n) {
    clearTimeout(closeTimer);
    nav.querySelectorAll('[data-panel]').forEach(function (el) {
      var on = el.getAttribute('data-panel') === String(n);
      el.classList.toggle('is-open', on);
      if (el.tagName === 'BUTTON') el.setAttribute('aria-expanded', on);
    });
    nav.classList.toggle('has-panel', n !== null);
  }
  function closeSoon() { closeTimer = setTimeout(function () { openPanel(null); }, 180); }
  nav.querySelectorAll('button[data-panel]').forEach(function (b) {
    var n = b.getAttribute('data-panel');
    b.addEventListener('click', function () { openPanel(b.classList.contains('is-open') ? null : n); });
    b.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') openPanel(n); });
    b.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') closeSoon(); });
  });
  nav.querySelectorAll('.sitenav__panel').forEach(function (p) {
    p.addEventListener('pointerenter', function () { clearTimeout(closeTimer); });
    p.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') closeSoon(); });
  });
  var burger = nav.querySelector('.sitenav__burger');
  function drawerSet(on) { nav.classList.toggle('has-drawer', on); burger.setAttribute('aria-expanded', on); }
  burger.addEventListener('click', function () { drawerSet(!nav.classList.contains('has-drawer')); });
  nav.querySelector('.sitenav__scrim').addEventListener('click', function () { openPanel(null); drawerSet(false); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) { openPanel(null); drawerSet(false); } });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') { openPanel(null); drawerSet(false); } });

  /* ----------------------------------------------------------- hero intro */
  var hero = doc.querySelector('.hero');
  if (hero && !reduce) {
    hero.classList.add('is-pre');
    void hero.offsetWidth; /* commit the first frame, then play; no rAF, which a background tab never fires */
    setTimeout(function () { hero.classList.add('is-on'); hero.classList.remove('is-pre'); }, 60);
  }

  /* ----------------------------------------------------------------- rise */
  var io = 'IntersectionObserver' in window;
  doc.querySelectorAll('.prose > section, .eyebrow, .pagenext').forEach(function (el) { el.classList.add('rise'); });
  var rises = doc.querySelectorAll('.rise');
  if (io && !reduce) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    rises.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * .9) { el.classList.add('is-armed'); ro.observe(el); }
    });
  }

  /* ------------------------------------------------- scroll-driven motion
     One passive listener writes a few custom properties and CSS does the rest:
       --sy  on <html>: pixels scrolled (the hero's parallax)
       --sp  on <html>: 0 to 1 down the whole page (the progress line)
       --p   on [data-scrub]: 0 as it enters at the bottom, 1 as it leaves at the top
       --e   on [data-scrub]: 0 to 1 over its first three quarters of a screen
     With reduced motion nothing is written and every rule falls back to rest. */
  doc.body.insertAdjacentHTML('beforeend', '<div class="progress" aria-hidden="true"></div>');
  var scrubs = doc.querySelectorAll('[data-scrub]');
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
    root.style.setProperty('--sy', Math.min(y, 1400).toFixed(0));
    root.style.setProperty('--sp', max > 0 ? clamp(y / max).toFixed(4) : 0);
    scrubs.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      el.style.setProperty('--p', clamp((vh - r.top) / (vh + r.height)).toFixed(4));
      el.style.setProperty('--e', clamp((vh - r.top) / (vh * .75)).toFixed(4));
    });
  }
  if (!reduce) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ----------------------------------------------------------------- film
     A clip cut into numbered stills (ezgif-frame-001.jpg ...) and drawn to a
     canvas, one still per scroll position. Stays hidden while data-count is 0. */
  var film = doc.querySelector('.film');
  if (film && +film.dataset.count > 0) {
    film.hidden = false;
    var fN = +film.dataset.count, fBase = film.dataset.frames, fExt = film.dataset.ext || 'jpg';
    var cv = film.querySelector('canvas'), cx = cv.getContext('2d');
    var caps = film.querySelectorAll('.film__caps li'), frames = [], shown = -1, want = 0;
    function fSrc(i) { return fBase + ('00' + (i + 1)).slice(-3) + '.' + fExt; }
    function fDraw() {
      /* nearest still that has arrived, so a slow connection never shows a blank */
      var i = want, d = 0, img = null;
      while (d < fN) {
        var a = frames[i - d], b = frames[i + d];
        if (a && a.ok) { img = a; break; }
        if (b && b.ok) { img = b; break; }
        d++;
      }
      if (!img) return;
      var w = cv.width, h = cv.height, s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      var dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      cx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      shown = want;
    }
    function fSize() {
      var r = cv.getBoundingClientRect(), k = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(r.width * k); cv.height = Math.round(r.height * k);
      shown = -1; fDraw();
    }
    function fScroll() {
      var r = film.getBoundingClientRect(), span = r.height - window.innerHeight;
      var p = span > 0 ? clamp(-r.top / span) : 0;
      film.style.setProperty('--fp', p.toFixed(4));
      want = Math.round(p * (fN - 1));
      var c = Math.min(caps.length - 1, Math.floor(p * caps.length));
      caps.forEach(function (li, n) { li.classList.toggle('on', n === c); });
      if (want !== shown) fDraw();
    }
    for (var f = 0; f < fN; f++) (function (n) {
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () { im.ok = true; if (shown === -1 || n === want) fDraw(); };
      im.src = fSrc(n);
      frames[n] = im;
    })(f);
    if (reduce) { film.classList.add('film--still'); want = fN - 1; caps.forEach(function (li) { li.classList.add('on'); }); }
    else { window.addEventListener('scroll', fScroll, { passive: true }); }
    window.addEventListener('resize', function () { fSize(); if (!reduce) fScroll(); });
    fSize(); if (!reduce) fScroll();
  }

  /* -------------------------------------------------------------- scrolly */
  doc.querySelectorAll('.scrolly').forEach(function (sc) {
    var steps = sc.querySelectorAll('.scrolly__step');
    var ph = sc.querySelector('[data-read="ph"]'), state = sc.querySelector('[data-read="state"]');
    function set(step) {
      steps.forEach(function (s) { s.classList.toggle('is-current', s === step); });
      sc.setAttribute('data-step', step.getAttribute('data-n'));
      if (ph && step.dataset.ph) { ph.textContent = step.dataset.ph; state.textContent = step.dataset.state; }
    }
    set(steps[0]);
    if (!io) return;
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) set(e.target); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    steps.forEach(function (s) { so.observe(s); });
  });

  /* 1 in 7, as dots */
  var dots = doc.querySelector('.dots');
  if (dots) {
    var on = [3, 9, 19, 22, 34], h = '';
    for (var i = 0; i < 35; i++) h += '<i' + (on.indexOf(i) > -1 ? ' class="on" style="--n:' + on.indexOf(i) + '"' : '') + '></i>';
    dots.innerHTML = h;
  }

  /* -------------------------------------------------------------- pH demo */
  var slider = doc.getElementById('ph-slider');
  if (slider) {
    var demo = slider.closest('.demo'), $ = function (id) { return doc.getElementById(id); };
    var update = function () {
      var v = parseFloat(slider.value), acid = v < 5, mild = v >= 5 && v < 6.5;
      demo.classList.toggle('is-acid', acid);
      $('ph-text').textContent = v.toFixed(1);
      slider.setAttribute('aria-valuetext', 'pH ' + v.toFixed(1));
      $('status-title').textContent = acid ? 'Bead open: releasing buffer' : (mild ? 'Bead closed: on standby' : 'Bead closed: passive shield');
      $('status-body').textContent = acid
        ? 'Chitosan is protonated (–NH₃⁺). Charge repulsion swells the bead and Mg(OH)₂ diffuses out to neutralize the acid.'
        : (mild ? 'Slightly acidic, but above the trigger point. The gel still blocks acid and pepsin physically.'
                : 'Normal saliva pH. The bead stays collapsed and holds its buffer while the gel coats the tissue.');
      $('bead').textContent = acid ? 'Releasing' : 'Closed';
      $('bead-box').setAttribute('aria-label', acid ? 'Swollen bead releasing buffer' : 'Collapsed bead holding buffer');
    };
    slider.addEventListener('input', update); update();
  }

  /* ------------------------------------------------- sub-page contents list */
  var toc = doc.querySelector('.toc'), prose = doc.querySelector('.prose');
  if (toc && prose) {
    var secs = prose.querySelectorAll(':scope > section[id]'), list = '';
    secs.forEach(function (s, n) { list += '<li><a href="#' + s.id + '">' + (n + 1) + '&nbsp;&nbsp;' + s.querySelector('h2').textContent + '</a></li>'; });
    toc.innerHTML = '<h2>On this page</h2><ol>' + list + '</ol>';
    if (io) {
      var links = toc.querySelectorAll('a');
      var to = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      secs.forEach(function (s) { to.observe(s); });
    }
  }
})();
