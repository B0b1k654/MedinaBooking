<script setup>
import SearchCard from './SearchCard.vue'
</script>

<template>
  <section class="hero">
    <div class="hero__overlay">
      <div class="hero__container">

        <!-- Левая часть -->
        <SearchCard />

        <!-- Правая часть -->
        <div class="hero__content">

          <h1 class="hero__title">
            Жильё в Медине
          </h1>

          <p class="hero__subtitle">
            Найдите идеальный вариант проживания рядом с Аль-Масджид ан-Набави
          </p>

          <!-- Блок рейтинга -->
          <div class="hero__rating">

            <div class="hero__rating-stars">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star"></span>
              </div>

              <span class="rating-value">5.0</span>
              <img class="check-icon" src="/src/assets/completed.svg" alt="">
              
              <span class="rating-text">
                более 30 успешных бронирований
              </span>
            </div>
          </div>

          <!-- Блок преимуществ -->
          <div class="hero__benefits">

            <div class="benefit-item">
              <img class="benefit-icon" src="/src/assets/telephone-solid.svg" alt="">
              <span>Поддержка 24/7</span>
            </div>

            <div class="benefit-item">
              <img class="benefit-icon" src="/src/assets/uiw_pay.svg" alt="">
              <span>безопасная оплата</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.hero {
  position: relative;
  min-height: 380px;
  
  

  &__overlay {
    background: rgba(0, 0, 0, 0.7);
    height: 100%;
    min-height: 380px;
  }

  &__container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 90px;
    display: flex;
    align-items: flex-start;
  }

  &__content {
    margin-top: 65px; /* от хедера */
    margin-left: 363px;
    color: #fff;
  }

  /* ====== H1 ====== */

  &__title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(40px, 4vw, 60px);
    margin-bottom: 15px;
    background: $gold-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    display: flex;
  justify-content: center;
  }

  &__subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 30px;
    background: $gold-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    display: flex;
  justify-content: center;
  }

  /* ====== Рейтинг ====== */

  &__rating {
    width: 430px;
    height: 45px;
    margin-bottom: 0;
    display: flex ;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5); 
    border-radius: 5px;
    
  }

  &__rating-stars {
    display: flex;
    align-items: center;
  }

  .stars {
    display: flex;
    gap: 2px;
    margin-left: 4px;
  }

  .star {
    width: 20px;
    height: 20px;
    background: $gold-gradient;
    mask: url('data:image/svg+xml;utf8,<svg fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3 6 6 .9-4.5 4.4 1 6-5.5-3-5.5 3 1-6L3 8.9 9 8z"/></svg>') center/contain no-repeat;
  }

  .rating-value {
    margin-left: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 16px;
    background: $gold-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    
  }

  .check-icon {
    width: 16px;
    height: 16px;
    margin-left: 40px;
  }

  .rating-text {
    margin-left: 6px;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: 15px;
    background: $gold-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  /* ====== Блок преимуществ ====== */

  &__benefits {
    margin-top: 0;
    width: 362px;
    height: 35px;
    margin-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
    background: rgba(0, 0, 0, 0.3); 
    border-radius: 5px;
  }

  .benefit-item {
    display: flex;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 12px;
    background: $gold-gradient;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
  }

  .benefit-icon {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
}

/* ====== АДАПТИВ ====== */

@media (max-width: 1200px) {
  .hero__container {
    flex-direction: column;
  }

  .hero__content {
    margin-left: 0;
    margin-top: 40px;
  }
}
</style>


<!-- <template>
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
</style> -->
