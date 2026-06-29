import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Splitting from 'splitting'
import 'splitting/dist/splitting.css'

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
    image: '/img/porsche.jpg',
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
    image: '/img/rolex.jpg',
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
    image: '/img/cash.jpg',
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
  cash5k: {
    name: '£5,000 Tax-Free Cash', category: 'Cash', soldOut: true,
    image: '/img/cash.jpg',
    alt: 'British cash prize', value: '£5,000', cashAlt: null,
    price: 0.99, sold: 8000, total: 8000, hours: 0,
    details: [
      '£5,000 paid directly to your bank',
      'Completely tax-free',
      'This competition has sold out, the draw is imminent',
    ],
  },
  instant500: {
    name: '£500 Instant Cash', category: 'Instant Win', type: 'instant',
    image: '/img/cash.jpg',
    alt: 'Instant win cash', value: '£500 top prize', cashAlt: null,
    price: 0.99, sold: 4120, total: 15000, hours: 52,
    details: [
      'Find a winning ticket and the prize is yours instantly',
      'Top prize £500, plus dozens of £50 and £10 instant wins',
      'No waiting for a draw, you find out the moment you reveal',
      'Every non-winning ticket still rolls into the £1,000 end draw',
    ],
    instant: [
      { label: '£500', prize: '£500 cash', weight: 1 },
      { label: '£50', prize: '£50 cash', weight: 6 },
      { label: '£10', prize: '£10 cash', weight: 20 },
      { label: 'No win', prize: null, weight: 173 },
    ],
  },
  instantiphone: {
    name: 'Win an iPhone 15 Pro Instantly', category: 'Instant Win', type: 'instant',
    image: WM + 'Apple%20iPhone%2015%20Pro.jpg?width=1100',
    alt: 'iPhone 15 Pro', value: 'iPhone 15 Pro', cashAlt: null,
    price: 0.79, sold: 2680, total: 9000, hours: 31,
    details: [
      'Reveal a winning ticket to claim an iPhone 15 Pro instantly',
      'Plus instant £25 site credit wins hidden throughout',
      'Delivered within 3 working days of your win',
      'Non-winning tickets roll into the weekly tech draw',
    ],
    instant: [
      { label: 'iPhone', prize: 'iPhone 15 Pro', weight: 1 },
      { label: '£25 credit', prize: '£25 site credit', weight: 8 },
      { label: 'No win', prize: null, weight: 141 },
    ],
  },
}
// Display order in the grid (featured Porsche lives in the hero, not the grid)
const COMP_ORDER = ['instant500', 'cash25k', 'rolex', 'defender', 'apple', 'maldives', 'instantiphone', 'vouchers', 'cash5k']
const COMP_CATS = ['All', 'Cars', 'Cash', 'Luxury', 'Tech', 'Travel', 'Vouchers', 'Instant Win']

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

function instantOdds(c) {
  const total = c.instant.reduce((s, p) => s + p.weight, 0)
  const win = c.instant.reduce((s, p) => s + (p.prize ? p.weight : 0), 0)
  return Math.max(1, Math.round(total / win))
}
function instantPick(c) {
  const total = c.instant.reduce((s, p) => s + p.weight, 0)
  let r = Math.random() * total
  for (const p of c.instant) { if ((r -= p.weight) < 0) return p }
  return c.instant[c.instant.length - 1]
}

