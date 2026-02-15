<template>
  <section class="listings">
    <div class="list">
      <ApartmentCard v-for="i in 11" :key="i" />
    </div>
    </section>
  <!-- <div class="apartments">
    <ApartmentCard
      v-for="item in apartments"
      :key="item.id"
      :apartment="item"
    />
  </div> -->
</template>

<script setup lang="ts">
import ApartmentCard from './ApartmentCard.vue'

interface Apartment {
  id: number
  title: string
  price: number
  image: string
  rating: number
}

defineProps<{
  apartments: Apartment[]
}>()
</script>

<!-- <style scoped lang="scss">
.apartments {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style> -->
