<template>
  <div class="topbar">
    <div>Быстро, удобно, надёжно</div>
    <div class="lang">RU / RUB 🇷🇺</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppTopBar' })
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.topbar {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  border-bottom: 1px solid $gold-light;
  font-size: 14px;

  .lang {
    @include gold-text;
  }
}
</style>
