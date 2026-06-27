# In 4 A Win

A modern, dark-mode prize-competition / discount-voucher raffle landing page. Win cars, cash and luxury prizes for the price of a coffee.

Built with **Vanilla JS + Vite** and a motion stack of GSAP, Lenis, Splitting.js and Swiper.

## Stack

- **[Vite](https://vitejs.dev/)** - build tool and dev server
- **[GSAP](https://gsap.com/) + ScrollTrigger** - scroll reveals, count-up stats, progress fills
- **[Lenis](https://lenis.darkroom.engineering/)** - smooth scroll, synced to the GSAP ticker
- **[Splitting.js](https://splitting.js.org/)** - per-character hero headline animation
- **[Swiper](https://swiperjs.com/)** - winners coverflow carousel

## Features

- Asymmetric split hero with live countdown and a featured competition card
- Live competitions grid with ticket-progress bars and per-card timers
- "Win in three steps" stepper
- Recent winners carousel
- Animated count-up stats band
- Magnetic CTA buttons, full `prefers-reduced-motion` support

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Design system

- **Theme:** dark, ink-navy `#0A0D14`
- **Accent:** electric lime `#B8FF3C` (single accent, used throughout)
- **Type:** Clash Display (display) + General Sans (body)
- **Shape:** pill buttons, 16px cards, 10px inputs

> Prize names, values and winner details are placeholder sample data.

## Knowledge graph

`graphify-out/` contains a generated knowledge graph of this project. Open `graphify-out/graph.html` in a browser to explore it, or read `graphify-out/GRAPH_REPORT.md`.
