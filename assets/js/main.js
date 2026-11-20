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


  /* ---- About Us: five dedicated organization pages ----
     Replace only the existing About link; leave existing Services menu,
     responsive navigation and all other links intact. */
  function initAboutMenu() {
    var nav = document.getElementById('site-nav');
    if (!nav || document.getElementById('about-menu')) return;
    var links = $all('.nav__list > li > a.nav__link', nav);
    var aboutLink = links.find(function (a) { return /(^|\/)about\.html(?:#.*)?$/.test(a.getAttribute('href') || ''); });
    if (!aboutLink) return;
    var li = aboutLink.parentElement;
    var href = aboutLink.getAttribute('href');
    var prefix = href.substring(0, href.lastIndexOf('about.html'));
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var aboutPages = ['about.html', 'board-of-advisors.html', 'mission-vision.html', 'quality-policy.html', 'partners.html'];
    var selected = aboutPages.indexOf(currentPath) >= 0 || aboutLink.getAttribute('aria-current') === 'page';
    var options = [
      ['about.html', 'The Organization'],
      ['board-of-advisors.html', 'Board of Advisors'],
      ['mission-vision.html', 'Mission &amp; Vision'],
      ['quality-policy.html', 'Quality Policy'],
      ['partners.html', 'Our Partners']
    ];
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav__toggle' + (selected ? ' is-current' : '');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-controls','about-menu');
    toggle.innerHTML = 'About Us <svg aria-hidden="true" focusable="false"><use href="' + prefix + 'assets/icons/icons.svg#i-chevron"></use></svg>';
    var dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    dropdown.id = 'about-menu';
    dropdown.setAttribute('aria-label','About Us pages');
    options.forEach(function (item) {
      var a = document.createElement('a');
      a.href = prefix + item[0];
      if (currentPath === item[0]) a.setAttribute('aria-current','page');
      a.innerHTML = '<strong>' + item[1] + '</strong>';
      dropdown.appendChild(a);
    });
    li.replaceChild(toggle, aboutLink);
    li.appendChild(dropdown);
  }


  /* ---- Capacity Building + Insights grouped menus ----
     Existing About/Services dropdowns and all page content remain unchanged.
     This is inserted progressively into each existing header. */
  function initCapacityInsightsMenus() {
    var nav = document.getElementById("site-nav");
    if (!nav || document.getElementById("capacity-menu")) return;
    var list = nav.querySelector(".nav__list");
    if (!list) return;
    var mainLinks = $all(":scope > li > a.nav__link", list);
    var insights = mainLinks.find(function (a) { return /(^|\/)insights\.html(?:[#?].*)?$/.test(a.getAttribute("href") || ""); });
    if (!insights) return;
    var insightLi = insights.parentElement;
    var oldHref = insights.getAttribute("href") || "insights.html";
    var prefix = oldHref.slice(0, oldHref.lastIndexOf("insights.html"));
    var path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    var capPages = ["capacity-building.html","training.html","workshops.html","seminars-webinars.html","careers.html","publications.html","survey-equipment.html","software-tools.html"];
    var insightPages = ["insights.html","news.html","content.html","events.html"];

    // Remove the former stand-alone Careers main menu item, if hard-coded.
    $all(":scope > li", list).forEach(function (li) {
      if (li === insightLi) return;
      var a = li.querySelector(":scope > a.nav__link");
      if (a && /(^|\/)careers\.html(?:[#?].*)?$/.test(a.getAttribute("href") || "")) li.remove();
    });

    function makeLink(file, label, cls) {
      var a = document.createElement("a");
      a.href = prefix + file;
      a.className = cls || "sp-menu-link";
      a.textContent = label;
      if (file === path) a.setAttribute("aria-current", "page");
      return a;
    }
    function makeToggle(label, id, active) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "nav__toggle" + (active ? " is-current" : "");
      b.setAttribute("aria-expanded", "false");
      b.setAttribute("aria-controls", id);
      b.innerHTML = label + ' <svg aria-hidden="true" focusable="false"><use href="' + prefix + 'assets/icons/icons.svg#i-chevron"></use></svg>';
      return b;
    }
    function makeMenu(id, label) {
      var d = document.createElement("div");
      d.className = "dropdown sp-nav-dropdown";
      d.id = id;
      d.setAttribute("aria-label", label);
      return d;
    }

    var capLi = document.createElement("li");
    capLi.className = "sp-nav-item sp-nav-item--capacity";
    capLi.appendChild(makeToggle("Capacity Building", "capacity-menu", capPages.indexOf(path) !== -1));
    var capMenu = makeMenu("capacity-menu", "Capacity Building pages");
    capMenu.appendChild(makeLink("capacity-building.html", "Overview", "sp-menu-link sp-menu-link--overview"));
    capMenu.appendChild(makeLink("training.html", "Training"));
    capMenu.appendChild(makeLink("workshops.html", "Workshops"));
    capMenu.appendChild(makeLink("seminars-webinars.html", "Seminars & Webinars"));
    capMenu.appendChild(makeLink("careers.html", "Careers"));

    var res = document.createElement("div");
    res.className = "sp-resources";
    var resBtn = document.createElement("button");
    resBtn.type = "button";
    resBtn.className = "sp-resources__toggle";
    resBtn.setAttribute("aria-expanded", "false");
    resBtn.setAttribute("aria-controls", "sp-resources-list");
    resBtn.innerHTML = 'Resources <span class="sp-resources__chevron" aria-hidden="true">&#8250;</span>';
    var resList = document.createElement("div");
    resList.className = "sp-resources__list";
    resList.id = "sp-resources-list";
    resList.hidden = true;
    resList.appendChild(makeLink("publications.html", "Publications"));
    resList.appendChild(makeLink("survey-equipment.html", "High-Precision DGPS & Survey Equipment"));
    resList.appendChild(makeLink("software-tools.html", "Software, Tools & Techniques"));
    res.appendChild(resBtn);
    res.appendChild(resList);
    capMenu.appendChild(res);
    capLi.appendChild(capMenu);
    list.insertBefore(capLi, insightLi);

    var insToggle = makeToggle("Insights", "insights-menu", insightPages.indexOf(path) !== -1);
    var insMenu = makeMenu("insights-menu", "Insights pages");
    insMenu.appendChild(makeLink("news.html", "News"));
    insMenu.appendChild(makeLink("content.html", "Content"));
    insMenu.appendChild(makeLink("events.html", "Events"));
    insightLi.replaceChild(insToggle, insights);
    insightLi.appendChild(insMenu);
    insightLi.classList.add("sp-nav-item", "sp-nav-item--insights");

    function positionResourcesFlyout() {
      res.classList.remove("sp-resources--open-left");
      if (window.innerWidth <= 1080) return;
      // Prefer the right-hand side as in the reference. If too close to the
      // viewport edge, flip to the left instead of clipping the content.
      var buttonRight = resBtn.getBoundingClientRect().right;
      var popupWidth = Math.min(290, window.innerWidth - 32);
      if (buttonRight + 12 + popupWidth > window.innerWidth - 16) {
        res.classList.add("sp-resources--open-left");
      }
    }
    var resourcesOpen = function (open) {
      resBtn.setAttribute("aria-expanded", String(open));
      resList.hidden = !open;
      res.classList.toggle("is-open", open);
      if (open) positionResourcesFlyout();
    };
    if (["publications.html","survey-equipment.html","software-tools.html"].indexOf(path) !== -1) {
      resourcesOpen(true);
    }
    resBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      resourcesOpen(resBtn.getAttribute("aria-expanded") !== "true");
    });
    resBtn.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { resourcesOpen(false); resBtn.focus(); }
    });
    res.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { resourcesOpen(false); resBtn.focus(); e.stopPropagation(); }
    });
    // When the whole Capacity menu is closed, its flyout also closes.
    // Clicking the main menu again can reopen it with a clean state.
    var capToggle = capLi.querySelector('.nav__toggle');
    if (capToggle) {
      capToggle.addEventListener("click", function () {
        if (capToggle.getAttribute("aria-expanded") === "true") resourcesOpen(false);
        else if (!resList.hidden) window.requestAnimationFrame(positionResourcesFlyout);
      });
    }
    document.addEventListener("click", function (e) {
      if (!capLi.contains(e.target) && !resList.hidden) resourcesOpen(false);
    });
    window.addEventListener("resize", function () {
      if (!resList.hidden) positionResourcesFlyout();
    });
    // Resources only opens on click / keyboard activation, not mouseover.

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

    /* Services: clicking opens the existing menu, but leaving its entire
       button/dropdown area with the mouse automatically closes it. This does
       NOT affect the mobile menu or the other click-only desktop menus. */
    var servicesDropdown = document.getElementById("services-menu");
    if (servicesDropdown) {
      var servicesItem = servicesDropdown.parentElement;
      var servicesToggle = servicesItem && servicesItem.querySelector(':scope > .nav__toggle');
      var servicesLeaveTimer = null;
      if (servicesItem && servicesToggle) {
        var cancelServicesLeave = function () {
          if (servicesLeaveTimer !== null) {
            window.clearTimeout(servicesLeaveTimer);
            servicesLeaveTimer = null;
          }
        };
        servicesItem.addEventListener("pointerenter", cancelServicesLeave);
        servicesItem.addEventListener("pointerleave", function (e) {
          if (window.innerWidth <= 1080 || e.pointerType === "touch") return;
          cancelServicesLeave();
          // A brief bridge interval lets the pointer safely cross the small
          // CSS gap between the button and its dropdown.
          servicesLeaveTimer = window.setTimeout(function () {
            servicesLeaveTimer = null;
            if (!servicesItem.matches(":hover")) {
              servicesDropdown.classList.remove("is-open");
              servicesToggle.setAttribute("aria-expanded", "false");
            }
          }, 100);
        });
        servicesToggle.addEventListener("click", cancelServicesLeave);
      }
    }
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


  /* ---- 10. Careers page link, in existing Company footer navigation ----
     Adding it here avoids rewriting every HTML page in the repository. */
  function initCareersFooterLink() {
    $all('.site-footer .footer-col').forEach(function (column) {
      var heading = column.querySelector('h2');
      if (!heading || heading.textContent.trim().toLowerCase() !== 'company') return;
      var list = column.querySelector('ul');
      if (!list || list.querySelector('a[href$="careers.html"]')) return;
      var teamLink = list.querySelector('a[href$="team.html"]');
      var path = teamLink ? teamLink.getAttribute('href').replace(/team\.html$/, 'careers.html') : 'careers.html';
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = path;
      link.textContent = 'Careers';
      item.appendChild(link);
      if (teamLink && teamLink.parentElement && teamLink.parentElement.parentElement === list) {
        teamLink.parentElement.insertAdjacentElement('afterend', item);
      } else {
        list.appendChild(item);
      }
    });
  }

  function init() { applyConfig(); initHeader(); initAboutMenu(); initCapacityInsightsMenus(); initNav(); initMapLayers(); initReveal(); initSubnav(); initFilters(); initContactForm(); initCopy(); initCareersFooterLink(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
