<template>
  <div class="navbar">
    <div class="logo">MEDINA</div>

    <div class="links">
      <a href="#">Главная</a>
      <a href="#">Избранное</a>
      <a href="#">Бронирования</a>
    </div>

    <div class="auth">Войти</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AppNavbar' })
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid $gold-light;

  .logo {
    font-size: 24px;
    font-weight: 600;
    @include gold-text;
  }

  .links {
    display: flex;
    gap: 30px;

    a {
      transition: $transition;

      &:hover {
        @include gold-text;
      }
    }
  }

  .auth {
    cursor: pointer;
    padding: 8px 14px;
    border: 1px solid $gold-light;
    transition: $transition;

    &:hover {
      @include glow;
      @include gold-text;
    }
  }
}

@media (max-width: 768px) {
  .links {
    display: none;
  }
}
</style>
