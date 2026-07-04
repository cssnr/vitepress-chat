<script setup lang="ts">
defineProps<{ closeChat: () => void }>()
</script>

<template>
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
