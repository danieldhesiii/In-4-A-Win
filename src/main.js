import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'splitting/dist/splitting.css'
import 'swiper/css'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* -------------------------------------------------
   Lenis smooth scroll, synced to GSAP ticker
   (hoisted so the modal can pause/resume scrolling)
   ------------------------------------------------- */
let lenis = null
if (!reduceMotion) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

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
   Scroll reveals
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
   Progress bars fill on scroll-in
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
   Countdown timers
   ------------------------------------------------- */
function startCountdowns() {
  const blocks = document.querySelectorAll('[data-countdown-hours]')
  const targets = new Map()
  blocks.forEach((b) => {
    const hours = Number(b.dataset.countdownHours) || 0
    targets.set(b, Date.now() + hours * 3600 * 1000)
  })
  const pad = (n) => String(n).padStart(2, '0')

  function tick() {
    const now = Date.now()
    targets.forEach((end, b) => {
      const diff = Math.max(0, end - now)
      const h = Math.floor(diff / 3.6e6)
      const m = Math.floor((diff % 3.6e6) / 6e4)
      const s = Math.floor((diff % 6e4) / 1000)
      const hEl = b.querySelector('[data-cd="h"]')
      if (hEl) {
        hEl.textContent = pad(h)
        b.querySelector('[data-cd="m"]').textContent = pad(m)
        b.querySelector('[data-cd="s"]').textContent = pad(s)
      } else if (h >= 48) b.textContent = `ends in ${Math.round(h / 24)}d`
      else if (h >= 1) b.textContent = `ends in ${h}h ${pad(m)}m`
      else b.textContent = `ends in ${m}m ${pad(s)}s`
    })
  }
  tick()
  setInterval(tick, 1000)
}
startCountdowns()

/* -------------------------------------------------
   Winners carousel - continuous, never-ending loop
   (linear timing + zero-delay autoplay = a smooth conveyor)
   ------------------------------------------------- */
const winnersSwiper = new Swiper('.winners__swiper', {
  modules: [Autoplay],
  loop: true,
  loopAdditionalSlides: 3,
  slidesPerView: 1.15,
  spaceBetween: 16,
  centeredSlides: false,
  grabCursor: true,
  speed: reduceMotion ? 500 : 4200,
  allowTouchMove: true,
  autoplay: reduceMotion
    ? false
    : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
  breakpoints: {
    640: { slidesPerView: 2.2, spaceBetween: 20 },
    1024: { slidesPerView: 3.4, spaceBetween: 24 },
  },
})

// Manual nav buttons (snappier than the continuous speed)
const winNext = document.getElementById('winNext')
const winPrev = document.getElementById('winPrev')
if (winNext) winNext.addEventListener('click', () => winnersSwiper.slideNext(600))
if (winPrev) winPrev.addEventListener('click', () => winnersSwiper.slidePrev(600))

/* -------------------------------------------------
   Nav background on scroll
   ------------------------------------------------- */
const nav = document.getElementById('nav')
ScrollTrigger.create({
  start: 'top -40',
  end: 99999,
  onUpdate: (self) => nav.classList.toggle('is-stuck', self.scroll() > 40),
})

/* -------------------------------------------------
   Magnetic buttons
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

/* -------------------------------------------------
   Skill-question entry modal
   The mechanic that makes this a game of skill, not gambling:
   you must answer a question correctly to qualify for entry.
   ------------------------------------------------- */
const QUESTIONS = [
  { q: 'What is the capital city of Australia?', options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'], answer: 1 },
  { q: 'Which planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Mars', 'Earth'], answer: 1 },
  { q: 'What is 15% of 200?', options: ['25', '30', '35', '40'], answer: 1 },
  { q: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], answer: 1 },
  { q: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Monet'], answer: 2 },
  { q: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 3 },
  { q: 'In which year did humans first land on the Moon?', options: ['1965', '1969', '1972', '1959'], answer: 1 },
  { q: 'What is 9 multiplied by 7?', options: ['56', '63', '72', '49'], answer: 1 },
  { q: 'Which gas do plants mainly absorb from the air?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 2 },
  { q: 'How many minutes are there in two and a half hours?', options: ['120', '150', '160', '90'], answer: 1 },
]

const modal = document.getElementById('entryModal')
if (modal) {
  const panel = modal.querySelector('.modal__panel')
  const titleEl = document.getElementById('modalTitle')
  const qEl = document.getElementById('quizQuestion')
  const optionsEl = document.getElementById('quizOptions')
  const feedbackEl = document.getElementById('quizFeedback')
  const form = document.getElementById('quizForm')
  const submitBtn = document.getElementById('quizSubmit')

  let current = null
  let selected = -1
  let solved = false
  let lastFocused = null

  function pickQuestion() {
    current = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    selected = -1
    solved = false
    qEl.textContent = current.q
    feedbackEl.textContent = ''
    feedbackEl.className = 'quiz__feedback'
    submitBtn.textContent = 'Submit answer'
    submitBtn.disabled = false
    optionsEl.innerHTML = ''
    current.options.forEach((opt, i) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'quiz__opt'
      b.textContent = opt
      b.setAttribute('role', 'radio')
      b.setAttribute('aria-checked', 'false')
      b.addEventListener('click', () => {
        if (solved) return
        selected = i
        optionsEl.querySelectorAll('.quiz__opt').forEach((o, j) => {
          o.classList.toggle('is-selected', j === i)
          o.setAttribute('aria-checked', j === i ? 'true' : 'false')
        })
        feedbackEl.textContent = ''
        feedbackEl.className = 'quiz__feedback'
      })
      optionsEl.appendChild(b)
    })
  }

  function openModal(prize) {
    lastFocused = document.activeElement
    titleEl.textContent = prize ? `Enter: ${prize}` : 'Enter the competition'
    pickQuestion()
    modal.classList.add('is-open')
    modal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('modal-open')
    if (lenis) lenis.stop()
    requestAnimationFrame(() => {
      const first = optionsEl.querySelector('.quiz__opt')
      if (first) first.focus()
    })
  }

  function closeModal() {
    modal.classList.remove('is-open')
    modal.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('modal-open')
    if (lenis) lenis.start()
    if (lastFocused && lastFocused.focus) lastFocused.focus()
  }

  // Open from every Enter button
  document.querySelectorAll('[data-enter]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openModal(btn.dataset.prize)
    })
  })

  // Close interactions
  modal.querySelectorAll('[data-close]').forEach((el) =>
    el.addEventListener('click', closeModal)
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal()
  })

  // Submit / check answer
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (solved) {
      closeModal()
      return
    }
    if (selected === -1) {
      feedbackEl.textContent = 'Please choose an answer to qualify.'
      feedbackEl.className = 'quiz__feedback is-warn'
      return
    }
    const opts = optionsEl.querySelectorAll('.quiz__opt')
    if (selected === current.answer) {
      solved = true
      opts.forEach((o, j) => {
        o.disabled = true
        if (j === current.answer) o.classList.add('is-correct')
      })
      feedbackEl.textContent = 'Correct. You have qualified, your entry is locked in.'
      feedbackEl.className = 'quiz__feedback is-correct'
      submitBtn.textContent = "You're entered ✓"
      if (!reduceMotion) {
        gsap.fromTo(
          panel,
          { scale: 0.99 },
          { scale: 1, duration: 0.4, ease: 'back.out(2)' }
        )
      }
    } else {
      opts[selected].classList.add('is-wrong')
      feedbackEl.textContent = 'Not quite. Here is a fresh question, try again.'
      feedbackEl.className = 'quiz__feedback is-warn'
      setTimeout(pickQuestion, 1100)
    }
  })
}
