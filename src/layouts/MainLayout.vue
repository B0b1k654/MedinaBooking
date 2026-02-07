<template>
  <div class="layout">
    <AppTopBar />
    <AppNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppTopBar from '@/components/header/AppTopBar.vue'
import AppNavbar from '@/components/header/AppNavbar.vue'
</script>

<style scoped>
main {
  width: 100%;
}
</style>
