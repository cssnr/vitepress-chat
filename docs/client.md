---
prev:
  text: 'Get Help'
  link: '/support'
outline: [2, 4]
---

# VitePress Plugin

<div class="badges">

[![NPM Version](https://img.shields.io/npm/v/vitepress-chat?logo=npm)](https://www.npmjs.com/package/vitepress-chat)
[![GitHub Release Version](https://img.shields.io/github/v/release/cssnr/vitepress-chat?logo=github)](https://github.com/cssnr/vitepress-chat/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dm/vitepress-chat?logo=npm)](https://npmx.dev/package/vitepress-chat)
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

</div>

<a title="VitePress Chat Plugin" href="https://github.com/cssnr/vitepress-chat?tab=readme-ov-file#readme" target="_blank">
<img alt="VitePress Chat Plugin" align="right" width="128" height="auto" src="/images/logo.svg"></a>

A VitePress Chat Plugin providing AI Chat support trained on your docs.
Includes instructions generator plugin, or works with your existing plugin.
Securely connect to any AI provider you choose via the proxy [chat-server](server.md).

💯 100% Free to use with Zen OpenCode or Gemini Free Tier!

To get started [Install](#install) and [Setup](#setup) the plugin.

⚡ Ask AI with the Chat button in the bottom right...

🔒 The [server](server.md) features live-streaming results, input token caching, retry on failure and much more.
Works with Claude, Gemini, OpenAI, or any [OpenAI Compatible Provider](https://ai-sdk.dev/providers/openai-compatible-providers).

[[toc]]

### Features

- Markdown Formatting with Syntax Highlighting
- Live Streams the Results in Real Time
- Works with Free Render Startup Delay
- Set Custom Button And Header Text and Link
- Includes Instructions Generation Plugin
- Set Custom File Name and Exclude Globs
- Works with Existing LLM Generation Plugins
- Small Footprint (only adds ~6KB to your theme)
- Plus all the [Server Features](server.md#features)

Built with the [AI SDK](https://ai-sdk.dev/).

💡 If you need help getting started, [support](support.md) is available.

#### Live Demos

Other sites using VitePress Chat with various configurations.

| Site                                                    | Source                                                                                        |   Layout   |   Theme    |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------- | :--------: | :--------: |
| [Cache Cleaner](https://cssnr.github.io/cache-cleaner/) | [cssnr/cache-cleaner](https://github.com/cssnr/cache-cleaner)                                 |  Default   | **Custom** |
| [Zipline Android](https://zipline-android.cssnr.com/)   | [cssnr/zipline-android-docs](https://github.com/cssnr/zipline-android-docs)                   | **Custom** |  Default   |
| [Django Files](https://django-files.github.io/)         | [django-files/django-files.github.io](https://github.com/django-files/django-files.github.io) |  Default   |  Default   |
| [Portainer Deploy](https://portainer-deploy.cssnr.com/) | [cssnr/portainer-stack-deploy-docs](https://github.com/cssnr/portainer-stack-deploy-docs)     |  Default   | **Custom** |

## Install

From [npmjs.com](https://www.npmjs.com/package/vitepress-chat) using your favorite package manager...

```shell
npm i -D vitepress-chat
```

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
    api: 'http://localhost:3000/',
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
    api: 'http://localhost:3000/',
  }),
}
```

With an Authorization header and remote server.

```typescript
export default {
  ...DefaultTheme,
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
    headers: { Authorization: 'Basic Abc123=' },
  }),
}
```

With a custom file name, to use with other generators like [vitepress-plugin-llms](https://github.com/okineadev/vitepress-plugin-llms).

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

You can also configure the button text, initial message and much more.  
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

## Customize

You can use a custom component for the Header or Footer.

```typescript
import ChatHeader from './components/ChatHeader.vue'
import ChatFooter from './components/ChatFooter.vue'

export default {
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
    chatHeader: ChatHeader,
    chatFooter: ChatFooter,
  }),
}
```

The custom `chatHeader` will override the current header text/link.

The custom `chatFooter` is only displayed when added.

:::details Click here to view this site's [./components/ChatFooter.vue](https://github.com/cssnr/vitepress-chat/blob/master/docs/.vitepress/theme/components/ChatFooter.vue)

<<< @/.vitepress/theme/components/ChatFooter.vue

:::

&nbsp;

If you don't have one setup yet, configure your [Server](server.md).
