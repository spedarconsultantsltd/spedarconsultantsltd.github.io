/* SPEDAR Consultants — site behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var cfg = window.SPEDAR_CONFIG || {};
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---- 1. Apply central configuration (contact details, social links) ---- */
  function applyConfig() {
    if (!cfg.email) return;
    $all('[data-config="email"]').forEach(function (el) {
      if (el.tagName === "A") {
        var href = el.getAttribute("href") || "";
        var q = href.indexOf("?") > -1 ? href.slice(href.indexOf("?")) : "";
        el.setAttribute("href", "mailto:" + cfg.email + q);
      }
      if (!el.hasAttribute("data-keep-text")) el.textContent = cfg.email;
    });
    $all('[data-config="phone"]').forEach(function (el) {
      if (el.tagName === "A") el.setAttribute("href", "tel:" + cfg.phone);
      if (!el.hasAttribute("data-keep-text")) el.textContent = cfg.phoneDisplay || cfg.phone;
    });
    ["facebook", "linkedin"].forEach(function (k) {
      if (!cfg.social || !cfg.social[k]) return;
      $all('[data-config="' + k + '"]').forEach(function (el) { el.setAttribute("href", cfg.social[k]); });
    });
    $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---- 2. Header: scrolled state ---- */
  function initHeader() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- 3. Navigation: mobile menu + services dropdown ---- */
  function initNav() {
    var btn = $(".menu-btn");
    var nav = $("#site-nav");
    if (btn && nav) {
      var setOpen = function (open) {
        btn.setAttribute("aria-expanded", String(open));
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
        var label = btn.querySelector("span");
        if (label) label.textContent = open ? "Close" : "Menu";
        var use = btn.querySelector("use");
        if (use) {
          var base = use.getAttribute("href").split("#")[0];
          use.setAttribute("href", base + (open ? "#i-close" : "#i-menu"));
        }
      };
      btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); btn.focus(); }
      });
      window.addEventListener("resize", function () { if (window.innerWidth > 1080) setOpen(false); });
    }

    $all(".nav__toggle").forEach(function (toggle) {
      var menu = document.getElementById(toggle.getAttribute("aria-controls"));
      if (!menu) return;
      var close = function () { toggle.setAttribute("aria-expanded", "false"); menu.classList.remove("is-open"); };
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        menu.classList.toggle("is-open", open);
      });
      document.addEventListener("click", function (e) {
        if (window.innerWidth > 1080 && !menu.contains(e.target) && e.target !== toggle) close();
      });
      menu.addEventListener("keydown", function (e) { if (e.key === "Escape") { close(); toggle.focus(); } });
      toggle.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
      // Close the desktop dropdown when keyboard focus leaves it
      menu.addEventListener("focusout", function (e) {
        if (window.innerWidth > 1080 && !menu.contains(e.relatedTarget) && e.relatedTarget !== toggle) close();
      });
    });
  }

  /* ---- 4. Home hero: map layer switcher ---- */
  function initMapLayers() {
    var hero = $(".hero");
    if (!hero) return;
    var buttons = $all(".layer-switch button", hero);
    var layers = $all(".hero__map img[data-layer]", hero);
    var legends = $all("[data-legend]", hero);
    var title = $("[data-layer-title]", hero);
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var name = b.getAttribute("data-show");
        buttons.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        layers.forEach(function (img) {
          var on = img.getAttribute("data-layer") === name;
          if (on && img.dataset.src && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src);
          img.classList.toggle("is-active", on);
        });
        legends.forEach(function (l) { l.hidden = l.getAttribute("data-legend") !== name; });
        if (title) title.textContent = b.getAttribute("data-title") || b.textContent;
      });
    });
    var contour = $("#contour-toggle", hero);
    if (contour) contour.addEventListener("change", function () { hero.setAttribute("data-contours", contour.checked ? "on" : "off"); });
    // Preload remaining layers after the page has loaded
    window.addEventListener("load", function () {
      setTimeout(function () {
        layers.forEach(function (img) { if (img.dataset.src && !img.getAttribute("src")) img.setAttribute("src", img.dataset.src); });
      }, 1200);
    });
  }

  /* ---- 5. Gentle reveal for a few marked elements ---- */
  function initReveal() {
    var items = $all("[data-reveal]");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- 6. Services sub-navigation: highlight current section ---- */
  function initSubnav() {
    var links = $all(".subnav a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
          var a = map[en.target.id];
          if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ---- 7. Insights filter ---- */
  function initFilters() {
    var bar = $(".filters");
    if (!bar) return;
    var buttons = $all("button", bar);
    var cards = $all(".article-list .card-article");
    var empty = $(".empty-state");
    var status = $("#filter-status");
    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var cat = b.getAttribute("data-filter");
        buttons.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        var shown = 0;
        cards.forEach(function (c) {
          var cats = (c.getAttribute("data-cats") || "").split(" ");
          var on = cat === "all" || cats.indexOf(cat) > -1;
          c.hidden = !on; if (on) shown++;
        });
        if (empty) empty.classList.toggle("is-visible", shown === 0);
        if (status) status.textContent = shown + (shown === 1 ? " article" : " articles") + " shown";
      });
    });
  }

  /* ---- 8. Contact form → mailto (or optional endpoint) ---- */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    var statusEl = $(".form__status", form);
    var fc = cfg.contactForm || {};

    function setError(field, msg) {
      var input = form.elements[field];
      var err = document.getElementById(field + "-error");
      if (!input) return;
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (err) { err.textContent = msg || ""; err.classList.toggle("is-visible", !!msg); }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var org = form.elements.organisation.value.trim();
      var topic = form.elements.topic.value;
      var msg = form.elements.message.value.trim();
      var ok = true;
      setError("name", ""); setError("email", ""); setError("message", "");
      if (!name) { setError("name", "Enter your name."); ok = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", "Enter an email address we can reply to, such as name@example.com."); ok = false; }
      if (msg.length < 10) { setError("message", "Describe your project or question in a sentence or two."); ok = false; }
      if (!ok) { var first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }

      var subject = (fc.subjectPrefix || "Project enquiry") + ": " + topic + (org ? " (" + org + ")" : "");
      var body = "Name: " + name + "\nEmail: " + email + (org ? "\nOrganisation: " + org : "") + "\nArea of interest: " + topic + "\n\n" + msg + "\n";

      if (fc.mode === "endpoint" && fc.formEndpoint) {
        if (statusEl) statusEl.textContent = "Sending…";
        fetch(fc.formEndpoint, { method: "POST", headers: { "Accept": "application/json" }, body: new FormData(form) })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); if (statusEl) statusEl.textContent = "Message sent. We will reply by email."; })
          .catch(function () { if (statusEl) statusEl.textContent = "The message could not be sent. Email us directly at " + cfg.email + "."; });
        return;
      }
      var href = "mailto:" + (cfg.email || "info@spedar.com") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      window.location.href = href;
      if (statusEl) statusEl.textContent = "Your email app should now open with the message ready to send. If nothing happens, email us at " + (cfg.email || "info@spedar.com") + ".";
    });
  }

  /* ---- 9. Copy email address ---- */
  function initCopy() {
    $all("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy") === "email" ? (cfg.email || "info@spedar.com") : btn.getAttribute("data-copy");
        var done = function () { var t = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = t; }, 1800); };
        if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, function () {});
        else { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} document.body.removeChild(ta); }
      });
    });
  }

  function init() { applyConfig(); initHeader(); initNav(); initMapLayers(); initReveal(); initSubnav(); initFilters(); initContactForm(); initCopy(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
