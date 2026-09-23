# Scroll animations — handoff

This file is the source of truth for the animation work on the portfolio. Each
step is done in its own fresh Claude Code session. Every session should:

1. Read this whole file first.
2. Do **only** its step, following the spec below.
3. Verify in the browser (dev server via `npm run dev`, check desktop and 375px
   mobile, light and dark theme, and `prefers-reduced-motion: reduce`).
4. Run `npm run typecheck` and `npm run build`.
5. Tick its box in **Status**, add a short entry to **Log** (what changed, which
   files, anything the next step should know).
6. Commit the step on the **`dev`** branch (`git switch dev` first) and
   `git push origin dev`. One commit per step, message like
   `Animations step N: <name>`. Never commit to or push `main`, and never
   deploy — Dev merges `dev` into `main` when ready.
7. Tell Dev it is done and give them the prompt for the next step (from
   **Session prompts**).

## Design principles (apply to every step)

The site reads as an engineer's notebook: single 720px column, Instrument Serif
headlines, JetBrains Mono body, faint grid background, one orange accent
(`--accent`). Motion should communicate, orient, or get out of the way.

- **Durations** 200–500ms, ease-out curves (`cubic-bezier(0.2, 0.7, 0.2, 1)`
  is the house curve). No bounce, no overshoot.
- **Only animate `transform`, `opacity`, `clip-path`, stroke-dash
  properties.** Nothing that causes layout shift.
- **Content is never gated.** Nothing waits long enough for a reader to notice.
  Keep `Reveal`'s 400px early-trigger margin.
- **One accent motion per screen.** Orange motion is reserved for the thing
  that matters in that view.
- **Reduced motion** — `styles.css` ends with a `prefers-reduced-motion` block.
  Every new effect must land in its final state there, with no delay.
- **No new dependencies.** IntersectionObserver, CSS, and CSS scroll-driven
  animations (`animation-timeline`) behind `@supports`, with a JS or static
  fallback.
- Colors only through the CSS custom properties, so both themes work.

## Status

- [x] **Step 1 — #9 Live architecture diagrams**
- [x] **Step 2 — #1 Hero load sequence**
- [x] **Step 3 — #4 Nav sliding highlight + scroll progress**
- [x] **Step 4 — #7 Self-drawing dividers**
- [ ] **Step 5 — #8 Staggered content reveals**
- [ ] **Step 6 — #6 Decoding section index labels (toned down)**
- [ ] **Step 7 — #11 Experience timeline fill (line only)**

## Specs

### Step 1 — Live architecture diagrams (`src/components/ArchDiagram.tsx`)
When a project's "View architecture" disclosure opens, the diagram builds in
data-flow order: boxes scale/fade in, solid arrows draw along their path,
arrowheads land when the line arrives, dashed arrows and labels fade in last.
Then orange packets (dot + short trail) travel the arrows in flow order and
loop with a rest between cycles. Dashed/return paths carry a hollow ring
instead. Replays on every open; packets pause off-screen, when closed, and
never run under reduced motion. Disclosures also get a height transition where
`interpolate-size` is supported (progressive enhancement).

### Step 2 — Hero load sequence (`Hero.tsx`, `styles.css`)
Plays once on load, total under ~1s, never blocks reading.
- Headline: each word rises ~0.4em from behind an `overflow: clip` mask,
  40–60ms stagger. Keep the `<h1>` text intact for screen readers (wrap words
  in `aria-hidden` spans plus a visually-hidden full copy, or `aria-label`).
- After the words land, an orange underline draws left→right under
  *actually happening* (`<em>`), via `scaleX` on a pseudo-element or an SVG
  stroke. Thin (1.5–2px), slightly below the baseline.
- Then intro paragraph, CTA row, and "Currently" block fade/rise in a short
  cascade (~80ms apart). Avatar/name block comes in first with the headline.
- No parallax, no scroll-linked hero effects (explicitly rejected).

### Step 3 — Nav (`Nav.tsx`, `styles.css`)
- Replace the jumping `.is-active` background with a single absolutely
  positioned indicator that slides/resizes to the active link (measure with
  `offsetLeft`/`offsetWidth`, transition `transform` + `width`, ~300ms). It
  should fade out when no section is active (top of page). Handle resize and
  font load (`document.fonts.ready`).
