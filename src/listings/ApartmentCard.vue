<template>
  <div class="card">
    <img src="@/assets/hero.jpg" alt="apartment" />

    <div class="card-content">
      <h3>Уютная квартира рядом с Аль-Харам</h3>

      <p class="location">500 м до мечети</p>

      <div class="bottom">
        <div class="price">
          от <span>4500 ₽</span> / ночь
        </div>

        <button>Подробнее</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'ApartmentCard' })
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid $gold-light;
  border-radius: 12px;
  overflow: hidden;
  transition: $transition;
  background: #111;

  &:hover {
    @include glow;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h3 {
    font-size: 20px;
  }

  .location {
    color: $gold-light;
    font-size: 14px;
  }

  .bottom {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price span {
    @include gold-text;
    font-weight: 600;
  }

  button {
    padding: 8px 14px;
    border: 1px solid $gold-light;
    background: transparent;
    color: white;
    cursor: pointer;
    transition: $transition;

    &:hover {
      @include glow;
      @include gold-text;
    }
  }
}
</style>
