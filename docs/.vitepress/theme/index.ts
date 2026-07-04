import DefaultTheme, { VPBadge } from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

import chat from '../../../src/index.ts'
// import MyLayout from './MyLayout.vue'
import ChatFooter from './components/ChatFooter.vue'

// noinspection JSUnusedGlobalSymbols
export default {
  ...DefaultTheme,

  // ...chat(MyLayout, {
  // ...chat(DefaultTheme.Layout, {
  ...chat(DefaultTheme, {
    api: import.meta.env.VITE_AI_API,
    headers: import.meta.env.VITE_AI_AUTH
      ? { Authorization: import.meta.env.VITE_AI_AUTH }
      : undefined,
    filePath: 'llms.txt',
    showReasoning: true,
    // buttonText: '',
    // headerUrl: null,
    // headerText: null,
    // initialMessage: "Hello, I'm an AI Assistant trained on the VitePress Chat.\n\nHow can I help you [get started](client)?",
    // chatHeader: ChatFooter,
    chatFooter: ChatFooter,
  }),

  enhanceApp({ app }) {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Badge', VPBadge)
  },
} satisfies Theme
