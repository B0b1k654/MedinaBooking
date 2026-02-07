<template>
  <div class="sortbar">
    <div class="results">Найдено 24 варианта</div>

    <div class="controls">
      <label>Сортировать:</label>

      <select v-model="model">
        <option value="popular">По популярности</option>
        <option value="price_asc">Цена ↑</option>
        <option value="price_desc">Цена ↓</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SortBar' })

const model = defineModel<string>({
  default: 'popular',
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.sortbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 20px;
  border-bottom: 1px solid $gold-light;
  flex-wrap: wrap;
  gap: 15px;

  .results {
    font-size: 18px;
    @include gold-text;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 15px;

    select {
      padding: 8px 12px;
      background: transparent;
      border: 1px solid $gold-light;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
