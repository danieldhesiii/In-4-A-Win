# Graph Report - .  (2026-06-27)

## Corpus Check
- 3 files · ~3,038 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 48 nodes · 48 edges · 9 communities (6 shown, 3 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Skill Entry & Competitions|Skill Entry & Competitions]]
- [[_COMMUNITY_Hero & Live Animations|Hero & Live Animations]]
- [[_COMMUNITY_Package Metadata|Package Metadata]]
- [[_COMMUNITY_Animation Dependencies|Animation Dependencies]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Modal Question Logic|Modal Question Logic]]
- [[_COMMUNITY_Footer|Footer]]
- [[_COMMUNITY_Magnetic Buttons|Magnetic Buttons]]

## God Nodes (most connected - your core abstractions)
1. `Featured Competition (Porsche 911 GT3 RS)` - 5 edges
2. `Competition Card` - 5 edges
3. `scripts` - 4 edges
4. `Skill-Question Entry Modal` - 4 edges
5. `Game of Skill Mechanic` - 4 edges
6. `Sticky Navigation` - 3 edges
7. `pickQuestion()` - 2 edges
8. `openModal()` - 2 edges
9. `Hero Section` - 2 edges
10. `Live Competitions Grid` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Project README` --references--> `Game of Skill Mechanic`  [INFERRED]
  README.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll & Motion System** — in4awin_index_splitting_heading, in4awin_index_progress, in4awin_index_count_up, in4awin_index_magnetic_cta, in4awin_index_countdown [INFERRED 0.85]
- **Game-of-Skill Entry Flow** — in4awin_index_competition_card, in4awin_index_skill_modal, in4awin_index_game_of_skill, in4awin_index_free_postal_entry, in4awin_index_winners [INFERRED 0.85]

## Communities (9 total, 3 thin omitted)

### Community 0 - "Main JS Runtime"
Cohesion: 0.18
Nodes (7): modal, nav, QUESTIONS, revealEls, winnersSwiper, winNext, winPrev

### Community 1 - "Skill Entry & Competitions"
Cohesion: 0.24
Nodes (10): Competition Card, Live Competitions Grid, Closing CTA, Free Postal Entry Route, Game of Skill Mechanic, How It Works Stepper, Sticky Navigation, Skill-Question Entry Modal (+2 more)

### Community 2 - "Hero & Live Animations"
Cohesion: 0.29
Nodes (7): Animated Count-Up Stats, Countdown Timer, Featured Competition (Porsche 911 GT3 RS), Hero Section, Ticket Progress Bar, Splitting.js Hero Heading, Stats Band

### Community 3 - "Package Metadata"
Cohesion: 0.29
Nodes (6): description, devDependencies, vite, name, type, version

### Community 4 - "Animation Dependencies"
Cohesion: 0.40
Nodes (5): dependencies, gsap, lenis, splitting, swiper

### Community 5 - "Build Scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

## Knowledge Gaps
- **26 isolated node(s):** `name`, `version`, `description`, `dev`, `build` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Featured Competition (Porsche 911 GT3 RS)` connect `Hero & Live Animations` to `Skill Entry & Competitions`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `Skill-Question Entry Modal` connect `Skill Entry & Competitions` to `Hero & Live Animations`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Animation Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._