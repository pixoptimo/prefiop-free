/**
 * PREFIOP — Modern Field Operations Platform
 * Production Vanilla JavaScript
 * Lightweight, accessible, framework-free
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initDashboardTabs();
  initSmoothScroll();
  initInteractiveCards();
  initPricingToggle();
  initContactPage();
});

/**
 * 1. Sticky Header Scroll State
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    if (header) header.classList.add('menu-open');
  };

  const closeDrawer = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (header) header.classList.remove('menu-open');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer on any drawer link or button click
  const drawerLinks = drawer.querySelectorAll('.mobile-nav-link, .btn');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });

  // Close drawer on click outside header
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && header && !header.contains(e.target)) {
      closeDrawer();
    }
  });

  // Auto close if resized back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  }, { passive: true });
}

/**
 * 3. Interactive Analytics Demo Tab Switching (Daily / Weekly / Monthly)
 */
function initDashboardTabs() {
  const tabs = document.querySelectorAll('.tab-pill');
  const wavePath = document.querySelector('.analytics-wave path[stroke*="url"]');
  const glowPath = document.querySelector('.analytics-wave path[fill*="url"]');
  const activeNode = document.querySelector('.analytics-wave circle[fill="#a855f7"]');
  const activeNodeHalo = document.querySelector('.analytics-wave circle[stroke="#a855f7"]');

  if (!tabs.length) return;

  const curveConfigs = {
    DAILY: {
      wave: 'M0,85 C90,75 140,95 230,80 C320,65 370,100 460,75 C540,55 600,60 680,45',
      glow: 'M0,85 C90,75 140,95 230,80 C320,65 370,100 460,75 C540,55 600,60 680,45 L680,140 L0,140 Z',
      cx: 460,
      cy: 75
    },
    WEEKLY: {
      wave: 'M0,95 C100,60 160,85 240,55 C330,85 400,45 490,65 C560,75 620,40 680,35',
      glow: 'M0,95 C100,60 160,85 240,55 C330,85 400,45 490,65 C560,75 620,40 680,35 L680,140 L0,140 Z',
      cx: 490,
      cy: 65
    },
    MONTHLY: {
      wave: 'M0,110 C80,95 180,50 270,70 C360,90 440,30 520,50 C580,65 630,30 680,25',
      glow: 'M0,110 C80,95 180,50 270,70 C360,90 440,30 520,50 C580,65 630,30 680,25 L680,140 L0,140 Z',
      cx: 520,
      cy: 50
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.textContent.trim().toUpperCase();
      const config = curveConfigs[mode];

      if (config && wavePath && glowPath) {
        wavePath.setAttribute('d', config.wave);
        glowPath.setAttribute('d', config.glow);
        if (activeNode) {
          activeNode.setAttribute('cx', String(config.cx));
          activeNode.setAttribute('cy', String(config.cy));
        }
        if (activeNodeHalo) {
          activeNodeHalo.setAttribute('cx', String(config.cx));
          activeNodeHalo.setAttribute('cy', String(config.cy));
        }
      }
    });
  });
}

/**
 * 4. Safe Smooth Scrolling for Same-Page Links
 * Handles "#id", "index.html#id" and "index.html" links that point at the
 * current page in-place. Re-navigating a document to itself is unnecessary and,
 * when opened via file://, makes Chrome log "Unsafe attempt to load URL ...
 * 'file:' URLs are treated as unique security origins."
 */
function initSmoothScroll() {
  const normalizePath = (path) => path.replace(/\/index\.html$/i, '/');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  document.addEventListener('click', (e) => {
    // Respect modified clicks (new tab/window), non-primary buttons and handled events
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const anchor = e.target.closest('a[href]');
    if (!anchor || anchor.hasAttribute('download')) return;
    if (anchor.target && anchor.target !== '_self') return;

    const rawHref = anchor.getAttribute('href');
    if (!rawHref || rawHref.startsWith('#!') || /^(mailto|tel|javascript):/i.test(rawHref)) return;

    let url;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch (err) {
      return;
    }

    const isSamePage =
      url.protocol === window.location.protocol &&
      url.host === window.location.host &&
      normalizePath(url.pathname) === normalizePath(window.location.pathname) &&
      url.search === window.location.search;

    if (!isSamePage) return;

    e.preventDefault();

    let targetEl = null;
    if (url.hash && url.hash !== '#') {
      try {
        targetEl = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch (err) {
        targetEl = null;
      }
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: scrollBehavior });
    }
  });
}

