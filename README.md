# Next Quality App

Next.js app scaffolded with strict quality tooling, shadcn, React Doctor, React Scan, agent docs, and Claude hooks.

## Development

```bash
npm run dev
```

## Quality

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test
npm run doctor
npm run check
```

## Tooling

- Next.js App Router with TypeScript and Tailwind.
- shadcn UI initialized through the shadcn CLI.
- ESLint flat config with strict Next.js, React, import ordering, and Prettier integration.
- `@shadcn/lint` enforcing the design system rules in `DESIGN.md`.
- React Doctor and React Scan.
- Vitest and React Testing Library.
- Playwright E2E testing.
- Conventional commit linting.

## shadcn MCP

purrfold attempted shadcn MCP setup during scaffold.

Manual setup commands for this package manager:

```bash
npx shadcn@latest mcp init --client claude
npx shadcn@latest mcp init --client codex
npx shadcn@latest mcp init --client opencode
```

Codex may require user-level configuration in `~/.codex/config.toml`:

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

## shadcn Presets

purrfold forwards additional shadcn CLI arguments, including official presets:

```bash
npx purrfold@latest my-app --shadcn-args --preset b3REw8vwo --yes
npx purrfold@latest my-app --shadcn-args --preset b1sSLwZVp --yes
npx purrfold@latest my-app --shadcn-args --preset b2qMI9ufY --yes
npx purrfold@latest my-app --shadcn-args --preset b5eH0WVTX --yes
```

## Agent Docs

- `AGENTS.md`: agent workflow and quality gates.
- `DESIGN.md`: generic UI/UX guardrails.
- `.agents/skills`: agent skills downloaded by `skills.sh` from their published sources. If any are missing, rerun `sh skills.sh`.
- `CLAUDE.md`: Claude Code pointer to `AGENTS.md`.

## Registry

Components are published as a shadcn registry at `https://ui.cescovalle.com/r/{style}/{name}.json`, so they install in the user's base (Base UI, Radix or React Aria), style, icon library, colors, radius and font:

```bash
npx shadcn@latest add @cesco/password-input
```

Until `@cesco` is listed in the shadcn registry directory, users add it to their `components.json`:

```json
{
  "registries": {
    "@cesco": "https://ui.cescovalle.com/r/{style}/{name}.json"
  }
}
```

### Layout

- `registry.json`: the source list of items. A file path with `{base}` ships one variant per base.
- `registry/shared/`: base-agnostic components. They compose shadcn components declared in `registryDependencies`, which install in the user's base and style.
- `registry/bases/<base>/`: per-base variants, for components that use base-specific props or state selectors (for example `pressed` in Radix and Base UI, `isSelected` in React Aria).
- `registry/bases/<base>/ui/`: vendored shadcn primitives used only to develop and test each variant. They are not published; imports of `@/registry/bases/<base>/ui/*` become `@/components/ui/*` on install.
- `registry/shared/lib/icon-placeholder.tsx`: write icons as `<IconPlaceholder lucide="…" tabler="…" hugeicons="…" phosphor="…" remixicon="…" />`. On install the shadcn CLI swaps it for the icon of the user's library.

### Base primitive mapping

Use shadcn's official per-base implementation as the source of truth when adding a vendored primitive. Put only primitives imported by the component under `registry/bases/<base>/ui/`; registry items resolve those paths to the user's `components/ui/` directory on install.

| Primitive  | Base UI (`base`)                             | Radix (`radix`)                                                      | React Aria (`aria`)                                        |
| ---------- | -------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `button`   | `@base-ui/react/button`                      | `radix-ui` Slot with a native button                                 | `react-aria-components` Button (and Link for link buttons) |
| `input`    | `@base-ui/react/input`                       | Native HTML `<input>`                                                | `react-aria-components` Input                              |
| `badge`    | Native `<span>`; no behavior primitive       | Native `<span>`; no behavior primitive                               | Native `<span>`; no behavior primitive                     |
| `combobox` | `@base-ui/react/combobox` compound component | Compose the vendored Radix `popover` and `command` (cmdk) components | `react-aria-components` Combobox compound component        |

The shadcn implementations use the same component names and `data-slot` markers across bases where practical, but component props and state selectors can differ. Keep those variants under each base's `registry/bases/<base>/` directory. Source references: [button](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/bases), [input](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/bases), [combobox docs](https://ui.shadcn.com/docs/components/base/combobox) (switch base for React Aria or Radix), and [command](https://ui.shadcn.com/docs/components/radix/command).

### Scripts

```bash
npm run registry:build                 # public/r/<base>-<style>/<name>.json (also part of npm run build)
npm run test:registry-install -- aria  # install every item into a fresh app, per icon library, and type-check it
```

The `Registry Install` workflow runs `test:registry-install` for every base on each pull request. Component behavior is covered by Vitest (`tests/unit/registry`, every base variant) and Playwright (the component pages).

### Component checklist

1. Semantic color tokens only (`bg-muted`, `text-muted-foreground`, …), standard `rounded-*` sizes, no font families.
2. Icons through `IconPlaceholder`, with all five libraries.
3. shadcn components imported from `@/components/ui/*` and listed in `registryDependencies`.
4. Base-specific props or `data-*` selectors: one variant per base under `registry/bases/<base>/`.
5. Unit tests for every variant, then `npm run registry:build`.

The app sidebar and index are driven by `registry.json`. Each item page loads `app/components/_demos/<name>.tsx` by its registry name; export the demo as default and accept the current base in its `base` prop. Adding a registry item and its matching demo file is enough to make its page available.
