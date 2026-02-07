<template>
  <MainLayout>
    <HeroSection />

    <SortBar v-model="sortType" />

    <section class="content">
      <div class="list">
        <ApartmentCard />
        <ApartmentCard />
        <ApartmentCard />
      </div>

      <div class="map-container">
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
import ApartmentCard from '@/components/listings/ApartmentCard.vue'
import MapPlaceholder from '@/components/map/MapPlaceholder.vue'

const sortType = ref('popular')
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.content {
  display: flex;
  padding: 40px 20px;
  gap: 30px;
  flex-wrap: wrap;
}

.list {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.map-container {
  flex: 1;
  min-width: 300px;
}
</style>