- A 1px orange scroll-progress line along the bottom inner edge of
  `.nav__pill`, `scaleX` 0→1 with page scroll. Use
  `animation-timeline: scroll(root)` under `@supports`, rAF-throttled scroll
  listener as fallback.
- Keep `aria-current` behavior as is.

### Step 4 — Self-drawing dividers (`hr.rule` in `App.tsx`, `styles.css`)
Each `.rule` draws from left to right as it enters the viewport, tied to scroll
position (`animation-timeline: view()`, range roughly `entry 0% cover 30%`),
`transform: scaleX()` with `transform-origin: left`. Fallback for browsers
without scroll timelines: one-shot IntersectionObserver trigger with a ~600ms
transition. Reduced motion: fully drawn.

### Step 5 — Staggered reveals (`Reveal.tsx`, section components, `styles.css`)
Replace whole-block fades with per-item stagger where there are lists:
Q&A items and stack chips (Building), project cards (Projects), Curious items,
Experience items and skill groups (About). 40–60ms stagger, cap total stagger
at ~400ms so long lists don't drag. Suggested approach: `Reveal` gains a
`stagger` mode that sets `--i` on direct children (or children opt in via a
`.reveal-item` class) and CSS uses `transition-delay: calc(var(--i) * 50ms)`.
Keep the `?` glyph in `.qa__q span` rotating ~-90°→0 into place as part of its
item's entrance. Project cards: clean rise only, **no tilt, no stamp**.

### Step 6 — Decoding index labels (`Section.tsx`)
Only the small mono `.section__index` label (e.g. `02 / WORK`). When it enters
view, characters resolve left→right from random glyphs to the real text over
~300ms total, once. Keep separators (`/`, spaces) fixed. Glyph pool: mono-safe
uppercase + digits. Must not shift layout (the label is mono, so width is
stable; set `min-width` in `ch` if needed). Real text in the DOM for screen
readers (`aria-label` on the element, scrambled text `aria-hidden`). Serif
`.section__title` is **not** scrambled — it may rise in with the section
reveal. Reduced motion: no scramble.

### Step 7 — Experience timeline (`About.tsx`, `styles.css`)
A 1px vertical line down the left of `.xp`, in `--border`, with an orange
overlay that fills top→bottom as the list scrolls through the viewport
(`animation-timeline: view()` on `.xp`, `scaleY` with `transform-origin: top`;
IntersectionObserver/scroll fallback). **Line only — no per-item dots.** The
existing `.pulse` on the current job stays. Adjust `.xp__item` left padding to
make room; check the 620px breakpoint layout.

## Verification tips (learned in step 1)

- When the in-app Browser pane is hidden, the page renders **no frames**:
  `requestAnimationFrame` never fires and CSS animations don't advance, except
  briefly while a screenshot is taken. Screenshots also come back blank when
  the page is scrolled. Workarounds that worked:
  - Move the element under test into a `position: fixed` overlay at the top
    and `scrollTo(0, 0)` before screenshotting.
  - Scrub CSS animations with `el.getAnimations({ subtree: true })` →
    `a.pause(); a.currentTime = t`, then screenshot each state.
  - For rAF loops, temporarily patch
    `window.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 16)`
    and sample state with timers. Reload afterwards.
- Dark theme: `document.documentElement.dataset.theme = 'dark'`.

## Log

### Step 1 — done
- `ArchDiagram.tsx` rewritten. `Box`/`Arrow`/`Late` take an `at` step index that
  drives both the build order (`--d` delay = `at * 110ms`) and packet flow
  order (arrows sharing an `at` fire together). SVG `<marker>` arrowheads were
  replaced with drawn arrowheads so they can appear when the line finishes
  (also removed the duplicate `id="ah"` across diagrams).
- `Frame` owns the behavior: listens to the parent `<details>` `toggle` event,
  restarts the build by re-adding `.is-live`, then runs packets with one rAF
  loop, paused by IntersectionObserver when off-screen.
- `styles.css`: new rules under "Architecture diagrams", a `::details-content`
  height transition under `@supports (interpolate-size: allow-keywords)`, and
  reduced-motion overrides for `.arch`.

