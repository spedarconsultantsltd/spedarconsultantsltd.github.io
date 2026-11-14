/* ==========================================================================
   SPEDAR Consultants — central site configuration
   Original contact details and links preserved. New enhancement assets load
   on existing HTML pages without rebuilding the site's design or navigation.
   ========================================================================== */
window.SPEDAR_CONFIG = {
  brandName: "SPEDAR Consultants",
  tagline: "Mapping the Path to a Sustainable Tomorrow",
  location: "Bangladesh",

  email: "info@spedar.com",
  phone: "+8801749626470",
  phoneDisplay: "+880 1749 626470",

  social: {
    facebook: "https://www.facebook.com/spedarconsultantsltd",
    linkedin: "https://www.linkedin.com/company/spedar-consultants-ltd/"
  },

  contactForm: {
    mode: "mailto",
    formEndpoint: "",
    subjectPrefix: "Project enquiry"
  }
};

// Load brand-preserving improvements from the site root, including article pages
// nested under /insights/. Original main.js and existing page markup stay untouched.
(function () {
  var root = new URL('../../', document.currentScript.src).href;
  function style(file) {
    if (document.querySelector('link[href$="/' + file + '"]')) return;
    var link = document.createElement('link'); link.rel = 'stylesheet';
    link.href = root + 'assets/css/' + file; document.head.appendChild(link);
  }
  style('spedar-enrich.css'); style('spedar-pro.css');
  if (!document.querySelector('script[src$="/spedar-enrich.js"]')) {
    var enrich = document.createElement('script');
    enrich.src = root + 'assets/js/spedar-enrich.js'; document.head.appendChild(enrich);
  }
  if (!document.querySelector('script[src$="/spedar-pro.js"]')) {
    var data = document.createElement('script'); data.src = root + 'assets/js/spedar-data.js';
    data.onload = function () {
      if (document.querySelector('script[src$="/spedar-pro.js"]')) return;
      var pro = document.createElement('script');
      pro.src = root + 'assets/js/spedar-pro.js'; document.head.appendChild(pro);
    };
    document.head.appendChild(data);
  }
})();
