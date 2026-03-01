<template>
  <MainLayout>
    <HeroSection />

    <SortBar v-model="sortType" />

    <div class="content_overlay">
      <section class="content container">
        <div class="left">
          <p v-if="error" class="error-message">{{ error }}</p>
          <ApartmentsGrid :apartments="apartments" />
        </div>

        <div class="right">
          <MapPlaceholder />
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import SortBar from '@/components/filters/SortBar.vue'
import ApartmentsGrid, { type Apartment } from '@/components/ListingsSection/listings/ApartmentsGrid.vue'
import MapPlaceholder from '@/components/ListingsSection/MapPlaceholder.vue'

// interface ApartmentFromApi {
//   id: number
//   title: string
//   rooms: number | null
//   quantity: number
//   pricePerDay: number
//   capacity: number
// }

const sortType = ref('popular')
const apartments = ref<Apartment[]>([])
const error = ref('')

// function expandApartments(source: ApartmentFromApi[]): Apartment[] {
//   return source
//     .flatMap((apartment) => {
//       return Array.from({ length: apartment.quantity }, (_, index) => ({
//         listingId: `${apartment.id}-${index + 1}`,
//         id: apartment.id,
//         title: apartment.title,
//         rooms: apartment.rooms,
//         pricePerDay: apartment.pricePerDay,
//         capacity: apartment.capacity
//       }))
//     })
// }

// const mockData = [
//   {
//     id: 1,
//     title: 'Luxury Apartment near Haram',
//     price: 120,
//     image: '/image.jpg',
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     title: 'Modern Suite with View',
//     price: 95,
//     image: '/image.jpg',
//     rating: 4.6,
//   },
// ]
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3001/api/apartments')

    if (!response.ok) {
      throw new Error('Не удалось загрузить квартиры')
    }

    const data = await response.json() as { apartments?: Apartment[] }
    apartments.value = Array.isArray(data.apartments) ? data.apartments : []
  } catch {
    error.value = 'Не удалось загрузить список квартир с сервера.'
  }
})
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

.error-message {
  margin-left: 114px;
  margin-bottom: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #ff8d8d;
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
