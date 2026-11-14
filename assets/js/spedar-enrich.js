/* SPEDAR Consultants — small, progressive enhancements for consultancy pages. */
(function () {
  'use strict';
  var siteRoot = new URL('../../', document.currentScript.src).pathname;
  function init() {
    // Add capability statement inside an existing navigation group, not an
    // extra top-level nav item that would crowd the current header.
    var allServices = document.querySelector('#services-menu .dropdown__all');
    if (allServices && !allServices.querySelector('a[href="capabilities.html"]')) {
      var capNav = document.createElement('a');
      capNav.href = siteRoot + 'capabilities.html';
      capNav.textContent = 'Capabilities & delivery';
      capNav.style.marginLeft = '.9rem';
      allServices.appendChild(capNav);
    }

    // Shared footer link: preserve original footer design and its link list.
    var footerColumns = document.querySelectorAll('.footer-col');
    for (var f = 0; f < footerColumns.length; f++) {
      var title = footerColumns[f].querySelector('h2');
      if (title && title.textContent.trim().toLowerCase() === 'company') {
        var list = footerColumns[f].querySelector('ul');
        if (list && !list.querySelector('a[href="capabilities.html"]')) {
          var item = document.createElement('li');
          var link = document.createElement('a');
          link.href = siteRoot + 'capabilities.html';
          link.textContent = 'Capabilities & delivery';
          item.appendChild(link);
          list.appendChild(item);
        }
        break;
      }
    }

    // The homepage project-scoping explorer progressively reveals the selected
    // example. Without JS, the first example is visible and regular links work.
    var chooser = document.querySelector('[data-sp-brief]');
    if (chooser) {
      var buttons = Array.prototype.slice.call(chooser.querySelectorAll('[data-sp-topic]'));
      var results = Array.prototype.slice.call(chooser.querySelectorAll('[data-sp-result]'));
      buttons.forEach(function (button) {
        button.addEventListener('click', function () {
          var topic = button.getAttribute('data-sp-topic');
          buttons.forEach(function (b) {
            var selected = b === button;
            b.classList.toggle('is-selected', selected);
            b.setAttribute('aria-pressed', String(selected));
          });
          results.forEach(function (panel) {
            panel.hidden = panel.getAttribute('data-sp-result') !== topic;
          });
        });
      });
    }

    // On the services page provide a quick pathway to the capability statement.
    // This does not alter existing service descriptions or promised scope.
    var isServices = /(?:^|\/)services\.html$/.test(window.location.pathname);
    if (isServices && !document.querySelector('.sp-services-guide')) {
      var main = document.querySelector('main');
      var first = main && main.querySelector('.page-hero');
      if (first && first.parentNode) {
        var rail = document.createElement('aside');
        rail.className = 'sp-services-guide';
        rail.setAttribute('aria-label', 'Capabilities and project delivery');
        rail.innerHTML = '<div class="wrap sp-services-guide__inner"><div><h2>Services, outputs &amp; delivery</h2><p>Explore indicative deliverables and how we scope multidisciplinary assignments.</p></div><a class="text-link" href="capabilities.html">View our capability statement</a></div>';
        first.parentNode.insertBefore(rail, first.nextSibling);
      }
    }

    var printButton = document.querySelector('[data-sp-print]');
    if (printButton) printButton.addEventListener('click', function () { window.print(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
