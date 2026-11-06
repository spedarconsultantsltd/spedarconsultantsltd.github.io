# Content guide

How to keep the SPEDAR website accurate and up to date. All pages are plain HTML files: open them in any text editor (VS Code is free and recommended) or edit directly on GitHub.

> **Shared header and footer.** Each page contains its own copy of the header (top menu) and footer. If you change a menu item or footer link, use *Find → Replace in Files* to change it in every `.html` file, including the files in `insights/`.

---

## 1. Items that need confirmation or completion

These are deliberately left as placeholders or written cautiously. Please review before or soon after launch.

| Item | Where | What to do |
|---|---|---|
| Website address | All `.html` files, `sitemap.xml`, `robots.txt` | Replace `https://YOUR-GITHUB-USERNAME.github.io/spedar-website/` with the real URL (see README). |
| Forest fragmentation research | `index.html` (Featured research), `work.html` (`#forest-connectivity`) | Confirm wording of the collaboration with the Institute of Forestry and Environmental Sciences, University of Chittagong, and the status ("Ongoing"). Add findings only when completed and approved by the research team. Consider adding a link to the public announcement. |
| Team photographs | `assets/images/team/` | Currently initials on a neutral pattern. Replace with real, consented headshots (see section 4). |
| Team biographies | `team.html`, `about.html` | Written from the CVs supplied. Ask each member to confirm their text, especially current employers and degree status (several degrees are "ongoing" or "result awaited"). |
| Team publications list | `work.html` | Authors and venues taken from CVs. Some conference papers have no DOI and years differed between CVs; verify before relying on them. |
| Insight article dates and author line | `insights/*.html`, `insights.html`, home page | Dates are set to October–November 2026 and the author is "SPEDAR Consultants". Change if you prefer named authors. |
| Matarbari port article | `insights/sustainable-port-development-regional-connectivity.html` | Project status changes over time. Re-check figures before promoting the article. |
| Legal name | Whole site | The site uses "SPEDAR Consultants" and makes no claim of registration. After formal registration you may add the registered name and number to the footer. |
| Office address | `contact.html`, footer | Only "Bangladesh" is shown. Add a business address once one exists. |

---

## 2. Company information and contact details

**Central settings:** `assets/js/site-config.js` holds the email, phone, social links and contact-form mode. Values there override the matching links on every page (any element marked `data-config="email"`, `data-config="phone"`, `data-config="linkedin"`, `data-config="facebook"`).

The HTML also contains the same values as a fallback (for visitors with JavaScript disabled and for search engines). When you change a contact detail, change it in `site-config.js` **and** use Find/Replace for the old value across the `.html` files.

- Tagline, mission and vision: `about.html` (Mission and vision section) and the footer of each page.
- Home-page headline and introduction: `index.html`.

---

## 3. Theme colours, fonts and logo

**Colours** are defined once at the top of `assets/css/style.css` under *2. Design tokens*:

```css
--forest: #103F39;   /* primary dark green */
--teal:   #167A70;   /* accent and icons   */
--ink:    #172B32;   /* text and dark band */
--paper:  #F7F7F3;   /* page background    */
--sage:   #E5EFEA;   /* light section band */
--gold:   #C5A267;   /* highlight and focus ring */
```

Change a value and it updates everywhere. Keep text colours dark on light backgrounds for readability (`--teal-ink` and `--gold-ink` are darker variants used for small text).

**Fonts** are in `assets/fonts/` and declared at the top of `style.css` (`--serif`, `--sans`).

**Logo:** the header and footer use `assets/images/logo-mark-96.webp` (the round emblem) next to the "SPEDAR / CONSULTANTS" wordmark set in text. To update, replace `logo-mark-96.webp` and `logo-mark-192.webp` with square images of the same names. Also replace `favicon.svg`, `favicon.ico` and `assets/icons/apple-touch-icon.png`.

**Social sharing image:** `assets/images/og-image.jpg` (1200 × 630 px).

---

## 4. Team members

### Replace a placeholder with a photograph
1. Prepare a portrait photo with a **4:5 ratio** (e.g. 800 × 1000 px), saved as WebP or JPG, under ~150 KB.
2. Name it after the person's slug, e.g. `tanmoy-dev.webp`, and upload it to `assets/images/team/`.
3. In `team.html` find the person's portrait block. It contains a commented-out image tag:
   ```html
   <!-- PHOTO: <img src="assets/images/team/tanmoy-dev.webp" alt="Tanmoy Dev" ...> -->
   ```
   Remove `<!-- PHOTO:` and ` -->` so the `<img>` tag becomes active. The photo covers the initials automatically.
4. Repeat in `index.html` (Our people) and `about.html` (Leadership) where that person appears.

Only publish photos with the person's consent. Do not use AI-generated portraits for real people.