function renderCompetition(id) {
  const c = COMPETITIONS[id]
  const pct = Math.round((c.sold / c.total) * 100)
  const left = (c.total - c.sold).toLocaleString('en-GB')
  const isInstant = c.type === 'instant'
  const soldOut = c.soldOut || pct >= 100
  const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]

  const entryHtml = soldOut
    ? `<div class="entry entry--done">
        <h3>This competition has sold out</h3>
        <p>Every ticket is gone and the live draw is imminent. Check the winners page shortly to see who takes it home.</p>
        <button class="btn btn--accent btn--lg" data-winners-page type="button" style="margin-top:1.2rem">See past winners</button>
      </div>`
    : `<div class="entry" id="entryPanel">
        <div class="entry__head">
          <h3>${isInstant ? 'Play instant win' : 'Enter this competition'}</h3>
          <span class="entry__step">${isInstant ? 'Instant win' : 'Game of skill'}</span>
        </div>
        <div class="entry__label">1 / Choose your tickets</div>
        <div class="tickets" id="ticketRow">
          ${TICKET_OPTIONS.map((n) => `<button type="button" class="tickets__opt" data-qty="${n}">${n}</button>`).join('')}
          <input type="number" class="tickets__custom" id="customQty" min="1" max="${c.total - c.sold}" inputmode="numeric" placeholder="Custom" aria-label="Custom number of tickets" />
        </div>
        <div class="odds" id="oddsBox">
          <div>
            <div class="odds__label">${isInstant ? 'Instant win chance per ticket' : 'Your chance to win'}</div>
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
        <button class="btn btn--accent btn--lg entry__confirm" id="entryConfirm" type="button">${isInstant ? 'Reveal my tickets' : 'Add to basket'}</button>
        <p class="entry__free"><a href="#" data-postal>Free postal entry route</a> always available.</p>
      </div>`

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
            <div class="compview__metalabel">${soldOut ? 'Status' : 'Closes in'}</div>
            ${soldOut ? '<div class="compview__soldout">Sold out</div>' : `<div class="countdown" data-cv-countdown>
              <div class="countdown__unit"><b data-cd="h">00</b><span>hrs</span></div>
              <span class="countdown__sep">:</span>
              <div class="countdown__unit"><b data-cd="m">00</b><span>min</span></div>
              <span class="countdown__sep">:</span>
              <div class="countdown__unit"><b data-cd="s">00</b><span>sec</span></div>
            </div>`}
          </div>
          <div style="flex:1;min-width:200px">
            <div class="compview__metalabel">Tickets remaining</div>
            <div class="progress" style="margin-top:.3rem">
              <div class="progress__track"><span class="progress__fill" style="width:${pct}%"></span></div>
              <div class="progress__labels"><b>${soldOut ? 'None' : left + ' left'}</b><span>${pct}% sold</span></div>
            </div>
          </div>
        </div>

        <div class="compview__details">
          <h3>${isInstant ? 'How it works' : 'What you win'}</h3>
          <ul>${c.details.map((d) => `<li>${d}</li>`).join('')}</ul>
        </div>

        ${entryHtml}
      </div>
    </div>`

  compView.querySelector('#compBack').addEventListener('click', closeCompetition)
  if (soldOut) return

  const cd = compView.querySelector('[data-cv-countdown]')
  if (cd) viewTimers.push(liveCountdown(cd, Date.now() + c.hours * 3.6e6))

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
  const perTicketOneIn = isInstant ? instantOdds(c) : 0

  function setQty(n, fromInput) {
    n = Math.floor(Number(n) || 0)
    if (n < 1) n = 1
    if (n > maxTickets) n = maxTickets
    qty = n
    qtyLabel.textContent = qty.toLocaleString('en-GB')
    qtyPlural.textContent = qty === 1 ? '' : 's'
    totalCost.textContent = gbp(c.price * qty)

    if (isInstant) {
      oddsValue.textContent = '1 in ' + perTicketOneIn.toLocaleString('en-GB')
      oddsBoost.textContent = qty === 1 ? '1 chance to win' : qty.toLocaleString('en-GB') + ' instant chances'
    } else {
      const entrants = c.sold + qty
      const oneIn = Math.max(1, Math.round(entrants / qty))
      oddsValue.textContent = '1 in ' + oneIn.toLocaleString('en-GB')
      oddsBoost.textContent = qty === 1 ? 'Single entry' : qty.toLocaleString('en-GB') + '× the odds of one ticket'
    }

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
    customInput.value = qty
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
    if (selected !== q.answer) {
      opts[selected].classList.add('is-wrong')
      feedback.textContent = 'Not quite. A fresh question is loading, try again.'
      feedback.className = 'entry__feedback is-warn'
      setTimeout(() => renderCompetition(id), 1200)
      return
    }
    opts[selected].classList.add('is-correct')
    if (isInstant) runInstantReveal(id, qty)
    else {
      addToBasket(id, qty)
      const panel = compView.querySelector('#entryPanel')
      panel.classList.add('entry--done')
      panel.innerHTML = `
        <div class="entry__done-icon">&#10003;</div>
        <h3>Added to basket</h3>
        <p>${qty} ticket${qty > 1 ? 's' : ''} for <b>${c.name}</b> at ${gbp(c.price * qty)}. You've qualified by skill.</p>
        <div class="confirm__actions" style="margin-top:1.2rem">
          <button class="btn btn--accent btn--lg" data-basket type="button">View basket &amp; checkout</button>
          <button class="btn btn--ghost btn--lg" id="entryBackBtn" type="button">Keep browsing</button>
        </div>`
      compView.querySelector('#entryBackBtn').addEventListener('click', closeCompetition)
      try { if (!reduceMotion) gsap.from(panel, { y: 10, opacity: 0, duration: 0.4, ease: 'power2.out' }) } catch (e) {}
    }
  })
}

function runInstantReveal(id, qty) {
  const c = COMPETITIONS[id]
  const results = Array.from({ length: qty }, () => instantPick(c))
  const wins = results.filter((r) => r.prize)
  const showN = Math.min(qty, 18)
  const panel = compView.querySelector('#entryPanel')
  panel.classList.add('entry--reveal')
  panel.innerHTML = `
    <div class="entry__head"><h3>Your ${qty.toLocaleString('en-GB')} ticket${qty > 1 ? 's' : ''}</h3><span class="entry__step">Instant win</span></div>
    <div class="ireveal" id="ireveal">
      ${results.slice(0, showN).map((r, i) => `<button class="itile" data-i="${i}" type="button" aria-label="Reveal ticket"><span class="itile__inner"><span class="itile__back">?</span><span class="itile__front${r.prize ? ' win' : ''}">${r.prize ? r.label : 'No win'}</span></span></button>`).join('')}
    </div>
    ${qty > showN ? `<p class="ireveal__more">+ ${(qty - showN).toLocaleString('en-GB')} more tickets revealed automatically</p>` : ''}
    <p class="entry__feedback" id="iSummary" role="status" aria-live="polite"></p>
    <div class="confirm__actions" id="iActions" hidden>
      <button class="btn btn--accent btn--lg" data-account type="button">View my entries</button>
      <button class="btn btn--ghost btn--lg" id="iAgain" type="button">Back to competitions</button>
    </div>`
  const tiles = [...panel.querySelectorAll('.itile')]
  let revealed = 0
  function finish() {
    const sum = panel.querySelector('#iSummary')
    if (wins.length) {
      sum.textContent = `You won ${wins.length} instant prize${wins.length > 1 ? 's' : ''}: ${wins.map((w) => w.prize).join(', ')}!`
      sum.className = 'entry__feedback is-ok'
    } else {
      sum.textContent = `No instant wins this time, but all ${qty.toLocaleString('en-GB')} tickets roll into the end draw. Good luck!`
      sum.className = 'entry__feedback'
    }
    panel.querySelector('#iActions').hidden = false
    panel.querySelector('#iAgain').addEventListener('click', closeCompetition)
    recordOrder('Guest', '', [{ name: c.name + (wins.length ? ' (won ' + wins.map((w) => w.prize).join(', ') + ')' : ''), qty, price: c.price }])
  }
  function flip(t) {
    if (t.classList.contains('is-flipped')) return
    t.classList.add('is-flipped')
    revealed++
    if (revealed >= tiles.length) finish()
  }
  tiles.forEach((t) => t.addEventListener('click', () => flip(t)))
  tiles.forEach((t, i) => setTimeout(() => flip(t), 280 + i * 170))
  if (tiles.length === 0) finish()
}

function showView(id) {
  lastFocused = document.activeElement
  clearViewTimers()
  renderCompetition(id)
  compView.classList.add('is-open')
  compView.setAttribute('aria-hidden', 'false')
  lockScroll()
  compView.scrollTop = 0
  const back = compView.querySelector('#compBack')
  if (back) back.focus()
}
function hideView() {
  clearViewTimers()
  compView.classList.remove('is-open')
  compView.setAttribute('aria-hidden', 'true')
  unlockScrollIfClear()
  if (lastFocused && lastFocused.focus) lastFocused.focus()
}
function openCompetition(id) {
  if (!COMPETITIONS[id]) return
  hideWinners(); hidePanel(); hideBasket()
  showView(id)
  if (location.hash !== '#play-' + id) history.pushState({ comp: id }, '', '#play-' + id)
}
function closeCompetition() {
  hideView()
  if (location.hash.startsWith('#play-')) history.pushState({}, '', location.pathname + location.search)
}

/* ---- Winners page ---- */
const WINNERS = [
  { name: 'Sofia N.', loc: 'Brighton', prize: 'Porsche 911 GT3 RS', value: '£92,500', date: '17 Jun 2026', draw: '2291', tickets: 18, cat: 'Cars', img: '/img/porsche.jpg' },
  { name: 'Leah M.', loc: 'Cardiff', prize: 'BMW M2 + £5,000', value: '£62,000', date: '14 Jun 2026', draw: '2288', tickets: 12, cat: 'Cars', img: '/img/bmw-m2.jpg' },
  { name: 'Dev P.', loc: 'Leicester', prize: '£25,000 Tax-Free Cash', value: '£25,000', date: '11 Jun 2026', draw: '2285', tickets: 30, cat: 'Cash', img: '/img/cash.jpg' },
  { name: 'Grace O.', loc: 'Glasgow', prize: 'Maldives Getaway for Two', value: '£9,800', date: '7 Jun 2026', draw: '2281', tickets: 8, cat: 'Travel', img: WM + 'MaldivesBungalows.jpg?width=640' },
  { name: 'Tom R.', loc: 'Bristol', prize: 'Rolex Submariner Date', value: '£13,200', date: '4 Jun 2026', draw: '2278', tickets: 5, cat: 'Luxury', img: '/img/rolex.jpg' },
  { name: 'Aisha K.', loc: 'Manchester', prize: 'Ultimate Apple Tech Bundle', value: '£6,400', date: '31 May 2026', draw: '2274', tickets: 15, cat: 'Tech', img: WM + 'Apple%20iPhone%2015%20Pro.jpg?width=640' },
  { name: 'Marcus T.', loc: 'Newcastle', prize: 'Land Rover Defender 90', value: '£68,000', date: '28 May 2026', draw: '2270', tickets: 22, cat: 'Cars', img: WM + 'Land%20Rover%20Defender%2090%20%28L663%29%20IMG%209441.jpg?width=640' },
  { name: 'Priya S.', loc: 'Birmingham', prize: '£2,000 Voucher Vault', value: '£2,000', date: '24 May 2026', draw: '2266', tickets: 6, cat: 'Vouchers', img: WM + 'Gift%20card%20assortment.jpg?width=640' },
  { name: 'Owen D.', loc: 'Swansea', prize: '£10,000 Tax-Free Cash', value: '£10,000', date: '21 May 2026', draw: '2262', tickets: 9, cat: 'Cash', img: '/img/cash.jpg' },
  { name: 'Hannah B.', loc: 'Leeds', prize: 'Rolex Submariner Date', value: '£13,200', date: '17 May 2026', draw: '2258', tickets: 4, cat: 'Luxury', img: '/img/rolex.jpg' },
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
  lockScroll()
  winnersView.scrollTop = 0
  const b = winnersView.querySelector('#winBack')
  if (b) b.focus()
}
function hideWinners() {
  winnersView.classList.remove('is-open')
  winnersView.setAttribute('aria-hidden', 'true')
  unlockScrollIfClear()
  if (lastFocusedW && lastFocusedW.focus) lastFocusedW.focus()
}
function openWinners() {
  hideView(); hidePanel(); hideBasket()
  showWinners('All')
  if (location.hash !== '#winners-all') history.pushState({ winners: true }, '', '#winners-all')
}
function closeWinners() {
  hideWinners()
  if (location.hash.startsWith('#winners-all')) history.pushState({}, '', location.pathname + location.search)
}

/* =================================================================
   1b. Basket, checkout, account, legal panels, grid, age gate
   ================================================================= */
const LS = { basket: 'i4_basket', orders: 'i4_orders', age: 'i4_age', user: 'i4_user', limit: 'i4_limit' }
const panelView = document.getElementById('panelView')
const basketDrawer = document.getElementById('basketDrawer')
const toastEl = document.getElementById('toast')

function anyOverlayOpen() {
  return compView.classList.contains('is-open') || winnersView.classList.contains('is-open') ||
    panelView.classList.contains('is-open') || basketDrawer.classList.contains('is-open')
}
function lockScroll() { document.body.classList.add('view-open'); try { if (lenis) lenis.stop() } catch (e) {} }
function unlockScrollIfClear() { if (!anyOverlayOpen()) { document.body.classList.remove('view-open'); try { if (lenis) lenis.start() } catch (e) {} } }

let toastTimer
function toast(msg) {
  if (!toastEl) return
  toastEl.textContent = msg
  toastEl.classList.add('is-show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 2800)
}
function lsGet(k, def) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null ? def : v } catch (e) { return def } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) {} }

/* ---- basket ---- */
let basket = lsGet(LS.basket, []) || []
function saveBasket() { lsSet(LS.basket, basket); updateBasketCount() }
function basketCount() { return basket.reduce((s, i) => s + i.qty, 0) }
function basketTotal() { return basket.reduce((s, i) => s + i.qty * i.price, 0) }
function updateBasketCount() {
  const el = document.getElementById('basketCount'); if (!el) return
  const n = basketCount(); el.textContent = n; el.hidden = n === 0
}
function addToBasket(id, qty) {
  const c = COMPETITIONS[id]; if (!c) return
  const ex = basket.find((i) => i.id === id)
  if (ex) ex.qty = Math.min(ex.qty + qty, c.total - c.sold)
  else basket.push({ id, name: c.name, price: c.price, image: c.image, qty })
  saveBasket()
}
function addPass() {
  if (!basket.find((i) => i.id === 'pass')) basket.push({ id: 'pass', name: 'In 4 A Win Pass (monthly)', price: 9.99, image: '/icon.svg', qty: 1 })
  saveBasket(); toast('Pass added to basket'); openBasket()
}
function removeFromBasket(id) { basket = basket.filter((i) => i.id !== id); saveBasket(); renderBasket() }
function renderBasket() {
  const body = document.getElementById('basketBody'), foot = document.getElementById('basketFoot')
  if (!body) return
  if (basket.length === 0) {
    body.innerHTML = '<p class="drawer__empty">Your basket is empty. Pick a competition to get started.</p>'
    foot.innerHTML = ''
    return
  }
  body.innerHTML = basket.map((i) => `
    <div class="bitem">
      <img src="${i.image}" alt="" />
      <div class="bitem__info"><b>${i.name}</b><span>${i.qty} ticket${i.qty > 1 ? 's' : ''} · ${gbp(i.price)} each</span></div>
      <div class="bitem__right"><b>${gbp(i.qty * i.price)}</b><button class="bitem__remove" data-remove="${i.id}" type="button">Remove</button></div>
    </div>`).join('')
  foot.innerHTML = `
    <div class="drawer__total"><span>Total</span><b>${gbp(basketTotal())}</b></div>
    <button class="btn btn--accent btn--lg" data-checkout type="button" style="width:100%">Checkout</button>
    <button class="btn btn--ghost btn--sm" data-basket-close type="button" style="width:100%;margin-top:.6rem">Keep browsing</button>`
}
function openBasket() {
  hideView(); hideWinners(); hidePanel()
  renderBasket()
  basketDrawer.classList.add('is-open')
  basketDrawer.setAttribute('aria-hidden', 'false')
  lockScroll()
}
function hideBasket() {
  basketDrawer.classList.remove('is-open')
  basketDrawer.setAttribute('aria-hidden', 'true')
  unlockScrollIfClear()
}

/* ---- generic panel ---- */
let lastFocusedP = null
function openPanel(html, label) {
  lastFocusedP = document.activeElement
  panelView.innerHTML = `
    <div class="compview__bar">
      <button class="compview__back" id="panelBack" type="button">&larr; Back</button>
      <span class="compview__cat">${label}</span>
    </div>
    <div class="panelview__inner">${html}</div>`
  panelView.querySelector('#panelBack').addEventListener('click', hidePanel)
  panelView.classList.add('is-open')
  panelView.setAttribute('aria-hidden', 'false')
  lockScroll()
  panelView.scrollTop = 0
  const b = panelView.querySelector('#panelBack'); if (b) b.focus()
}
function hidePanel() {
  panelView.classList.remove('is-open')
  panelView.setAttribute('aria-hidden', 'true')
  unlockScrollIfClear()
  if (lastFocusedP && lastFocusedP.focus) lastFocusedP.focus()
}

/* ---- orders / account ---- */
function recordOrder(name, email, items) {
  const order = { id: 'IN4-' + Math.floor(100000 + Math.random() * 899999), date: new Date().toISOString(), name, email, items, total: items.reduce((s, i) => s + i.qty * i.price, 0) }
  const orders = lsGet(LS.orders, []) || []
  orders.unshift(order)
  lsSet(LS.orders, orders)
  return order
}
function getUser() { return lsGet(LS.user, null) }

function openCheckout() {
  if (basket.length === 0) { toast('Your basket is empty'); return }
  hideBasket()
  const items = basket.map((i) => `<div class="sumrow"><span>${i.name} × ${i.qty}</span><b>${gbp(i.qty * i.price)}</b></div>`).join('')
  openPanel(`
    <div class="checkout">
      <div class="checkout__main">
        <h1>Checkout</h1>
        <form id="checkoutForm" novalidate>
          <h3>Your details</h3>
          <div class="field"><label for="coName">Full name</label><input id="coName" autocomplete="name" required /></div>
          <div class="field"><label for="coEmail">Email</label><input id="coEmail" type="email" autocomplete="email" required /></div>
          <h3>Payment</h3>
          <div class="field"><label for="coCard">Card number</label><input id="coCard" inputmode="numeric" placeholder="4242 4242 4242 4242" autocomplete="cc-number" required /></div>
          <div class="field-row">
            <div class="field"><label for="coExp">Expiry</label><input id="coExp" placeholder="MM/YY" autocomplete="cc-exp" required /></div>
            <div class="field"><label for="coCvc">CVC</label><input id="coCvc" inputmode="numeric" placeholder="123" autocomplete="cc-csc" required /></div>
          </div>
          <label class="check"><input type="checkbox" id="coAge" /> <span>I confirm I am 18 or over and accept the terms.</span></label>
          <p class="entry__feedback" id="coMsg" role="status"></p>
          <button class="btn btn--accent btn--lg" type="submit" style="width:100%">Pay ${gbp(basketTotal())}</button>
          <p class="checkout__note">Demo checkout, no real payment is taken. A free postal entry route is always available.</p>
        </form>
      </div>
      <aside class="checkout__summary">
        <h3>Order summary</h3>
        ${items}
        <div class="sumrow sumrow--total"><span>Total</span><b>${gbp(basketTotal())}</b></div>
      </aside>
    </div>`, 'Checkout')
  panelView.querySelector('#checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = panelView.querySelector('#coMsg')
    const name = panelView.querySelector('#coName').value.trim()
    const email = panelView.querySelector('#coEmail').value.trim()
    const card = panelView.querySelector('#coCard').value.replace(/\s/g, '')
    const age = panelView.querySelector('#coAge').checked
    if (!name || !/.+@.+\..+/.test(email) || card.length < 12 || !age) {
      msg.textContent = 'Please complete every field, use a valid card number and confirm your age.'
      msg.className = 'entry__feedback is-warn'
      return
    }
    const order = recordOrder(name, email, basket.map((i) => ({ name: i.name, qty: i.qty, price: i.price })))
    lsSet(LS.user, { name, email })
    basket = []; saveBasket()
    const entries = order.items.reduce((s, i) => s + i.qty, 0)
    openPanel(`
      <div class="confirm">
        <div class="entry__done-icon">&#10003;</div>
        <h1>Order confirmed</h1>
        <p>Thanks ${name}. Order <b>${order.id}</b> is in: ${entries} entr${entries > 1 ? 'ies' : 'y'} across ${order.items.length} competition${order.items.length > 1 ? 's' : ''}.</p>
        <p style="margin-top:.5rem">We've emailed your unique ticket numbers to ${email}. Watch the live draw when each timer hits zero.</p>
        <div class="confirm__actions">
          <button class="btn btn--accent btn--lg" data-account type="button">View my entries</button>
          <button class="btn btn--ghost btn--lg" id="confHome" type="button">Back to competitions</button>
        </div>
      </div>`, 'Order confirmed')
    panelView.querySelector('#confHome').addEventListener('click', hidePanel)
  })
}

function openAccount() {
  hideBasket()
  const user = getUser()
  const orders = lsGet(LS.orders, []) || []
  const entriesHtml = orders.length === 0
    ? '<p class="acct__empty">No entries yet. When you enter a competition it appears here.</p>'
    : orders.map((o) => `<div class="acct__order"><div class="acct__order-head"><b>${o.id}</b><span>${new Date(o.date).toLocaleDateString('en-GB')}</span></div>${o.items.map((i) => `<div class="sumrow"><span>${i.name} × ${i.qty}</span><b>${gbp(i.qty * i.price)}</b></div>`).join('')}</div>`).join('')
  const ref = (user ? user.email.split('@')[0] : 'guest').replace(/[^a-z0-9]/gi, '').toLowerCase() || 'guest'
  openPanel(`
    <div class="acct">
      <h1>${user ? 'Hi, ' + user.name.split(' ')[0] : 'Your account'}</h1>
      <p class="acct__sub">${user ? user.email : 'Sign in to track entries, set limits and refer friends.'}</p>
      ${user ? '' : `<form id="signinForm" class="acct__signin"><div class="field"><label for="siName">Name</label><input id="siName" required /></div><div class="field"><label for="siEmail">Email</label><input id="siEmail" type="email" required /></div><button class="btn btn--accent" type="submit">Continue</button></form>`}
      <h3>My entries</h3>
      <div class="acct__orders">${entriesHtml}</div>
      <div class="acct__grid">
        <div class="acct__tile"><h4>Refer a friend</h4><p>Share your link. You both get £5 site credit on their first entry.</p><div class="acct__ref">in4awin.com/r/${ref}</div></div>
        <div class="acct__tile"><h4>Perks</h4><ul><li>Bronze tier, 1× points per £1</li><li>120 points to your next reward</li><li>Members-only weekly free draw</li></ul></div>
        <div class="acct__tile"><h4>Play your way</h4><p>Set a monthly spend limit or take a break whenever you need to.</p><button class="btn btn--ghost btn--sm" data-responsible type="button">Responsible play tools</button></div>
      </div>
    </div>`, 'My account')
  const sf = panelView.querySelector('#signinForm')
  if (sf) sf.addEventListener('submit', (e) => { e.preventDefault(); const n = panelView.querySelector('#siName').value.trim(); const em = panelView.querySelector('#siEmail').value.trim(); if (!n || !em) return; lsSet(LS.user, { name: n, email: em }); openAccount() })
}

function openPostal() {
  hideBasket()
  const opts = ['porsche', ...COMP_ORDER].map((k) => `<option value="${k}">${COMPETITIONS[k].name}</option>`).join('')
  openPanel(`
    <div class="legal">
      <h1>Free postal entry</h1>
      <p>No purchase is necessary. You can enter any competition free by post, with the same chance of winning as a paid entry.</p>
      <ol class="legal__steps">
        <li>Hand-write your name, address, email, date of birth and the competition you wish to enter.</li>
        <li>Include your answer to that competition's skill question.</li>
        <li>Post it to: In 4 A Win Ltd, Free Entry, PO Box 4421, London, EC1A 1AA.</li>
        <li>One entry per envelope. Entries must arrive before the competition closes.</li>
      </ol>
      <h3>Register your postal entry online</h3>
      <form id="postalForm" class="legal__form" novalidate>
        <div class="field"><label for="poName">Full name</label><input id="poName" required /></div>
        <div class="field"><label for="poAddr">Postal address</label><input id="poAddr" required /></div>
        <div class="field"><label for="poComp">Competition</label><select id="poComp">${opts}</select></div>
        <div class="field"><label for="poAns">Your skill answer</label><input id="poAns" required /></div>
        <p class="entry__feedback" id="poMsg" role="status"></p>
        <button class="btn btn--accent btn--lg" type="submit">Register postal entry</button>
      </form>
    </div>`, 'Free postal entry')
  panelView.querySelector('#postalForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const ok = ['poName', 'poAddr', 'poAns'].every((idf) => panelView.querySelector('#' + idf).value.trim())
    const msg = panelView.querySelector('#poMsg')
    if (!ok) { msg.textContent = 'Please complete every field.'; msg.className = 'entry__feedback is-warn'; return }
    msg.textContent = 'Postal entry registered. Pop your written entry in the post to confirm.'
    msg.className = 'entry__feedback is-ok'
    e.target.reset()
  })
}

function openResponsible() {
  hideBasket()
  const limit = lsGet(LS.limit, '') || ''
  openPanel(`
    <div class="legal">
      <h1>Responsible play</h1>
      <p>Playing should always be fun. Use these tools to stay in control, and reach out if it ever stops feeling that way.</p>
      <div class="rp">
        <div class="rp__tile">
          <h3>Monthly spend limit</h3>
          <p>Cap how much you can spend each month. Decreases apply instantly, increases take 24 hours.</p>
          <form id="limitForm" class="rp__limit"><span>£</span><input id="rpLimit" inputmode="numeric" value="${limit}" placeholder="100" /><button class="btn btn--accent btn--sm" type="submit">Save</button></form>
          <p class="entry__feedback" id="rpMsg" role="status"></p>
        </div>
        <div class="rp__tile">
          <h3>Take a break</h3>
          <p>Pause your account with a cool-off period. You won't be able to enter until it ends.</p>
          <div class="rp__breaks">${['24 hours', '1 week', '1 month', '6 months'].map((b) => `<button class="btn btn--ghost btn--sm" data-break="${b}" type="button">${b}</button>`).join('')}</div>
        </div>
      </div>
      <div class="rp__help">
        <h3>Need to talk to someone?</h3>
        <p>Free, confidential support is available any time.</p>
        <ul><li>BeGambleAware.org, 0808 8020 133</li><li>GamCare, 0808 8020 133</li><li>Samaritans, 116 123</li></ul>
      </div>
    </div>`, 'Responsible play')
  panelView.querySelector('#limitForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const v = panelView.querySelector('#rpLimit').value.trim()
    lsSet(LS.limit, v)
    const m = panelView.querySelector('#rpMsg')
    m.textContent = v ? 'Monthly limit set to £' + v + '.' : 'Limit cleared.'
    m.className = 'entry__feedback is-ok'
  })
  panelView.querySelectorAll('[data-break]').forEach((b) => b.addEventListener('click', () => toast('Cool-off requested: ' + b.dataset.break + '. (Demo)')))
}

const FAQS = [
  { q: 'Is In 4 A Win gambling?', a: 'No. Every competition is decided by a skill question you must answer correctly to qualify, so it is a prize competition, not a lottery. A free postal entry route is always available.' },
  { q: 'How are winners drawn?', a: 'When the timer hits zero, every qualifying ticket gets a number and the winner is drawn live on our stream using a publicly seeded random draw that anyone can re-check.' },
  { q: 'What if a competition does not sell out?', a: 'The draw still goes ahead on the published date with the tickets sold, so there is always a guaranteed winner.' },
  { q: 'Can I take cash instead of the prize?', a: 'Yes. Where shown, every car and luxury prize has a cash alternative you can choose instead.' },
  { q: 'How do instant wins work?', a: 'On instant-win competitions you find out the moment you reveal your ticket. Non-winning tickets still roll into the end draw.' },
  { q: 'How quickly are prizes paid?', a: 'Cash prizes are paid to your bank within 48 hours of the draw. Physical prizes are delivered or arranged within a few working days.' },
  { q: 'Is there an age limit?', a: 'Yes, you must be 18 or over to enter.' },
]
function openFaq() {
  hideBasket()
  openPanel(`
    <div class="legal">
      <h1>How it works &amp; FAQ</h1>
      <div class="faq">${FAQS.map((f, i) => `<details class="faq__item"${i === 0 ? ' open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div>
    </div>`, 'FAQ')
}

