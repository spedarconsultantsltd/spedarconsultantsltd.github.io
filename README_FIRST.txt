SPEDAR CONSULTANTS — CONSULTANCY WEBSITE ENHANCEMENT UPDATE
Date: 14 November 2026
Deployment: GitHub Pages | Main branch | Root

THIS IS AN UPDATE PACKAGE, NOT A NEW WEBSITE.
Do NOT delete existing repository files. The original theme, fonts, map graphics,
people photos, existing articles, and main.js must remain in place.

WEBSITE FILES TO UPLOAD (7 TOTAL; README_FIRST.txt is instructions only):
- index.html                         (REPLACE)
- capabilities.html                  (NEW)
- robots.txt                         (REPLACE)
- sitemap.xml                        (REPLACE)
- assets/js/site-config.js           (REPLACE)
- assets/js/spedar-enrich.js         (NEW)
- assets/css/spedar-enrich.css       (NEW)

INSTALLATION:
1. Extract the ZIP on your computer.
2. Open https://github.com/spedarconsultantsltd/spedarconsultantsltd.github.io
3. Code -> Add file -> Upload files.
4. Upload the ROOT files into the repository root, preserving filenames.
5. Upload the .js files into assets/js/ and .css into assets/css/.
6. Commit changes to the main branch (do not upload the ZIP itself).
7. Wait for the existing Pages workflow to succeed, then hard-refresh the site.

IMPORTANT: Correct folder paths are critical. Keep the existing files not listed
above; do not overwrite assets/css/style.css or assets/js/main.js.

WHAT IS NEW:
- Home: sector applications grid, interactive project-scope explorer and practical
  deliverables/quality section.
- New /capabilities.html: service overview, outputs, five-step project delivery,
  quality commitments, print/save option.
- Existing navigation: "Capabilities & delivery" appended inside the Services
  dropdown and footer's Company links; existing labels and menu structure preserved.
- Services page: discreet link to the capability statement via progressive JS.
- SEO: fixes homepage placeholder canonical/Open Graph URLs; fixes robots.txt and
  sitemap.xml to the actual live website and adds new page to sitemap.

PRESERVED:
- Existing identity / colours / fonts / overall design, hero map imagery,
  True colour / NDVI / Land cover controls and 4.5-second automatic changes.
- Other pages' existing content, member profiles, research, assets, contact details.
- No invented clients, awards, certifications, completed projects or statistics.

VERIFICATION AFTER UPLOAD:
[ ] Homepage map still auto-switches every 4.5 seconds and manual buttons work.
[ ] New sector section appears after Our expertise.
[ ] The five options under "Not sure which service fits your project?" switch content.
[ ] /capabilities.html works on desktop and mobile.
[ ] Services dropdown + footer contain Capabilities & delivery.
[ ] Services page has a small capability statement link.
[ ] All existing page links and team images still work.

TECHNICAL NOTE:
The older secondary pages' original HTML head metadata has not been changed by
this package. Only the homepage and new capabilities page have fully corrected
canonical and OG tags. See below for future optional metadata cleanup.

REFERENCE IDEAS (not copied content/design):
SCPL: distinct working areas | EQMS: sectors and multidisciplinary capabilities
CEGIS: evidence, QA and publications | PLANCON: service outputs and planning
O.CREEDS: team-led expertise | AHYDTECH: client-facing process clarity
DevCon: sector-led positioning and delivery disciplines.
