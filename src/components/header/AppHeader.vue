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
      <!-- <button class="auth" type="button" @click="openAuthModal">
        <img src="/src/assets/profile.svg" alt="profile" class="profile-img">
        <span>Вход / Регистрация</span>
      </button>
    </div>

    <div class="divider"></div>
  </header>
  <div v-if="isAuthModalOpen" class="auth-modal-overlay" @click.self="closeAuthModal">
    <div class="auth-modal">
      <button class="auth-modal__close" type="button" @click="closeAuthModal">✕</button>

      <div class="auth-modal__switcher">
        <button
          class="switcher-btn"
          :class="{ active: authMode === 'login' }"
          type="button"
          @click="authMode = 'login'"
        >
          Войти
        </button>
        <button
          class="switcher-btn"
          :class="{ active: authMode === 'register' }"
          type="button"
          @click="authMode = 'register'"
        >
          Зарегистрироваться -->
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

      <!-- <form class="auth-modal__form" @submit.prevent>
        <input
          v-if="authMode === 'register'"
          type="text"
          placeholder="Имя"
          autocomplete="name"
        >
        <input type="email" placeholder="Email" autocomplete="email">
        <input type="password" placeholder="Пароль" autocomplete="current-password">

        <button class="primary-btn" type="submit">
          {{ authMode === 'login' ? 'Войти' : 'Создать аккаунт' }}
        </button>
      </form>

      <div class="auth-modal__divider">или</div> -->

      <!-- <button class="telegram-btn" type="button">
        <span class="telegram-icon">✈</span>
        <span>
          {{ authMode === 'login' ? 'Войти через Telegram' : 'Регистрация через Telegram' }}
        </span>
      </button>
    </div>
  </div> -->
  <AuthModal v-model="isAuthModalOpen" @authenticated="onAuthenticated" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AuthModal from './AuthModal.vue'

defineOptions({ name: 'AppHeader' })

type User = {
  id: number
  name: string
  email: string
}

const isAuthModalOpen = ref(false)
const currentUser = ref<User | null>(null)


onMounted(() => {
  const savedUser = localStorage.getItem('authUser')

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser) as User
  }
})

function onAuthenticated(user: User) {
  currentUser.value = user
  localStorage.setItem('authUser', JSON.stringify(user))
}

function onAuthClick() {
  if (currentUser.value) {
    currentUser.value = null
    localStorage.removeItem('authUser')
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
//   cursor: pointer;
//   border: 1px solid #f0d89d;
//   background: transparent;
//   color: #f0d89d;
//   padding: 8px 14px;
//   border-radius: 10px;
// }

.profile-img{
  margin-right: 10px;
}

  
// .auth-modal-overlay {
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.6);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   padding: 20px;
// }

// .auth-modal {
//   position: relative;
//   width: 100%;
//   max-width: 420px;
//   background: #111;
//   color: #f0d89d;
//   border: 1px solid #f0d89d;
//   border-radius: 16px;
//   padding: 24px;
// }

// .auth-modal__close {
//   position: absolute;
//   top: 10px;
//   right: 12px;
//   border: none;
//   background: transparent;
//   color: #f0d89d;
//   font-size: 20px;
//   cursor: pointer;
// }

// .auth-modal__switcher {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 8px;
//   margin-bottom: 18px;
// }

// .switcher-btn {
//   border: 1px solid #f0d89d;
//   background: transparent;
//   color: #f0d89d;
//   padding: 10px;
//   border-radius: 10px;
//   cursor: pointer;
// }

// .switcher-btn.active {
//   background: #f0d89d;
//   color: #111;
//   font-weight: 600;
// }

// .auth-modal__form {
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// }

// .auth-modal__form input {
//   border-radius: 10px;
//   border: 1px solid rgba(240, 216, 157, 0.4);
//   background: #1f1f1f;
//   color: #fff;
//   padding: 12px;
// }

// .primary-btn {
//   margin-top: 6px;
//   border: none;
//   border-radius: 10px;
//   background: #f0d89d;
//   color: #111;
//   padding: 12px;
//   cursor: pointer;
//   font-weight: 600;
// }

// .auth-modal__divider {
//   text-align: center;
//   margin: 14px 0;
//   color: rgba(240, 216, 157, 0.8);
// }

// .telegram-btn {
//   width: 100%;
//   border: 1px solid #2aabee;
//   border-radius: 10px;
//   background: rgba(42, 171, 238, 0.1);
//   color: #c9edff;
//   padding: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 10px;
//   cursor: pointer;
// }

// .telegram-icon {
//   width: 24px;
//   height: 24px;
//   border-radius: 50%;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   background: #2aabee;
//   color: #fff;
//   font-size: 14px;
// }


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

  // .header__bottom {
  //   padding-left: 20px;
  //   padding-right: 20px;
  // }

  // .auth {
  //   padding: 7px 10px;
  //   font-size: 12px;
  // }

  // .profile-img {
  //   margin-right: 6px;
  // }
}
</style>
