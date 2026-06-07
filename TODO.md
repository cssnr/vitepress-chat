# TODO

- Improve typing indicator while reasoning (or not streaming)
- Improve file name definitions in instructions generation
- Add training on formatting anchor links in system prompt
- Add input for custom system prompt
- Add scroll-to-bottom button on chat

# Architecture

- [Client](#client)
- [Server](#server)

> [!WARNING]  
> This section is **out-of-date**!

## Client

### [ChatButton.vue](src/ChatButton.vue)

This is where you import the main component and the custom css styles.

Location: `.vitepress/theme/index.ts`

```typescript
import chat from 'vitepress-chat'
import 'vitepress-chat/style.css'
```

Then spread it into your theme, passing the DefaultThem or Custom Layout.

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

When clicking on the chat button, it loads the [ChatBox.vue](#chatboxvue).

### [ChatBox.vue](src/ChatBox.vue)

The chat box contains all the AI SDK and javascript libraries.  
This is loaded once on click to improve site performance.  
The bundle is ~400KB download, uncompressed ~1.2MB.

- [AI SDK - useChat](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat)

This load the instructions and communicates with the proxy server.

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

## Server

- https://github.com/cssnr/chat-server
