/* NSHA — progressive enhancement only.
   1. Mobile navigation toggle (open/close, Escape, close on link click,
      close when keyboard focus leaves the menu, close on a click outside it,
      close when the viewport crosses into the desktop layout). While open,
      html[data-nav-open] turns on the page scrim defined in styles.css.
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
    /* The open panel hangs below the header. Size it to exactly the space left
       between the header's bottom edge and the viewport bottom: the max-height
       makes short (landscape) screens scroll inside the panel instead of
       clipping the CTA, and the matching min-height makes the panel fill the
       viewport so the hero (and its own "Become a Subsister" button) cannot
       show beneath the menu's CTA. The CSS fallback is calc(100dvh - 100%),
       which ignores the disclosure banner above the header at the top of the
       page; this measures it. */
    var fitPanel = function () {
      if (!header) { return; }
      var space = window.innerHeight - header.getBoundingClientRect().bottom;
      var px = Math.max(120, Math.round(space)) + 'px';
      nav.style.maxHeight = px;
      nav.style.minHeight = px;
    };

    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    var setOpen = function (open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) {
        document.documentElement.setAttribute('data-nav-open', '');
        fitPanel();
      } else {
        document.documentElement.removeAttribute('data-nav-open');
        nav.style.maxHeight = '';
        nav.style.minHeight = '';
      }
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

    if (header) {
      /* Keyboard: when focus Tabs out of the header (past the panel's last
         link) the panel would otherwise stay open over the newly focused
         element. relatedTarget is null when focus goes to <body>, so the
         check runs after the browser has settled activeElement. */
      header.addEventListener('focusout', function () {
        if (!isOpen()) { return; }
        window.setTimeout(function () {
          var active = document.activeElement;
          if (isOpen() && active && active !== document.body && !header.contains(active)) {
            setOpen(false);
          }
        }, 0);
      });

      /* Pointer: a tap on the scrim (or anywhere outside the header) closes. */
      document.addEventListener('click', function (event) {
        if (isOpen() && !header.contains(event.target)) { setOpen(false); }
      });
    }

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
