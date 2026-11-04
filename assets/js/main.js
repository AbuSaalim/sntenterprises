/**
 * SNT ENTERPRISES — CORE JAVASCRIPT
 * Lenis Smooth Scroll + GSAP ScrollTrigger + Config Population + UI Controls
 */

(function () {
  'use strict';

  // 1. Accessibility: Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Client Data Config Population
  function applySiteConfig() {
    const config = window.SITE || {};

    const configKeys = ['contactPerson', 'phone', 'phoneDisplay', 'email', 'gst', 'address'];

    document.querySelectorAll('[data-config]').forEach(function (el) {
      const key = el.getAttribute('data-config');
      const val = config[key];

      if (val && typeof val === 'string' && val.trim() !== '') {
        const cleanVal = val.trim();
        el.setAttribute('data-config-ready', 'true');
        el.removeAttribute('hidden');
        el.style.display = '';

        // Handle phone links
        if (key === 'phone' || key === 'phoneDisplay') {
          const rawPhone = config.phone ? config.phone.replace(/[^0-9+]/g, '') : '';
          const displayPhone = config.phoneDisplay || config.phone || '';
          if (el.tagName === 'A') {
            el.setAttribute('href', 'tel:' + rawPhone);
          }
          const target = el.querySelector('[data-config-value]') || el;
          if (target.hasAttribute('data-config-value')) {
            target.textContent = displayPhone;
          } else if (el.tagName !== 'A' || el.children.length === 0) {
            el.textContent = displayPhone;
          }
        }
        // Handle email links
        else if (key === 'email') {
          if (el.tagName === 'A') {
            el.setAttribute('href', 'mailto:' + cleanVal);
          }
          const target = el.querySelector('[data-config-value]') || el;
          if (target.hasAttribute('data-config-value')) {
            target.textContent = cleanVal;
          } else if (el.tagName !== 'A' || el.children.length === 0) {
            el.textContent = cleanVal;
          }
        }
        // General text elements
        else {
          const target = el.querySelector('[data-config-value]') || el;
          target.textContent = cleanVal;
        }
      } else {
        // Strict concealment of empty fields
        el.removeAttribute('data-config-ready');
        el.setAttribute('hidden', '');
        el.style.display = 'none';
      }
    });

    // Special Header & Footer Button fallback:
    // If phone exists, show "Call Us" button, otherwise fallback to "Contact Us" linking contact.html
    const headerPhoneBtn = document.querySelector('[data-header-phone]');
    const headerContactBtn = document.querySelector('[data-header-contact]');
    if (headerPhoneBtn && headerContactBtn) {
      if (config.phone && config.phone.trim() !== '') {
        headerPhoneBtn.removeAttribute('hidden');
        headerPhoneBtn.style.display = 'inline-flex';
        headerContactBtn.setAttribute('hidden', '');
        headerContactBtn.style.display = 'none';
      } else {
        headerPhoneBtn.setAttribute('hidden', '');
        headerPhoneBtn.style.display = 'none';
        headerContactBtn.removeAttribute('hidden');
        headerContactBtn.style.display = 'inline-flex';
      }
    }

    // Floating call button (Mobile) - only visible if phone exists
    const floatingCall = document.querySelector('[data-floating-call]');
    if (floatingCall) {
      if (config.phone && config.phone.trim() !== '') {
        floatingCall.removeAttribute('hidden');
        floatingCall.style.display = 'flex';
      } else {
        floatingCall.setAttribute('hidden', '');
        floatingCall.style.display = 'none';
      }
    }
  }

  // 3. Smooth Scroll (Lenis) Setup
  let lenis = null;

  function initSmoothScroll() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') {
      return;
    }

    // Modern Lenis configuration: responsive, crisp, butter-smooth without floaty lag
    lenis = new Lenis({
      duration: 0.9,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      syncTouch: false
    });

    // Keep GSAP ScrollTrigger in sync with Lenis
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Drive Lenis via native requestAnimationFrame at full display refresh rate (60Hz / 120Hz ProMotion)
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Pause Lenis when mobile offcanvas menu is open
    const offcanvasEl = document.getElementById('mobileNavOffcanvas');
    if (offcanvasEl) {
      offcanvasEl.addEventListener('show.bs.offcanvas', function () {
        if (lenis) lenis.stop();
      });
      offcanvasEl.addEventListener('hidden.bs.offcanvas', function () {
        if (lenis) lenis.start();
      });
    }
  }

  // 4. GSAP Motion & Reveals (Strictly Restrained)
  function initMotion() {
    if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Immediate visibility
      document.querySelectorAll('[data-reveal], [data-reveal-stagger], [data-line], [data-wipe]').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Standard reveal: y 24 -> 0, opacity 0 -> 1
    gsap.utils.toArray('[data-reveal]').forEach(function (elem) {
      gsap.fromTo(elem, 
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Staggered reveals for lists or grids
    gsap.utils.toArray('[data-reveal-stagger]').forEach(function (container) {
      const items = container.querySelectorAll('.stagger-item');
      if (items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    });

    // Copper Rules Draw (scaleX 0 -> 1)
    gsap.utils.toArray('[data-line]').forEach(function (line) {
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            once: true
          }
        }
      );
    });

    // Flat Clip-Path Image Wipe: inset(0 0 100% 0) -> inset(0)
    gsap.utils.toArray('[data-wipe]').forEach(function (imgContainer) {
      gsap.fromTo(imgContainer,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imgContainer,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }

  // 5. Header Scroll Shrink Behavior
  function initHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let isScrolled = false;
    function checkHeader(scrollY) {
      const top = typeof scrollY === 'number' ? scrollY : window.scrollY;
      if (top > 60 && !isScrolled) {
        header.classList.add('site-header--scrolled');
        isScrolled = true;
      } else if (top <= 60 && isScrolled) {
        header.classList.remove('site-header--scrolled');
        isScrolled = false;
      }
    }

    if (lenis) {
      lenis.on('scroll', function (e) {
        checkHeader(e.scroll);
      });
    } else {
      window.addEventListener('scroll', function () {
        checkHeader(window.scrollY);
      }, { passive: true });
    }
    checkHeader(window.scrollY);
  }

  // 6. Lenis-Aware Anchor Hash Links (with Header & Category Bar Offset)
  function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-bs-toggle])').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();
          let headerOffset = 84;
          const categoryBar = document.querySelector('.products-category-bar');
          if (categoryBar) {
            headerOffset += (categoryBar.offsetHeight || 56);
          }

          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

          if (lenis && !prefersReducedMotion) {
            lenis.scrollTo(targetPosition, { duration: 1 });
          } else {
            window.scrollTo({
              top: targetPosition,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }

          // Close mobile offcanvas if open
          const offcanvasEl = document.getElementById('mobileNavOffcanvas');
          if (offcanvasEl && typeof bootstrap !== 'undefined') {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
            if (bsOffcanvas) {
              bsOffcanvas.hide();
            }
          }
        }
      });
    });
  }

  // 7. Product Hover-Swap Index (Home Page)
  function initProductHoverSwap() {
    const rows = document.querySelectorAll('[data-swap-target]');
    const panels = document.querySelectorAll('.product-swap-panel');
    if (rows.length === 0 || panels.length === 0) return;

    rows.forEach(function (row) {
      function activate() {
        const targetId = row.getAttribute('data-swap-target');
        rows.forEach(function (r) { r.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        
        row.classList.add('is-active');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('is-active');
        }
      }

      row.addEventListener('mouseenter', activate);
      row.addEventListener('focus', activate);
    });
  }

  // 8. Services Scroll-Sync (Services Page)
  function initServicesScrollSync() {
    const serviceSections = document.querySelectorAll('.service-scroll-section');
    const servicePanels = document.querySelectorAll('.service-sync-panel');
    const serviceNumeral = document.getElementById('serviceActiveNum');
    if (serviceSections.length === 0 || servicePanels.length === 0) return;

    if (prefersReducedMotion || typeof ScrollTrigger === 'undefined') {
      return;
    }

    function activate(index) {
      servicePanels.forEach(function (panel, idx) {
        if (idx === index) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
      if (serviceNumeral) {
        serviceNumeral.textContent = String(index + 1).padStart(2, '0');
      }
    }

    serviceSections.forEach(function (sec, idx) {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: function () {
          activate(idx);
        },
        onEnterBack: function () {
          activate(idx);
        }
      });
    });
  }

  // 9. Products ScrollSpy & Active Tab Sync
  function initProductsCategorySync() {
    const tabs = document.querySelectorAll('.category-tab-link');
    const sections = document.querySelectorAll('.catalogue-section');
    if (tabs.length === 0 || sections.length === 0) return;

    if (prefersReducedMotion || typeof ScrollTrigger === 'undefined') {
      return;
    }

    sections.forEach(function (sec, idx) {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 35%',
        end: 'bottom 35%',
        onEnter: function () {
          tabs.forEach(function (t) { t.classList.remove('active'); });
          if (tabs[idx]) tabs[idx].classList.add('active');
        },
        onEnterBack: function () {
          tabs.forEach(function (t) { t.classList.remove('active'); });
          if (tabs[idx]) tabs[idx].classList.add('active');
        }
      });
    });
  }

  // DOM Ready Execution
  document.addEventListener('DOMContentLoaded', function () {
    applySiteConfig();
    initSmoothScroll();
    initMotion();
    initHeader();
    initAnchorLinks();
    initProductHoverSwap();
    initServicesScrollSync();
    initProductsCategorySync();
  });

  // Expose config updater for live/dynamic testing if needed
  window.updateSiteConfig = applySiteConfig;

})();

