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

// Load small editorial improvements on every existing page. The site's
// existing main.js remains untouched (including automatic map rotation).
(function () {
  var cssHref = 'assets/css/spedar-enrich.css';
  if (!document.querySelector('link[href="' + cssHref + '"]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = cssHref;
    document.head.appendChild(css);
  }
  var script = document.createElement('script');
  script.src = 'assets/js/spedar-enrich.js';
  script.defer = true;
  document.head.appendChild(script);
})();
