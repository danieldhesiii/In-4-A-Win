# Graph Report - .  (2026-06-29)

## Corpus Check
- Corpus is ~4,675 words - fits in a single context window. You may not need a graph.

## Summary
- 71 nodes · 87 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Animation Dependencies|Animation Dependencies]]
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Trust & Winners|Trust & Winners]]
- [[_COMMUNITY_Page Sections|Page Sections]]
- [[_COMMUNITY_Hero & Live Animations|Hero & Live Animations]]

## God Nodes (most connected - your core abstractions)
1. `Competition Detail Page` - 6 edges
2. `showView()` - 5 edges
3. `hideView()` - 5 edges
4. `routeFromHash()` - 5 edges
5. `scripts` - 4 edges
6. `renderCompetition()` - 4 edges
7. `showWinners()` - 4 edges
8. `hideWinners()` - 4 edges
9. `Game of Skill Mechanic` - 4 edges
10. `Trust & Transparency Section` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Project README` --references--> `Game of Skill Mechanic`  [INFERRED]
  README.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll & Motion System** — in4awin_index_splitting_heading, in4awin_index_progress, in4awin_index_count_up, in4awin_index_countdown, in4awin_index_grain [INFERRED 0.85]
- **Game-of-Skill Entry Flow** — in4awin_index_competition_card, in4awin_index_comp_detail_page, in4awin_index_ticket_selector, in4awin_index_skill_question, in4awin_index_game_of_skill, in4awin_index_free_postal_entry [INFERRED 0.85]
- **Trust & Transparency System** — in4awin_index_trust, in4awin_index_reviews, in4awin_index_how_we_draw, in4awin_index_trust_metrics, in4awin_index_winners_page, in4awin_index_winner_card [INFERRED 0.85]

## Communities (10 total, 2 thin omitted)

### Community 0 - "Trust & Winners"
Cohesion: 0.14
Nodes (16): Competition Detail Page, Animated Count-Up Numbers, Countdown Timer, Featured Competition (Porsche 911 GT3 RS), Free Postal Entry Route, Game of Skill Mechanic, Hero Section, How It Works Stepper (+8 more)

### Community 1 - "Animation Dependencies"
Cohesion: 0.12
Nodes (15): dependencies, gsap, lenis, splitting, swiper, description, devDependencies, vite (+7 more)

### Community 2 - "Trust & Winners"
Cohesion: 0.13
Nodes (10): COMPETITIONS, compView, io, nav, QUESTIONS, TICKET_OPTIONS, viewTimers, WINNER_CATS (+2 more)

### Community 3 - "Trust & Winners"
Cohesion: 0.29
Nodes (8): Competition Card (clickable), Live Competitions Grid, Closing CTA, Sticky Navigation, Ticket Progress Bar, Winner Record (verifiable draw), Recent Winners Carousel, Winners Page (filterable)

### Community 4 - "Trust & Winners"
Cohesion: 0.50
Nodes (5): closeWinners(), hideWinners(), openCompetition(), routeFromHash(), showView()

### Community 5 - "Main JS Runtime"
Cohesion: 0.67
Nodes (3): clearViewTimers(), closeCompetition(), hideView()

### Community 6 - "Main JS Runtime"
Cohesion: 0.67
Nodes (3): gbp(), liveCountdown(), renderCompetition()

### Community 7 - "Trust & Winners"
Cohesion: 0.67
Nodes (3): openWinners(), renderWinners(), showWinners()

## Knowledge Gaps
- **32 isolated node(s):** `name`, `version`, `description`, `dev`, `build` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Competition Detail Page` connect `Trust & Winners` to `Trust & Winners`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `Live Verifiable Draw Process` connect `Trust & Winners` to `Trust & Winners`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Trust & Winners` be split into smaller, more focused modules?**
  _Cohesion score 0.14166666666666666 - nodes in this community are weakly interconnected._
- **Should `Animation Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `Trust & Winners` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._