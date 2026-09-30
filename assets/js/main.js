/* NSHA — progressive enhancement only.
   1. Mobile navigation toggle (open/close, Escape, close on link click,
      close when the viewport crosses into the desktop layout).
   2. Current year in the footer.
   The page reads and navigates correctly without this file: the <html>
   element keeps its "no-js" class and the nav renders inline. */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
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
