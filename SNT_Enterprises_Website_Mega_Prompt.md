# SNT ENTERPRISES — 5 PAGE WEBSITE: ANALYSIS + MEGA PROMPT (HTML / CSS / JS / Bootstrap / jQuery)

Pehle MASTER BRIEF agent ko do, phir ek-ek phase. Har phase ke baad review, phir agla.
Is file ke end me **Appendix A** me client ka final content hai. Agent ko ye file aur Appendix A ka text (`content.txt` bana ke) dono attach karo.

---

## 0. ANALYSIS (apne liye, agent ko dene ki zarurat nahi)

**Business ka nature:** Mumbai ki B2B industrial scrap trading aur material sourcing company. Aluminium, copper/brass, stainless steel, electrical aur ferrous scrap. Customers foundries, recyclers, metal processors aur manufacturers hain. Railway aur government e-auction se procurement hota hai.

**Website ka type:** B2B industrial catalogue + trust website. Yaha buyer ko 3 cheezein dekhni hain: **kya milta hai** (products), **kaise milta hai** (services, auction sourcing, grading) aur **bharosa** (transparent dealing, bulk capability). Isliye site ka feel "ledger / spec-sheet / material catalogue" wala hoga. Isme heavy marketing, startup style animation ya consumer-brand look nahi chalega.

**Color theme (metal se inspired, sab flat, gradient nahi):**
- Graphite `#1A1D21` aur Steel `#2B3036`: primary dark (heavy industry feel)
- Copper `#B1502A`: accent. Copper khud inka product hai, isliye ye natural brand color ban jata hai.
- Aluminium Light `#E8EAED` aur White: backgrounds
- Pichli website (navy/blue) se alag, taaki dono clients ki sites me overlap na ho.

**Typography:** Barlow Condensed (headings, industrial look), IBM Plex Sans (body), IBM Plex Mono (A–F, 01–06 jaise catalogue codes).

**Logo nahi hai:** Abhi text wordmark banega: copper square me "SNT" + "ENTERPRISES". Baad me real logo aaye to ek jagah swap hoga.

**Content me gaps (client se leni hain):**
1. Mobile number, email, contact person, GST: sab `[To be added]` hain. Prompt me inhe config file se control kiya hai. Jab tak data nahi aata, page par kuch dikhega hi nahi, "[To be added]" kabhi live nahi jayega.
2. Customer company names nahi hain. Isliye client logos ya testimonial section nahi banega. Content ki line "Specific customer company names can be added after confirmation" site par show nahi hogi, wo internal note hai.
3. Koi image nahi aayi. Content me 6 recommended images ki list hai. Real photos scrap trading me trust ke liye bahut important hain.
4. Content me **years of experience nahi likha**. Isliye "20+ years" jaisa koi stat ya counter nahi banega.
5. Address (street level) nahi hai, sirf "Mumbai, Maharashtra, India".

**Meri assumptions (approve kar lena):**
- Pages: Home, About Us, Services, Products, Contact Us.
- Heading "Industries & Customer Segments Served / Targeted" me se "/ Targeted" hata ke "Industries & Customer Segments Served" rakha hai. "Targeted" internal word lagta hai.
- Content me CTA aur form fields nahi diye. Isliye minimal microcopy allow ki hai (Master Brief me list hai).
- SEO titles aur descriptions maine content ke words se hi bana di hain.

---

# MASTER BRIEF (sabse pehle yeh paste karo)

