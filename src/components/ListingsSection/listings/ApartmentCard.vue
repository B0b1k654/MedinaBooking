<template>
  <div class="card">

    <!-- Фото -->
    <img class="image" src="@/assets/apartment.jpg" />

    <!-- Контент -->
    <div class="info">

      <!-- Цена -->
      <div class="price-row">
        <div class="price">5000 ₽ / сутки</div>
        <img src="" alt="" class="heart">
      </div>

      <!-- Рейтинг -->
      <div class="rating-row">
        <div class="stars">
          <span v-for="i in 5" :key="i">★</span>
        </div>

        <div class="area">
          <img src="" alt="" class="ruler">
          <span>35 кв. м</span>
        </div>
      </div>

      <!-- Описание -->
      <div class="description">
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

  padding: 0;

  /* золотая подсветка сверху и снизу */
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;

    background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
    filter: blur(1px);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}

.image {
  width: 269px;
  height: 164px;
  object-fit: cover;
  border-radius: 4px;
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
  margin-top: 20px;
  font-family: 'Cormorant Garamond';
  font-weight: 600;
  font-size: 14px;

  padding: 4px 8px;
  background: rgba(198, 138, 58, 0.15);
  border-radius: 4px;
}

/* Кнопка */
.book-btn {
  margin-top: 20px;

  width: 144px;
  height: 26px;

  border: none;
  border-radius: 5px;

  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 13px;

  background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
  cursor: pointer;

  transition: 0.3s ease;

  &:hover {
    transform: translateY(-2px);
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
