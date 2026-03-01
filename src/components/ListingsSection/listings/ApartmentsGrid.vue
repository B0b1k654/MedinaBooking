<template>
  <section class="listings">
    <div class="list">
       <template v-for="item in apartments" :key="item.id">
        <ApartmentCard
          v-for="unitIndex in item.quantity"
          :key="`${item.id}-${unitIndex}`"
          :apartment="item"
        />
      </template>
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

export interface Apartment {
  listingId: string
  id: number
  title: string
  rooms: number | null
  quantity?: number
  pricePerDay: number
  capacity: number
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