```
MASTER BRIEF — SNT ENTERPRISES WEBSITE (read fully before any phase)

PROJECT
Build a professional 5-page corporate website for "SNT Enterprises", a Mumbai-based industrial scrap trading and material sourcing company (ferrous, non-ferrous, electrical scrap and industrial surplus; sourced through government, railway and private e-auctions). Audience: foundries, recyclers, metal processors, manufacturers and industrial buyers (B2B). The site must feel like an established industrial trading firm: sober, precise, trustworthy, catalogue-like. NOT a SaaS template, NOT AI-generated looking, NOT consumer/startup style.

CONTENT SOURCE
Appendix A of this document (also supplied as content.txt) is the FINAL CONTENT. No logo file and no company-profile design exist for this client. Images are not supplied yet (see IMAGES section).

PAGES (static multi-page site)
index.html (Home), about.html (About Us), services.html (Services), products.html (Products), contact.html (Contact Us)

TECH STACK (strict)
- HTML5 semantic markup.
- CSS3 + Bootstrap 5.3 (CDN) for grid, utilities, offcanvas, collapse, scrollspy, form controls. Heavily customised in /assets/css/style.css. The site must NOT look like default Bootstrap.
- Vanilla JS + jQuery 3.7 (CDN) for DOM, hover image swap, form validation, AJAX submit.
- Bootstrap Icons (CDN), used sparingly.
- GSAP 3.12 + ScrollTrigger (CDN) and Lenis (CDN) for scroll animation and smooth scroll. Use with restraint.
- Google Fonts: Barlow Condensed (600, 700) for headings; IBM Plex Sans (400, 500, 600) for body; IBM Plex Mono (500) for catalogue codes only.
- NO Node build step, NO frameworks, NO Tailwind. Must run by uploading the folder to cPanel/static hosting.
- Pin every CDN URL to an exact version (no @latest), choose versions at least 2 weeks old.

FOLDER STRUCTURE
/index.html /about.html /services.html /products.html /contact.html /404.html
/assets/css/style.css
/assets/js/site-config.js   (client data: phone, email, etc. see CONFIG)
/assets/js/main.js          (Lenis, GSAP, navbar, reveals, hover-swap, scroll-synced image)
/assets/js/contact.js       (form only)
/assets/images/             (placeholders now; real photos later)
/contact-handler.php  /config.php
/docs/README.md  /docs/IMAGES.md  /docs/CLIENT-TODO.md
Header and footer are written out in every HTML file (do NOT load them via jQuery .load()). Keep them identical across pages.

ABSOLUTE CONTENT RULES
- Use the wording of Appendix A EXACTLY. Do not rewrite, shorten, rephrase, "improve", add or remove a word. Keep spelling (e.g. "Aluminium") and punctuation as-is. Product names and service names are used exactly as listed.
- Do NOT invent: years of experience, stats, numbers, counters, testimonials, client names or logos, certifications, licences, "authorised"/"registered" claims, prices, tonnage, team names, process steps, blog, or extra sections.
- INTERNAL NOTES that must NEVER appear on the site: "[To be added]", "[Name to be confirmed]", "[To be added, if required]", "Specific customer company names can be added after confirmation.", "Existing company logo to be provided separately.", "Recommended images for the company profile:", "(Describe in Brief)", "Client List:", and the words "Targeted" in the industries heading. Also never show field labels whose value is still pending.
- Allowed UI microcopy (only this): 
  * nav labels: Home, About Us, Services, Products, Contact Us
  * section headings: About SNT Enterprises, Our Services, Our Products, Industries & Customer Segments Served, Why Choose SNT Enterprises?, Our Mission, Our Vision, Contact Details, Send an Enquiry
  * buttons/links: Our Products, Our Services, Contact Us, View Products, Send Enquiry, Call Us, Email Us
  * form labels: Full Name, Company Name, Phone Number, Email Address, Material Category, Location, Message
  * contact labels that exist in the content: Company Name, Business Type, Location, Contact Person, Mobile Number, Email Address, GST Number
  * footer: "© [current year] SNT Enterprises"
  * aria-labels, alt text
- Meta title/description per page are provided in the SEO section of Phase 8; they go into <title> and <meta description> only.

CONFIG (pending client data)
/assets/js/site-config.js exports window.SITE = { contactPerson:"", phone:"", phoneDisplay:"", email:"", gst:"", address:"" }.
Every place that shows one of these values is an element with data-config="phone" (etc.) that is `hidden` by default; main.js fills it (and sets tel:/mailto: hrefs) and un-hides it only when the value is non-empty. Rules while empty:
  * Header phone button is replaced by a "Contact Us" button linking contact.html.
  * Floating mobile call button is not rendered.
  * Contact page and footer show only Company Name, Business Type, Location.
  * "Call Us"/"Email Us" buttons are hidden.
  * JSON-LD omits phone/email/address/taxID.
Document in /docs/CLIENT-TODO.md exactly what to fill and where.

BRAND / LOGO (no logo file exists)
Create a temporary TEXT WORDMARK as an HTML/CSS component (.brand): a square copper block containing "SNT" in Barlow Condensed 700 white, followed by "ENTERPRISES" in Barlow Condensed 600, letter-spacing .18em, white on dark backgrounds / graphite on light. Flat, no gradient, no 3D, no icon. Also produce /assets/images/favicon.svg (copper square, white "SNT") and favicon PNGs, and a flat 1200x630 og-image (graphite background, wordmark). Keep the wordmark in one reusable snippet so a real logo file can replace it later in one place (documented in README).

DESIGN SYSTEM  (concept: "industrial ledger / material spec-sheet")
Colours (flat only), define as CSS variables and override Bootstrap's --bs-primary etc.:
  --graphite:#1A1D21   --steel:#2B3036   --ink:#101214 (footer)
  --copper:#B1502A     --copper-dark:#8F3F20 (hover)   --copper-light:#E39A74 (small text on dark)
  --alu:#E8EAED  --white:#FFFFFF  --line:#D4D7DB  --line-dark:#3A4047  --muted:#5E656D
Contrast rules: copper on graphite is only for large text, numerals, rules, markers (not small text); small accent text on dark uses --copper-light. White on --copper must pass AA for button text (verify; darken if needed).
Rules:
- NO gradients anywhere (backgrounds, buttons, text, borders, overlays, images). Image overlays are flat rgba(26,29,33,.6).
- NO glassmorphism, glow, neon, sparkle/stars/magic icons (no bi-stars, bi-magic, bi-lightning), NO emoji, NO blob/abstract shapes, NO big floating-shadow cards. Shadows: none.
- Radius 0. Hairline 1px dividers. Square buttons and form fields.
- Typography: headings Barlow Condensed 600/700, uppercase via CSS on H1/H2 only (do not change the underlying text), tight line-height 1.05–1.15, tracking .01em. Body IBM Plex Sans 17px / 1.65, max ~68ch. Mono only for codes: A–F category letters, 01–06 numbering.
- Container max 1280px. Generous whitespace. 12-col grid.
- Icons: Bootstrap Icons only for telephone, envelope, geo-alt, arrow-right, arrow-up-right, list, x-lg, chevron-down. Item markers in lists are small CSS squares (8px copper), not icons.
- LAYOUT VARIETY IS MANDATORY. Do NOT build pages as grids of identical cards. Use: full-bleed dark hero with spec strip, ledger tables (numbered rows), hover-swap image index, scroll-synced sticky image, sticky category tab bar, two-tone panels, catalogue spec rows. Zero card grids on the whole site.
- Buttons: Primary = solid copper, white text, hover copper-dark. Secondary = 1px outline (graphite on light, white on dark). Min 44px height.
- Motion (GSAP + ScrollTrigger + Lenis): restrained.
    * Reveal: opacity 0→1, y 24→0, .7s power2.out, trigger "top 85%", once. Single generic function via data-reveal / data-reveal-stagger.
    * Copper rules draw (scaleX 0→1) via data-line.
    * Images: flat clip-path wipe (inset(0 0 100% 0) → inset(0)) once.
    * NO parallax, NO typewriter, NO counters, NO pinned scroll-jacking, NO cursor effects.
    * prefers-reduced-motion: no Lenis, no GSAP, everything visible. Content must remain visible if JS fails (hidden state only when <html class="js">).

IMAGES (none supplied yet)
Client's recommended image list (Appendix A) = 6 images. Create named slots now and make swapping trivial:
  aluminium.jpg (extrusion, casting, sheet scrap)   copper.jpg (wire and winding scrap)
  stainless.jpg (stainless steel scrap)             electrical.jpg (motors and electrical scrap)
  bulk-loading.jpg (bulk stock and loading)         sorting.jpg (sorting and segregation)
Until real photos arrive, each slot renders a flat graphite/steel block with a thin copper corner mark and a small mono label naming the intended photo (e.g. "PHOTO: Copper wire and winding scrap"), with the correct aspect ratio so layout is final. Each slot is a <picture> (webp + jpg) with width/height, alt text describing the material, loading="lazy" except hero. Never use stock photos that misrepresent the material, never use fake logos. Maintain /docs/IMAGES.md with the shot list and which slot is still a placeholder.

PHASE PROTOCOL
Work strictly phase by phase. At the end of each phase: list what was built, list assumptions, STOP for review. Do not start the next phase until told.
```

