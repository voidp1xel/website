# 🌌 Cinematic Personal Portfolio
> **A High-Performance, Native Single-Page Application (SPA)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![UI/UX](https://img.shields.io/badge/UI/UX-Cinematic-8A2BE2?style=for-the-badge)

A highly responsive, cinematic personal portfolio designed to showcase my software engineering journey, academic milestones, and systems-level programming projects. 

Instead of relying on heavy frontend frameworks (like React, Vue, or Tailwind), this entire application was engineered natively using **pure HTML, modern CSS, and Vanilla JavaScript**. The goal was to achieve raw execution speed, absolute layout control, zero external dependencies, and a perfectly optimized DOM footprint.

---

## ✨ Core Features & Mechanics

### 🎬 Apple-Style Cinematic Motion
* **Reversible Intersection Observers:** Elements don't just fade in once; they dynamically scale and drift back into place as you scroll up and down the page, creating a breathing, interactive environment.
* **Dynamic Parallax Scrubbing:** The hero section maps directly to the user's scroll wheel, smoothly fading and translating downward into the background to create depth as the user descends the page.
* **Ambient Cursor Tracking:** A mathematically mapped, subtle radial gradient continuously tracks the user's pointer across the viewport, gently illuminating glassmorphic borders and backgrounds.

### 🗂️ Interactive Project Gallery
* **Hardware-Accelerated CSS:** Project cards utilize 3D perspective (`perspective: 1200px`), hardware-accelerated `transform`, and `rotateY` logic for buttery-smooth 180° flips without jitter.
* **Dynamic Tag Filtering:** Instantly sort through projects via custom data attributes. The JS engine calculates grid reflows and gracefully fades non-matching elements out of the DOM.
* **Auto-Scroll Anchoring:** Clicking a filter intelligently calculates the bounding client rectangle of the section and glides the user perfectly to the top of the gallery.

### ⏳ Scroll-Linked Dynamic Timeline
* **Algorithm-Driven Tracking:** A custom JavaScript algorithm calculates the absolute distance scrolled and dynamically maps a glowing pointer perfectly along the vertical axis of the academic milestone timeline.
* **Native Accordion Logic:** Expandable and collapsible timeline nodes built with native DOM manipulation, ARIA accessibility attributes, and CSS `max-height` transitions for zero-bloat state management.

### 🌓 System-Integrated Theming
* Fully implemented Light/Dark mode utilizing CSS variable (`:root`) overrides.
* Persists user preference across sessions using the browser's `localStorage` API.

---

## 🏗️ Technical Architecture

The architecture enforces strict separation of concerns, consolidating logic into three master files to radically minimize HTTP requests and loading times.

```text
portfolio/
├── index.html        # Semantic HTML5, accessible ARIA attributes, SVG icons
├── styles.css        # CSS Grid/Flexbox, Glassmorphism, CSS Variables, Keyframes
├── main.js           # Vanilla JS ES6 logic, Observers, Event Delegation
└── assets/           # Profile imagery, optimized project visuals
```

## ⚡ Performance Optimizations

**Zero Dependencies:** No jQuery, no Bootstrap, no external animation libraries (e.g., GSAP/Framer Motion). Every animation is driven by native browser APIs.

**Hardware Acceleration:** All hover effects and scroll reveals are bound strictly to `transform` and `opacity` properties, forcing the GPU to handle compositing and preventing expensive DOM repaints and reflows.

**Event Delegation:** Click events for the complex project gallery and timeline are handled at the parent-container level, radically reducing the memory footprint of event listeners.

**Passive Event Listeners:** Scroll and mouse-move tracking utilize `{ passive: true }` to ensure the browser's main thread is never blocked, maintaining a strict 60 FPS lock.

**Accessibility (A11y):** Fully compliant with `prefers-reduced-motion` media queries, automatically disabling heavy transformations for users with motion sensitivity.

## ⚖️ License & Copyright
© 2026 Aniket Goel. All Rights Reserved.

This repository and its codebase are the exclusive intellectual property of the author. No part of this software, including its mechanics, layout architecture, algorithms, assets, or visual design, may be reproduced, distributed, copied, modified, or transmitted in any form or by any means without explicit, prior written permission from the author.