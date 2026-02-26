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

<style scoped lang="scss">
.listings{
  margin-left: 114px;
  margin-right: 10px;
}
.list{
  background: #000;
  border-radius: 30px;
  max-width: 530px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 1px;
}
</style>