---

# PHASE 1 — FOUNDATION

```
PHASE 1 — FOUNDATION

1. Create the folder structure from the Master Brief with 5 valid HTML shells + 404.html: doctype, lang="en-IN", viewport, <title> and meta description (use the SEO table from Phase 8), favicon links, pinned CDN links (Bootstrap CSS, Bootstrap Icons CSS, Google Fonts with display=swap + preconnect), style.css; scripts with defer at end of body in order: jQuery, Bootstrap bundle, GSAP, ScrollTrigger, Lenis, site-config.js, main.js. Add <html class="no-js"> switched to "js" by an inline script in <head>.
2. style.css:
   - :root variables (colours, fonts, spacing scale on 8px base, container 1280px).
   - Override Bootstrap vars: --bs-primary (copper), --bs-body-font-family, --bs-body-color (graphite), --bs-border-radius:0, link colours, form-control focus (1px graphite border, no glow).
   - Base type (h1–h4 Barlow Condensed, body IBM Plex Sans, .mono for IBM Plex Mono).
   - Utilities: .section (96px desktop / 64px mobile) with .section--white/.section--alu/.section--graphite/.section--steel; .eyebrow (mono, small, tracked, copper-light on dark / copper on light); .rule (1px line) and .rule--copper (3px, 56px wide); .btn-snt, .btn-snt-outline, .btn-snt-outline-light; .link-arrow; .marker-list (ruled list with 8px copper square markers); .ledger (table-like rows with mono number column); .img-slot (placeholder + final image styles, aspect-ratio helpers 4/3, 3/4, 16/9).
   - Focus-visible ring (2px copper-light on dark, 2px copper on light), skip-to-content link.
3. Build the .brand wordmark component and the favicon/og assets (see Master Brief).
4. site-config.js (empty values) and the data-config fill logic in main.js.
5. main.js core: Lenis + GSAP ScrollTrigger integration (lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0)); reduced-motion guard; generic reveal / stagger / line-draw / image-wipe functions; Lenis-aware hash links with header offset; stop Lenis while offcanvas is open.
6. /styleguide.html (noindex, unlinked): swatches, type scale, buttons, eyebrow, ledger row, marker list, img-slot variants, wordmark on dark and light.
7. /docs/README.md stub with rules: "No gradients. No sparkle icons. No card grids. Text from Appendix A only. Never show pending/[To be added] data."

Deliver: shell + styleguide. STOP.
```

