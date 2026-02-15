<template>
  <div class="layout">
    <AppHeader />
    <!-- <AppNavbar /> -->
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/header/AppHeader.vue'
</script>

<style scoped>
main {
  width: 100%;
}

</style>
