# Graph Report - .  (2026-06-27)

## Corpus Check
- Corpus is ~3,596 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 62 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Skill Entry & Detail Page|Skill Entry & Detail Page]]
- [[_COMMUNITY_Build Scripts|Build Scripts]]
- [[_COMMUNITY_Skill Entry & Detail Page|Skill Entry & Detail Page]]
- [[_COMMUNITY_Hero & Live Animations|Hero & Live Animations]]
- [[_COMMUNITY_Animation Dependencies|Animation Dependencies]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Skill Entry & Detail Page|Skill Entry & Detail Page]]
- [[_COMMUNITY_Main JS Runtime|Main JS Runtime]]
- [[_COMMUNITY_Page Sections|Page Sections]]

## God Nodes (most connected - your core abstractions)
1. `Competition Detail Page` - 6 edges
2. `Competition Card (clickable)` - 5 edges
3. `scripts` - 4 edges
4. `renderCompetition()` - 4 edges
5. `showView()` - 4 edges
6. `clearViewTimers()` - 3 edges
7. `hideView()` - 3 edges
8. `Hero Section` - 3 edges
9. `Featured Competition (Porsche 911 GT3 RS)` - 3 edges
10. `Live Competitions Grid` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Project README` --references--> `Game of Skill Mechanic`  [INFERRED]
  README.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Scroll & Motion System** — in4awin_index_splitting_heading, in4awin_index_progress, in4awin_index_count_up, in4awin_index_countdown, in4awin_index_grain [INFERRED 0.85]
- **Game-of-Skill Entry Flow** — in4awin_index_competition_card, in4awin_index_comp_detail_page, in4awin_index_ticket_selector, in4awin_index_skill_question, in4awin_index_game_of_skill, in4awin_index_free_postal_entry [INFERRED 0.85]

## Communities (9 total, 1 thin omitted)

### Community 0 - "Skill Entry & Detail Page"
Cohesion: 0.17
Nodes (8): COMPETITIONS, compView, deep, io, nav, QUESTIONS, TICKET_OPTIONS, viewTimers

### Community 1 - "Build Scripts"
Cohesion: 0.18
Nodes (10): description, devDependencies, vite, name, scripts, build, dev, preview (+2 more)

### Community 2 - "Skill Entry & Detail Page"
Cohesion: 0.24
Nodes (10): Competition Detail Page, Competition Card (clickable), Live Competitions Grid, Countdown Timer, Closing CTA, Free Postal Entry Route, Sticky Navigation, Ticket Progress Bar (+2 more)

### Community 3 - "Hero & Live Animations"
Cohesion: 0.33
Nodes (6): Animated Count-Up Stats, Featured Competition (Porsche 911 GT3 RS), Film Grain Texture Overlay, Hero Section, Splitting.js Hero Heading, Stats Band

### Community 4 - "Animation Dependencies"
Cohesion: 0.40
Nodes (5): dependencies, gsap, lenis, splitting, swiper

### Community 5 - "Main JS Runtime"
Cohesion: 0.40
Nodes (5): clearViewTimers(), closeCompetition(), hideView(), openCompetition(), showView()

### Community 6 - "Skill Entry & Detail Page"
Cohesion: 0.50
Nodes (4): Game of Skill Mechanic, How It Works Stepper, Skill Question Gate, Project README

### Community 7 - "Main JS Runtime"
Cohesion: 0.67
Nodes (3): gbp(), liveCountdown(), renderCompetition()

## Knowledge Gaps
- **30 isolated node(s):** `name`, `version`, `description`, `dev`, `build` (+25 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Competition Detail Page` connect `Skill Entry & Detail Page` to `Hero & Live Animations`, `Skill Entry & Detail Page`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `Featured Competition (Porsche 911 GT3 RS)` connect `Hero & Live Animations` to `Skill Entry & Detail Page`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _30 weakly-connected nodes found - possible documentation gaps or missing edges._