/* ==========================================================================
   SPEDAR Consultants — central site configuration
   Edit the values below to update contact details and social links across
   every page. Pages also contain these values as plain HTML fallbacks, so the
   site still works if JavaScript is disabled; this file overrides them.
   ========================================================================== */
window.SPEDAR_CONFIG = {
  brandName: "SPEDAR Consultants",
  tagline: "Mapping the Path to a Sustainable Tomorrow",
  location: "Bangladesh",

  email: "info@spedar.com",
  phone: "+8801749626470",          // used in tel: links (no spaces)
  phoneDisplay: "+880 1749 626470", // shown on screen

  social: {
    facebook: "https://www.facebook.com/spedarconsultantsltd",
    linkedin: "https://www.linkedin.com/company/spedar-consultants-ltd/"
  },

  /* Contact form
     mode "mailto" (default): the form opens the visitor's email app with a
     pre-filled message. No server or paid service is needed.
     mode "endpoint": set formEndpoint to a form-backend URL (e.g. a Formspree
     or Basin form URL) to post submissions there instead. Leave "" for mailto. */
  contactForm: {
    mode: "mailto",
    formEndpoint: "",
    subjectPrefix: "Project enquiry"
  }
};
