<template>
  <MainLayout>
    <HeroSection />

    <SortBar v-model="sortType" />

    <div class="content_overlay">
      <section class="content container">
        <div class="left">
          <p v-if="error" class="error-message">{{ error }}</p>
          <p v-if="favoriteError" class="error-message">{{ favoriteError }}</p>
          <p v-if="favoriteInfo" class="info-message">{{ favoriteInfo }}</p>
          <ApartmentsGrid
            :apartments="apartments"
            :favorite-ids-set="favoriteIdsSet"
            :favorites-disabled="favoritesBusy"
            @toggle-favorite="handleToggleFavorite"
          />
        </div>

        <div class="right">
          <MapPlaceholder />
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import SortBar from '@/components/filters/SortBar.vue'
import ApartmentsGrid, { type Apartment } from '@/components/ListingsSection/listings/ApartmentsGrid.vue'
import MapPlaceholder from '@/components/ListingsSection/MapPlaceholder.vue'
import { useAuth } from '@/composables/auth'
import { useFavorites } from '@/composables/favorites'
import { apiUrl } from '@/utils/api'

const fallbackApartments: Apartment[] = [
  { id: 1, title: '1-комнатная квартира', rooms: 1, quantity: 1, pricePerDay: 5000, capacity: 3 },
  { id: 2, title: '2-комнатная квартира', rooms: 2, quantity: 2, pricePerDay: 6500, capacity: 4 },
  { id: 3, title: '3-комнатная квартира', rooms: 3, quantity: 4, pricePerDay: 10000, capacity: 7 },
  { id: 4, title: '4-комнатная квартира', rooms: 4, quantity: 4, pricePerDay: 12500, capacity: 10 },
  { id: 5, title: 'Люкс квартира', rooms: null, quantity: 1, pricePerDay: 15000, capacity: 7 }
]

const sortType = ref('popular')
const apartments = ref<Apartment[]>([])
const error = ref('')
const favoriteInfo = ref('')

const { currentUser, refreshFromStorage } = useAuth()
const {
  favoriteIdsSet,
  errorMessage: favoriteError,
  isBusy: favoritesBusy,
  loadFavorites,
  toggleFavorite
} = useFavorites()

onMounted(async () => {
  refreshFromStorage()

  try {
    const response = await fetch(apiUrl('/api/apartments'))

    if (!response.ok) {
      throw new Error('Не удалось загрузить квартиры')
    }

    const data = await response.json() as { apartments?: Apartment[] }
    apartments.value = Array.isArray(data.apartments) ? data.apartments : []
  } catch (errorUnknown) {
    apartments.value = fallbackApartments

    if (errorUnknown instanceof TypeError) {
      error.value = 'API недоступно. Показаны локальные данные. Запустите backend (`npm run dev` или `npm run dev:server`).'
    } else {
      error.value = 'Не удалось загрузить список квартир с сервера.'
    }
  }
})

watch(currentUser, async (user) => {
  await loadFavorites(user)
}, { immediate: true })

async function handleToggleFavorite(listingId: string) {
  favoriteInfo.value = ''

  if (!currentUser.value) {
    favoriteInfo.value = 'Чтобы добавить квартиру в избранное, сначала войдите в аккаунт.'
    return
  }

  try {
    await toggleFavorite(currentUser.value, listingId)
  } catch {
    // ошибка уже показана через favoriteError
  }
}
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

.info-message {
  margin-left: 114px;
  margin-bottom: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #f0d89d;
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


