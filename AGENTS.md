## Critical Rules

1. Use `@/` alias for all internal imports; relative imports are forbidden.
2. Prefer Bun APIs (`Bun.file`, `Bun.write`, etc.) over Node.js `fs` equivalents.
3. Align on pre-existing types from libraries and generated code; use `Pick`, `Omit` and other TypeScript type-helpers instead of recreating the same information, and avoid defensive type-safety checks for scenarios that cannot happen in trusted internal code.
4. Don't use `git stash` mid-session; other agents or the user can edit files at the same time.
5. Before adding a test, pass the admission gate: repo-owned behavior, real user/data risk, survives a library swap, fails on a plausible wrong implementation. Otherwise use lint, types, or a focused manual check.
6. This project is pre-production with no legacy content or URLs. Do not add backward compatibility, redirects, or legacy recovery unless explicitly requested.
7. Don't run `test` command unless you change code related to these tests.

## Communication

- Human-facing output (replies, commit messages, PR text): fewest words that carry the point.
- No superlatives, praise, or agreement padding. State disagreements and risks plainly.

## Design Principles

Optimize the design for the normal flow. If the happy path is 95% of behavior, it should be ~95% of what a reader sees.

- Make top-level code read like a use case: orchestrators call well-named domain methods; push parsing, process plumbing, protocol details, and state surgery into the lowest module that owns them.
- Patterns, layers, interfaces, and files are costs. Add one only when it owns a real invariant, hides real complexity, has multiple real implementations, removes stable duplication, or creates a proven boundary. No reflexive Controller -> Service -> Repository pass-throughs.
- Prefer deletion and the smallest correct diff. Do not add a dependency, abstraction, configuration, or flexibility without a proven present need; explain the cost first.
- Parse untrusted input once at the boundary into trusted domain values; make illegal states unrepresentable; pass trusted values inward instead of re-checking raw data.
- Never reduce validation at trust boundaries, protection against data loss, security, accessibility, or explicitly requested behavior to make a change smaller.
- No speculative safeguards or theoretical race handling. Fix the smallest real, observed failure at the boundary that owns it. Prefer fewer names, fewer branches, and net-negative diffs.
- Before adding complexity for a speculative edge case, explain the concrete failure mode, its likelihood, and the cost; get the user's buy-in first.
- Before adding code, confirm that a change is needed. Then understand and trace the real flow. Reuse an established local pattern, the standard library, platform features, or an installed dependency before writing custom code; search for a maintained third-party library before building one.
- If the correct implementation is one line over the platform or an existing API, write that line — inline, unexported, unwrapped.
- For a bug, check all callers and fix the root cause in the lowest shared owner. Do not patch each visible symptom separately.
- For non-trivial business logic owned by this repository, add the smallest focused test or runnable check that proves the changed behavior.

## TypeScript Style

- Use guard clauses and early returns; avoid `else`.
- Avoid `try`/`catch` where possible.
- Access properties with dot notation (`obj.a`) instead of destructuring.
- Inline single-use variables and intermediate bindings.
- Type-guard `filter` callbacks to preserve inference.
- Rely on type inference; annotate only at exports and boundaries.
- Avoid the `any` type.
- Prefer `const`; use ternaries or early returns instead of reassignment.
- Never alias imports (`import { x as y }`) and never use star imports.
- Prefer functional array methods (`map`, `filter`, `flatMap`) over `for` loops.
- NEVER extract a one-liner, even a heavily used one: a body that is a single call or expression gets written inline at every call site. A wrapper name sends every human reader on a hop to find a line they already know; repetition is not complexity.
- Keep helpers below the code they support; do not extract multi-line logic used fewer than three times.
- Comments are rare and explain why, not what.
- Name recurring or spec-defined values (HTTP statuses, limits, slugs) as consts or enums; inline self-explanatory one-off literals.
- Prefer options objects or enums over positional boolean parameters; `send({ retry: true })` reads better at the call site than `send(true)`.

## Fumapress / Blog

Stack is Fumapress on Waku (React Server Components) + Fumadocs + Tailwind CSS 4. App must stay an ES module with `fumapress dev / build / start` scripts.

- Layout: `content/` for MDX, `src/pages/` for custom React pages, `press.config.tsx` for site config, `vite.config.ts` for Vite plugins, `src/app.css` for theme.
- Content: each `.mdx` under `content/` becomes a page (`content/index.mdx` -> `/`, `content/guide/install.mdx` -> `/guide/install`). Frontmatter requires `title` + `description`; title renders as the page H1, so body starts at `##`. Control sidebar order with `meta.json` next to pages.
- Config source of truth is `press.config.tsx`: `site.name`, `site.baseUrl`, `site.git`, `defaultLayoutProps`, `content` sources. Read content from code via `getPressContext().getLoader()` only when a custom page provably needs it.
- RSC by default; `"use client"` components only with a proven need (interactivity, browser APIs).
- Styling via `src/app.css` (Tailwind import + `fumadocs-ui` theme + `fumapress/css/preset.css`) and `fd-` design tokens; swap theme presets instead of custom CSS.
- MDX rendering uses shared components from `fumadocs-ui/mdx`; no local wrapper without a proven need.
- Plugins (blog, flexsearch/orama search, sitemap, llms.txt, OG images, link validation) are costs: add one only with a proven present need.

## Maintenance & Tasks

- MUST use `bun` for package management.
- Run `lint` for linting errors, then the typecheck script (`types:check` / `typecheck`) for type errors. DON'T use bare `tsc` outside the configured script and DON'T run `format` — it's triggered automatically by other pipelines.
- Run `bun run build` to validate content, config, and plugin changes (MDX, links, sitemap).
- Follow conventional commits: `type(scope): summary` with types `feat`, `fix`, `docs`, `chore`, `refactor`, `test`.
- Scopes are optional; use the affected area, for example `content`, `blog`, `config`.
