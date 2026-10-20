<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This project uses Next.js 16 or newer. APIs and conventions may differ from model memory. Read relevant guides in `node_modules/next/dist/docs/` before changing Next.js code.

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
