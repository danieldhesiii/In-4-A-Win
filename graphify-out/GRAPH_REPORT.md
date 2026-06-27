# Graph Report - .  (2026-06-27)

## Corpus Check
- 2 files · ~2,011 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 36 nodes · 35 edges · 7 communities (5 shown, 2 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Hero & Live Animations|Hero & Live Animations]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Page Sections & Nav|Page Sections & Nav]]
- [[_COMMUNITY_Animation Dependencies|Animation Dependencies]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Footer|Footer]]

## God Nodes (most connected - your core abstractions)
1. `Featured Competition (Porsche 911 GT3)` - 5 edges
2. `scripts` - 4 edges
3. `Sticky Navigation` - 4 edges
4. `Competition Card` - 4 edges
5. `Magnetic CTA Button` - 3 edges
6. `Hero Section` - 2 edges
7. `Live Competitions Grid` - 2 edges
8. `Winners Carousel` - 2 edges
9. `Countdown Timer` - 2 edges
10. `Ticket Progress Bar` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Sticky Navigation` --references--> `Magnetic CTA Button`  [EXTRACTED]
  index.html → index.html  _Bridges community 2 → community 0_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll & Motion System** — in4awin_index_splitting_heading, in4awin_index_progress, in4awin_index_count_up, in4awin_index_magnetic_cta, in4awin_index_countdown [INFERRED 0.85]
- **Raffle Entry Journey** — in4awin_index_hero, in4awin_index_competitions_grid, in4awin_index_how_it_works, in4awin_index_winners [INFERRED 0.75]

## Communities (7 total, 2 thin omitted)

### Community 0 - "Hero & Live Animations"
Cohesion: 0.25
Nodes (8): Animated Count-Up Stats, Countdown Timer, Closing CTA, Featured Competition (Porsche 911 GT3), Hero Section, Magnetic CTA Button, Splitting.js Hero Heading, Stats Band

### Community 1 - "Package Metadata"
Cohesion: 0.29
Nodes (6): description, devDependencies, vite, name, type, version

### Community 2 - "Page Sections & Nav"
Cohesion: 0.40
Nodes (6): Competition Card, Live Competitions Grid, How It Works Stepper, Sticky Navigation, Ticket Progress Bar, Winners Carousel

### Community 3 - "Animation Dependencies"
Cohesion: 0.40
Nodes (5): dependencies, gsap, lenis, splitting, swiper

### Community 5 - "Build Scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

## Knowledge Gaps
- **19 isolated node(s):** `name`, `version`, `description`, `dev`, `build` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Animation Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `Featured Competition (Porsche 911 GT3)` connect `Hero & Live Animations` to `Page Sections & Nav`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `scripts` connect `Build Scripts` to `Package Metadata`?**
  _High betweenness centrality (0.066) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._