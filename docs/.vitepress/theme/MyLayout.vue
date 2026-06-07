<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-features-after>
      <div class="test-slot">Test Slot: home-features-after</div>
    </template>
  </Layout>
</template>

<style scoped>
.test-slot {
  margin-top: 48px;
  text-align: center;
}
</style>
