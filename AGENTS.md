# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

## 第三页「关于我」交互与内容

- 第三页首屏是独立互动封面，仅显示居中的单行标题「从建造空间，到建造产品.」。不显示 ABOUT / 03、右侧说明或下方内容。
- 标题进入视口时逐字符聚合并保持静止；桌面端悬停出现低饱和蓝色星星、红色桃心、柔和发光和短拖尾，点击后标题缩小并移动到右上角，形成左高右低 6° 的灯轨；移动端轻触后直接进入该状态。
- 动效不自动循环；支持键盘触发与 `prefers-reduced-motion` 降级。
- 展开后只显示位于内容区左上角的「我现在」，包括房地产销售助手、个人展示网站、AI 产品/UI 设计学习、《UI设计入门一本就够》以及 AI 产品经理机会/独立项目合作；不显示 NOW / 03、「在行动中理解产品。」、「我之前」和转向段落。
- 点击右上角灯轨返回第三页标题封面；从标题封面或「我现在」状态上划一次，都直接整屏吸附返回第二页项目末屏。
- 灯轨动效参考用户提供的 3:4 星光装置视频：标题向右上角收拢后淡出为左高右低的轨道，低饱和蓝色星星与珊瑚红桃心沿不同长度的细线依次垂落、轻微闪烁；返回时快速回收。保留网站暖白背景，不复制视频的纯蓝场景、书本或水印。
- 「我现在」展开后叠加持续的粒子光幕：前 2.5 秒使用约 48 颗的密集上限，随后保持约 18 颗的上限。金色星星与鲜艳珊瑚红桃心从灯轨向下漂落并带长半透明彗星拖尾，直到用户离开第三页或点击灯轨返回。不要恢复旧版固定竖线悬挂装饰；离开视口、浏览器标签进入后台或 `prefers-reduced-motion` 时暂停并清理，避免持续占用性能。

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable product direction

- Build a Chinese-first, single-page portfolio for 高嘉勤, a freelancer targeting AI Product Manager / Independent Builder roles.
- The primary audience is recruiters and followers. The page should support job seeking, project presentation, and long-term content accumulation.
- Use the uploaded “Personal Showcase / Marcus” editorial hero as the main visual reference: charcoal outer frame, neutral gray stage, oversized kinetic name typography, a realistic cutout portrait, sparse metadata, and restrained motion.
- Keep the visual language editorial and minimal. Avoid purple, glow effects, heavy card grids, excessive decoration, and unearned metrics.
- Fixed navigation: 高嘉勤 / 关于我 / 项目 / 联系我. Do not include resume or project download actions.
- The hero introduces the person and provides a contact action; scrolling reveals projects. First release stays one page, with project and article detail pages reserved for later.
- Do not invent projects, clients, outcomes, skills, or contact channels. Where source material is missing, use a clearly worded “整理中” state or keep content hidden.
- The approved hero direction is: “AI 产品经理 / 独立开发者” and “把 AI 变成真正有人使用的产品”.
- Reuse `public/assets/gao-jiaqin-portrait.png`; it has been identity-preserved and background-cleaned with permission from the user.
- Homepage scrolling uses a hybrid structure: one full-screen handoff from the hero into Projects, then native continuous scrolling for the rest of the page.
- The Projects-to-About boundary also uses a deliberate full-screen handoff: scrolling over the sticky left project index enters About after one downward wheel gesture; scrolling over the right project content remains native until its bottom boundary, then requires two fresh downward wheel gestures before snapping to About. Do not show instructional text for this behavior.
- Returning from About is symmetrical but lighter: About scrolls naturally until its top boundary; one fresh upward wheel gesture starting at that boundary snaps to the final viewport of Projects rather than its beginning.
- Projects precede About. Use a Stefan Vitasović-inspired information structure only: large project title and counter, sticky left index, and a naturally scrolling right-side project archive. Keep this site's warm off-white and low-saturation blue palette rather than copying Stefan's black-and-white styling.
- The project archive contains `01 房地产销售助手`, `02 个人展示网站`, and `03 即将公开`. Project content fields are title, one-line introduction, hero visual, problem, role, and key interfaces/process. Do not invent missing evidence; show a clear pending-material state until real screenshots and copy are provided.
- Use a slower product-case-study rhythm than Stefan's rapid gallery: one main visual per viewport area, alternating with concise explanatory text and generous whitespace.
- Keep project titles only one clear step larger than their summaries, and omit redundant project category/status metadata above standard project titles. The sticky project index should stand on its own without instructional microcopy beneath it. In each standard project, place the problem and role notes immediately after the summary and before the main visual; use compact top spacing consistently across projects.
- The About section is a single-viewport interactive cover that opens an in-place Now workspace; it does not extend into a separate history story.
