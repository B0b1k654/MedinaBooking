<template>
  <div class="search-card">
    <input type="date" />
    <input type="date" />
    <input type="number" placeholder="Гости" />

    <button>Найти</button>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SearchCard' })
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.search-card {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: rgba(0, 0, 0, 0.7);
  padding: 25px;
  border: 1px solid $gold-light;
  border-radius: 10px;
  backdrop-filter: blur(6px);
  width: 280px;

  input {
    padding: 10px;
    background: transparent;
    border: 1px solid $gold-light;
    color: white;
  }

  button {
    padding: 12px;
    background: $gold-gradient;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: $transition;

    &:hover {
      @include glow;
    }
  }
}
</style>
