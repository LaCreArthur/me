/* Portfolio interactions.
   Progressive enhancement: all content ships static in index.html. This wires the
   animated hero name, scroll reveals, animated counters, the cycling role chips,
   the nav light/dark flip over the skate section, the skate-panel transition, and
   the canvas dot field. Ported from the Claude Design component to plain JS. */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    initLetters(reduce);
    initReveals(reduce);
    initCounters(reduce);
    initRoles(reduce);
    initWordRotor(reduce);
    initSkateVideo(reduce);
    initFoldout();
    initNavFlip();
    initTransition();
    if (!reduce) initDots();
  });

  function initLetters(reduce) {
    var els = [].slice.call(document.querySelectorAll('[data-letter]'));
    els.forEach(function (el, i) {
      el.style.display = 'inline-block';
      if (reduce) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(46px) rotate(7deg)';
      el.style.transition = 'opacity .6s ease, transform .65s cubic-bezier(.2,.8,.2,1)';
      el.style.transitionDelay = (140 + i * 40) + 'ms';
    });
    if (reduce) return;
    requestAnimationFrame(function () {
      els.forEach(function (el) { el.style.opacity = '1'; el.style.transform = 'none'; });
    });
  }

  function initReveals(reduce) {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    if (reduce) { els.forEach(function (el) { el.style.opacity = '1'; }); return; }
    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)';
      el.style.transitionDelay = (el.getAttribute('data-delay') || 0) + 'ms';
    });
    var poll = null;
    var reveal = function (el) { el.__shown = true; el.style.opacity = '1'; el.style.transform = 'none'; };
    var check = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var remaining = 0;
      els.forEach(function (el) {
        if (el.__shown) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > -60) reveal(el); else remaining++;
      });
      if (!remaining && poll) { clearInterval(poll); poll = null; }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    poll = setInterval(check, 200);
    setTimeout(function () { els.forEach(function (el) { if (!el.__shown) reveal(el); }); }, 6000);
  }

  function initCounters(reduce) {
    var els = [].slice.call(document.querySelectorAll('[data-count]'));
    if (!els.length) return;
    var fmt = function (el, v) { return (el.getAttribute('data-prefix') || '') + v + (el.getAttribute('data-suffix') || ''); };
    var finalVal = function (el) { return fmt(el, parseFloat(el.getAttribute('data-count')).toFixed(parseInt(el.getAttribute('data-dec') || '0', 10))); };
    if (reduce) { els.forEach(function (el) { el.textContent = finalVal(el); }); return; }
    // HTML ships the real values as a no-JS fallback; once JS owns them, start from zero.
    els.forEach(function (el) { el.textContent = fmt(el, (0).toFixed(parseInt(el.getAttribute('data-dec') || '0', 10))); });
    var poll = null;
    var run = function (el) {
      if (el.__counted) return; el.__counted = true;
      var target = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      var dur = 1300, t0 = performance.now();
      var tick = function (t) {
        var p = Math.min(1, (t - t0) / dur);
        p = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(el, (target * p).toFixed(dec));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    var check = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var remaining = 0;
      els.forEach(function (el) {
        if (el.__counted) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) run(el); else remaining++;
      });
      if (!remaining && poll) { clearInterval(poll); poll = null; }
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    poll = setInterval(check, 200);
    setTimeout(function () { els.forEach(function (el) { if (!el.__counted) { el.__counted = true; el.textContent = finalVal(el); } }); }, 6000);
  }

  function initRoles(reduce) {
    var els = [].slice.call(document.querySelectorAll('[data-role]'));
    if (!els.length) return;
    var colors = ['#9fe0c2', '#a7cdf2', '#f1d99b'];   // game dev / founder / skater (gold)
    var set = function (n) {
      els.forEach(function (el, k) {
        var on = k === n;
        var c = colors[k % colors.length];
        el.style.transition = 'color .4s ease, background-color .4s ease, border-color .4s ease';
        el.style.color = on ? '#1a1a1d' : '#9a9aa3';
        el.style.backgroundColor = on ? c : 'transparent';
        el.style.borderColor = on ? c : '#34343a';
      });
    };
    set(0);
    if (reduce) return;
    var i = 0;
    setInterval(function () { i = (i + 1) % els.length; set(i); }, 1700);
  }

  // Contact heading: cycle the accent word ("ship?" -> "build?" -> ...) with a vertical
  // slide while the container width morphs so the "?" (part of the word) tracks it, and
  // swap to a different pastel accent on each flip.
  function initWordRotor(reduce) {
    var rotor = document.querySelector('[data-rotor]');
    if (!rotor) return;
    var word = rotor.querySelector('.rotor__word');
    var words = (rotor.getAttribute('data-rotor') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!word || words.length < 2) return;
    var palette = ['#f4b59e', '#9fe0c2', '#a7cdf2', '#c9b8f2', '#f1d99b', '#f4abce']; // peach, teal, blue, violet, gold, pink
    var label = function (w) { return w + '?'; };

    // Hidden in-place measurer inherits the heading font, so width is exact per word.
    var meas = document.createElement('span');
    meas.setAttribute('aria-hidden', 'true');
    meas.style.cssText = 'position:absolute; visibility:hidden; white-space:nowrap; pointer-events:none; left:0; top:0;';
    rotor.appendChild(meas);
    var widthOf = function (w) { meas.textContent = label(w); return meas.offsetWidth; };

    var setWidth = function (w, animate) {
      if (animate) { rotor.style.width = widthOf(w) + 'px'; return; }
      var prev = rotor.style.transition;
      rotor.style.transition = 'none';
      rotor.style.width = widthOf(w) + 'px';
      void rotor.offsetWidth;            // commit before re-enabling the transition
      rotor.style.transition = prev;
    };

    setWidth(words[0], false);
    if (reduce) return;

    var tick = 0;
    setInterval(function () {
      tick++;
      var next = words[tick % words.length];
      rotor.classList.add('is-out');     // current word slides up + fades
      setWidth(next, true);              // width morphs alongside
      setTimeout(function () {
        word.textContent = label(next);
        word.style.color = palette[tick % palette.length]; // new pastel per flip
        rotor.classList.remove('is-out');
        rotor.classList.add('is-in');    // park the new word below, no transition
        void rotor.offsetWidth;
        rotor.classList.remove('is-in'); // let it slide up into place
      }, 420);                           // matches the .42s CSS duration
    }, 2200);
  }

  // Skate reel: muted loop that only plays while it's on screen (saves battery and
  // decode when scrolled away). Reduced-motion users keep the static poster frame.
  function initSkateVideo(reduce) {
    var v = document.querySelector('[data-skate-video]');
    if (!v || reduce) return;
    var play = function () { var p = v.play(); if (p && p.catch) p.catch(function () {}); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) play(); else v.pause(); });
      }, { threshold: 0.25 }).observe(v);
    } else {
      play();
    }
  }

  function initFoldout() {
    var btn = document.querySelector('.fold-toggle');
    var panel = document.getElementById('fold-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('open', !open);
    });
  }

  function initNavFlip() {
    var nav = document.getElementById('siteNav');
    var logo = document.getElementById('navLogo');
    var links = document.getElementById('navLinks');
    var skate = document.getElementById('skate');
    if (!nav || !skate) return;
    var navLight = null;
    var setLight = function (on) {
      if (navLight === on) return;
      navLight = on;
      nav.style.transition = 'background-color .45s ease, border-color .45s ease';
      nav.style.background = on ? 'rgba(239,236,228,.82)' : 'rgba(26,26,29,.72)';
      nav.style.borderBottomColor = on ? 'rgba(0,0,0,.08)' : '#2a2a2f';
      if (logo) { logo.style.transition = 'color .45s ease'; logo.style.color = on ? '#1a1a1d' : '#e8e8ec'; }
      if (links) { links.style.transition = 'color .45s ease'; links.style.color = on ? '#5a554c' : '#9a9aa3'; }
    };
    var check = function () {
      var navH = nav.offsetHeight || 52;
      var r = skate.getBoundingClientRect();
      setLight(r.top <= navH * 0.6 && r.bottom >= navH * 0.6);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
  }

  function initTransition() {
    var veil = document.getElementById('skateVeil');
    var skate = document.getElementById('skate');
    var skateBlock = document.getElementById('skateBlock');
    var contact = document.getElementById('contactSec');
    if (!skate) return;
    var apply = function () {
      // Panel geometry: the light section rises on rounded corners.
      skate.style.borderRadius = '40px 40px 0 0';
      skate.style.marginTop = '-2px';
      if (veil) { veil.style.display = 'block'; veil.style.transform = 'none'; veil.style.clipPath = 'none'; veil.style.borderRadius = '40px 40px 0 0'; }
      // Back-overlap onto the next section only when it is the contact block.
      if (contact) {
        var back = !!(skateBlock && skateBlock.nextElementSibling === contact);
        contact.style.borderRadius = back ? '40px 40px 0 0' : '0';
        contact.style.marginTop = back ? '-40px' : '0';
        contact.style.paddingTop = back ? '130px' : '90px';
        contact.style.background = back ? '#1a1a1d' : '';
        contact.style.borderTop = back ? 'none' : '1px solid #2a2a2f';
      }
    };
    // Fade: the dark veil cross-dissolves on the way in and back out.
    var veilUpdate = function () {
      if (!veil) return;
      var vh = window.innerHeight || 800;
      var r = skate.getBoundingClientRect();
      var enter = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.7)));
      var leave = Math.max(0, Math.min(1, r.bottom / (vh * 0.7)));
      var light = Math.min(enter, leave);
      veil.style.opacity = String(1 - light);
    };
    apply();
    veilUpdate();
    window.addEventListener('scroll', veilUpdate, { passive: true });
  }

  function initDots() {
    var c = document.getElementById('dotfield');
    if (!c) return;
    var ctx = c.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = 0, h = 0, cols = 0, rows = 0;
    var gap = 27;
    var resize = function () {
      w = c.offsetWidth; h = c.offsetHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / gap) + 1;
      rows = Math.ceil(h / gap) + 1;
    };
    resize();
    window.addEventListener('resize', resize);

    // Pointer interaction: dots near the cursor swell, brighten, and part around it.
    var host = c.parentNode;          // the hero <section>
    var R = 240;                      // influence radius (css px)
    var mx = -9999, my = -9999;       // smoothed cursor (what we render against)
    var tx = -9999, ty = -9999;       // raw cursor target
    var amp = 0, tAmp = 0;            // influence strength 0..1, eased in/out
    var onMove = function (e) {
      var r = c.getBoundingClientRect();
      tx = e.clientX - r.left; ty = e.clientY - r.top; tAmp = 1;
      if (mx < -9000) { mx = tx; my = ty; }   // first move: snap, don't fly in
    };
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', function () { tAmp = 0; });

    var t0 = performance.now();
    var draw = function (t) {
      var time = (t - t0) / 1000;
      mx += (tx - mx) * 0.16; my += (ty - my) * 0.16;   // trail the cursor smoothly
      amp += (tAmp - amp) * 0.07;                         // fade influence in/out
      ctx.clearRect(0, 0, w, h);
      var live = amp > 0.001;
      for (var y = 0; y < rows; y++) {
        for (var x = 0; x < cols; x++) {
          var px = x * gap, py = y * gap;
          var wv = Math.sin((px + py) / 150 - time * 1.0) * 0.6 + Math.sin((px - py) / 230 + time * 0.55) * 0.4;
          var a = (wv + 1) / 2;
          var rr = 0.75 + a * 2.2;
          var light = 0.06 + a * 0.4;
          var ox = px, oy = py;
          if (live) {
            var dx = px - mx, dy = py - my, d2 = dx * dx + dy * dy;
            if (d2 < R * R) {
              var d = Math.sqrt(d2) || 0.0001;
              var f = 1 - d / R; f = f * f * amp;         // eased falloff
              ox = px + (dx / d) * f * 14;                // part around the cursor
              oy = py + (dy / d) * f * 14;
              rr += f * 3;                                // swell
              light += f * 0.55;                          // brighten
            }
          }
          var hue = (((px - py) / 7) + time * 26) % 360;
          ctx.beginPath();
          ctx.arc(ox, oy, rr, 0, 6.2832);
          ctx.fillStyle = 'hsla(' + (hue < 0 ? hue + 360 : hue) + ',58%,76%,' + light + ')';
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
})();
