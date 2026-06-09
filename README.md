[![NPM Version](https://img.shields.io/npm/v/vitepress-chat?logo=npm)](https://www.npmjs.com/package/vitepress-chat)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/vitepress-chat?logo=github)](https://github.com/cssnr/vitepress-chat/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dm/vitepress-chat?logo=npm)](https://npm-stat.com/charts.html?package=vitepress-chat)
[![Bundlephobia Size](https://img.shields.io/bundlephobia/min/vitepress-chat?logo=bookstack&logoColor=white)](https://bundlephobia.com/package/vitepress-chat)
[![Deployment NPM](https://img.shields.io/github/deployments/cssnr/vitepress-chat/npm?logo=npm&logoColor=white&label=npm)](https://github.com/cssnr/vitepress-chat/deployments/npm)
[![Deployment Docs](https://img.shields.io/github/deployments/cssnr/vitepress-chat/docs?logo=vitepress&logoColor=white&label=docs)](https://github.com/cssnr/vitepress-chat/deployments/docs)
[![Workflow Release](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-chat/release.yaml?logo=norton&logoColor=white&label=release)](https://github.com/cssnr/vitepress-chat/actions/workflows/release.yaml)
[![Workflow Lint](https://img.shields.io/github/actions/workflow/status/cssnr/vitepress-chat/lint.yaml?logo=norton&logoColor=white&label=lint)](https://github.com/cssnr/vitepress-chat/actions/workflows/lint.yaml)
[![GitHub Last Commit](https://img.shields.io/github/last-commit/cssnr/vitepress-chat?logo=listenhub&label=updated)](https://github.com/cssnr/vitepress-chat/pulse)
[![GitHub Repo Size](https://img.shields.io/github/repo-size/cssnr/vitepress-chat?logo=buffer&label=repo%20size)](https://github.com/cssnr/vitepress-chat?tab=readme-ov-file#readme)
[![GitHub Top Language](https://img.shields.io/github/languages/top/cssnr/vitepress-chat?logo=devbox)](https://github.com/cssnr/vitepress-chat?tab=readme-ov-file#readme)
[![GitHub Contributors](https://img.shields.io/github/contributors-anon/cssnr/vitepress-chat?logo=southwestairlines)](https://github.com/cssnr/vitepress-chat/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues/cssnr/vitepress-chat?logo=codeforces&logoColor=white)](https://github.com/cssnr/vitepress-chat/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/cssnr/vitepress-chat?logo=theconversation)](https://github.com/cssnr/vitepress-chat/discussions)
[![GitHub Forks](https://img.shields.io/github/forks/cssnr/vitepress-chat?style=flat&logo=forgejo&logoColor=white)](https://github.com/cssnr/vitepress-chat/forks)
[![GitHub Repo Stars](https://img.shields.io/github/stars/cssnr/vitepress-chat?style=flat&logo=gleam&logoColor=white)](https://github.com/cssnr/vitepress-chat/stargazers)
[![GitHub Org Stars](https://img.shields.io/github/stars/cssnr?style=flat&logo=apachespark&logoColor=white&label=org%20stars)](https://cssnr.github.io/)
[![Discord](https://img.shields.io/discord/899171661457293343?logo=discord&logoColor=white&label=discord&color=7289da)](https://discord.gg/wXy6m2X8wY)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-72a5f2?logo=kofi&label=support)](https://ko-fi.com/cssnr)

# VitePress Chat

<a title="VitePress Chat Plugin" href="https://cssnr.github.io/vitepress-chat/" target="_blank">
<img alt="VitePress Chat Plugin" align="right" width="128" height="auto" src="https://raw.githubusercontent.com/cssnr/vitepress-chat/refs/heads/master/docs/public/images/logo.svg"></a>

- [Install](#Install)
- [Setup](#Setup)
- [Server](#Server)
- [Development](#Development)
- [Support](#Support)
- [Contributing](#Contributing)

A VitePress Chat Plugin providing AI Chat support trained on your docs.
Includes instructions generator plugin, or works with your existing plugin.
Securely connect to any AI provider you choose via the proxy [chat-server](https://github.com/cssnr/chat-server).

💯 100% Free to use with Zen OpenCode or Gemini Free Tier!

🔒 The [server](https://github.com/cssnr/chat-server) features live-streaming results, input token caching, retry on failure and much more.
Works with Claude, Gemini, OpenAI, or any [OpenAI Compatible Provider](https://ai-sdk.dev/providers/openai-compatible-providers).

[![View Live Demo](https://img.shields.io/badge/view_live_demo-green?style=for-the-badge&logo=chatbot&logoColor=white)](https://cssnr.github.io/vitepress-chat/)

- Client: https://github.com/cssnr/vitepress-chat
- Server: https://github.com/cssnr/chat-server

### Features

- Set Custom Button And Header Text and Link
- Includes Instructions Generation Plugin
- Set Custom File Name and Exclude Globs
- Works with Existing LLM Generation Plugins
- Plus all the [Server Features](https://github.com/cssnr/chat-server?tab=readme-ov-file#features)

Built with the [AI SDK](https://ai-sdk.dev/).

## Install

From [npmjs.com](https://www.npmjs.com/package/vitepress-chat) your favorite package manager...

```shell
npm i -D vitepress-chat
```

[![View Documentation](https://img.shields.io/badge/view_documentation-blue?style=for-the-badge&logo=googledocs&logoColor=white)](https://cssnr.github.io/vitepress-chat/)

## Setup

There are two components, the [Chat Plugin](#chat-plugin) which adds the chat button and box.
Plus the [Instructions Generator](#instructions-generator) plugin which generates instructions.txt file.

This allows you to use this with other instructions generator plugins or existing `llms.txt` files.

### Chat Plugin

Add the plugin to your theme.

- `.vitepress/theme/index.[js,ts]`.

Using the default theme.

```typescript
import DefaultTheme from 'vitepress/theme'

import chat from 'vitepress-chat'
import 'vitepress-chat/style.css'

// https://vitepress.dev/guide/extending-default-theme
export default {
  ...DefaultTheme,
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
    headers: { Authorization: 'Basic Abc123=' },
  }),
}
```

Using a [custom layout](https://vitepress.dev/guide/extending-default-theme#layout-slots).

```typescript
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

import chat from 'vitepress-chat'
import 'vitepress-chat/style.css'

export default {
  ...DefaultTheme,
  ...chat(MyLayout, {
    api: 'https://chat-server.cssnr.com/',
  }),
}
```

With a custom file name to use with other generators like [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms).

```typescript
export default {
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
    filePath: 'llms-full.txt',
  }),
}
```

With a remote URL path.

```typescript
export default {
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
    filePath: 'https://cssnr.github.io/vitepress-chat/llms.txt',
  }),
}
```

See the [ChatOptions](https://github.com/cssnr/vitepress-chat/blob/master/src/index.ts#L6) for more details...

### Instructions Generator

Add the instruction generator plugin to your config.

- `.vitepress/config.[ts,mts]`

This generates the `instructiosn.txt` from your docs folder when you run dev or build.

```typescript
import { defineConfig } from 'vitepress'

import instructions from 'vitepress-chat/instructions'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [instructions()],
  },
})
```

To exclude files/folders from the instructions use the exclude globs.

```typescript
export default defineConfig({
  vite: {
    plugins: [instructions({ exclude: ['index.md', 'include/**/*'] })],
  },
})
```

See the [InstructionsOptions](https://github.com/cssnr/vitepress-chat/blob/master/src/instructions.ts#L8) for more details...

## Server

For server set instructions see:

- Documentation: <https://cssnr.github.io/vitepress-chat/server>
- GitHub Repository: <https://github.com/cssnr/chat-server>

[![Deploy to Render](https://img.shields.io/badge/Deploy_to_Render-4351E8?style=for-the-badge&logo=render)](https://render.com/deploy?repo=https://github.com/cssnr/chat-server)

## Development

The docs run the plugin from source.

Create a `.env.development` file similar to this.

```text
VITE_AI_AUTH=Basic Abc123=
VITE_AI_API=http://localhost:3000/
VITE_AI_DEV_INSTRUCTIONS=You are a helpful assistant testing a chat box on a website and should respond with text/links in the requested length and formatting.
```

Note the `VITE_AI_DEV_INSTRUCTIONS` will replace the generated `instructions.txt` for development.

Then run the docs to test your changes.

```shell
npm i
npm run docs
```

## Support

If you run into any issues or need help getting started, please do one of the following:

- Report an Issue: <https://github.com/cssnr/chat-server/issues>
- Q&A Discussion: <https://github.com/cssnr/chat-server/discussions/categories/q-a>
- Request a Feature: <https://github.com/cssnr/chat-server/issues/new?template=1-feature.yaml>
- Chat with us on Discord: <https://discord.gg/wXy6m2X8wY>

[![Features](https://img.shields.io/badge/features-brightgreen?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/cssnr/chat-server/issues/new?template=1-feature.yaml)
[![Issues](https://img.shields.io/badge/issues-red?style=for-the-badge&logo=southwestairlines&logoColor=white)](https://github.com/cssnr/chat-server/issues)
[![Discussions](https://img.shields.io/badge/discussions-blue?style=for-the-badge&logo=livechat&logoColor=white)](https://github.com/cssnr/chat-server/discussions)
[![Discord](https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/wXy6m2X8wY)

## Contributing

Please consider making a donation to support the development of this project
and [additional](https://cssnr.com/) open source projects.

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/cssnr)

For a full list of current projects visit: [https://cssnr.github.io/](https://cssnr.github.io/)

<a href="https://github.com/cssnr/chat-server/stargazers">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=cssnr/chat-server&type=date&legend=bottom-right&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=cssnr/chat-server&type=date&legend=bottom-right" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=cssnr/chat-server&type=date&legend=bottom-right" />
 </picture>
</a>
