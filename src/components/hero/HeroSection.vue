<template>
  <section class="hero">
    <div class="overlay"></div>

    <div class="hero-content">
      <SearchCard />

      <div class="info">
        <h1>Жильё в Медине</h1>
        <p>
          Удобный сервис бронирования рядом с главными
          достопримечательностями города.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchCard from './SearchCard.vue'
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero {
  position: relative;
  min-height: 600px;
  background: url('@/assets/hero.jpg') center/cover no-repeat;
  display: flex;
  align-items: center;
  padding: 40px 20px;

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .hero-content {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    gap: 40px;
    flex-wrap: wrap;
  }

  .info {
    max-width: 500px;

    h1 {
      font-size: 48px;
      margin-bottom: 20px;
      @include gold-text;
    }

    p {
      color: $gold-light;
    }
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
  }

  .info h1 {
    font-size: 32px;
  }
}
</style>