/* ---- competitions grid (filter + sort + badges) ---- */
const compGrid = document.getElementById('compGrid')
const compCats = document.getElementById('compCats')
const compSort = document.getElementById('compSort')
let activeCat = 'All'
function staticEnds(h) { if (h <= 0) return 'Draw imminent'; if (h >= 48) return 'ends in ' + Math.round(h / 24) + 'd'; if (h >= 1) return 'ends in ' + h + 'h'; return 'ending now' }
function compBadge(c) {
  const pct = Math.round(c.sold / c.total * 100)
  if (c.soldOut || pct >= 100) return '<span class="cbadge cbadge--out">Sold out</span>'
  if (c.type === 'instant') return '<span class="cbadge cbadge--instant">Instant win</span>'
  if (pct >= 90) return '<span class="cbadge cbadge--hot">Almost gone</span>'
  if (c.hours <= 12) return '<span class="cbadge cbadge--soon">Ending soon</span>'
  return ''
}
function compCard(id) {
  const c = COMPETITIONS[id]
  const pct = Math.round(c.sold / c.total * 100)
  const sold = c.soldOut || pct >= 100
  const left = (c.total - c.sold).toLocaleString('en-GB')
  return `
    <article class="card${sold ? ' card--out' : ''}" data-comp="${id}" role="link" tabindex="0" aria-label="Open ${c.name}">
      <div class="card__media">
        <img src="${c.image}" alt="${c.alt}" loading="lazy" />
        <span class="card__ticket">${gbp(c.price)} / ticket</span>
        ${compBadge(c)}
      </div>
      <div class="card__body">
        <h3 class="card__title">${c.name}</h3>
        <p class="card__meta">Worth ${c.value}${c.cashAlt ? ' · or ' + c.cashAlt + ' cash' : ''}</p>
        <div class="progress">
          <div class="progress__track"><span class="progress__fill" style="width:${pct}%"></span></div>
          <div class="progress__labels"><b>${c.sold.toLocaleString('en-GB')} sold</b><span>${sold ? 'Sold out' : left + ' left'}</span></div>
        </div>
        <div class="card__foot">
          <span class="card__timer">${staticEnds(c.hours)}</span>
          <span class="card__cta">${sold ? 'View' : 'Enter'} <span aria-hidden="true">&rarr;</span></span>
        </div>
      </div>
    </article>`
}
function renderGrid() {
  if (!compGrid) return
  let ids = COMP_ORDER.filter((id) => activeCat === 'All' || COMPETITIONS[id].category === activeCat)
  const sort = compSort ? compSort.value : 'ending'
  ids.sort((a, b) => {
    const A = COMPETITIONS[a], B = COMPETITIONS[b]
    if (sort === 'popular') return (B.sold / B.total) - (A.sold / A.total)
    if (sort === 'priceup') return A.price - B.price
    if (sort === 'pricedown') return B.price - A.price
    return A.hours - B.hours
  })
  ids.sort((a, b) => (COMPETITIONS[a].soldOut ? 1 : 0) - (COMPETITIONS[b].soldOut ? 1 : 0))
  const passCard = `
    <article class="card card--pass" data-add-pass role="button" tabindex="0" aria-label="Get the In 4 A Win Pass">
      <div class="card__body">
        <span class="cbadge cbadge--instant card--pass__badge">Best value</span>
        <h3 class="card__title">In 4 A Win Pass</h3>
        <p class="card__meta">Auto-enter every weekly draw, skip the question each time, and unlock members-only instant wins.</p>
        <div class="passcard__price"><b>£9.99</b><span>/ month</span></div>
        <span class="btn btn--accent btn--sm">Get the Pass</span>
      </div>
    </article>`
  compGrid.innerHTML = passCard + (ids.map(compCard).join('') || '<p class="comps__empty">No competitions in this category right now.</p>')
}
function renderCats() {
  if (!compCats) return
  compCats.innerHTML = COMP_CATS.map((c) => `<button class="comps__cat${c === activeCat ? ' is-active' : ''}" data-cat="${c}" type="button">${c}</button>`).join('')
  compCats.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => { activeCat = b.dataset.cat; renderCats(); renderGrid() }))
}

