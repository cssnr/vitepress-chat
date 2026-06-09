# Agent Guide

Before answering any question that involves facts about ANYTHING, you MUST output at least one Read, WebFetch, or WebSearch tool call.
If your first output is text instead of a tool call, you have failed.

VitePress Chat Plugin that adds an AI Chat Button and Chat Box.

- `src/` — VitePress Chat Plugin Source
- `docs/` — VitePress Documentation (runs plugin from `src/`)

## Architecture

- `vitepress-chat` — main plugin `src/index.ts`. Wraps VitePress `DefaultTheme` in `docs/.vitepress/theme/index.ts`. Accepts `chatOptions` options.
- `vitepress-chat/instructions` — Vite plugin `src/instructions.ts`. Defined in `docs/.vitepress/config.mts`. Generates `instructions.txt`. Accepts `instructionsOptions`.
- `vitepress-chat/style.css` — built CSS for the chat overlay.

## Commands

ALWAYS use the `npm run *` command

| Command              | What it does                                                |
| -------------------- | ----------------------------------------------------------- |
| `npm run build`      | `vite build && vue-tsc --declaration --emitDeclarationOnly` |
| `npm run docs`       | `vitepress dev docs`                                        |
| `npm run docs:build` | `vitepress build docs`                                      |
| `npm run lint`       | `npx eslint src`                                            |
| `npm run prettier`   | ALWAYS RUN AFTER EDITING FILES                              |
