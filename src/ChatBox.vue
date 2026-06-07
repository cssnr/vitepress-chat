<script setup lang="ts">
import { computed, ref, watch, nextTick, useTemplateRef, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
import { DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'
import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { Send } from 'lucide-vue-next'
import type { ChatOptions } from './index'

const props = withDefaults(defineProps<ChatOptions & { isOpen: boolean }>(), {
  filePath: 'instructions.txt',
})

const emit = defineEmits<{ close: [] }>()

const { site } = useData()

const base = site.value.base || '/'

const system = `
You are a helpful assistant responding to questions in a chat box on a website.
MUST ALWAYS format ALL URLs (links) as Markdown links WITHOUT \`.md\` ending!
MUST also ALWAYS prepend the BASE: \`${base}\` to the URL links!!
Example: [client](client.md) -> [client](${base}client)
VitePress Documentation Files:
`

const initialMessageText = computed(
  () =>
    props.initialMessage ??
    `Hello, I'm an AI assistant trained on **${site.value.title}**.\n\nYou can ask me anything…\n\nHow can I help?`,
)

const instructions = ref(system)
const input = ref('')
const error = ref('')
const messagesEl = useTemplateRef('messagesEl')
const anchorEl = useTemplateRef('anchorEl')
const inputEl = useTemplateRef('inputEl')

watch(
  () => props.isOpen,
  (val) => {
    if (val) {
      nextTick(() => {
        focusInput()
        scrollToBottom()
      })
    }
  },
  { immediate: true },
)

onMounted(async () => {
  console.log('baseUrl:', base)
  const instructionsPath = props.filePath.includes('/') ? props.filePath : `${base}${props.filePath}`
  console.log('instructionsPath:', instructionsPath)
  try {
    if (import.meta.env.VITE_AI_DEV_INSTRUCTIONS) {
      instructions.value = import.meta.env.VITE_AI_DEV_INSTRUCTIONS
      console.log('DEV instructions:', instructions.value)
      return
    }
    const res = await fetch(instructionsPath)
    console.log('res.status:', res.status)
    if (res.ok) {
      const text = await res.text()
      instructions.value = `${system}\n\n${text}`
      console.log('instructions:', instructions.value)
    } else {
      console.error('fetching instructions:', res)
    }
  } catch (e) {
    console.error('fetching instructions:', e)
  }
})

const renderMarkdown = (text: string) => marked.parse(text ?? '')

// noinspection JSUnusedGlobalSymbols
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
)

const chat = new Chat({
  transport: new DefaultChatTransport({
    api: props.api,
    ...(props.headers ? { headers: props.headers } : {}),
    body: () => ({ system: instructions.value }),
  }),
  onFinish: () => {
    scrollToBottom()
    focusInput()
  },
  onError: (e) => {
    console.error(e)
    error.value = e.message
  },
})

const chatBusy = computed(() => chat.status !== 'ready' && chat.status !== 'error')

let autoScroll = true
let observer: MutationObserver | null = null

watch(messagesEl, (el) => {
  observer?.disconnect()
  if (!el) return
  observer = new MutationObserver(() => {
    if (autoScroll) anchorEl.value?.scrollIntoView({ block: 'end' })
  })
  observer.observe(el, { childList: true, subtree: true, characterData: true })
})

onUnmounted(() => observer?.disconnect())

function onScroll() {
  const el = messagesEl.value
  if (!el) return
  autoScroll = el.scrollHeight - el.scrollTop - el.clientHeight < 40
}

function onBubbleClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('a')) {
    emit('close')
  }
}

function focusInput() {
  nextTick(() => inputEl.value?.focus())
}

function scrollToBottom() {
  autoScroll = true
  anchorEl.value?.scrollIntoView({ block: 'end' })
}

function onTextareaKeydown(e: KeyboardEvent) {
  if (e.key !== 'Enter') return
  e.preventDefault()
  if (e.shiftKey || e.ctrlKey || e.metaKey) {
    const el = inputEl.value
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const val = input.value
    input.value = val.slice(0, start) + '\n' + val.slice(end)
    nextTick(() => {
      el.selectionStart = el.selectionEnd = start + 1
    })
  } else {
    handleSubmit(e)
  }
}

