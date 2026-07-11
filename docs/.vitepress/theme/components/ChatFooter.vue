<script setup lang="ts">
defineProps<{ closeChat: () => void }>()
</script>

<template>
  <hr class="chat-divider" />
  <div class="vp-doc chat-footer">
    <span class="chat-footer-text">
      View the
      <a
        class="vp-external-link-icon"
        href="https://github.com/cssnr/vitepress-chat/blob/master/PRIVACY.md"
        target="_blank"
        >PRIVACY.md</a
      >
    </span>
    <i class="chat-footer-text">View <a href="client#customize" @click="closeChat">Custom Footer</a> Docs</i>
  </div>
</template>

<style scoped>
.chat-divider {
  flex-shrink: 0;
  margin: 0;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
}
.chat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-footer-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
</style>
