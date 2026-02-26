<template>
  <MainLayout>
    <HeroSection />

    <SortBar v-model="sortType" />

    <div class="content_overlay">
      <section class="content container">
        <div class="left">
          <ApartmentsGrid :apartments="mockData" />
        </div>

        <div class="right">
          <MapPlaceholder />
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import SortBar from '@/components/filters/SortBar.vue'
import ApartmentsGrid from '@/components/ListingsSection/listings/ApartmentsGrid.vue'
import MapPlaceholder from '@/components/ListingsSection/MapPlaceholder.vue'

const sortType = ref('popular')

const mockData = [
  {
    id: 1,
    title: 'Luxury Apartment near Haram',
    price: 120,
    image: '/image.jpg',
    rating: 4.8,
  },
  {
    id: 2,
    title: 'Modern Suite with View',
    price: 95,
    image: '/image.jpg',
    rating: 4.6,
  },
]
</script>

<style scoped lang="scss">
.content {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  max-width: 1440px;
  justify-content: center;
  justify-items: center;
  margin: 0 auto;
  padding-top: 40px;

  // &_overlay{
  //   background: rgba(0, 0, 0, 0.5);
  //   height: 100%;
  //   width: 100%;
  // }
}

.left {
  flex: 2;
}

.right {
  flex: 0 0 649px;
  position: sticky;
  top: 120px;
}

@media (max-width: 1024px) {
  .content {
    flex-direction: column;
  }

  .right {
    width: 100%;
    position: static;
    margin-top: 40px;
  }
}
</style>
