/*
  Shared behaviour for every concept:
  photos (with placeholders), contact links, mobile menu, nav indicator,
  scroll reveals, lightbox. Each concept styles these with its own CSS.
*/
(function () {
  "use strict";
  var C = window.SL_CONFIG || { photos: [] };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SL = (window.SL = { config: C, reduced: reduced });

  /* ---------- Photos ---------- */
  SL.photo = function (id) {
    for (var i = 0; i < C.photos.length; i++) if (C.photos[i].id === id) return C.photos[i];
    return null;
  };

  function placeholder(p) {
    var w = p.ratio[0] * 300, h = p.ratio[1] * 300;
    var fs = Math.round(Math.min(w, h) / 16);
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + p.tone[0] + '"/><stop offset="1" stop-color="' + p.tone[1] + '"/></linearGradient></defs>' +
      '<rect width="100%" height="100%" fill="url(#g)"/>' +
      '<rect x="' + fs + '" y="' + fs + '" width="' + (w - 2 * fs) + '" height="' + (h - 2 * fs) + '" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-dasharray="' + fs / 2 + " " + fs / 2 + '"/>' +
      '<text x="50%" y="47%" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="' + fs + '" fill="#ffffff" fill-opacity=".9">Photo needed</text>' +
      '<text x="50%" y="' + (47 + 100 * fs * 1.6 / h) + '%" text-anchor="middle" font-family="Menlo,Consolas,monospace" font-size="' + Math.round(fs * 0.62) + '" fill="#ffffff" fill-opacity=".75">' + p.src + "</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  SL.placeholder = placeholder;

  SL.fillPhotos = function (root) {
    (root || document).querySelectorAll("img[data-photo]").forEach(function (img) {
      var p = SL.photo(img.getAttribute("data-photo"));
      if (!p) return;
      img.alt = img.alt || p.alt || p.title;
      img.decoding = "async";
      if (!img.hasAttribute("loading")) img.loading = "lazy";
      img.onerror = function () {
        img.onerror = null;
        img.src = placeholder(p);
        img.classList.add("is-placeholder");
      };
      img.src = img.hasAttribute("data-thumb") && p.thumb ? p.thumb : p.src;
    });
  };

  /* ---------- Contact links ---------- */
  SL.fillContact = function () {
    document.querySelectorAll("[data-contact]").forEach(function (a) {
      var kind = a.getAttribute("data-contact");
      var val = C[kind];
      var label = a.querySelector("[data-contact-value]") || null;
      if (val) {
        if (kind === "email") a.href = "mailto:" + val;
        else a.href = val;
        if (kind !== "email") { a.target = "_blank"; a.rel = "noopener"; }
        if (label) label.textContent = kind === "email" ? val : kind === "linkedin" ? "Sahil Lokre" : kind === "instagram" ? "@" + val.replace(/\/+$/, "").split("/").pop() : "View or download (PDF)";
      } else {
        a.removeAttribute("href");
        a.classList.add("is-placeholder");
        a.setAttribute("aria-disabled", "true");
        a.title = "Placeholder: add your " + kind + " in shared/config.js";
        if (label) label.textContent = "[add in config.js]";
      }
    });
    document.querySelectorAll("[data-copy-email]").forEach(function (b) {
      if (!C.email) { b.hidden = true; return; }
      b.addEventListener("click", function () {
        var done = function () { var t = b.textContent; b.textContent = "Copied"; setTimeout(function () { b.textContent = t; }, 1600); };
        var fail = function () { var t = b.textContent; b.textContent = "Select the address to copy"; setTimeout(function () { b.textContent = t; }, 2200); };
        if (navigator.clipboard) navigator.clipboard.writeText(C.email).then(done, fail); else fail();
      });
    });
  };

  /* ---------- Mobile menu ---------- */
  SL.menu = function () {
    var btn = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    if (!btn || !menu) return;
    function set(open) {
      btn.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      document.documentElement.classList.toggle("menu-open", open);
    }
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  };

  /* ---------- Nav: active section + moving indicator ---------- */
  SL.nav = function (navSel) {
    var nav = document.querySelector(navSel);
    if (!nav) return;
    var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
    var ind = nav.querySelector(".nav-ind");
    function move(a) {
      links.forEach(function (l) { l.classList.toggle("is-active", l === a); if (l === a) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
      if (ind && a) {
        var r = a.getBoundingClientRect(), n = nav.getBoundingClientRect();
        ind.style.width = r.width + "px";
        ind.style.transform = "translate(" + (r.left - n.left) + "px," + (r.top - n.top) + "px)";
        ind.style.height = r.height + "px";
      }
    }
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); });
    function spy() {
      var y = window.innerHeight * 0.35, cur = links[0];
      sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top <= y) cur = links[i]; });
      move(cur);
    }
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(spy);
    spy();
  };

  /* ---------- Scroll reveal (content is visible by default) ---------- */
  SL.reveal = function () {
    var els = document.querySelectorAll("[data-reveal]");
    if (reduced || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("can-reveal");
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      else io.observe(el);
    });
    setTimeout(function () { els.forEach(function (el) { el.classList.add("in"); }); }, 4000);
  };

  /* ---------- Lightbox ---------- */
  SL.lightbox = function (opts) {
    opts = opts || {};
    var lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photograph viewer");
    lb.hidden = true;
    lb.innerHTML =
      '<button class="lb-close" type="button" aria-label="Close viewer">' + (opts.closeLabel || "Close") + "</button>" +
      '<figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"><span class="lb-cat"></span><span class="lb-title"></span><span class="lb-count"></span></figcaption></figure>' +
      '<button class="lb-prev" type="button" aria-label="Previous photograph">' + (opts.prevLabel || "Previous") + "</button>" +
      '<button class="lb-next" type="button" aria-label="Next photograph">' + (opts.nextLabel || "Next") + "</button>";
    document.body.appendChild(lb);
    var img = lb.querySelector(".lb-img"), list = [], i = 0, opener = null;

    function show() {
      var p = SL.photo(list[i]);
      img.classList.remove("is-placeholder");
      img.onerror = function () { img.onerror = null; img.src = placeholder(p); };
      img.src = p.src;
      img.alt = p.alt || p.title;
      lb.querySelector(".lb-cat").textContent = p.category;
      lb.querySelector(".lb-title").textContent = p.title;
      lb.querySelector(".lb-count").textContent = (i + 1) + " / " + list.length;
      lb.classList.remove("swap"); void lb.offsetWidth; lb.classList.add("swap");
    }
    function open(ids, idx, from) {
      list = ids; i = idx || 0; opener = from || document.activeElement;
      lb.hidden = false;
      document.documentElement.classList.add("lb-open");
      requestAnimationFrame(function () { lb.classList.add("is-open"); });
      show();
      lb.querySelector(".lb-close").focus();
    }
    function close() {
      lb.classList.remove("is-open");
      document.documentElement.classList.remove("lb-open");
      setTimeout(function () { lb.hidden = true; }, reduced ? 0 : 250);
      if (opener && opener.focus) opener.focus();
    }
    function step(d) { i = (i + d + list.length) % list.length; show(); }
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        var f = lb.querySelectorAll("button"), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); sx = null; });

    // Wire any [data-open-photo] triggers inside opts.scope
    (opts.scope || document).querySelectorAll("[data-open-photo]").forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        var group = t.closest("[data-gallery]");
        var ids = group
          ? Array.prototype.filter.call(group.querySelectorAll("[data-open-photo]"), function (x) { return !x.closest("[hidden]"); }).map(function (x) { return x.getAttribute("data-open-photo"); })
          : [t.getAttribute("data-open-photo")];
        var visible = ids.filter(function (v, k) { return ids.indexOf(v) === k; });
        open(visible, Math.max(0, visible.indexOf(t.getAttribute("data-open-photo"))), t);
      });
    });
    return { open: open, close: close };
  };

  SL.year = function () { document.querySelectorAll("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); }); };

  SL.init = function (o) {
    o = o || {};
    SL.fillPhotos();
    SL.fillContact();
    SL.menu();
    if (o.nav) SL.nav(o.nav);
    SL.reveal();
    SL.year();
    SL.lb = SL.lightbox(o.lightbox);
  };
})();
