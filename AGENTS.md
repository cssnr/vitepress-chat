# Agent Guide

Before answering any question that involves facts about ANYTHING, you MUST output at least one Read, WebFetch, or WebSearch tool call.
If your first output is text instead of a tool call, you have failed.

VitePress Chat Plugin that adds an AI Chat Button and Chat Box.

- `src/` — VitePress Chat Plugin Source
- `docs/` — VitePress Documentation (runs plugin from `src/`)

## Commands

ALWAYS use the `npm run *` command

| Command              | What it does                         |
| -------------------- | ------------------------------------ |
| `npm run build`      | vite build + tsc emitDeclarationOnly |
| `npm run docs:build` | `vitepress build docs`               |
| `npm run lint`       | ESLint on `src/`                     |
| `npm run tsc`        | TypeScript Check Project             |
| `npm run prettier`   | ALWAYS RUN AFTER EDITING FILES       |

## Architecture

For an in-depth guide see [TODO.md](TODO.md).

### vitepress-chat

Chat VitePress Plugin.

- Entrypoint — `src/index.ts`
- Wraps VitePress `DefaultTheme`
- Defined in `docs/.vitepress/theme/index.ts`
- Accepts `ChatOptions` options

### vitepress-chat/instructions

Instructions Generator Vite Plugin.

- Entrypoint `src/instructions.ts`
- Defined in `docs/.vitepress/config.mts`
- Generates `instructions.txt`
- Accepts `InstructionsOptions`

### vitepress-chat/style.css

CSS Generated from Vite Build.

- Defined in `docs/.vitepress/theme/index.ts`

## Output

Build outputs to: `dist/`

- `chat.es.js` — Main chat entry
- `instructions.es.js` — Instructions plugin entry
- `vitepress-chat.css` — Extracted CSS
- `index.d.ts` — Type declarations