function handleSubmit(e: Event) {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  scrollToBottom()
  error.value = ''
  chat.sendMessage({ text })
  input.value = ''
  focusInput()
}
</script>

<template>
  <div ref="messagesEl" class="chat-messages" @scroll="onScroll">
    <div v-if="initialMessageText" class="message message--ai">
      <span class="message-label">AI</span>
      <div class="message-bubble" v-html="renderMarkdown(initialMessageText)" @click="onBubbleClick" />
    </div>

    <div
      v-for="message in chat.messages"
      :key="message.id"
      class="message"
      :class="message.role === 'user' ? 'message--user' : 'message--ai'"
    >
      <span class="message-label">
        {{ message.role === 'user' ? 'You' : 'AI' }}
      </span>
      <div class="message-bubble" @click="onBubbleClick">
        <span v-for="(part, i) in message.parts" :key="i">
          <span v-if="part.type === 'text'" v-html="renderMarkdown(part.text)" />
        </span>
      </div>
    </div>

    <div v-if="chat.status === 'submitted'" class="message message--ai">
      <div class="message-bubble--typing"><span class="dot" /><span class="dot" /><span class="dot" /></div>
    </div>

    <div ref="anchorEl" />
  </div>

  <hr class="chat-divider" />

  <div v-if="error" class="chat-error">{{ error }}</div>

  <form class="chat-form" @submit="handleSubmit">
    <textarea
      ref="inputEl"
      v-model="input"
      class="chat-input"
      :disabled="chatBusy"
      placeholder="Enter your question (use Ctrl/Shift+Enter for new lines)…"
      autocomplete="off"
      @keydown="onTextareaKeydown"
    />
    <button type="submit" class="chat-send" :disabled="chatBusy || !input.trim()" title="Send">
      <Send />
    </button>
  </form>
</template>

<style scoped>
.chat-messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
}

.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 4px;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 96%;
}

.message--user {
  align-self: flex-end;
  align-items: flex-end;
}

.message--ai {
  align-self: flex-start;
  align-items: flex-start;
}

.message-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  padding: 0 4px;
}

.message-bubble {
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.55;
  overflow-wrap: break-word;
  word-break: break-word;
  min-width: 0;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.message-bubble :deep(pre),
.message-bubble :deep(code) {
  word-break: break-word;
  overflow-wrap: break-word;
}

.message-bubble :deep(pre) {
  white-space: pre-wrap;
}

.message-bubble :deep(img) {
  max-width: 100%;
  height: auto;
}

.message--user .message-bubble {
  background: var(--vp-c-default-2);
  border-color: var(--vp-c-border);
  border-bottom-right-radius: 4px;
}

.message--ai .message-bubble {
  background: var(--vp-c-default-soft);
  border-bottom-left-radius: 4px;
}

.message-bubble :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.message-bubble--typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 16px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-text-3);
  animation: bounce 1.2s infinite ease-in-out;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

.chat-divider {
  flex-shrink: 0;
  margin: 0;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
}

.chat-form {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  position: relative;
}

.chat-input {
  flex: 1;
  min-width: 0;
  padding: 8px 44px 8px 8px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.4;
  outline: none;
  transition: border-color 0.2s;
  height: 80px;
  min-height: 50px;
}

.chat-input::placeholder {
  color: var(--vp-c-text-3);
}

.chat-input:focus {
  border-color: var(--vp-c-brand-1);
}

.chat-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-send {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--vp-c-brand-2);
  color: var(--vp-button-brand-hover-text);
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.15s,
    opacity 0.2s;
}

.chat-send:hover:not(:disabled) {
  background: var(--vp-c-brand-1);
  transform: scale(1.08);
}

.chat-send:active:not(:disabled) {
  transform: scale(0.96);
}

.chat-send:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
