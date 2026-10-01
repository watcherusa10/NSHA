/* NSHA — progressive enhancement only.
   1. Mobile navigation toggle (open/close, Escape, close on link click,
      close when the viewport crosses into the desktop layout).
   2. Current year in the footer.
   The page reads and navigates correctly without this file: the <html>
   element keeps its "no-js" class and the nav renders inline. The class is
   removed HERE, not in an inline <head> script, so a blocked or failed script
   leaves the working inline nav in place instead of a hidden one. */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  var header = document.querySelector('.site-header');

  if (toggle && nav) {
    /* The open panel hangs below the header. Cap its height at the space left
       between the header's bottom edge and the viewport bottom so short
       (landscape) screens scroll inside the panel instead of clipping the CTA.
       The CSS fallback is calc(100dvh - 100%), which ignores the disclosure
       banner above the header at the top of the page; this measures it. */
    var fitPanel = function () {
      if (!header) { return; }
      var space = window.innerHeight - header.getBoundingClientRect().bottom;
      nav.style.maxHeight = Math.max(120, Math.round(space)) + 'px';
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    var setOpen = function (open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) { fitPanel(); } else { nav.style.maxHeight = ''; }
    };

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    window.addEventListener('resize', function () {
      if (isOpen()) { fitPanel(); }
    });

    nav.addEventListener('click', function (event) {
      var link = event.target && event.target.closest ? event.target.closest('a') : null;
      if (link) { setOpen(false); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    /* Close the panel once when the layout switches to desktop, instead of
       checking innerWidth on every resize event. */
    if (window.matchMedia) {
      var desktop = window.matchMedia('(min-width: 900px)');
      var onChange = function (mq) {
        if (mq.matches && isOpen()) { setOpen(false); }
      };
      if (typeof desktop.addEventListener === 'function') {
        desktop.addEventListener('change', onChange);
      } else if (typeof desktop.addListener === 'function') {
        desktop.addListener(onChange);
      }
    }
  }

  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