### Step 2 — done
- `Hero.tsx`: the headline is now built from a local `Word` component — a
  masked `.word` wrapper around a `.word__in` that does the moving. `at` sets
  the word's place in the sequence (`--w`), `mark` opts a word into the
  underline and sets its draw order (`--u`). The word spans are
  `aria-hidden`; the sentence lives on the `<h1>`'s `aria-label`, so the
  accessible name is unchanged. The closing period shares `--w` with
  "happening" so they rise together, and line breaking never separates them.
- `styles.css`: a "Load sequence" block under Hero. Word timings come from
  `--hero-word-start/step/dur` on `.hero` (50ms + 38ms stagger x 0.34s), the
  underline draws per em word at 0.70s/0.78s, and `.hero__id` / `.hero__intro`
  / `.hero__cta` / `.hero .now` cascade off `--hero-d` (0.02/0.46/0.54/0.62s).
  Last thing finishes at ~1.08s. New reduced-motion rules put all of it —
  including the underline pseudo-elements — in the final state with no delay,
  which matters here because the global reduced-motion block zeroes animation
  *durations* but not *delays*.
- The `.word` mask uses `padding: 0 0.06em 0.16em` with matching negative
  margins, so descenders and italic overhang have room inside the clip box
  while the line box and the headline's wrapping stay byte-identical to
  before (verified by measuring a plain-markup clone: same 4 lines, same
  236.94px height).
- Worth knowing for later steps: the hero's one accent motion is the
  underline, so don't add orange movement above the fold. `.hero__cta` and
  `.hero .now` now carry an `animation`, so anything that wants to animate
  those elements later should extend `hero-in` rather than add a second
  animation to them.

### Step 3 — done
- `Nav.tsx`: the active-link background is gone. A single `.nav__indicator`
  span is the first child of the pill; `place(id, instant)` measures the
  active link's `offsetLeft/Top/Width/Height` and writes `width`/`height`/
  `transform` onto it. `instant` suppresses the slide, used for the first
  appearance and for re-measures, so the indicator only travels in response
  to reading. When nothing is active it fades out but keeps its last
  position, so it never slides home to the left edge on the way out.
- Re-measuring is a `ResizeObserver` on `.nav__pill` plus `document.fonts.
  ready` — the observer covers window resizes and anything else that reflows
  the pill (the 620px breakpoint changes link padding and font size), and the
  fonts promise covers JetBrains Mono swapping in for the fallback.
- `aria-current` is unchanged, and `.is-active` now only carries the text
  color. `.nav__pill a` gained `position: relative; z-index: 1` so the links
  paint above the indicator sliding behind them.
- `.nav__progress` is a 1px `--accent` hairline inset 13px from each end of
  the pill and 1px up from the bottom, so both tips stay clear of the
  capsule's curve (checked at both breakpoints: ~2.7px clearance on desktop,
  ~4px on mobile). It runs off `animation-timeline: scroll(root block)` under
  `@supports`; `Nav.tsx` only installs the rAF-throttled scroll listener when
  `CSS.supports('animation-timeline', 'scroll()')` is false, and that
  fallback writes a `--p` custom property that the base `transform:
  scaleX(var(--p, 0))` reads. Both paths verified to track scroll exactly
  (the fallback by temporarily forcing the branch).
- Reduced motion needed one non-obvious line: the global block's
  `animation-duration: 0.001ms !important` would collapse the whole scroll
  timeline into the first instant of scrolling, leaving the line permanently
  full. `.nav__progress { animation-duration: auto !important }` gives it
  back. The line itself keeps tracking, since it only ever moves as far as
  the reader scrolls it; the indicator snaps instead of sliding, which the
  global transition override already handles.
- For later steps: `scroll(root)` and `view()` both work in this browser, so
  step 4 and step 7 can rely on the same `@supports` pattern. The pill's
  orange line is the one accent motion once you have scrolled past the hero.

### Step 4 — done
- New `src/components/Rule.tsx` replaces the four `<hr className="rule" />`
  in `App.tsx`. It renders the same `hr.rule`; its only job is the fallback.
