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

- Main Plugin — `src/index.ts`
- Wraps VitePress `DefaultTheme`
- Defined in `docs/.vitepress/theme/index.ts`
- Accepts `ChatOptions` options

### vitepress-chat/instructions

- Vite plugin `src/instructions.ts`
- Defined in `docs/.vitepress/config.mts`
- Generates `instructions.txt`
- Accepts `InstructionsOptions`

### vitepress-chat/style.css

- Built CSS for the chat
- Defined in `docs/.vitepress/theme/index.ts`