### Add a new team member
In `team.html`, find the department (`<section class="dept" id="gis">` etc.), copy one `<article class="member" ...>` block and paste it inside `<div class="dept__members">`. Then change: the `id`, the initials, name, role, biography and the Profile details. Keep biographies factual and short (2–3 sentences). Do not publish personal phone numbers, private emails, home addresses or dates of birth.

### Add a new department
Copy a whole `<section class="dept">…</section>` block, give it a new `id`, heading and description. Only list people who have actually joined; do not list vacant positions as staff.

---

## 5. Projects (Our work page)

`work.html` separates three kinds of content. Keep them separate:

1. **SPEDAR research/projects** — work SPEDAR itself is doing or has done.
2. **Research themes** — capabilities, not completed commissions.
3. **Team members' publications** — individual work, not SPEDAR projects.

### Add a completed project
In the *Research themes and capabilities* register, copy one `<details>…</details>` block and edit:

```html
<details>
  <summary><div><h3>Project title</h3><span class="meta">Project: Client name, 2027</span></div><span class="plus" aria-hidden="true"></span></summary>
  <div class="register__body">
    <div><p>Scope, approach and outcome in 2–4 sentences.</p></div>
    <div><h4>Services provided</h4><ul><li>…</li></ul></div>
  </div>
</details>
```

Place completed projects above the capability entries. You may rename the section heading to "Projects and capabilities". Only name clients with their permission. For a major project, copy the forest-research feature section instead.

---

## 6. Insight articles

### Publish a new article
1. Copy an existing article, e.g. `insights/forest-fragmentation-landscape-connectivity.html`, and rename it with a short, hyphenated name: `insights/my-new-topic.html`.
2. In the new file, update: `<title>`, `<meta name="description">`, the canonical and `og:` URLs, `article:published_time`, the `<h1>`, the date and category line, the cover image, the article text inside `<div class="prose">`, and the references.
3. Keep the "General educational insight" note if the piece summarises others' work. If it reports SPEDAR findings, replace the note with a description of the study and its status.
4. Add a card for it in `insights.html` inside `<div class="article-list">`: copy an existing `<article class="card-article" data-cats="…">` block, put it first, and update the link, image, title, date, excerpt and `data-cats`.
5. Optionally replace one of the three cards in the home page *Insights* section.
6. Add the new URL to `sitemap.xml`.

### Categories
Card `data-cats` values must match the filter buttons in `insights.html`:
`environmental-research`, `gis`, `climate`, `planning`, `sustainability`, `policy`. A card can have several, separated by spaces. To add a category, add a button with a new `data-filter` value and use that value in cards.

### Writing standards
Cite sources for facts and figures, do not invent statistics or findings, and date-check anything that may change (policies, project status).

---

## 7. Services

Each practice area on `services.html` is a `<section class="service" id="…">`. Edit the description, the *What we offer* list (`<ul class="deliverables">`) and *Typical outputs*. To add a service area, copy a whole section, give it a new `id`, add a link to it in the sub-navigation (`<nav class="subnav">`), in the *Services* dropdown in every page header, and in the footer *Practice areas* list. Sections alternate image left/right automatically.

Keep the note at the top of the services page until SPEDAR has delivered commissions across its listed services.

---

## 8. Images

- Use **WebP** (or JPG) and keep large images under ~250 KB; 1600 px wide is plenty for full-width images, 1200 px for section images.
- Most images have a small `-sm` version (700–900 px) for phones. When you replace `plate-urban.webp`, replace `plate-urban-sm.webp` too, or remove the `srcset` attribute from the `<img>` tag.
- Always write meaningful `alt` text describing the image.
- The current map graphics are **illustrations generated for this website** and are labelled "Illustrative graphic". If you replace them with real project maps or photos, update the label and caption, credit the data source (e.g. "Contains modified Copernicus Sentinel data 2025"), and make sure you have the right to publish them.

---

## 9. Contact form

The form on `contact.html` builds a pre-filled email and opens the visitor's own email app (a `mailto:` link). It works on GitHub Pages with no server.

To collect messages through a form service instead (e.g. Formspree, Basin, Getform — most have a free tier):

1. Create a form with the service and copy its endpoint URL.
2. In `assets/js/site-config.js` set:
   ```js
   contactForm: { mode: "endpoint", formEndpoint: "https://formspree.io/f/your-id", subjectPrefix: "Project enquiry" }
   ```
3. Update the explanatory text above the form button in `contact.html` (it currently says the form opens your email app) and the button label.

Do not put secret API keys in any website file: everything on GitHub Pages is public.

---

## 10. Social links

Change them in `assets/js/site-config.js` (`social.facebook`, `social.linkedin`) and Find/Replace the old URLs in the `.html` files. To add another network, copy an existing link in the footer and on `contact.html`, and add an icon symbol to `assets/icons/icons.svg`.

---

## 11. Search engines

- Each page has a unique `<title>` and `<meta name="description">`. Keep descriptions under ~160 characters.
- After the real address is set, submit `sitemap.xml` in Google Search Console.
- The site intentionally contains no structured data claiming legal registration, ratings or awards.
