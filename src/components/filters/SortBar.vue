<template>
  <section id="filters">
    <div class="container">
      <div class="filter-bar">
        <button
          class="filter-btn"
          :class="{ active: model === 'popular' }"
          type="button"
          @click="model = 'popular'"
        >
          <span class="gradient-text">По популярности</span>
        </button>
        <div class="filter-divider"></div>
        <button
          class="filter-btn"
          :class="{ active: model === 'price_asc' }"
          type="button"
          @click="model = 'price_asc'"
        >
          <span class="gradient-text">По цене</span>
          <img :src="upArrow" alt="up" class="arrow-icon" />
        </button>

        <div class="filter-divider"></div>

        <button
          class="filter-btn"
          :class="{ active: model === 'price_desc' }"
          type="button"
          @click="model = 'price_desc'"
        >
          <span class="gradient-text">По цене</span>
          <img :src="downArrow" alt="down" class="arrow-icon" />
        </button>
      </div>
    </div>
    </section>
</template>

<script setup lang="ts">
import upArrow from '@/assets/45_253.svg'
import downArrow from '@/assets/46_255.svg'

defineOptions({ name: 'SortBar' })

const model = defineModel<string>({
  default: 'popular',
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

#filters {
  position: relative;
  z-index: 5;
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
}

.container {
  width: min(100%, 1484px);
  margin: 0 auto;
  padding: 0 24px;
  
}

.filter-bar {
  margin-left: 114px;
  width: 1256px;
  height: 45px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid $gold-light;
  border-radius: 6px;
  display: flex;
  align-items: center;
}
.filter-btn {
  padding: 0 30px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  border: 0;
  background: transparent;
}

.filter-btn.active {
  background-color: rgba(252, 226, 159, 0.1);
}

.gradient-text {
  color: transparent;
  background: linear-gradient(180deg, #fce29f 0%, #d0a74a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 15px;
  line-height: 1;
}

.filter-divider {
  width: 1px;
  height: 30px;
  background-color: rgba(252, 226, 159, 0.3);
}

.arrow-icon {
  width: 15px;
  height: 15px;
}

@media (max-width: 1440px) {
  .filter-bar {
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 900px) {
  .filter-bar {
    height: auto;
    flex-wrap: wrap;
  }

  .filter-divider {
    display: none;
  }

  .filter-btn {
    width: 100%;
    justify-content: center;
    min-height: 45px;
  }
  .gradient-text {
    font-size: 28px;
  }
}
</style>


//@use '@/styles/mixins' as *;

// .sortbar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 25px 20px;
//   border-bottom: 1px solid $gold-light;
//   flex-wrap: wrap;
//   gap: 15px;

//   .results {
//     font-size: 18px;
//     @include gold-text;
//   }

//   .controls {
//     display: flex;
//     align-items: center;
//     gap: 15px;

//     select {
//       padding: 8px 12px;
//       background: transparent;
//       border: 1px solid $gold-light;
//       color: white;
//       cursor: pointer;
//     }
//   }
// }
<!-- // </style> -->