---

# PHASE 2 — GLOBAL LAYOUT

```
PHASE 2 — GLOBAL LAYOUT

HEADER (identical on all pages)
- Graphite (#1A1D21) bar, 1px --line-dark bottom border. Left: .brand wordmark (links to index.html). Right: 5 nav links (light grey text, white on hover; active page = 2px copper underline, aria-current="page"). Far right: if SITE.phone exists → solid copper "Call Us" button with bi-telephone (tel:); else solid copper "Contact Us" button → contact.html.
- Sticky: height shrinks (e.g. 84px → 64px) after 60px scroll, 200ms transition, no shadow.
- Mobile (<992px): hamburger (bi-list) opens full-width Bootstrap OFFCANVAS in graphite: large Barlow Condensed uppercase links (30px) with hairline dividers, the Contact Us button at the bottom, plus phone/email only if present. bi-x-lg to close; Lenis stopped while open.

FOOTER (identical on all pages)
- Ink (#101214) background. Top: large .brand wordmark + "Industrial Scrap Trading & Supply" + "Mumbai, Maharashtra, India" (from content). Middle: 5 page links in one column; a second column listing the 6 product category names (links to products.html#anchors). Third column: Contact Details block showing ONLY non-empty values (phone, email, contact person, GST, address) via data-config; if all empty show only Company Name / Business Type / Location.
- Bottom strip: 1px top line, "© [current year] SNT Enterprises".

UTILITIES
- Floating call button (mobile only, bottom-right, 52px square, copper, bi-telephone) rendered only when SITE.phone exists.
- Reusable PageHero (compact): graphite background, eyebrow (mono), H1, optional one-line intro, thin copper rule at bottom. Reusable CTA band: steel background, Barlow Condensed H2, one copper button + one outline-light button.
- 404.html in same style (use only "Home" link microcopy; ask me for 404 wording if needed).

Deliver: header/footer working on all pages, tested 360 / 768 / 1280. STOP.
```

---

# PHASE 3 — HOME (index.html)

