# SNT ENTERPRISES — 5-PAGE B2B WEBSITE
### Production Handover & Developer Guide

This repository contains the complete static multi-page corporate website for **SNT Enterprises**, a Mumbai-based industrial scrap trading and material sourcing company.

Designed with an **industrial ledger / material spec-sheet** aesthetic based directly on the client's official emblem:
- **Midnight Industrial Navy (`#0E1724`) & Steel Navy (`#1C2A3A`)** primary dark surfaces (derived from logo text & shadows)
- **Antique Industrial Gold (`#C59B27`)** commodity & emblem accent (derived from upward spearhead)
- **Ice Steel (`#EFF3F8`) & Crisp White (`#FFFFFF`)** catalogue contrast
- **Zero gradients, zero shadows, radius 0, and zero card grids**.

---

## 1. Project Directory Map

```
snt-enterprises/
│
├── index.html                  # Home Page (Hero with spec strip, about brief, services ledger, hover-swap index, why choose points, CTA)
├── about.html                  # About Us (Company brief 7/5 split, two-tone Mission/Vision, 7 customer segments marker-list, CTA)
├── services.html               # Services (Scroll-synced sticky photo panel + 6 tall numbered service sections)
├── products.html               # Products (Sticky category tab bar + 6 spec catalogue sections A–F with 34 items)
├── contact.html                # Contact Us (Graphite contact ledger + 7-field enquiry form)
├── 404.html                    # Error 404 Page (Styled identically with header and footer)
├── styleguide.html             # Component & Design System Styleguide (Internal / noindex)
│
├── sitemap.xml                 # XML Sitemap for search engines
├── robots.txt                  # Robots exclusion standard (blocks styleguide.html)
├── config.php                  # Server-side PHP mail configuration (destination email, rate limits)
├── contact-handler.php         # Server-side AJAX form handler (sanitization, validation, honeypot, rate limiting)
│
├── assets/
│   ├── css/
│   │   └── style.css           # Design system tokens, typography, utilities, and page-specific styles
│   ├── js/
│   │   ├── site-config.js      # Client config data (phone, email, GST, contact person, address)
│   │   ├── main.js             # Core JS: Lenis smooth scroll, GSAP ScrollTrigger, config DOM population, sticky nav
│   │   └── contact.js          # Client-side form validation, Indian phone regex, honeypot, and AJAX submit
│   └── images/
│       ├── favicon.svg         # Vector favicon (copper square with white Barlow SNT)
│       └── og-image.svg        # 1200x630 social media sharing preview card
│
└── docs/
    ├── README.md               # Master technical documentation & deployment guide (this file)
    ├── IMAGES.md               # Image slot specifications, aspect ratios & shot list
    └── CLIENT-TODO.md          # Pending client deliverables checklist
```

---

## 2. Core Rules & Content Integrity

1. **Strict Content Adherence:** All visible product names, service names, and company descriptions match **Appendix A** verbatim. No fabricated statistics, years of experience, or client logos have been added.
2. **Zero-Leakage Architecture:** Elements requiring client information (`phone`, `email`, `contactPerson`, `gst`, `address`) use `data-config` attributes and remain completely hidden until populated in `assets/js/site-config.js`. Under no circumstances will unfinished placeholder markers like `[To be added]` appear to visitors.
3. **Typography Stack:** 
   - Headings: `Barlow Condensed` (600, 700)
   - Body Copy: `IBM Plex Sans` (400, 500, 600)
   - Codes & Eyebrows: `IBM Plex Mono` (500)
4. **No Build Step:** Vanilla HTML5, CSS3, jQuery 3.7.1, Bootstrap 5.3.3, GSAP 3.12.5, and Lenis 1.1.18 pinned via public CDNs. No Node.js compilation, Webpack, or Tailwind required.

---

## 3. How to Update Content & Client Data

### A. Populating Client Phone, Email & GST
Open [`assets/js/site-config.js`](../assets/js/site-config.js) and update the values:
```javascript
window.SITE = {
  contactPerson: "Mr. Name",
  phone: "+919876543210",
  phoneDisplay: "+91 98765 43210",
  email: "enquiry@sntenterprises.com",
  gst: "27AAAAA0000A1Z5",
  address: "Your Street Address, Mumbai, Maharashtra 400001, India"
};
```
Once updated:
- The header's "Contact Us" button will automatically switch to "Call Us" with a direct `tel:` link.
- The floating mobile call button will automatically appear in the bottom-right corner on smartphones.
- The contact details ledgers on the contact page and in the footer will automatically reveal the phone, email, and GST number.

### B. Configuring the Contact Form Destination Email
Open [`config.php`](../config.php) and enter the company's inbox address:
```php
return [
    'recipient_email' => 'enquiry@sntenterprises.com',
    ...
];
```

### C. Official Brand Logo Integration
The official client logo is fully integrated into the site:
- `assets/images/logo.png` — High-resolution transparent PNG with isolated metallic elements.
- `assets/images/logo-white.png` — Light-text variant optimized for high-contrast dark surfaces (header, mobile offcanvas, footer).
- `assets/images/favicon.png` & `favicon.svg` — Brand mark favicon icons.
- Responsive brand lockup markup across all pages:
  ```html
  <a href="index.html" class="brand" aria-label="SNT Enterprises Home">
    <img src="assets/images/logo-white.png" alt="SNT Enterprises Logo" class="brand__logo" width="48" height="51">
    <span class="brand__text-wrap">
      <span class="brand__title">SNT ENTERPRISES</span>
      <span class="brand__tagline d-none d-md-block">INDUSTRIAL SCRAP TRADING &bull; MUMBAI</span>
    </span>
  </a>
  ```

### D. Swapping Real Material Photos
When high-resolution warehouse and scrap yard photos are available:
1. Convert photos to WebP and JPG format.
2. Save into `assets/images/` using the exact slot names specified in [`docs/IMAGES.md`](IMAGES.md):
   - `bulk-loading.jpg` & `bulk-loading.webp`
   - `aluminium.jpg` & `aluminium.webp`
   - `copper.jpg` & `copper.webp`
   - `stainless.jpg` & `stainless.webp`
   - `electrical.jpg` & `electrical.webp`
   - `sorting.jpg` & `sorting.webp`
3. Remove the `.d-none` class from the `<img>` tags inside `<picture>` elements.

---

## 4. Deployment Instructions

### Option 1: Standard cPanel / Apache Hosting (Recommended)
1. Compress all files in this project directory into a `.zip` archive.
2. Log in to cPanel -> **File Manager** -> Open `public_html/`.
3. Upload and extract the archive directly into `public_html/`.
4. Ensure PHP 7.4, 8.0, 8.1, or 8.2 is active with the standard `mail()` function enabled.
5. Set permissions: Folders `755`, Files `644`.

### Option 2: Static Hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages)
If deploying on a platform without PHP support:
1. Open [`assets/js/contact.js`](../assets/js/contact.js).
2. Change the `ENDPOINT_URL` line from:
   ```javascript
   const ENDPOINT_URL = 'contact-handler.php';
   ```
   to your Formspree, Web3Forms, or Basin endpoint:
   ```javascript
   const ENDPOINT_URL = 'https://formspree.io/f/your_form_id';
   ```
3. Deploy the repository directly to your static hosting provider.