/**
 * 5. Interactive Feedback on UI Preview Elements
 */
function initInteractiveCards() {
  const ackBtn = document.querySelector('.btn-purple-sm');
  if (ackBtn) {
    ackBtn.addEventListener('click', function () {
      this.textContent = 'Acknowledged ✓';
      this.style.background = '#10b981';
      setTimeout(() => {
        this.textContent = 'Acknowledge';
        this.style.background = '';
      }, 2500);
    });
  }

  const dismissBtn = document.querySelector('.btn-ghost-sm');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', function () {
      const card = this.closest('.floating-alert-card');
      if (card) {
        card.style.opacity = '0.5';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 1200);
      }
    });
  }

  document.querySelectorAll('.btn-align-pill').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.textContent.trim() === 'Align') {
        this.textContent = 'Synced ✓';
        this.style.background = 'rgba(16, 185, 129, 0.2)';
        this.style.borderColor = '#10b981';
        this.style.color = '#34d399';
      } else {
        this.textContent = 'Align';
        this.style.background = '';
        this.style.borderColor = '';
        this.style.color = '';
      }
    });
  });
}

/**
 * 6. Pricing Billing Toggle (Monthly / Annual)
 */
function initPricingToggle() {
  const toggleBtn = document.getElementById('billingToggle');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const annualLabel = document.getElementById('annualLabel');
  const priceElements = document.querySelectorAll('.price-amount[data-monthly]');
  const billedNotes = document.querySelectorAll('.billing-billed-note');

  if (!toggleBtn) return;

  function setBillingPeriod(isAnnual) {
    toggleBtn.setAttribute('aria-checked', isAnnual ? 'true' : 'false');

    if (isAnnual) {
      if (annualLabel) annualLabel.classList.add('active');
      if (monthlyLabel) monthlyLabel.classList.remove('active');
    } else {
      if (annualLabel) annualLabel.classList.remove('active');
      if (monthlyLabel) monthlyLabel.classList.add('active');
    }

    priceElements.forEach(el => {
      const targetVal = isAnnual ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
      if (targetVal) {
        el.style.opacity = '0.3';
        setTimeout(() => {
          el.textContent = targetVal;
          el.style.opacity = '1';
        }, 100);
      }
    });

    if (billedNotes.length >= 2) {
      if (isAnnual) {
        billedNotes[0].textContent = 'Billed annually ($288/yr)';
        billedNotes[1].textContent = 'Billed annually ($768/yr)';
      } else {
        billedNotes[0].textContent = 'Billed monthly ($29/mo)';
        billedNotes[1].textContent = 'Billed monthly ($79/mo)';
      }
    }
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyAnnual = toggleBtn.getAttribute('aria-checked') === 'true';
    setBillingPeriod(!isCurrentlyAnnual);
  });

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => setBillingPeriod(false));
  }

  if (annualLabel) {
    annualLabel.addEventListener('click', () => setBillingPeriod(true));
  }
}

/**
 * 7. Contact Page Form & Inquiries Processing
 */