```
PHASE 3 — HOME

Use Appendix A wording exactly. No card grids.

1. HERO (graphite, min-height 90vh): left 7 cols: eyebrow (mono) "Industrial Scrap Trading & Supply"; H1 "SNT ENTERPRISES" (Barlow Condensed 700, very large, uppercase via CSS); first Company Brief paragraph ("SNT Enterprises is a Mumbai-based industrial scrap trading and material sourcing company specializing in the procurement, trading, and supply of ferrous metals, non-ferrous metals, electrical scrap, and industrial surplus materials."); buttons "Our Products" (copper) and "Contact Us" (outline-light). Right 5 cols: tall bulk-loading image slot bleeding to the right viewport edge, thin 1px copper vertical rule beside it, image-wipe on load. At the hero bottom, a SPEC STRIP: two cells separated by a 1px vertical line: "Business Type — Industrial Scrap Trading & Supply" and "Location — Mumbai, Maharashtra, India" (mono labels, content values).
2. ABOUT SNT ENTERPRISES (white): heading + the remaining three Company Brief paragraphs ("We source materials through…", "Our business focuses on…", "We are committed to…"). Layout: heading and copper rule left (4 cols), paragraphs right (8 cols), first of them in larger lead size. A text link "About Us" is NOT allowed; use link-arrow labelled "Contact Us"? No — keep this section without button.
3. OUR SERVICES (steel): full-width LEDGER table: columns [mono No. 01–06 | service name in Barlow Condensed 32px | arrow-up-right]. Service NAMES only (no descriptions here), 1px --line-dark rows, row hover = background graphite and copper number. Each row links to services.html#scrap-trading, #auction-procurement, #bulk-supply, #electrical-mechanical, #surplus-procurement, #grading. Staggered reveal; rules draw.
4. OUR PRODUCTS (white): HOVER-SWAP INDEX. Left 6 cols: 6 rows with mono letters A–F and category names (Aluminium Scrap, Copper & Brass Scrap, Stainless Steel Scrap, Electrical & Mechanical Scrap, Ferrous Metal Scrap, Other Industrial Scrap), hairlines, arrow at row end, each linking to products.html#aluminium, #copper-brass, #stainless, #electrical, #ferrous, #other. Right 6 cols: one large sticky image slot that cross-fades (200ms) to the related image on row hover/focus (jQuery). Mapping: A aluminium, B copper, C stainless, D electrical, E bulk-loading, F sorting. Touch/mobile: rows only, each with a small thumbnail slot instead of swap. Button below: "View Products" (primary).
5. WHY CHOOSE SNT ENTERPRISES? (graphite): left sticky heading; right the 7 points as stacked rows (mono number 01–07 in copper-light, text in 22px IBM Plex Sans 500, hairline between). Text exactly from content.
6. CTA band: H2 "SNT ENTERPRISES", line "Industrial Scrap Trading & Supply", buttons "Contact Us" + "Our Services".

Deliver: responsive Home, screenshots 1440 / 1024 / 768 / 390. STOP.
```

---

# PHASE 4 — ABOUT US (about.html)

```
PHASE 4 — ABOUT US

1. PAGE HERO (compact): eyebrow "SNT Enterprises", H1 "About SNT Enterprises", spec strip with Business Type and Location (content values).
2. COMPANY BRIEF (white): 7/5 split. Left: all four Company Brief paragraphs verbatim, first one as lead. Right: tall bulk-loading image slot with a 1px copper offset frame (flat).
3. OUR MISSION and OUR VISION (two-tone panels side by side on desktop, stacked on mobile; full-bleed edges): Mission on steel with white text, Vision on copper with white text (check AA). Each has a mono label, H2 ("Our Mission", "Our Vision"), and the exact paragraph in 24px. No icons.
4. INDUSTRIES & CUSTOMER SEGMENTS SERVED (alu background): heading left (sticky), the 7 segments right as a ruled marker-list in 1 column (large 24px rows, copper square markers, hairlines). Do NOT show the sentence "Specific customer company names can be added after confirmation." No client logos or fake names.
5. CTA band: "Contact Us".

Deliver: responsive About page. STOP.
```

---

# PHASE 5 — SERVICES (services.html)

```
PHASE 5 — SERVICES

1. PAGE HERO (compact): eyebrow "SNT Enterprises", H1 "Our Services" (use the heading "Our Services"), no extra intro text (content has none).
2. SCROLL-SYNCED SERVICE SECTIONS (desktop ≥ 992px): two columns. LEFT col (5/12): a CSS position:sticky image panel (below header) that shows the image for the active service and cross-fades via ScrollTrigger onEnter/onEnterBack (flat, 250ms). Also a large mono numeral of the active service on it. RIGHT col (7/12): six tall text sections, each with id: #scrap-trading (01 Industrial Scrap Trading), #auction-procurement (02 Government & Private Auction Procurement), #bulk-supply (03 Bulk Metal Scrap Supply), #electrical-mechanical (04 Electrical & Mechanical Scrap Trading), #surplus-procurement (05 Industrial Surplus Material Procurement), #grading (06 Scrap Segregation & Material Grading). Each = mono number + H2 service name + exact description paragraph, min-height ~70vh, separated by 1px rules, scroll-margin-top = header height.
   Image mapping: 01 bulk-loading, 02 bulk-loading, 03 aluminium, 04 electrical, 05 bulk-loading, 06 sorting (placeholders until real photos).
   Mobile: no sticky panel; each section shows its own image slot above the text.
3. CTA band: "Contact Us".

Deliver: responsive Services page; verify deep links from Home land correctly under the sticky header and the image swap follows scroll. STOP.
```

