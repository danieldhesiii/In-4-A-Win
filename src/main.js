import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import Swiper from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'splitting/dist/splitting.css'
import 'swiper/css'

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let lenis = null

const pad = (n) => String(n).padStart(2, '0')
function liveCountdown(el, endTs) {
  const hEl = el.querySelector('[data-cd="h"]')
  function tick() {
    const diff = Math.max(0, endTs - Date.now())
    const h = Math.floor(diff / 3.6e6)
    const m = Math.floor((diff % 3.6e6) / 6e4)
    const s = Math.floor((diff % 6e4) / 1000)
    if (hEl) {
      hEl.textContent = pad(h)
      el.querySelector('[data-cd="m"]').textContent = pad(m)
      el.querySelector('[data-cd="s"]').textContent = pad(s)
    } else if (h >= 48) el.textContent = `ends in ${Math.round(h / 24)}d`
    else if (h >= 1) el.textContent = `ends in ${h}h ${pad(m)}m`
    else el.textContent = `ends in ${m}m ${pad(s)}s`
  }
  tick()
  return setInterval(tick, 1000)
}

/* =================================================================
   1. COMPETITION PAGES + SKILL ENTRY  (critical path, bound first)
   ================================================================= */
const WM = 'https://commons.wikimedia.org/wiki/Special:FilePath/'
const COMPETITIONS = {
  porsche: {
    name: 'Porsche 911 GT3 RS + £10,000 cash', category: 'Cars',
    image: WM + 'Porsche%20911%20GT3%20RS%20%282022%29%201X7A7164.jpg?width=1100',
    alt: 'Porsche 911 GT3 RS sports car', value: '£92,500', cashAlt: '£82,000',
    price: 2.49, sold: 8842, total: 12500, hours: 46,
    details: [
      '2022 Porsche 911 GT3 RS finished in Racing White',
      '4.0L naturally aspirated flat-six, 525 PS',
      'Plus £10,000 tax-free cash on top',
      '12 months insurance and road tax included',
      'Delivered free anywhere in mainland UK',
      'Full cash alternative of £82,000 if you prefer',
    ],
  },
  rolex: {
    name: 'Rolex Submariner Date', category: 'Luxury',
    image: WM + 'Rolex-Submariner.jpg?width=1100',
    alt: 'Rolex Submariner watch', value: '£13,200', cashAlt: '£11,000',
    price: 0.99, sold: 5210, total: 9000, hours: 18,
    details: [
      'Rolex Submariner Date, 41mm Oystersteel',
      'Brand new, full box and papers',
      '5-year Rolex international guarantee',
      'Insured, tracked delivery',
      'Or take £11,000 in cash instead',
    ],
  },
  cash25k: {
    name: '£25,000 Tax-Free Cash', category: 'Cash',
    image: WM + 'White-note-50-pounds.jpg?width=1100',
    alt: 'British banknote, cash prize', value: '£25,000', cashAlt: null,
    price: 1.2, sold: 16600, total: 20000, hours: 9,
    details: [
      '£25,000 paid directly to your bank',
      'Completely tax-free, no deductions',
      'Funds cleared within 48 hours of the draw',
      'No catch, spend it however you like',
    ],
  },
  maldives: {
    name: 'Maldives Getaway for Two', category: 'Travel',
    image: WM + 'MaldivesBungalows.jpg?width=1100',
    alt: 'Overwater villas in the Maldives', value: '£9,800', cashAlt: '£8,000',
    price: 1.49, sold: 2380, total: 7000, hours: 63,
    details: [
      '7 nights in an overwater villa',
      'Return flights for two included',
      'Half-board dining package',
      'Speedboat airport transfers',
      'Travel any time within 12 months',
      'Or take £8,000 in cash',
    ],
  },
  apple: {
    name: 'Ultimate Apple Tech Bundle', category: 'Tech',
    image: WM + 'Apple%20MacBook%20Pro%2016%22%20M2%20Max.jpg?width=1100',
    alt: 'Apple MacBook Pro 16-inch', value: '£6,400', cashAlt: '£5,000',
    price: 0.79, sold: 7360, total: 8000, hours: 5,
    details: [
      '16-inch MacBook Pro (M-series)',
      'iPhone 15 Pro Max',
      'Apple Watch Ultra 2',
      'AirPods Pro',
      'Or take £5,000 in cash',
    ],
  },
  defender: {
    name: 'Land Rover Defender 90', category: 'Cars',
    image: WM + 'Land%20Rover%20Defender%2090%20%28L663%29%20IMG%209441.jpg?width=1100',
    alt: 'Land Rover Defender 90', value: '£68,000', cashAlt: '£58,000',
    price: 2.99, sold: 9870, total: 21000, hours: 40,
    details: [
      'Brand new Land Rover Defender 90',
      'Permanent four-wheel drive',
      '12 months insurance and road tax included',
      'Delivered free anywhere in mainland UK',
      'Or take £58,000 in cash',
    ],
  },
  vouchers: {
    name: '£2,000 Voucher Vault', category: 'Vouchers',
    image: WM + 'Gift%20card%20assortment.jpg?width=1100',
    alt: 'Assortment of gift cards and vouchers', value: '£2,000', cashAlt: null,
    price: 0.5, sold: 6620, total: 10000, hours: 27,
    details: [
      '£2,000 in gift cards of your choice',
      'Amazon, John Lewis, Selfridges, M&S and more',
      'Digital delivery within 24 hours',
      'Split it across as many retailers as you like',
    ],
  },
}

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
const TICKET_OPTIONS = [1, 5, 10, 25]
const gbp = (n) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const compView = document.getElementById('compView')
let lastFocused = null
let viewTimers = []
const clearViewTimers = () => {
  viewTimers.forEach(clearInterval)
  viewTimers = []
}

