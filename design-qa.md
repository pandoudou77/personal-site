# Design QA — 第三页金色与珊瑚红彗星灯轨

## Visual targets

- Source visual: `C:\Users\ADMINI~1\AppData\Local\Temp\codex-clipboard-00e5059f-ab1b-4db9-b88a-b4722f82a2d3.png`
- Source motion: `C:\Users\Administrator\xwechat_files\wxid_evwefilo9b4e22_2f0f\msg\video\2026-08\bd9726dfc6b0889c98f23458308ff287.mp4`
- Source image size: 641 × 615 px.
- Dense-state screenshot: `F:\个人展示网站\site\qa-about-comet-dense.png`
- Steady-state screenshot: `F:\个人展示网站\site\qa-about-comet-steady.png`
- Returned-cover screenshot: `F:\个人展示网站\site\qa-about-rain-cover.png`
- Implementation viewport: 1280 × 720 CSS px at device pixel ratio 1.25.
- Implementation screenshot pixels: 1280 × 720 px; no density normalization was required for the browser-rendered comparison.
- Side-by-side full and focused comparison: `F:\个人展示网站\site\qa-about-comet-comparison.png`

## States checked

1. Third-page cover: centered one-line title on warm off-white background.
2. Title hover: low-saturation blue stars and coral hearts emerge around the pointer without obscuring the title.
3. Title click: the title collapses into a left-high/right-low 6° rail; moving stars, hearts and glints appear in staggered motion without fixed hanging lines.
4. Opening phase: gold stars and vivid coral-red hearts fall from the rail at a denser rhythm for roughly 2.5 seconds, with a 48-particle ceiling.
5. Persistent phase: the particle flow automatically settles to an approximately 18-particle ceiling and remains active while the workspace stays open.
6. Comet rendering: every moving icon has a long, tapered, translucent glow trail in its own color; the old fixed vertical strings and their attached icons are absent.
7. Open workspace: only “我现在” content is visible; falling particles fade before the content-heavy lower half so labels remain readable.
8. Rail click: returns to the centered title cover and clears the continuous particle drawing.
9. Upward wheel from both cover and open workspace: returns to the Projects section with full-screen snapping and closes the workspace.
10. Browser lifecycle: the animation stops advancing in a hidden tab, clears when About is no longer active, and stays hidden for reduced-motion users.

## Comparison findings

- The implementation preserves the source visual’s dominant motif: a slanted light rail, vertically falling light, staggered star distribution and independent glints.
- It intentionally replaces the saturated royal-blue field with the site’s warm paper surface while restoring the reference’s gold star color and adding vivid coral-red hearts.
- The book, watermark and source-video orbit details were intentionally omitted because they do not belong to the portfolio narrative.
- The source’s vertical “light rain” rhythm is translated into an icon-library-based Canvas layer: approximately 75% stars and 25% hearts, long comet trails, light gravity and subtle side drift.
- The dense opening and steady-state screenshots confirm that the effect changes density without disappearing after the initial burst.
- Focused comparison confirms the rail remains the visual source of the falling light while the approved removal of static hanging lines prevents two competing motion systems.
- A duplicate horizontal line appeared in the first pass. It was corrected by fading the temporary morph line before the final rail finishes appearing.
- The first hover pass could hide the title when the intersection state changed. Character defaults and the gathering keyframes were corrected so the title remains visible during hover.
- No application console errors were observed; only normal Vite development messages were present.

## Iteration outcome

- P0 blockers: none.
- P1 interaction issues: fixed (hover visibility, duplicate rail, rail return, upward handoff, persistent-flow lifecycle).
- P2 polish: increased opening/steady density, 20% larger particles, long tapered comet tails, gold/coral color separation, and removal of fixed hanging strings match the approved direction without competing with “我现在”.

final result: passed
