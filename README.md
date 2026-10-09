# PREFIOP Free — Premium Field Operations HTML SaaS Template

**PREFIOP Free** is a modern, high-performance free SaaS landing page and web template crafted by [PixOptimo](https://pixoptimo.com) specifically for field operations, dispatch, asset management, and workforce scheduling platforms.

Built with **100% Vanilla HTML5, CSS3, and modern JavaScript**, PREFIOP Free requires zero build tools, node dependencies, or external runtime libraries.

---

## Features

- **Framework-Free**: Built with pure standard HTML, CSS, and ES6+ JavaScript.
- **Fast & Lightweight**: Zero bloated JS dependencies, instant load times, and optimized typography.
- **Modern Dark Aesthetic**: Custom dark palette with high-contrast typography, ambient lighting, and glassmorphic cards.
- **Fully Responsive**: Fluid grid layouts, accessible mobile drawer navigation, and clean breakpoints down to mobile viewports.
- **Accessible & Semantic**: Semantic landmark elements, ARIA dialog and status attributes, and keyboard navigability.
- **8 Production Pages**:
  - `index.html` — Homepage with interactive demo and architecture blueprints
  - `features.html` — Complete feature catalog and operational tools
  - `pricing.html` — Transparent pricing tiers with annual/monthly toggle
  - `about.html` — Company story, operational mission, and values
  - `contact.html` — Interactive contact form with subject and topic selection
  - `404.html` — Clean error state with recovery navigation
  - `privacy.html` — Comprehensive privacy policy with table-of-contents navigation
  - `terms.html` — Standard terms of service with legal section links

---

## Folder Structure

```
prefiop-free/
│
├── index.html          # Homepage
├── features.html       # Platform Features
├── pricing.html        # Pricing Plans & FAQ
├── about.html          # About PREFIOP Free
├── contact.html        # Contact Form
├── 404.html            # 404 Error Page
├── privacy.html        # Privacy Policy
├── terms.html          # Terms of Service
│
├── assets/
│   ├── css/
│   │   └── style.css   # Main stylesheet & design system
│   │
│   ├── js/
│   │   └── script.js   # Lightweight interactive vanilla scripts
│   │
│   ├── images/         # Custom raster / illustration assets
│   │
│   └── icons/
│       └── favicon.svg # Vector favicon
│
├── README.md           # Documentation
├── LICENSE             # MIT License
├── CREDITS.md          # Font & asset credits
└── CHANGELOG.md        # Version history
```

---

## Getting Started

Because PREFIOP Free is built with pure web standards, no compilation or npm installation is required:

1. **Directly open in browser**:
   Double click any HTML file (e.g. `index.html`) to open it directly in Google Chrome, Safari, Firefox, or Edge.

2. **Serve with a local development server** (recommended for testing):
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Or Node.js (npx)
   npx serve .
   ```
   Then visit `http://localhost:8000`.

---

## Customization

### Colors & Design Tokens
All core design tokens (colors, gradients, typography, border radius, transitions) are declared as CSS custom properties at the top of `assets/css/style.css`:

```css
:root {
  --bg-primary: #090a0f;
  --bg-card: rgba(18, 19, 26, 0.7);
  --text-primary: #f3f4f6;
  --accent-cyan: #38bdf8;
  --accent-emerald: #34d399;
  --accent-purple: #a855f7;
  /* ... */
}
```

### Forms
The contact form in `contact.html` is handled in `assets/js/script.js` with client-side validation. To integrate with a form provider (such as Formspree, Basin, or your own backend endpoint), configure the `action` and `method` attributes on the `<form id="contactForm">` element.

---

## Browser Support

- Chrome / Chromium (latest 2 versions)
- Safari & iOS Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Microsoft Edge (latest 2 versions)

---

## Author & Credits

Designed and crafted by [PixOptimo](https://pixoptimo.com) — discover more free and premium UI templates, landing pages, and web design assets.

---

## License

This project is open-source and free to use under the MIT License — see the [LICENSE](LICENSE) file for details.
