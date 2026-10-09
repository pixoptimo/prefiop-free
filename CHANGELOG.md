# Changelog

All notable changes to the PREFIOP Free HTML Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-08

### Added
- Production-ready folder structure: `assets/css/`, `assets/js/`, `assets/icons/`, `assets/images/`.
- Brand vector favicon (`assets/icons/favicon.svg`) linked across all HTML documents.
- Query parameter recognition in contact form (`?plan=starter|professional|enterprise`) to auto-populate inquiry subjects.
- Documentation: `README.md`, `LICENSE`, `CREDITS.md`, `CHANGELOG.md`.

### Changed
- Reorganized CSS into `assets/css/style.css` and JavaScript into `assets/js/script.js`.
- Updated all stylesheet and script references in all HTML files to point to their new `assets/` paths.
- Linked homepage blueprint cards directly to detailed feature sections on `features.html#dispatch`, `features.html#teams`, and `features.html#assets`.
- Streamlined `404.html` navigation actions to return home, explore features, or contact support.

### Fixed
- Removed unused and dead JavaScript modules (auth forms, blog search, reading progress bars, use-case telemetry) that referenced removed pages.
- Standardized header, footer, and navigation menus across all 8 template pages.
- Resolved orphaned anchor links.
- Hardened contact form with real-time error clearing on input.
