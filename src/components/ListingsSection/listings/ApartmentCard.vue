<template>
  <div class="card">
    <img class="image" src="@/assets/apartment.jpg" :alt="apartment.title" />

    <div class="info">

      <div class="price-row">
        <div class="price"><span class="price-value">{{ apartment.pricePerDay }} ₽</span> / сутки</div>
        <button
          type="button"
          class="heart-btn"
          :class="{ active: isFavorite }"
          :disabled="favoritesDisabled"
          @click="emit('toggle-favorite', listingId)"
        >
          <span class="heart-icon" aria-hidden="true">{{ isFavorite ? '♥' : '♡' }}</span>
          <span class="sr-only">Избранное</span>
        </button>
      </div>

      <div class="rating-row">
        <div class="area">
          <img src="/src/assets/square.svg" alt="Комнаты" class="ruler" />
          <span>{{ roomsLabel }}</span>
        </div>

        <div class="capacity">
          До {{ apartment.capacity }} чел.>
        </div>
      </div>

      <div class="description">
        <div class="description-backlight"></div>
        {{ apartment.title }} 
      </div>

      <button class="book-btn">Забронировать</button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Apartment {
  id: number
  title: string
  rooms: number | null
  pricePerDay: number
  capacity: number
}

const props = defineProps<{
  apartment: Apartment
  listingId: string
  isFavorite: boolean
  favoritesDisabled?: boolean
}>()

const emit = defineEmits<{
  'toggle-favorite': [listingId: string]
}>()

const roomsLabel = computed(() => {
  if (props.apartment.rooms === null) {
    return 'Люкс'
  }

  return `${props.apartment.rooms} комн.`
})
</script>

<style scoped lang="scss">
.card {
  width: 480px;
  height: 164px;
  display: flex;
  gap: 25px;
  position: relative;
  margin-bottom: 20px;
  padding: 0;

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
    bottom: 0;
    animation-delay: 1.2s;
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

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.price {
  width: 160px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
  
  background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.price-value{
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 20px;
  background:  #FCE29F; 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
// .heart {
//   width: 20px;
//   height: 20px;
//   cursor: pointer;
// }

.heart-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:disabled {
    opacity: 0.5;
    cursor: wait;
  }
}

.heart-icon {
  font-size: 24px;
  line-height: 1;
  color: #fce29f;
  transition: transform 0.2s ease;
}

.heart-btn.active .heart-icon {
  color: #ff6b81;
}

.heart-btn:hover .heart-icon {
  transform: scale(1.08);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Рейтинг */
.rating-row {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

// .stars {
//   display: flex;
//   gap: 2px;

//   span {
//     font-size: 14px;
//     background: linear-gradient(90deg, #96662D 0%, #FCE29F 65%, #C68A3A 100%);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// }

.area, .capacity {
  display: flex;
  align-items: center;
  // margin-left: 20px;
  gap: 5px;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  // color: #FCE4BB;
  // padding: 0px;
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
  font-family: 'Montserrat', sans-serif;
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