- Deviation from the spec, on purpose: the draw is a `clip-path` wipe
  (`inset(0 100% 0 0)` → `inset(0)`), not `scaleX`. The rule is a dashed
  `repeating-linear-gradient`, and scaling it would squash the dashes into a
  smear that stretches out as it draws; the clip keeps every dash its true
  size. `clip-path` is on the allowed-properties list.
- `styles.css`, right under `.rule`: `rule-draw` keyframes on
  `animation-timeline: view()` with `animation-range: entry 0% cover 30%`,
  under `@supports (animation-timeline: view())`. Verified in the browser:
  12% into the viewport the line is ~42% drawn, fully drawn by 30%, rules
  further down stay undrawn until reached, and the last rule (above Contact)
  still finishes when the page is scrolled to the very bottom.
- Fallback: `Rule.tsx` checks `CSS.supports('animation-timeline', 'view()')`
  and only otherwise adds `.is-armed` (hidden, 0.6s house-curve transition on
  `clip-path`) and a one-shot IntersectionObserver that adds `.is-in`. The
  line is only hidden once JS has armed it. The observer uses a -12% bottom
  margin rather than Reveal's +400px: dividers are decoration, so the draw
  should happen where it can be seen.
- Reduced motion: `.rule { animation: none !important; clip-path: none
  !important }`. The blanket `animation-duration: 0.001ms` override is not
  enough on a view timeline — each rule would stay clipped until it reached
  the start of its range. Verified by applying the reduced-motion block
  unconditionally: no animations on any rule, all drawn.
- The dividers are `--border-strong`, not orange, so they don't compete with
  the nav progress line for the one accent motion.
- Verification gap: the browser window refused to resize to 375px in this
  session, so mobile was not screenshotted. The effect is a percentage clip on
  a full-width line with no breakpoint-dependent styles, so it should be
  identical, but give it a look on a phone.
- For step 7: the same `view()` + `@supports` + armed-fallback pattern should
  carry over to the timeline fill, and it needs the same explicit
  reduced-motion `animation: none`.

## Session prompts

Paste these one at a time into a new session.

**Step 2**
> Read `docs/animations-handoff.md` and do Step 2 (Hero load sequence) exactly
> as specced. Only that step. Verify it in the browser (desktop + mobile, both
> themes, reduced motion), run typecheck and build, update the Status and Log
> in the handoff file, commit and push to the dev branch, then tell me it's done and give me the prompt for the
> next step.

**Step 3**
> Read `docs/animations-handoff.md` and do Step 3 (Nav sliding highlight +
> scroll progress) exactly as specced. Only that step. Verify it in the browser
> (desktop + mobile, both themes, reduced motion), run typecheck and build,
> update the Status and Log in the handoff file, commit and push to the dev branch, then tell me it's done and
> give me the prompt for the next step.

**Step 4**
> Read `docs/animations-handoff.md` and do Step 4 (Self-drawing dividers)
> exactly as specced. Only that step. Verify it in the browser (desktop +
> mobile, both themes, reduced motion), run typecheck and build, update the
> Status and Log in the handoff file, commit and push to the dev branch, then tell me it's done and give me the
> prompt for the next step.

**Step 5**
> Read `docs/animations-handoff.md` and do Step 5 (Staggered reveals) exactly
> as specced. Only that step. Verify it in the browser (desktop + mobile, both
> themes, reduced motion), run typecheck and build, update the Status and Log
> in the handoff file, commit and push to the dev branch, then tell me it's done and give me the prompt for the
> next step.

**Step 6**
> Read `docs/animations-handoff.md` and do Step 6 (Decoding section index
> labels) exactly as specced. Only that step. Verify it in the browser
> (desktop + mobile, both themes, reduced motion), run typecheck and build,
> update the Status and Log in the handoff file, commit and push to the dev branch, then tell me it's done and
> give me the prompt for the next step.

**Step 7**
> Read `docs/animations-handoff.md` and do Step 7 (Experience timeline) exactly
> as specced. Only that step. Verify it in the browser (desktop + mobile, both
> themes, reduced motion), run typecheck and build, update the Status and Log
> in the handoff file. This is the last step: finish with a quick pass over
> the whole page to make sure all seven effects work together (nothing
> competing on one screen, reduced motion clean), then tell me it's done.