---

# PHASE 6 — PRODUCTS (products.html)

```
PHASE 6 — PRODUCTS

1. PAGE HERO (compact): eyebrow "SNT Enterprises", H1 "Our Products".
2. STICKY CATEGORY BAR directly under the header: six tabs "A  Aluminium Scrap | B  Copper & Brass Scrap | C  Stainless Steel Scrap | D  Electrical & Mechanical Scrap | E  Ferrous Metal Scrap | F  Other Industrial Scrap" (mono letter + name), Bootstrap ScrollSpy active state (copper bottom border), horizontally scrollable on mobile.
3. SIX CATALOGUE SECTIONS with ids #aluminium, #copper-brass, #stainless, #electrical, #ferrous, #other. Alternate white / alu backgrounds. Each section, desktop 12-col:
   - LEFT (4 cols): giant mono letter (A–F) in --line colour, category name as H2, then the category image slot (A aluminium, B copper, C stainless, D electrical, E bulk-loading, F sorting) at 4:3.
   - RIGHT (8 cols): the exact item list as a SPEC LIST: 2 columns on desktop, each row = copper square marker + item name, 1px hairline between rows, generous row height (56px). Items exactly as in Appendix A, in the same order.
   Rows reveal with stagger; no hover effects except subtle text colour change.
4. CTA band: "Contact Us".

Deliver: responsive Products page; verify ScrollSpy and anchor links from Home/footer. STOP.
```

---

# PHASE 7 — CONTACT US + FORM (contact.html)

```
PHASE 7 — CONTACT US

1. PAGE HERO (compact): eyebrow "SNT Enterprises", H1 "Contact Us".
2. TWO-COLUMN BODY (col-lg-5 / col-lg-7):
   LEFT — graphite panel "Contact Details": definition-list ledger rows (label in mono small, value in 20px): Company Name — SNT Enterprises; Business Type — Industrial Scrap Trading & Supply; Location — Mumbai, Maharashtra, India. Then Contact Person, Mobile Number (tel:), Email Address (mailto:), GST Number — each rendered ONLY if the value exists in SITE config (data-config, hidden by default). Never show "[To be added]".
   RIGHT — white panel with a 4px copper top border: H2 "Send an Enquiry", then the form (Bootstrap controls restyled square, 1px --line border, focus 1px graphite, no glow). Fields in order: Full Name, Company Name, Phone Number, Email Address, Material Category (select with the six category names: Aluminium Scrap, Copper & Brass Scrap, Stainless Steel Scrap, Electrical & Mechanical Scrap, Ferrous Metal Scrap, Other Industrial Scrap), Location, Message (textarea). Primary button "Send Enquiry". Under it, "Call Us" (tel:) and "Email Us" (mailto:) buttons, rendered only if config values exist.
3. FORM LOGIC (contact.js, jQuery): required = Full Name, Phone Number, Material Category, Message; Indian 10-digit mobile (allow +91); email format if filled; inline error text under fields (#B42318), aria-invalid + aria-describedby; honeypot + minimum fill-time check; $.ajax POST to contact-handler.php (JSON); button disabled while sending; neutral bordered success/error boxes (plain one-line messages — ask me for wording; use placeholders).
4. contact-handler.php + config.php: server-side validation and sanitising, honeypot, simple rate limit, send mail (PHP mail()/PHPMailer) to the address in config.php (EMPTY until client confirms; handler must refuse to send and log a clear error if empty). Document the no-PHP alternative (Formspree / Web3Forms) as a one-line endpoint change in contact.js.
5. MAP: skip until a street address exists (content has none). Leave a commented slot and a note in CLIENT-TODO.md.

Deliver: working form (test submission with a temporary test email in config), responsive layout. STOP.
```

---

# PHASE 8 — SEO, PERFORMANCE, ACCESSIBILITY, QA, CONTENT AUDIT, HANDOVER

