<template>
  <div class="map">
    🗺 Здесь будет карта
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MapPlaceholder' })
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.map {
  height: 100%;
  min-height: 500px;
  border: 1px solid $gold-light;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: $gold-light;
}
</style>