function renderCompetition(id) {
  const c = COMPETITIONS[id]
  const pct = Math.round((c.sold / c.total) * 100)
  const left = (c.total - c.sold).toLocaleString('en-GB')
  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]

  compView.innerHTML = `
    <div class="compview__bar">
      <button class="compview__back" id="compBack" type="button">&larr; All competitions</button>
      <span class="compview__cat">${c.category}</span>
    </div>
    <div class="compview__grid">
      <div class="compview__media">
        <img src="${c.image}" alt="${c.alt}" />
        <div class="compview__media-foot">
          <span><b>${gbp(c.price)}</b> per ticket</span>
          <span class="compview__cash">${c.cashAlt ? 'Cash alternative ' + c.cashAlt : 'Paid as cash'}</span>
        </div>
      </div>

      <div class="compview__info">
        <h1 class="compview__title">${c.name}</h1>
        <p class="compview__value">Prize value <b>${c.value}</b></p>

        <div class="compview__meta">
          <div>
            <div class="compview__metalabel">Closes in</div>
            <div class="countdown" data-cv-countdown>
              <div class="countdown__unit"><b data-cd="h">00</b><span>hrs</span></div>
              <span class="countdown__sep">:</span>
              <div class="countdown__unit"><b data-cd="m">00</b><span>min</span></div>
              <span class="countdown__sep">:</span>
              <div class="countdown__unit"><b data-cd="s">00</b><span>sec</span></div>
            </div>
          </div>
          <div style="flex:1;min-width:200px">
            <div class="compview__metalabel">Tickets remaining</div>
            <div class="progress" style="margin-top:.3rem">
              <div class="progress__track"><span class="progress__fill" style="width:${pct}%"></span></div>
              <div class="progress__labels"><b>${left} left</b><span>${pct}% sold</span></div>
            </div>
          </div>
        </div>

        <div class="compview__details">
          <h3>What you win</h3>
          <ul>${c.details.map((d) => `<li>${d}</li>`).join('')}</ul>
        </div>

        <div class="entry" id="entryPanel">
          <div class="entry__head">
            <h3>Enter this competition</h3>
            <span class="entry__step">Game of skill</span>
          </div>

          <div class="entry__label">1 / Choose your tickets</div>
          <div class="tickets" id="ticketRow">
            ${TICKET_OPTIONS.map((n) => `<button type="button" class="tickets__opt" data-qty="${n}">${n}</button>`).join('')}
            <input type="number" class="tickets__custom" id="customQty" min="1" max="${c.total - c.sold}" inputmode="numeric" placeholder="Custom" aria-label="Custom number of tickets" />
          </div>

          <div class="odds" id="oddsBox">
            <div>
              <div class="odds__label">Your chance to win</div>
              <div class="odds__value" id="oddsValue"></div>
            </div>
            <div class="odds__boost" id="oddsBoost"></div>
          </div>

          <div class="entry__total">
            <span>Total for <b id="qtyLabel">1</b> ticket<span id="qtyPlural"></span></span>
            <b id="totalCost">${gbp(c.price)}</b>
          </div>

          <div class="entry__label">2 / Answer to qualify</div>
          <div class="skillq">
            <span class="skillq__tag">Skill question</span>
            <p class="skillq__q">${q.q}</p>
            <div class="skillq__options" id="skillOptions" role="radiogroup" aria-label="Answer options">
              ${q.options.map((o, i) => `<button type="button" class="skillq__opt" role="radio" aria-checked="false" data-i="${i}">${o}</button>`).join('')}
            </div>
          </div>

          <p class="entry__feedback" id="entryFeedback" role="status" aria-live="polite"></p>
          <button class="btn btn--accent btn--lg entry__confirm" id="entryConfirm" type="button">Confirm entry</button>
          <p class="entry__free">Prefer not to pay? A free postal entry route is always available.</p>
        </div>
      </div>
    </div>`

  const cd = compView.querySelector('[data-cv-countdown]')
  viewTimers.push(liveCountdown(cd, Date.now() + c.hours * 3.6e6))

  let qty = 1
  let selected = -1
  const maxTickets = c.total - c.sold
  const qtyLabel = compView.querySelector('#qtyLabel')
  const qtyPlural = compView.querySelector('#qtyPlural')
  const totalCost = compView.querySelector('#totalCost')
  const oddsValue = compView.querySelector('#oddsValue')
  const oddsBoost = compView.querySelector('#oddsBoost')
  const customInput = compView.querySelector('#customQty')
  const presets = [...compView.querySelectorAll('.tickets__opt')]

  function setQty(n, fromInput) {
    n = Math.floor(Number(n) || 0)
    if (n < 1) n = 1
    if (n > maxTickets) n = maxTickets
    qty = n
    qtyLabel.textContent = qty.toLocaleString('en-GB')
    qtyPlural.textContent = qty === 1 ? '' : 's'
    totalCost.textContent = gbp(c.price * qty)

    // odds: your chance = your tickets / everyone entered so far (incl. your own)
    const entrants = c.sold + qty
    const oneIn = Math.max(1, Math.round(entrants / qty))
    oddsValue.textContent = '1 in ' + oneIn.toLocaleString('en-GB')
    oddsBoost.textContent =
      qty === 1 ? 'Single entry' : qty.toLocaleString('en-GB') + '× the odds of one ticket'

    const matchedPreset = presets.find((b) => Number(b.dataset.qty) === qty)
    presets.forEach((b) => b.classList.toggle('is-active', b === matchedPreset))
    if (!fromInput) customInput.value = matchedPreset ? '' : qty
  }

  presets.forEach((b) =>
    b.addEventListener('click', () => {
      customInput.value = ''
      setQty(Number(b.dataset.qty))
    })
  )
  customInput.addEventListener('input', () => {
    if (customInput.value.trim() === '') return
    setQty(customInput.value, true)
  })
  customInput.addEventListener('blur', () => {
    if (customInput.value.trim() === '') return
    customInput.value = qty // reflect the clamped value
  })
  setQty(1)

  const feedback = compView.querySelector('#entryFeedback')
  const opts = compView.querySelectorAll('.skillq__opt')
  opts.forEach((b) =>
    b.addEventListener('click', () => {
      selected = Number(b.dataset.i)
      opts.forEach((o, j) => {
        o.classList.toggle('is-selected', j === selected)
        o.setAttribute('aria-checked', j === selected ? 'true' : 'false')
      })
      feedback.textContent = ''
      feedback.className = 'entry__feedback'
    })
  )

  compView.querySelector('#entryConfirm').addEventListener('click', () => {
    if (selected === -1) {
      feedback.textContent = 'Choose your answer to the skill question to qualify.'
      feedback.className = 'entry__feedback is-warn'
      return
    }
    if (selected === q.answer) {
      opts[selected].classList.add('is-correct')
      const panel = compView.querySelector('#entryPanel')
      panel.classList.add('entry--done')
      panel.innerHTML = `
        <div class="entry__done-icon">&#10003;</div>
        <h3>You're entered. Good luck!</h3>
        <p>${qty} ticket${qty > 1 ? 's' : ''} into <b>${c.name}</b> for ${gbp(c.price * qty)}.</p>
        <p style="margin-top:.6rem">The draw is streamed live when the timer hits zero. We'll email your unique ticket numbers shortly.</p>
        <button class="btn btn--ghost btn--lg" type="button" id="entryBackBtn" style="margin-top:1.3rem">Back to competitions</button>`
      compView.querySelector('#entryBackBtn').addEventListener('click', closeCompetition)
      try {
        if (!reduceMotion) gsap.from(panel, { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' })
      } catch (e) { /* animation is optional */ }
    } else {
      opts[selected].classList.add('is-wrong')
      feedback.textContent = 'Not quite. A fresh question is loading, try again.'
      feedback.className = 'entry__feedback is-warn'
      setTimeout(() => renderCompetition(id), 1200)
    }
  })

  compView.querySelector('#compBack').addEventListener('click', closeCompetition)
}

function showView(id) {
  lastFocused = document.activeElement
  clearViewTimers()
  renderCompetition(id)
  compView.classList.add('is-open')
  compView.setAttribute('aria-hidden', 'false')
  document.body.classList.add('view-open')
  try { if (lenis) lenis.stop() } catch (e) {}
  compView.scrollTop = 0
  const back = compView.querySelector('#compBack')
  if (back) back.focus()
}
function hideView() {
  clearViewTimers()
  compView.classList.remove('is-open')
  compView.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('view-open')
  try { if (lenis) lenis.start() } catch (e) {}
  if (lastFocused && lastFocused.focus) lastFocused.focus()
}
function openCompetition(id) {
  if (!COMPETITIONS[id]) return
  hideWinners()
  showView(id)
  if (location.hash !== '#play-' + id) history.pushState({ comp: id }, '', '#play-' + id)
}
function closeCompetition() {
  hideView()
  if (location.hash.startsWith('#play-')) history.pushState({}, '', location.pathname + location.search)
}

/* ---- Winners page ---- */
const WINNERS = [
  { name: 'Sofia N.', loc: 'Brighton', prize: 'Porsche 911 GT3 RS', value: '£92,500', date: '17 Jun 2026', draw: '2291', tickets: 18, cat: 'Cars', img: WM + 'Porsche%20911%20GT3%20RS%20%282022%29%201X7A7164.jpg?width=640' },
  { name: 'Leah M.', loc: 'Cardiff', prize: 'BMW M2 + £5,000', value: '£62,000', date: '14 Jun 2026', draw: '2288', tickets: 12, cat: 'Cars', img: WM + 'BMW%20G87%20M2%201X7A6997.jpg?width=640' },
  { name: 'Dev P.', loc: 'Leicester', prize: '£25,000 Tax-Free Cash', value: '£25,000', date: '11 Jun 2026', draw: '2285', tickets: 30, cat: 'Cash', img: WM + 'White-note-50-pounds.jpg?width=640' },
  { name: 'Grace O.', loc: 'Glasgow', prize: 'Maldives Getaway for Two', value: '£9,800', date: '7 Jun 2026', draw: '2281', tickets: 8, cat: 'Travel', img: WM + 'MaldivesBungalows.jpg?width=640' },
  { name: 'Tom R.', loc: 'Bristol', prize: 'Rolex Submariner Date', value: '£13,200', date: '4 Jun 2026', draw: '2278', tickets: 5, cat: 'Luxury', img: WM + 'Rolex-Submariner.jpg?width=640' },
  { name: 'Aisha K.', loc: 'Manchester', prize: 'Ultimate Apple Tech Bundle', value: '£6,400', date: '31 May 2026', draw: '2274', tickets: 15, cat: 'Tech', img: WM + 'Apple%20iPhone%2015%20Pro.jpg?width=640' },
  { name: 'Marcus T.', loc: 'Newcastle', prize: 'Land Rover Defender 90', value: '£68,000', date: '28 May 2026', draw: '2270', tickets: 22, cat: 'Cars', img: WM + 'Land%20Rover%20Defender%2090%20%28L663%29%20IMG%209441.jpg?width=640' },
  { name: 'Priya S.', loc: 'Birmingham', prize: '£2,000 Voucher Vault', value: '£2,000', date: '24 May 2026', draw: '2266', tickets: 6, cat: 'Vouchers', img: WM + 'Gift%20card%20assortment.jpg?width=640' },
  { name: 'Owen D.', loc: 'Swansea', prize: '£10,000 Tax-Free Cash', value: '£10,000', date: '21 May 2026', draw: '2262', tickets: 9, cat: 'Cash', img: WM + 'White-note-50-pounds.jpg?width=640' },
  { name: 'Hannah B.', loc: 'Leeds', prize: 'Rolex Submariner Date', value: '£13,200', date: '17 May 2026', draw: '2258', tickets: 4, cat: 'Luxury', img: WM + 'Rolex-Submariner.jpg?width=640' },
  { name: 'Reuben A.', loc: 'Nottingham', prize: 'Maldives Getaway for Two', value: '£9,800', date: '14 May 2026', draw: '2254', tickets: 11, cat: 'Travel', img: WM + 'MaldivesBungalows.jpg?width=640' },
  { name: 'Mia W.', loc: 'Liverpool', prize: 'MacBook Pro 16-inch', value: '£2,900', date: '10 May 2026', draw: '2250', tickets: 7, cat: 'Tech', img: WM + 'Apple%20MacBook%20Pro%2016%22%20M2%20Max.jpg?width=640' },
]
const WINNER_CATS = ['All', ...[...new Set(WINNERS.map((w) => w.cat))]]
const winnersView = document.getElementById('winnersView')
let lastFocusedW = null

function winnerCard(w) {
  return `
    <article class="wcard" data-cat="${w.cat}">
      <div class="wcard__media">
        <img src="${w.img}" alt="${w.prize}" loading="lazy" />
        <span class="wcard__value">${w.value}</span>
      </div>
      <div class="wcard__body">
        <h3 class="wcard__prize">${w.prize}</h3>
        <p class="wcard__who">${w.name} · ${w.loc}</p>
        <div class="wcard__meta">
          <span>${w.date}</span>
          <span class="wcard__draw">Draw #${w.draw} <span aria-hidden="true">&#10003;</span></span>
        </div>
        <div class="wcard__foot">
          <span>Won with ${w.tickets} ticket${w.tickets > 1 ? 's' : ''}</span>
          <a href="#" class="wcard__watch">Watch the draw &rarr;</a>
        </div>
      </div>
    </article>`
}
function renderWinners(filter) {
  const f = filter || 'All'
  const list = f === 'All' ? WINNERS : WINNERS.filter((w) => w.cat === f)
  winnersView.innerHTML = `
    <div class="compview__bar">
      <button class="compview__back" id="winBack" type="button">&larr; Back</button>
      <span class="compview__cat">Winners</span>
    </div>
    <div class="winnersview__inner">
      <div class="winnersview__head">
        <h1>Our winners</h1>
        <p>Every prize below was drawn live on stream and is independently verifiable. We don't hide a single result.</p>
      </div>
      <div class="wfilter" id="wfilter">
        ${WINNER_CATS.map((c) => `<button type="button" class="wfilter__pill${c === f ? ' is-active' : ''}" data-filter="${c}">${c}</button>`).join('')}
      </div>
      <div class="wgrid">${list.map(winnerCard).join('')}</div>
    </div>`
  winnersView.querySelector('#winBack').addEventListener('click', closeWinners)
  winnersView.querySelectorAll('.wfilter__pill').forEach((p) =>
    p.addEventListener('click', () => {
      renderWinners(p.dataset.filter)
      winnersView.scrollTop = 0
    })
  )
}
function showWinners(filter) {
  lastFocusedW = document.activeElement
  renderWinners(filter)
  winnersView.classList.add('is-open')
  winnersView.setAttribute('aria-hidden', 'false')
  document.body.classList.add('view-open')
  try { if (lenis) lenis.stop() } catch (e) {}
  winnersView.scrollTop = 0
  const b = winnersView.querySelector('#winBack')
  if (b) b.focus()
}
function hideWinners() {
  winnersView.classList.remove('is-open')
  winnersView.setAttribute('aria-hidden', 'true')
  if (!compView.classList.contains('is-open')) document.body.classList.remove('view-open')
  try { if (lenis && !compView.classList.contains('is-open')) lenis.start() } catch (e) {}
  if (lastFocusedW && lastFocusedW.focus) lastFocusedW.focus()
}
function openWinners() {
  hideView()
  showWinners('All')
  if (location.hash !== '#winners-all') history.pushState({ winners: true }, '', '#winners-all')
}
function closeWinners() {
  hideWinners()
  if (location.hash.startsWith('#winners-all')) history.pushState({}, '', location.pathname + location.search)
}

/* Single delegated handler: open competitions and the winners page. */
document.addEventListener('click', (e) => {
  const comp = e.target.closest('[data-comp]')
  if (comp && COMPETITIONS[comp.dataset.comp]) {
    e.preventDefault()
    openCompetition(comp.dataset.comp)
    return
  }
  const win = e.target.closest('[data-winners-page]')
  if (win) {
    e.preventDefault()
    openWinners()
  }
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (compView.classList.contains('is-open')) closeCompetition()
    else if (winnersView.classList.contains('is-open')) closeWinners()
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    const t = e.target.closest('[data-comp][role="link"]')
    if (t && COMPETITIONS[t.dataset.comp]) {
      e.preventDefault()
      openCompetition(t.dataset.comp)
    }
  }
})
function routeFromHash() {
  const m = location.hash.match(/^#play-(.+)/)
  if (m && COMPETITIONS[m[1]]) { hideWinners(); showView(m[1]) }
  else if (location.hash === '#winners-all') { hideView(); showWinners('All') }
  else { hideView(); hideWinners() }
}
window.addEventListener('popstate', routeFromHash)

/* =================================================================
   2. Visual enhancements (never block the critical path above)
   ================================================================= */
// Reveals + counters via native IntersectionObserver (robust, no GSAP dep)
const io = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const el = entry.target
      el.classList.add('is-in')
      if (el.classList.contains('progress')) {
        const fill = el.querySelector('.progress__fill')
        if (fill) fill.style.width = Math.min(100, Number(el.dataset.progress) || 0) + '%'
      }
      if (el.classList.contains('js-count')) countUp(el)
      obs.unobserve(el)
    })
  },
  { threshold: 0.15 }
)
function countUp(el) {
  const to = Number(el.dataset.to) || 0
  const prefix = el.dataset.prefix || ''
  const suffix = el.dataset.suffix || ''
  const fmt = (n) => prefix + Math.round(n).toLocaleString('en-GB') + suffix
  if (reduceMotion) { el.textContent = fmt(to); return }
  const start = performance.now()
  const dur = 1600
  function step(now) {
    const t = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = fmt(to * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
document.querySelectorAll('[data-reveal]').forEach((el) => {
  if (reduceMotion) el.classList.add('is-in')
  else io.observe(el)
})
document.querySelectorAll('.progress[data-progress]').forEach((el) => io.observe(el))
document.querySelectorAll('.js-count').forEach((el) => io.observe(el))

// Page countdowns
document.querySelectorAll('[data-countdown-hours]').forEach((el) =>
  liveCountdown(el, Date.now() + (Number(el.dataset.countdownHours) || 0) * 3.6e6)
)

// Nav background on scroll (cheap class toggle, passive)
const nav = document.getElementById('nav')
const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 40)
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Lenis smooth scroll + anchor routing
try {
  if (!reduceMotion) {
    gsap.registerPlugin(ScrollTrigger)
    lenis = new Lenis({ lerp: 0.1 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }
} catch (e) { lenis = null }

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (id.length <= 1 || id.startsWith('#play') || id === '#winners-all') return
    const target = document.querySelector(id)
    if (!target) return
    e.preventDefault()
    if (lenis) lenis.scrollTo(target, { offset: -80 })
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  })
})

// Hero heading character reveal
try {
  Splitting()
  if (!reduceMotion) {
    gsap.from('.hero__title .char', {
      yPercent: 115, opacity: 0, stagger: 0.018, duration: 0.8,
      ease: 'power3.out', delay: 0.15,
    })
  }
} catch (e) { /* heading stays static */ }

// Winners continuous carousel
try {
  const winnersSwiper = new Swiper('.winners__swiper', {
    modules: [Autoplay],
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerView: 1.2,
    spaceBetween: 16,
    grabCursor: true,
    speed: reduceMotion ? 500 : 4200,
    autoplay: reduceMotion ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true },
    breakpoints: {
      640: { slidesPerView: 2.4, spaceBetween: 18 },
      1024: { slidesPerView: 3.6, spaceBetween: 20 },
    },
  })
  const winNext = document.getElementById('winNext')
  const winPrev = document.getElementById('winPrev')
  if (winNext) winNext.addEventListener('click', () => winnersSwiper.slideNext(600))
  if (winPrev) winPrev.addEventListener('click', () => winnersSwiper.slidePrev(600))
} catch (e) { /* carousel optional */ }

// Deep link on first load (#play-<id> or #winners-all)
routeFromHash()