/* ---- age gate ---- */
const ageGate = document.getElementById('ageGate')
function initAgeGate() {
  if (!ageGate) return
  if (!lsGet(LS.age, null)) {
    ageGate.classList.add('is-open'); ageGate.setAttribute('aria-hidden', 'false'); document.body.classList.add('age-lock')
  }
  const yes = document.getElementById('ageYes'), no = document.getElementById('ageNo')
  if (yes) yes.addEventListener('click', () => { lsSet(LS.age, 1); ageGate.classList.remove('is-open'); ageGate.setAttribute('aria-hidden', 'true'); document.body.classList.remove('age-lock') })
  if (no) no.addEventListener('click', () => { ageGate.querySelector('.agegate__panel').innerHTML = '<span class="agegate__mark">18+</span><h2>Sorry, you must be 18 or over</h2><p>You need to be at least 18 to use In 4 A Win. Please come back when you are old enough.</p>' })
}

/* ---- delegated click + keyboard ---- */
document.addEventListener('click', (e) => {
  const t = e.target
  const comp = t.closest('[data-comp]')
  if (comp && COMPETITIONS[comp.dataset.comp]) { e.preventDefault(); openCompetition(comp.dataset.comp); return }
  if (t.closest('[data-winners-page]')) { e.preventDefault(); openWinners(); return }
  if (t.closest('[data-basket-close]')) { e.preventDefault(); hideBasket(); return }
  if (t.closest('[data-basket]')) { e.preventDefault(); openBasket(); return }
  if (t.closest('[data-checkout]')) { e.preventDefault(); openCheckout(); return }
  const rem = t.closest('[data-remove]'); if (rem) { e.preventDefault(); removeFromBasket(rem.dataset.remove); return }
  if (t.closest('[data-account]')) { e.preventDefault(); openAccount(); return }
  if (t.closest('[data-postal]')) { e.preventDefault(); openPostal(); return }
  if (t.closest('[data-responsible]')) { e.preventDefault(); openResponsible(); return }
  if (t.closest('[data-faq]')) { e.preventDefault(); openFaq(); return }
  if (t.closest('[data-add-pass]')) { e.preventDefault(); addPass(); return }
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (basketDrawer.classList.contains('is-open')) hideBasket()
    else if (panelView.classList.contains('is-open')) hidePanel()
    else if (compView.classList.contains('is-open')) closeCompetition()
    else if (winnersView.classList.contains('is-open')) closeWinners()
    return
  }
  if (e.key === 'Enter' || e.key === ' ') {
    const t = e.target.closest('[data-comp][role="link"]')
    if (t && COMPETITIONS[t.dataset.comp]) { e.preventDefault(); openCompetition(t.dataset.comp); return }
    const p = e.target.closest('[data-add-pass]')
    if (p) { e.preventDefault(); addPass() }
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
    const wasOverlay = anyOverlayOpen()
    if (compView.classList.contains('is-open')) closeCompetition()
    if (winnersView.classList.contains('is-open')) closeWinners()
    if (panelView.classList.contains('is-open')) hidePanel()
    if (basketDrawer.classList.contains('is-open')) hideBasket()
    closeMobileMenu()
    const go = () => { if (lenis) lenis.scrollTo(target, { offset: -68 }); else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }) }
    if (wasOverlay) requestAnimationFrame(go); else go()
  })
})

