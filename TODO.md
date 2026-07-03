# TODO

## Chat

- Improve reasoning view's
- Improve typing indicator (spinning wheel)
- Add Mermaid diagram rendering
- Add training on formatting anchor links in system prompt
- Add Chat Option for custom system prompt
- Add scroll-to-bottom button on chat

## Instructions

- Improve file name definitions in instructions generation

# Architecture

- [Client](#client)
- [Server](#server)

## Client

### [ChatButton.vue](src/ChatButton.vue)

This is where you import the main component and the custom css styles.

Location: `.vitepress/theme/index.ts`

```typescript
import chat from 'vitepress-chat'
import 'vitepress-chat/style.css'
```

Then spread it into your theme, passing the DefaultTheme or custom Layout.

```typescript
export default {
  ...DefaultTheme,
  ...chat(DefaultTheme, {
    api: 'https://chat-server.cssnr.com/',
  }),
}
```

Reference: [index.ts](src/index.ts)

This adds the `AI Chat` in the bottom right corner of the layout.

Only contains the minimal code to add the chat button, uncompressed ~`6KB`.

Includes all the CSS, uncompressed ~`8KB`.

When clicking on the chat button, it loads the [ChatBox.vue](#chatboxvue).

### [ChatBox.vue](src/ChatBox.vue)

The chat box contains all the AI SDK and javascript libraries.  
This is loaded once on click to improve site performance.  
The bundle is ~`400KB` download, uncompressed ~`1.2MB`.

- [AI SDK - useChat](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat)

This load the instructions and communicates with the proxy server.

The instructions are fetched to allow use with any location or file.

The instructions are sent as a body parameter to the proxy server.

### [instructions.ts](src/instructions.ts)

This is where you add the Vite Instructions Generator Plugin.

Location: `.vitepress/config.mts`

```typescript
import instructions from 'vitepress-chat/instructions'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [instructions()],
  },
})
```

This plugin is optional and only usd to combine all your docs into a single text file.

You can use any existing file or plugin as long as the text can be fetched with a URL.

More details coming soon, see the [source code](src/instructions.ts) for more info...

## Server

- https://github.com/cssnr/chat-server
