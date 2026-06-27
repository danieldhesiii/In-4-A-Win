import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import Swiper from 'swiper'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'
import 'splitting/dist/splitting.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* -------------------------------------------------
   Lenis smooth scroll, synced to GSAP ticker
   ------------------------------------------------- */
if (!reduceMotion) {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // Anchor links route through Lenis for smooth jumps
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href')
      if (id.length > 1) {
        const target = document.querySelector(id)
        if (target) {
          e.preventDefault()
          lenis.scrollTo(target, { offset: -80 })
        }
      }
    })
  })
}

/* -------------------------------------------------
   Splitting.js - hero heading char animation
   Reason: storytelling, the headline assembles on load
   ------------------------------------------------- */
Splitting()
if (!reduceMotion) {
  gsap.from('.hero__title .char', {
    yPercent: 120,
    opacity: 0,
    stagger: 0.018,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.15,
  })
}

/* -------------------------------------------------
   Scroll reveals (feedback: content enters as you read)
   ------------------------------------------------- */
const revealEls = document.querySelectorAll('[data-reveal]')
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add('is-in'))
} else {
  revealEls.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => el.classList.add('is-in'),
    })
  })
}

/* -------------------------------------------------
   Progress bars fill when scrolled into view
   ------------------------------------------------- */
document.querySelectorAll('.progress').forEach((p) => {
  const pct = Math.max(0, Math.min(100, Number(p.dataset.progress) || 0))
  const fill = p.querySelector('.progress__fill')
  if (reduceMotion) {
    fill.style.width = pct + '%'
    return
  }
  ScrollTrigger.create({
    trigger: p,
    start: 'top 92%',
    once: true,
    onEnter: () => {
      fill.style.width = pct + '%'
    },
  })
})

/* -------------------------------------------------
   Count-up numbers
   ------------------------------------------------- */
function formatNumber(n, prefix, suffix) {
  return prefix + Math.round(n).toLocaleString('en-GB') + suffix
}
document.querySelectorAll('.js-count').forEach((el) => {
  const to = Number(el.dataset.to) || 0
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  if (reduceMotion) {
    el.textContent = formatNumber(to, prefix, suffix)
    return
  }
  ScrollTrigger.create({
    trigger: el,
    start: 'top 95%',
    once: true,
    onEnter: () => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = formatNumber(obj.v, prefix, suffix)
        },
      })
    },
  })
})

/* -------------------------------------------------
   Countdown timers (state: live urgency)
   ------------------------------------------------- */
function startCountdowns() {
  const blocks = document.querySelectorAll('[data-countdown-hours]')
  const targets = new Map()
  blocks.forEach((b) => {
    const hours = Number(b.dataset.countdownHours) || 0
    targets.set(b, Date.now() + hours * 3600 * 1000)
  })

  function pad(n) {
    return String(n).padStart(2, '0')
  }

  function tick() {
    const now = Date.now()
    targets.forEach((end, b) => {
      let diff = Math.max(0, end - now)
      const h = Math.floor(diff / 3.6e6)
      const m = Math.floor((diff % 3.6e6) / 6e4)
      const s = Math.floor((diff % 6e4) / 1000)

      const hEl = b.querySelector('[data-cd="h"]')
      if (hEl) {
        // Detailed hh:mm:ss block
        hEl.textContent = pad(h)
        b.querySelector('[data-cd="m"]').textContent = pad(m)
        b.querySelector('[data-cd="s"]').textContent = pad(s)
      } else {
        // Compact "ends in" label
        if (h >= 48) b.textContent = `ends in ${Math.round(h / 24)}d`
        else if (h >= 1) b.textContent = `ends in ${h}h ${pad(m)}m`
        else b.textContent = `ends in ${m}m ${pad(s)}s`
      }
    })
  }
  tick()
  setInterval(tick, 1000)
}
startCountdowns()

/* -------------------------------------------------
   Winners carousel (Swiper coverflow)
   ------------------------------------------------- */
new Swiper('.winners__swiper', {
  modules: [Navigation, EffectCoverflow, Autoplay],
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: 1.15,
  spaceBetween: 16,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 120,
    modifier: 2.2,
    slideShadows: false,
  },
  autoplay: reduceMotion ? false : { delay: 3200, disableOnInteraction: true },
  navigation: {
    nextEl: '.winners__swiper .swiper-button-next',
    prevEl: '.winners__swiper .swiper-button-prev',
  },
  breakpoints: {
    640: { slidesPerView: 2.2, spaceBetween: 20 },
    1024: { slidesPerView: 3.4, spaceBetween: 24 },
  },
})

/* -------------------------------------------------
   Nav background on scroll
   ------------------------------------------------- */
const nav = document.getElementById('nav')
ScrollTrigger.create({
  start: 'top -40',
  end: 99999,
  onUpdate: (self) => {
    nav.classList.toggle('is-stuck', self.scroll() > 40)
  },
})

/* -------------------------------------------------
   Magnetic buttons (premium hover physics)
   ------------------------------------------------- */
if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = 0.35
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * strength
      const y = (e.clientY - r.top - r.height / 2) * strength
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    })
  })
}