// Mobile nav menu
const navEl = document.getElementById('nav')
const navToggle = document.getElementById('navToggle')
function closeMobileMenu() { if (navEl) navEl.classList.remove('is-menu-open') }
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navEl.classList.toggle('is-menu-open')
    navToggle.setAttribute('aria-expanded', navEl.classList.contains('is-menu-open') ? 'true' : 'false')
  })
  navEl.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', closeMobileMenu))
}

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

// Winners: seamless infinite marquee. Duplicate the cards so the loop never
// shows a reset point; pause only while the visitor is hovering or touching it.
try {
  const track = document.getElementById('winnersTrack')
  if (track) {
    const originals = [...track.children]
    originals.forEach((n) => { const c = n.cloneNode(true); c.setAttribute('aria-hidden', 'true'); track.appendChild(c) })
    if (reduceMotion) {
      track.style.animation = 'none'
    } else {
      track.style.setProperty('--marquee-dur', originals.length * 5 + 's')
      const pause = () => { track.style.animationPlayState = 'paused' }
      const run = () => { track.style.animationPlayState = 'running' }
      track.addEventListener('mouseenter', pause)
      track.addEventListener('mouseleave', run)
      track.addEventListener('pointerdown', pause)
      window.addEventListener('pointerup', run)
      window.addEventListener('pointercancel', run)
    }
  }
} catch (e) { /* marquee optional */ }

// Deep link on first load (#play-<id> or #winners-all)
routeFromHash()

/* ---- init: grid, basket count, age gate, reminders, PWA ---- */
renderCats()
renderGrid()
updateBasketCount()
initAgeGate()
if (compSort) compSort.addEventListener('change', renderGrid)

const remindForm = document.getElementById('remindForm')
if (remindForm) {
  remindForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const m = document.getElementById('remindMsg')
    if (m) m.textContent = "You're on the list. We'll email you before the next draw."
    const inp = remindForm.querySelector('input')
    if (inp) inp.value = ''
  })
}

if (import.meta.env && import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
