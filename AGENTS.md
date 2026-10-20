<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Quality Gates

Run these before claiming implementation complete:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run format:check`
4. `npm run test`

- Run `npm run test:e2e` when E2E behavior changed.
- `npm run doctor`
- `npm run check`

## Git

- Use only the local git identity for Francisco Valle.
- Never add `Co-Authored-By`, `Claude-Session`, `Generated with`, or other AI attribution to commits or PR bodies.
- Use conventional commit messages and split changes into units of work.

## Registry component checklist

- Use semantic design tokens only.
- Use `IconPlaceholder` with icon names for all five supported libraries: lucide, tabler, hugeicons, phosphor, and remixicon.
- Add `data-slot` markers to vendored primitives and custom components.
- Set `registryDependencies` and package `dependencies` correctly.
- Add one variant per base under `registry/bases/<base>/` when the primitive API differs.
- Add unit tests for every base variant with `describe.each`.
- Add a demo file and register it in the app navigation/demo map.
- Keep English as the default for user-facing strings, and make every such string overridable through props.

`npm run lint` runs `@shadcn/lint`. Fix its design system errors with the tokens, variants, and sizes described in `DESIGN.md`; do not disable its rules.

Do not use `next lint`; use the ESLint CLI.

## References

- Architecture and scripts: `README.md`
- Design rules: `DESIGN.md`
- Next.js reference docs: `node_modules/next/dist/docs/`
- Next.js agent rules: generated `AGENTS.md` / `CLAUDE.md`
- Purrfold-installed supported Next.js workflow skills from `vercel/next.js`: `.agents/skills/next-cache-components-adoption/SKILL.md`, `.agents/skills/next-cache-components-optimizer/SKILL.md`, and `.agents/skills/next-dev-loop/SKILL.md`
- If bundled Next.js docs are missing, run `npx @next/codemod@canary agents-md`.
- If any agent skill is missing, rerun `sh skills.sh`.
- Component placement rules: `.agents/skills/shadcn-component-boundaries/SKILL.md`
- Minimum evaluation: `.agents/skills/project-min-evaluation/SKILL.md`
- Vitest guidance: `.agents/skills/vitest/SKILL.md`
- Playwright guidance: `.agents/skills/playwright-best-practices/SKILL.md`
- Commit messages are checked with commitlint.

## shadcn MCP

shadcn MCP setup was requested during scaffold.

```bash
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client codex
npx shadcn@latest mcp init --client opencode
```

For Codex, verify `~/.codex/config.toml` if MCP is not available:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

shadcn presets are supported through `--shadcn-args --preset <id>`.

## Claude Code

`CLAUDE.md` points to this file. `.claude/skills` should link to `.agents/skills`.
