<template>
  <MainLayout>
    <HeroSection />

    <SortBar v-model="sortType" />

    <section class="content container">
      <div class="left">
        <ApartmentsGrid :apartments="mockData" />
      </div>

      <div class="right">
        <MapPlaceholder />
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import SortBar from '@/components/filters/SortBar.vue'
import ApartmentsGrid from '@/components/listings/ApartmentsGrid.vue'
import MapPlaceholder from '@/components/map/MapPlaceholder.vue'

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
  margin-top: 60px;
  align-items: flex-start;
}

.left {
  flex: 2;
}

.right {
  flex: 1;
  position: sticky;
  top: 120px;
}

@media (max-width: 1024px) {
  .content {
    flex-direction: column;
  }

  .right {
    position: static;
    margin-top: 40px;
  }
}
</style>
