# Graph Report - .  (2026-06-29)

## Corpus Check
- Corpus is ~10,453 words - fits in a single context window. You may not need a graph.

## Summary
- 119 nodes · 181 edges · 15 communities (10 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.71)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Commerce & Checkout|Commerce & Checkout]]
- [[_COMMUNITY_Animation Dependencies|Animation Dependencies]]
- [[_COMMUNITY_Commerce & Checkout|Commerce & Checkout]]
- [[_COMMUNITY_Commerce & Checkout|Commerce & Checkout]]
- [[_COMMUNITY_Compliance & Safety|Compliance & Safety]]
- [[_COMMUNITY_Commerce & Checkout|Commerce & Checkout]]
- [[_COMMUNITY_Commerce & Checkout|Commerce & Checkout]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Skill Entry & Competitions|Skill Entry & Competitions]]
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Hero & Live Animations|Hero & Live Animations]]
- [[_COMMUNITY_Page Sections|Page Sections]]
- [[_COMMUNITY_Growth & Retention|Growth & Retention]]
- [[_COMMUNITY_Page Sections|Page Sections]]

## God Nodes (most connected - your core abstractions)
1. `hideBasket()` - 9 edges
2. `hideView()` - 7 edges
3. `openBasket()` - 7 edges
4. `openPanel()` - 7 edges
5. `showView()` - 6 edges
6. `hideWinners()` - 6 edges
7. `unlockScrollIfClear()` - 6 edges
8. `lsGet()` - 6 edges
9. `saveBasket()` - 6 edges
10. `openCheckout()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `openCheckout()` --calls--> `gbp()`  [EXTRACTED]
  src/main.js → src/main.js  _Bridges community 7 → community 3_
- `renderBasket()` --calls--> `gbp()`  [EXTRACTED]
  src/main.js → src/main.js  _Bridges community 7 → community 6_
- `renderCompetition()` --calls--> `gbp()`  [EXTRACTED]
  src/main.js → src/main.js  _Bridges community 7 → community 8_
- `showView()` --calls--> `renderCompetition()`  [EXTRACTED]
  src/main.js → src/main.js  _Bridges community 8 → community 2_
- `openCompetition()` --calls--> `hideBasket()`  [EXTRACTED]
  src/main.js → src/main.js  _Bridges community 2 → community 3_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Entry to Checkout Flow** — in4awin_index_comp_detail_page, in4awin_index_ticket_selector, in4awin_index_skill_question, in4awin_index_basket, in4awin_index_checkout, in4awin_index_account [INFERRED 0.85]
- **Compliance & Safety System** — in4awin_index_age_gate, in4awin_index_responsible_play, in4awin_index_postal_entry, in4awin_index_faq, in4awin_index_skill_question [INFERRED 0.85]
- **Growth & Retention** — in4awin_index_pass, in4awin_index_charity, in4awin_index_reminder, in4awin_index_account, in4awin_index_pwa [INFERRED 0.80]

## Communities (15 total, 5 thin omitted)

### Community 0 - "Commerce & Checkout"
Cohesion: 0.06
Nodes (22): ageGate, basketDrawer, COMP_CATS, COMP_ORDER, compCats, COMPETITIONS, compGrid, compSort (+14 more)

### Community 1 - "Animation Dependencies"
Cohesion: 0.12
Nodes (15): dependencies, gsap, lenis, splitting, swiper, description, devDependencies, vite (+7 more)

### Community 2 - "Commerce & Checkout"
Cohesion: 0.21
Nodes (16): anyOverlayOpen(), clearViewTimers(), closeCompetition(), closeWinners(), hidePanel(), hideView(), hideWinners(), lockScroll() (+8 more)

### Community 3 - "Commerce & Checkout"
Cohesion: 0.23
Nodes (13): getUser(), hideBasket(), initAgeGate(), lsGet(), lsSet(), openAccount(), openCheckout(), openFaq() (+5 more)

### Community 4 - "Compliance & Safety"
Cohesion: 0.18
Nodes (11): Competition Detail Page, Category Filter & Sort Bar, Competitions Grid (filter + sort), FAQ / How To Play, Footer, Instant Win Reveal, Free Postal Entry Form, Draw Reminder Signup (+3 more)

### Community 5 - "Commerce & Checkout"
Cohesion: 0.27
Nodes (10): Account & My Entries, 18+ Age Gate, Basket Drawer, Charity Giveback Band, Guest Checkout, Sticky Navigation + Basket, In 4 A Win Pass Subscription, Responsible Play Tools (+2 more)

### Community 6 - "Commerce & Checkout"
Cohesion: 0.25
Nodes (8): addPass(), addToBasket(), basketCount(), basketTotal(), removeFromBasket(), renderBasket(), saveBasket(), updateBasketCount()

### Community 7 - "Main JS Runtime"
Cohesion: 0.50
Nodes (4): compBadge(), compCard(), gbp(), staticEnds()

### Community 8 - "Skill Entry & Competitions"
Cohesion: 0.67
Nodes (3): instantOdds(), liveCountdown(), renderCompetition()

## Knowledge Gaps
- **48 isolated node(s):** `name`, `version`, `description`, `dev`, `build` (+43 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Competition Detail Page` connect `Compliance & Safety` to `Commerce & Checkout`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `Basket Drawer` connect `Commerce & Checkout` to `Compliance & Safety`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _48 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Commerce & Checkout` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `Animation Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._