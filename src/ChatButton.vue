<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useScrollLock, useEventListener, onKeyStroke } from '@vueuse/core'
import { Zap, X } from 'lucide-vue-next'
import type { ChatOptions } from './index'

withDefaults(defineProps<ChatOptions>(), {
  buttonText: 'AI Chat',
  headerText: 'VitePress Chat',
  headerUrl: 'https://github.com/cssnr/vitepress-chat',
})

const isOpen = ref(false)
const isLoading = ref(false)
const loadError = ref(false)
const ChatBox = shallowRef()

const isLocked = useScrollLock(typeof window !== 'undefined' ? document.body : null)

async function openChat() {
  isOpen.value = true
  isLocked.value = true
  window.history.pushState(null, '', null)
  if (ChatBox.value) return
  isLoading.value = true
  loadError.value = false
  try {
    const mod = await import('./ChatBox.vue')
    if (!isOpen.value) return
    ChatBox.value = mod.default
    isLoading.value = false
  } catch (e) {
    console.error('Failed to load chat:', e)
    loadError.value = true
    isLoading.value = false
  }
}

function closeChat() {
  isOpen.value = false
  isLocked.value = false
}

onKeyStroke('Escape', () => {
  if (isOpen.value) closeChat()
})

useEventListener('popstate', () => {
  if (isOpen.value) closeChat()
})
</script>

<template>
  <button class="vp-chat-button" title="Open chat" @click="openChat"><Zap /> {{ buttonText }}</button>

  <Teleport to="body">
    <Transition name="vp-chat">
      <div v-show="isOpen" class="vp-chat-box">
        <div class="backdrop" @click="closeChat" />
        <div class="shell">
          <div class="chat-header">
            <component
              v-if="headerText"
              :is="headerUrl ? 'a' : 'span'"
              class="chat-header-title"
              :href="headerUrl ?? undefined"
              :target="headerUrl ? '_blank' : undefined"
              :rel="headerUrl ? 'noopener noreferrer' : undefined"
            >
              <Zap /> <span class="chat-header-text">{{ headerText }}</span>
            </component>
            <button class="chat-header-close" title="Close chat" @click="closeChat"><X /></button>
          </div>

          <hr class="chat-divider" />

          <div v-if="isLoading" class="chat-loading">
            <div class="spinner" />
            <span>Loading Chat…</span>
          </div>
          <div v-else-if="loadError" class="chat-error">Failed to load chat. Please try again.</div>

          <component v-else-if="ChatBox" :is="ChatBox" v-bind="$props" :is-open="isOpen" @close="closeChat" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
:deep(.chat-error) {
  flex-shrink: 0;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-danger-soft);
  border: 1px solid var(--vp-c-danger-2);
  color: var(--vp-c-danger-1);
  font-size: 0.85rem;
  line-height: 1.4;
  word-break: break-word;
}

.vp-chat-button {
  position: fixed;
  bottom: 24px;
  right: 16px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 24px;
  background: var(--vp-c-brand-2);
  color: var(--vp-button-brand-hover-text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px color-mix(in srgb, var(--vp-c-brand-2) 40%, transparent);
  transition:
    background-color 0.2s,
    box-shadow 0.2s,
    transform 0.15s;
}

.vp-chat-button:hover {
  background: var(--vp-c-brand-1);
  transform: scale(1.04);
}

.vp-chat-button:active {
  transform: translateY(0);
}

.vp-chat-box {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: flex;
}

.backdrop {
  position: absolute;
  inset: 0;
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.5s;
}

.shell {
  position: relative;
  margin: 64px auto;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--vp-local-search-bg);
  width: min(100vw - 90px, 900px);
  height: min(100vh - 128px);
  border-radius: 6px;
  overflow: hidden;
}

@media (max-width: 767px) {
  .shell {
    margin: 0;
    width: 100vw;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.chat-header-title {
  min-width: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.chat-header-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.chat-header-close {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
  color: var(--vp-c-text-2);
  transition:
    color 0.2s,
    background-color 0.2s;
}

.chat-header-close:hover {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-default-soft);
}

.chat-divider {
  flex-shrink: 0;
  margin: 0;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
}

.chat-loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.spinner {
  width: 64px;
  height: 64px;
  border: 8px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand-1);
  border-radius: 50%;
  animation: chat-spin 0.8s linear infinite;
}

@keyframes chat-spin {
  to {
    transform: rotate(360deg);
  }
}

/*noinspection CssUnusedSymbol*/
.vp-chat-enter-active,
.vp-chat-leave-active {
  transition: opacity 0.2s ease;
}

/*noinspection CssUnusedSymbol*/
.vp-chat-enter-from,
.vp-chat-leave-to {
  opacity: 0;
}

.vp-chat-enter-active .shell,
.vp-chat-leave-active .shell {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.vp-chat-enter-from .shell,
.vp-chat-leave-to .shell {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
