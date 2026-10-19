# 🎨 Image to HEX (`image2hex.github.io`)

> **Free, Ultra-Fast Color Picker from Image with 100% Client-Side Privacy.**  
> Extract exact HEX, RGB, HSL, and CMYK color codes from any image directly in your browser.

[![Deploy to GitHub Pages](https://github.com/image2hex/image2hex.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/image2hex/image2hex.github.io/actions/workflows/deploy.yml)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01.svg?style=flat&logo=astro&logoColor=white)](https://astro.build)
[![UI Library React](https://img.shields.io/badge/UI-React%2018-61DAFB.svg?style=flat&logo=react&logoColor=black)](https://react.dev)
[![Styling Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Privacy 100% In-Browser](https://img.shields.io/badge/Privacy-100%25%20In--Browser-10B981.svg?style=flat)](#-100-client-side-privacy-guarantee)
[![License MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 Live Website

**[https://image2hex.github.io](https://image2hex.github.io)**

---

## ✨ Features

- 🛡️ **100% Client-Side Privacy** — Zero bytes transmitted to external servers. All image decoding and pixel color conversions run strictly in your browser's local memory using HTML5 Canvas.
- 🌍 **Internationalization (i18n)** — Full native subpath routing supporting 6 languages (**English**, **Español**, **Português**, **Deutsch**, **Français**, **日本語**) with localized SEO metadata and 7 `hreflang` alternate tags.
- 🔍 **Pixel-Precise Magnifying Loupe** — Dynamic circular $11 \times 11$ pixel neighborhood grid with center crosshair and real-time HEX code badge that tracks your cursor or touch pointer.
- 📱 **100% Responsive & Touch Optimized** — Smooth 2-finger pinch-to-zoom, 1-finger panning, touch color sampling, and smart loupe elevation ($50\text{px}$ above touch point) so your thumb never occludes the loupe.
- 🎨 **Dominant Harmonic Palette Extractor** — Fast median-cut color quantization algorithm samples up to 10,000 pixels to generate an 8-color harmonic palette upon upload.
- 🔄 **Multi-Format Instant Conversions** — Accurate mathematical conversions for **HEX**, **RGB**, **HSL**, and **CMYK** with one-click clipboard copying.
- 📋 **Direct Clipboard Paste** — Paste screenshots straight from your clipboard (`Ctrl+V` on Windows/Linux or `Cmd+V` on macOS).
- 🖱️ **Zoom & Pan Controls** — Smooth scaling from **25% up to 800%** with mouse-wheel zoom, pinch-to-zoom, and drag-to-pan.
- 🧪 **Programmatic Sample Presets** — Test the tool instantly with 3 built-in Canvas-rendered presets (Sunset, Architecture, Minimalist Gradient) with zero external asset downloads.
- 👁️ **Native EyeDropper API Support** — 1-click fallback to pick colors anywhere on your operating system display (supported on Chromium browsers).
- 🌓 **Dark & Light Mode Support** — Responsive theme toggle with automatic system preference detection (`prefers-color-scheme`), local storage persistence, and zero-FOUC initialization.
- ☕ **Support the Developer** — Integrated responsive Support Developer ([Ko-fi](https://ko-fi.com/kishara)) action button with responsive icon-only mobile layout.
- 📜 **Session History & Palette Export** — Maintains a visual swatch list of your picked colors with instant export to **CSS Variables**, **JSON**, or **Plain Text**.
- 🚀 **100% Technical SEO Suite** — Validated JSON-LD schemas (`WebApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`), Google multi-language XML sitemap with `xhtml:link` alternates, `robots.txt`, and Cloudinary CDN Open Graph social sharing cards.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **[Astro 4](https://astro.build/)** | Static Site Generation (SSG) framework with built-in i18n subpath routing |
| **[React 18](https://react.dev/)** | Astro Islands (`client:load`) for stateful canvas and interactive picker workspace |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first responsive styling and micro-animations |
| **[HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)** | Client-side pixel data extraction and rendering |
| **[EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)** | Native OS-level screen color sampling |
| **[lucide-react](https://lucide.dev/)** | Modern, lightweight UI icons |
| **[canvas-confetti](https://www.kirilv.com/canvas-confetti/)** | Micro-celebration animations upon copying color codes |

---

## 📁 Project Architecture

```
image2hex.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Automated GitHub Pages CI/CD workflow
├── public/
│   ├── favicon.svg                 # Brand SVG icon
│   ├── og-image.png                # 1200x630 Open Graph preview image
│   ├── robots.txt                  # Search engine crawling directives & sitemap location
│   └── sitemap.xml                 # Multi-language XML sitemap with xhtml:link hreflang
├── src/
│   ├── components/
│   │   ├── ImageColorPicker.jsx    # Core React Canvas Island (picker, loupe, touch gestures, palette)
│   │   ├── LanguagePicker.astro    # Crawlable HTML <a> language dropdown switcher
│   │   └── ThemeToggle.astro       # Responsive dark/light mode toggle button
│   ├── i18n/
│   │   ├── ui.ts                   # Complete native translation dictionaries (en, es, pt, de, fr, ja)
│   │   └── utils.ts                # i18n path resolution, alternates generator & helpers
│   ├── layouts/
│   │   └── Layout.astro            # Global SEO shell, Google tag, JSON-LD schemas & responsive header
│   ├── pages/
│   │   ├── [lang]/
│   │   │   ├── index.astro         # Localized dynamic landing pages (es, pt, de, fr, ja)
│   │   │   └── privacy.astro       # Localized dynamic privacy policy pages
│   │   ├── index.astro             # Root English landing page (/)
│   │   └── privacy.astro           # Root English privacy policy page (/privacy)
│   └── utils/
│       ├── cn.js                   # clsx + tailwind-merge helper
│       └── colorConverters.js      # Pixel-perfect color algorithms + median-cut quantization
├── astro.config.mjs                # Astro configuration (SSG + i18n subpath routing)
├── package.json                    # Dependencies and npm scripts
├── tailwind.config.mjs             # Tailwind CSS theme extension
└── tsconfig.json                   # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.17.0` or higher
- **npm** (comes with Node.js) or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/image2hex/image2hex.github.io.git
   cd image2hex.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🧮 How It Works

### 1. In-Memory Canvas Pixel Reading
When an image is loaded (via file upload, drag-and-drop, clipboard paste, or sample click), it is drawn onto an offscreen `HTMLCanvasElement`. The raw pixel data is accessed using `context.getImageData(0, 0, width, height)`.

### 2. Median-Cut Color Quantization
To generate the 8 dominant colors:
1. Samples up to 10,000 pixels across the image for optimal performance.
2. Filters out transparent pixels and near-pure white/black noise.
3. Recursively subdivides color buckets along the channel with the largest color range.
4. Averages the RGB values of each partition and sorts the resulting palette by perceived luminance using the BT.601 formula ($Y = 0.299R + 0.587G + 0.114B$).

### 3. Precise Color Conversions
- **RGB $\rightarrow$ HEX**: Zero-padded two-digit uppercase hex formatting (`#4F46E5`).
- **RGB $\rightarrow$ HSL**: Range-checked conversion to Hue ($0^\circ\text{--}360^\circ$), Saturation ($0\%\text{--}100\%$), and Lightness ($0\%\text{--}100\%$).
- **RGB $\rightarrow$ CMYK**: Standard subtractive color model conversion for print design workflows.

---

## 🔒 100% Client-Side Privacy Guarantee

- **Zero Server Uploads**: No images or color data are ever transmitted to any remote server or third-party service.
- **In-Memory Execution**: Images reside only in active browser RAM and are purged when the page is reloaded or closed.
- **Data Safety**: All processing happens strictly in the client device.

Read our complete [Privacy Policy](https://image2hex.github.io/privacy).

---

## 🚢 Deployment

This project is deployed to **GitHub Pages** using GitHub Actions:

- Every push to the `main` branch triggers `.github/workflows/deploy.yml`.
- Builds static assets with `withastro/action@v3`.
- Deploys pages directly to `https://image2hex.github.io` via `actions/deploy-pages@v4`.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
