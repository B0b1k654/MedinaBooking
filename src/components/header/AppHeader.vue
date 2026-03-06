<template>
  <header class="header">
    <!-- Верхняя часть -->
    <div class="header__top container">
      <div class="left">
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</span>
      </div>

      <div class="right">
        <span>RU/RUB</span>
        <img class="flag_img" src="/src/assets/openmoji_flag-russia.png" alt="flag">
      </div>
    </div>

    <div class="divider"></div>

    <!-- Нижняя часть -->
    <div class="header__bottom container">
      <div class="logo_wrapper">
        <img src="/src/assets/logo.png" alt="logo">
        <span>Быстро, удобно, надёжно</span>
      </div>

      <nav class="nav">
        <a href="#">Главная</a>
        <a href="#">Избранное</a>
        <a href="#">Бронирования</a>
      </nav>

        <div class="auth-block">
        <span v-if="currentUser" class="user-name">{{ currentUser.name }}</span>
        <button class="auth" type="button" @click="onAuthClick">
          <img src="/src/assets/profile.svg" alt="profile" class="profile-img">
          <span>{{ currentUser ? 'Выйти' : 'Вход / Регистрация' }}</span>
        </button>
      </div>
    </div>
    <div class="divider"></div>
  </header>

  <AuthModal v-model="isAuthModalOpen" @authenticated="onAuthenticated" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthModal from './AuthModal.vue'
import { useAuth, type AuthUser } from '@/composables/auth'

defineOptions({ name: 'AppHeader' })

const isAuthModalOpen = ref(false)
const { currentUser, setUser, logout } = useAuth()

function onAuthenticated(user: AuthUser) {
  setUser(user)
}

function onAuthClick() {
  if (currentUser.value) {
    logout()
    return
  }

  isAuthModalOpen.value = true
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 140px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #F0D89D;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #000;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
}

/* Линии */
.divider {
  height: 1px;
  background: #F0D89D;
  width: 100%;
}

/* Верх */
.header__top {
  height: 69px; /* половина с учётом линий */
  padding-top: 26px;
  padding-right: 90px;
  padding-left: 100px;
  justify-content: space-between;
}
.right{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.flag{
  margin-left: 20px;
}
/* Низ */
.header__bottom {
  height: 69px;
  padding-right: 90px;
  padding-left: 90px;
  justify-content: space-between;
}

/* Лого */
.logo_wrapper {
  margin-right: 100px;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
}

/* Навигация */
.nav {
  display: flex;
  gap: 40px;
}

.nav a {
  text-decoration: none;
  color: #F0D89D;
}

.auth-block {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-name {
  font-size: 13px;
}

.auth {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #f0d89d;
  background: transparent;
  color: #f0d89d;
  padding: 8px 14px;
  border-radius: 10px;
}

.profile-img{
  margin-right: 10px;
}

 

/* Адаптив */
@media (max-width: 1024px) {
  .header__top {
    padding-left: 40px;
    padding-right: 40px;
  }

  .header__bottom {
    padding-left: 40px;
    padding-right: 40px;
  }

  .logo_wrapper {
    margin-right: 40px;
  }

  .nav {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .logo_wrapper {
    margin-right: 20px;
  }

  .header__top {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 12px;
  }
}
</style>