```
PHASE 8 — POLISH & QA

SEO — use these (built only from client wording)
- index.html
  Title: SNT Enterprises | Industrial Scrap Trading & Supply in Mumbai
  Description: Mumbai-based industrial scrap trading and supply of ferrous, non-ferrous and electrical scrap, sourced through government, railway and private e-auctions.
- about.html
  Title: About SNT Enterprises | Industrial Scrap Sourcing Partner
  Description: Learn about SNT Enterprises, a Mumbai-based industrial scrap trading company focused on transparent dealings, competitive pricing and long-term supply relationships.
- services.html
  Title: Scrap Trading & Auction Procurement Services | SNT Enterprises
  Description: Industrial scrap trading, auction procurement, bulk metal scrap supply, electrical and mechanical scrap trading, surplus material procurement and scrap grading.
- products.html
  Title: Aluminium, Copper, Stainless Steel & Ferrous Scrap | SNT Enterprises
  Description: Aluminium, copper and brass, stainless steel, electrical and mechanical, ferrous and other industrial scrap materials supplied from Mumbai.
- contact.html
  Title: Contact SNT Enterprises | Industrial Scrap Trading, Mumbai
  Description: Contact SNT Enterprises, Mumbai, for industrial scrap trading, bulk metal scrap supply and material sourcing enquiries.
- One H1 per page, logical H2/H3. Canonical, Open Graph + Twitter tags (og-image), sitemap.xml, robots.txt (exclude styleguide.html).
- JSON-LD (Organization/LocalBusiness) on index.html using only: name, location (Mumbai, Maharashtra, IN), plus phone/email/taxID ONLY if present in SITE config.
- Favicon set from the SNT square mark.

PERFORMANCE
- <picture> webp + jpg, width/height set, hero preloaded, rest lazy; scripts deferred; fonts preconnect + display=swap; minified CSS/JS for production (keep sources); no unused libraries.
- Targets (mobile): Performance ≥ 90, SEO 100, Accessibility ≥ 95, Best Practices ≥ 95.

ACCESSIBILITY
- WCAG AA contrast (especially copper on graphite and white on copper), visible focus rings, skip link, keyboard-operable offcanvas and category bar, aria-current on active nav, aria-labels on icon-only buttons, labels linked via for/id, alt on every image slot, prefers-reduced-motion fully respected.

RESPONSIVE QA: 360, 390, 768, 1024, 1280, 1440, 1920. No horizontal scroll, no clipped text, tap targets ≥ 44px, sticky header and sticky category bar never cover anchored headings.

DESIGN AUDIT (fix anything that fails)
Any gradient? Any sparkle/AI-style icon? Any grid of identical cards? Any emoji? Any shadow? Any radius above 0? Anything that looks like default Bootstrap? Any flashy animation? Does it look the same as a generic template? (It should read as a precise industrial catalogue.)

CONTENT AUDIT (most important)
- Compare every visible text node on all five pages against Appendix A. Output a table: page → matches / differences. Zero differences allowed apart from the allowed microcopy list in the Master Brief.
- Search the built HTML for "[To be added", "to be confirmed", "Targeted", "Recommended images", "Client List", "Describe in Brief" — must return zero results.
- Confirm no invented numbers/claims exist anywhere.
- Confirm the product lists have the same items in the same order as Appendix A (A: 7, B: 6, C: 5, D: 8, E: 5, F: 3 items).

HANDOVER
- /docs/README.md: folder map, how to edit text, how to swap images (slot names), how to replace the wordmark with the real logo, how to fill site-config.js, how to set the form email in config.php, deployment on cPanel (public_html) or static host + Formspree.
- /docs/IMAGES.md: 6 required photos with shot descriptions and which slots are still placeholders.
- /docs/CLIENT-TODO.md: contact person, mobile, email, GST (if required), street address (for map + schema), real logo, real photos, form destination email, confirmation wording for form success/error, whether to add customer names later.
- Final Lighthouse summary.
```

---

# APPENDIX A — FINAL CLIENT CONTENT (verbatim, single source of truth)

