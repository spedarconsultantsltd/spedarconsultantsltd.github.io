# SPEDAR Consultants — website

A static, multi-page website for SPEDAR Consultants. It is plain HTML, CSS and JavaScript, so it needs **no build step, no server, no database and no paid services**. It runs on **GitHub Pages (free)** and will also work on any custom domain later.

---

## What's in the folder

```
index.html            Home
about.html            About us
services.html         Services (six practice areas)
work.html             Our work (featured research, themes, team publications)
team.html             Our team
insights.html         Insights index (with topic filter)
insights/*.html       Five insight articles
contact.html          Contact (email-based form)
404.html              "Page not found" page
favicon.svg / .ico    Browser icons
robots.txt            Search-engine instructions
sitemap.xml           List of pages for search engines
.nojekyll             Tells GitHub Pages to publish files as-is
assets/css/style.css  All styling (colours and fonts at the top)
assets/js/site-config.js  Contact details and social links (edit here)
assets/js/main.js     Menu, map layers, filters, contact form
assets/images/        Logo, map graphics, share image, team photos folder
assets/icons/         Icon sprite and Apple touch icon
assets/fonts/         Self-hosted fonts (SIL Open Font License)
CONTENT_GUIDE.md      How to edit content, add people, projects and articles
```

---

## Deploy on GitHub Pages (step by step)

> **Important:** GitHub does **not** unzip files for you. If you upload the ZIP itself, the website will not appear. Always extract the ZIP first and upload the *contents*.

1. **Download** `SPEDAR_Consultants_Professional_Website.zip`.
2. **Extract** it on your computer. You will get a folder called `spedar-website`.
3. Sign in to GitHub and **create a new public repository** (button: *New*). A good name is `spedar-website`. Do not add a README (one is already included).
4. Open the new repository and choose **Add file → Upload files**. Open the extracted `spedar-website` folder, select **everything inside it** (`index.html`, `about.html`, the `assets` and `insights` folders, etc.) and drag it into the upload area.
   - `index.html` must be at the **top level of the repository**, not inside a sub-folder.
   - The file `.nojekyll` is hidden on some computers. If it does not upload, create it in GitHub: *Add file → Create new file*, name it `.nojekyll`, leave it empty and commit. (The site usually works without it, but it is recommended.)
5. Click **Commit changes**.
6. Go to the repository's **Settings → Pages**.
7. Under **Build and deployment → Source**, choose **Deploy from a branch**.
8. Under **Branch**, choose **`main`** and folder **`/ (root)`**.
9. Click **Save**.
10. Wait 1–5 minutes, then refresh the Pages settings page. Your site address appears at the top, for example:
    `https://YOUR-GITHUB-USERNAME.github.io/spedar-website/`

### After the first deployment: set your real web address

The page metadata (canonical links, social-sharing image, sitemap) contains a placeholder address so that search engines and social sites know the site's official URL. Replace it once you know your address:

- Find: `https://YOUR-GITHUB-USERNAME.github.io/spedar-website/`
- Replace with your real address, e.g. `https://spedar-team.github.io/spedar-website/` (keep the final `/`).

Do this in every `.html` file, in `sitemap.xml` and in `robots.txt`. Any code editor (e.g. free VS Code: *Edit → Replace in Files*) does it in one step. The site works before you do this; only search and social previews depend on it.

### Updating the website later

- **In the browser:** open a file in your repository, click the pencil icon, edit, then *Commit changes*. To replace an image, upload a file with the same name in the same folder.
- **On your computer:** edit the files, then upload changed files again via *Add file → Upload files* (same names overwrite the old ones).
- Changes go live within a few minutes. Press Ctrl+F5 (Cmd+Shift+R on Mac) to bypass your browser cache.

See **CONTENT_GUIDE.md** for detailed editing instructions.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| **404 "There isn't a GitHub Pages site here"** | Pages not enabled yet, or still building. Check *Settings → Pages* is set to `main` / `/ (root)` and wait a few minutes. Check *Actions* tab for a finished "pages build and deployment". |
| **404 on the home page but other files exist** | `index.html` is inside a sub-folder (e.g. `spedar-website/index.html`). Move the files so `index.html` is at the repository root, or select that folder in Pages settings if GitHub offers it. |
| **Page shows plain text, no styling (missing CSS)** | The `assets` folder was not uploaded, or was uploaded into the wrong place. The repository root must contain `assets/css/style.css`. |
| **Broken images** | Check the `assets/images` folder uploaded completely. File names are case-sensitive on GitHub: `Photo.webp` ≠ `photo.webp`. |
| **Links work locally but not online** | All links in this site are relative (no leading `/`). If you add new links, write `about.html` or `assets/images/x.webp`, never `/about.html`. Pages inside `insights/` use `../` to go up one level. |
| **Uploaded the ZIP and nothing happens** | GitHub does not extract ZIP files. Delete the ZIP from the repository and upload the extracted files. |
| **Changes don't appear** | Deployment takes a few minutes; then hard-refresh the browser. |
| **Contact form "does nothing"** | The form opens the visitor's email app. If a device has no email app configured, the visitor can use the email address shown on the page. See CONTENT_GUIDE.md to connect a form service instead. |

---

## Moving to a custom domain later (e.g. `www.spedar.com`)

1. In *Settings → Pages → Custom domain*, enter the domain and save. GitHub creates a `CNAME` file.
2. At your domain registrar, add the DNS records GitHub lists in its documentation ("Managing a custom domain for your GitHub Pages site"): a `CNAME` record for `www` pointing to `YOUR-GITHUB-USERNAME.github.io`, and/or the `A` records for the apex domain.
3. Tick **Enforce HTTPS** once it becomes available.
4. Replace the placeholder address (see above) with `https://www.spedar.com/` in all `.html` files, `sitemap.xml` and `robots.txt`.

No other changes are needed: because every link is relative, the same files work at `username.github.io/repo/` and at a custom domain. The 404 page detects the hosting path automatically.

---

## Technical notes

- **Stack:** HTML5, CSS3 (custom properties, grid), vanilla JavaScript. No frameworks, libraries, trackers or external requests.
- **Fonts:** Source Serif 4 and IBM Plex Sans, self-hosted (SIL Open Font License, licences in `assets/fonts/`).
- **Images:** WebP. All map-style images are original, procedurally generated illustrations and are labelled as such on the site. They are not satellite images or SPEDAR project data.
- **Accessibility:** semantic landmarks, skip link, keyboard-operable menu and dropdown, visible focus states, labelled form fields with error messages, `prefers-reduced-motion` respected.
- **Tested:** in headless Chromium at 1440, 820 and 390 px widths, served from a `/spedar-website/` sub-path to mimic GitHub Pages: no console errors, no failed requests, no broken internal links, no horizontal overflow. Manual checks on real iPhone/Android devices and Safari/Firefox are still recommended after deployment.
