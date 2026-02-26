<template>
  <div class="card">

    <!-- Фото -->
    <img class="image" src="@/assets/apartment.jpg" />

    <!-- Контент -->
    <div class="info">

      <!-- Цена -->
      <div class="price-row">
        <div class="price">5000 ₽ / сутки</div>
        <img src="/src/assets/favour.svg" alt="" class="heart">
      </div>

      <!-- Рейтинг -->
      <div class="rating-row">
        <div class="stars">
          <span v-for="i in 5" :key="i">★</span>
        </div>

        <div class="area">
          <img src="/src/assets/square.svg" alt="" class="ruler">
          <span>35 кв. м</span>
        </div>
      </div>

      <!-- Описание -->
      <div class="description">
        <div class="description-backlight"></div>
        Уютная 1-комнатная квартира
      </div>

      <!-- Кнопка -->
      <button class="book-btn">
        Забронировать
      </button>

    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 480px;
  height: 164px;

  display: flex;
  gap: 25px;

  position: relative;
  margin-bottom: 20px;
  padding: 0;

  /* золотая подсветка сверху и снизу */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
     height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      120deg,
      rgba(150, 102, 45, 0.25) 0%,
      rgba(252, 226, 159, 0.95) 35%,
      rgba(255, 250, 209, 1) 50%,
      rgba(198, 138, 58, 0.95) 65%,
      rgba(150, 102, 45, 0.25) 100%
    );
    background-size: 220% 100%;
    filter: blur(0.8px);
    box-shadow:
      0 0 8px rgba(252, 226, 159, 0.85),
      0 0 16px rgba(198, 138, 58, 0.55);
    animation: borderShimmer 2.4s linear infinite;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0
    animation-delay 1.2s;
  }
}

@keyframes borderShimmer {
  0% {
    background-position: 0% 50%;
    opacity: 0.65;
  }

  50% {
    background-position: 100% 50%;
    opacity: 1;
  }

  100% {
    background-position: 200% 50%;
    opacity: 0.65;
  }
}

.image {
  width: 269px;
  height: 164px;
  object-fit: cover;
  border-radius: 10px;
}

.info {
  flex: 1;
  padding-top: 5px;
}

/* Цена */
.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  width: 130px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;

  background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.heart {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

/* Рейтинг */
.rating-row {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.stars {
  display: flex;
  gap: 2px;

  span {
    font-size: 14px;
    background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.area {
  display: flex;
  align-items: center;
  margin-left: 20px;
  gap: 5px;

  font-family: 'Montserrat';
  font-size: 10px;
  color: #FCE4BB;
}

.ruler {
  width: 16px;
  height: 16px;
}

/* Описание */
.description {
  z-index: 2;
  margin-top: 20px;
  font-family: 'Cormorant Garamond';
  font-weight: 600;
  font-size: 14px;
  color: #FCE4BB;
  padding: 0px;
  // background: rgba(198, 138, 58, 0.15);
  // border-radius: 4px;
}
.description-backlight{
  position: absolute;
  z-index: 0;
  width: 30%;
  height: 30px;
  background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
  filter: blur(50px);
}

/* Кнопка */
// .book-btn::before{
//   animation: rotate 2s infinite linear;
//   filter: blur(20px);
// }
.book-btn {
  margin-top: 20px;

  width: 144px;
  height: 26px;

  border: none;
  border-radius: 5px;

  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 13px;

  background: linear-gradient(90deg, #96662D 0%, #C68A3A 25%, #FCE29F 50%,  #C68A3A 75%, #96662D 100% );
  background-size: 200%;
  animation: animate-gradient 5s linear
    infinite;

  cursor: pointer;

  transition: all 0.3s ease;
  // backdrop-filter: blur(40px);
  // backface-visibility: hidden;

  &:hover {
    transform: translateY(-2px);
  }
}

@keyframes animate-gradient{
  to{
    background-position: 200%;
  }
}

</style>
<!-- <template>
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
</style> -->