function initContactPage() {
  const form = document.getElementById('contactForm');
  const topicTabs = document.querySelectorAll('.contact-topic-tabs .topic-tab');
  const titleEl = document.getElementById('formTopicTitle');
  const subtitleEl = document.getElementById('formTopicSubtitle');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successBanner = document.getElementById('contactSuccessBanner');

  if (!form) return;

  // Handle URL plan parameter prefilling (e.g. contact.html?plan=professional)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan');
    if (planParam) {
      const subjectInput = document.getElementById('contactSubject');
      if (subjectInput && !subjectInput.value.trim()) {
        const planName = planParam.charAt(0).toUpperCase() + planParam.slice(1);
        subjectInput.value = `Inquiry regarding ${planName} Plan`;
      }
    }
  } catch (e) {
    // URLSearchParams fallback
  }

  const topicConfig = {
    product: {
      title: 'Product Questions',
      subtitle: 'Learn more about features, workflows, and platform capabilities.',
      btnText: 'Send Message'
    },
    implementation: {
      title: 'Implementation',
      subtitle: 'Discuss setup, customization, and operational requirements.',
      btnText: 'Send Message'
    },
    general: {
      title: 'General Inquiries',
      subtitle: 'Questions about PREFIOP or the platform? Send us a message.',
      btnText: 'Send Message'
    }
  };

  topicTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      topicTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const topicKey = tab.getAttribute('data-topic');
      const cfg = topicConfig[topicKey];
      if (cfg) {
        if (titleEl) titleEl.textContent = cfg.title;
        if (subtitleEl) subtitleEl.textContent = cfg.subtitle;
        if (submitBtn) {
          const btnTextSpan = submitBtn.querySelector('.btn-text');
          if (btnTextSpan) btnTextSpan.textContent = cfg.btnText;
        }
      }
    });
  });

  // Real-time error removal on input
  const inputsToClear = form.querySelectorAll('.form-input');
  inputsToClear.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      const errorMsg = input.parentElement?.querySelector('.field-error-msg');
      if (errorMsg) errorMsg.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const company = document.getElementById('contactCompany');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    const nameErr = document.getElementById('contactNameError');
    const emailErr = document.getElementById('contactEmailError');
    const companyErr = document.getElementById('contactCompanyError');
    const subjectErr = document.getElementById('contactSubjectError');
    const messageErr = document.getElementById('contactMessageError');

    // Reset error messages
    [nameErr, emailErr, companyErr, subjectErr, messageErr].forEach(err => {
      if (err) err.textContent = '';
    });
    [nameInput, email, company, subject, message].forEach(inp => {
      if (inp) inp.classList.remove('input-error');
    });

    if (!nameInput || !nameInput.value.trim()) {
      isValid = false;
      if (nameErr) nameErr.textContent = 'Please enter your name.';
      if (nameInput) nameInput.classList.add('input-error');
    }

    if (!email || !email.value.trim() || !validateEmail(email.value.trim())) {
      isValid = false;
      if (emailErr) emailErr.textContent = 'Please enter a valid work email address.';
      if (email) email.classList.add('input-error');
    }

    if (!company || !company.value.trim()) {
      isValid = false;
      if (companyErr) companyErr.textContent = 'Please enter your company name.';
      if (company) company.classList.add('input-error');
    }

    if (!subject || !subject.value.trim()) {
      isValid = false;
      if (subjectErr) subjectErr.textContent = 'Please enter a subject.';
      if (subject) subject.classList.add('input-error');
    }

    if (!message || !message.value.trim()) {
      isValid = false;
      if (messageErr) messageErr.textContent = "Please tell us what you're working on.";
      if (message) message.classList.add('input-error');
    }

    if (!isValid) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      const btnTextSpan = submitBtn.querySelector('.btn-text');
      if (btnTextSpan) btnTextSpan.textContent = 'Sending Message...';

      setTimeout(() => {
        submitBtn.style.display = 'none';

        // Disable inputs
        const allFields = form.querySelectorAll('input, select, textarea');
        allFields.forEach(field => { field.disabled = true; });

        if (successBanner) {
          const nameTarget = document.getElementById('successRecipientName');
          if (nameTarget && nameInput) {
            nameTarget.textContent = nameInput.value.trim();
          }
          successBanner.style.display = 'flex';
        }
      }, 500);
    }
  });
}

/**
 * 8. Email Validation Helper
 */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