```
COMPANY PROFILE CONTENT

Company Name:

SNT ENTERPRISES

Company Brief:

SNT Enterprises is a Mumbai-based industrial scrap trading and material sourcing company specializing in the procurement, trading, and supply of ferrous metals, non-ferrous metals, electrical scrap, and industrial surplus materials.

We source materials through government and private e-auctions, railway auctions, industrial units, manufacturing facilities, and other authorized channels.

Our business focuses on providing reliable scrap procurement and supply solutions to foundries, recycling industries, metal processors, manufacturers, and industrial buyers.

We are committed to transparent business practices, competitive pricing, consistent material quality, and building long-term business relationships.

Services (Describe in Brief):

1. Industrial Scrap Trading

Purchase and sale of various categories of industrial scrap materials, including ferrous, non-ferrous, and mixed metal scrap.

2. Government & Private Auction Procurement

Procurement of industrial scrap and surplus materials through railway auctions, government e-auction platforms, and private industrial auctions.

3. Bulk Metal Scrap Supply

Supply of aluminium, copper, brass, stainless steel, and other industrial scrap materials to foundries, recycling units, and manufacturing industries.

4. Electrical & Mechanical Scrap Trading

Trading of industrial motors, transformers, electrical panels, controllers, capacitors, and other electrical and mechanical scrap materials.

5. Industrial Surplus Material Procurement

Purchase of obsolete, rejected, surplus, and recyclable materials from factories, manufacturing units, and industrial establishments.

6. Scrap Segregation & Material Grading

Sorting and classification of scrap materials based on metal type, grade, and commercial recycling value.

Products:

A. Aluminium Scrap

- Aluminium Extrusion Scrap
- Aluminium Sheet Scrap
- Aluminium Casting Scrap
- Aluminium Angle & Section Scrap
- Aluminium Chequered Plate Scrap
- Aluminium Tank Scrap
- Mixed Aluminium Scrap

B. Copper & Brass Scrap

- Copper Wire Scrap
- Copper Winding Scrap
- Insulated Copper Cable Scrap
- Mixed Copper Scrap
- Brass Scrap
- Brass Electrical Components

C. Stainless Steel Scrap

- Stainless Steel 304 Scrap
- Stainless Steel 316 Scrap
- Stainless Steel 202 Scrap
- Magnetic Stainless Steel Scrap
- Stainless Steel Sheet, Mesh & Fabrication Scrap

D. Electrical & Mechanical Scrap

- AC & DC Motor Scrap
- Industrial Transformer Scrap
- Electrical Panel Scrap
- Electrical Controllers
- Capacitor Scrap
- Rectifiers & Electrical Components
- Industrial Cooling Coils
- Mixed Electrical Scrap

E. Ferrous Metal Scrap

- Mild Steel (MS) Scrap
- Cast Iron Scrap
- Motor Rotor & Stamping Scrap
- Industrial Machinery Scrap
- Mixed Iron & Steel Scrap

F. Other Industrial Scrap

- Industrial Plastic Scrap
- Polypropylene (PP) Film Scrap
- Industrial Surplus & Recyclable Materials

Client List:

Industries & Customer Segments Served / Targeted:

- Aluminium Foundries & Extrusion Manufacturers
- Copper & Brass Recycling Industries
- Stainless Steel Traders & Processors
- Metal Recycling Companies
- Industrial Manufacturing Units
- Electrical Equipment Recyclers
- Scrap Processing & Recycling Units

Specific customer company names can be added after confirmation.

Company Logo:

SNT ENTERPRISES

Existing company logo to be provided separately.

Contact Details:

Company Name: SNT Enterprises

Business Type: Industrial Scrap Trading & Supply

Location: Mumbai, Maharashtra, India

Contact Person: [Name to be confirmed]

Mobile Number: [To be added]

Email Address: [To be added]

GST Number: [To be added, if required]

Images:

Recommended images for the company profile:

1. Aluminium extrusion, casting, and sheet scrap
2. Copper wire and winding scrap
3. Stainless steel scrap materials
4. Industrial motors and electrical scrap
5. Bulk scrap stock and material loading
6. Industrial scrap sorting and segregation

Our Mission:

To provide reliable, competitive, and efficient industrial scrap trading solutions while supporting responsible material recycling and sustainable resource utilization.

Our Vision:

To establish SNT Enterprises as a trusted industrial scrap sourcing and supply partner across Maharashtra and India through consistent quality, transparent dealings, and long-term customer relationships.

Why Choose SNT Enterprises?

- Experience in industrial and railway scrap procurement
- Wide range of ferrous and non-ferrous scrap materials
- Competitive market-based pricing
- Bulk material sourcing capabilities
- Material identification, sorting, and grading
- Transparent and professional business dealings
- Focus on long-term industrial supply relationships
```
