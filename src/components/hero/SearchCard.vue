<template>
  <div class="search-card">
    <div class="input">
      <span>Дата заезда</span>
      <svg width="16" height="16"></svg>
    </div>

    <div class="input">
      <span>Дата выезда</span>
      <svg width="16" height="16"></svg>
    </div>

    <div class="input">
      <span>Гости</span>
      <svg width="16" height="16"></svg>
    </div>

    <button class="search-btn">
      <span class="text">Найти</span>
      <span class="divider-line"></span>
      <span class="icon"><img src="/src/assets/search.svg" alt=""></span>
    </button>

    <p class="available">
      Доступно: 11 вариантов жилья
    </p>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.search-card {
  width: 300px;
  margin-left: 90px;
  margin-top: 30px;
  padding: 25px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Инпут */
.input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 42px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 14px;
}

/* Кнопка */
.search-btn {
  position: relative;
  height: 42px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  // background: linear-gradient(
  //   90deg,
  //   #96662D 0%,
  //   #FCE29F 65%,
  //   #C68A3A 100%
  // );
  display: flex;
  align-items: center;
  justify-content: center;
   background: linear-gradient(90deg, #96662D 0%, #C68A3A 25%, #FCE29F 50%,  #C68A3A 75%, #96662D 100% );
  background-size: 200%;
  animation: animate-gradient 5s 2s linear
    infinite;
  
}

/* Текст */
.search-btn .text {
  position: absolute;
  left: 0;
  width: 198px;
  text-align: center;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  font-size: 20px;
}

/* Вертикальная линия */
.search-btn .divider-line {
  position: absolute;
  right: 52px;
  width: 1px;
  top: 3px;
  bottom: 3px;
  background: #CA9E57;
}

/* Иконка */
.search-btn .icon {
  position: absolute;
  right: 0;
  width: 52px;
  display: flex;
  justify-content: center;

}

/* Текст снизу */
.available {
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  color: #FCE4BB;
  margin: 0;
  display: flex;
  justify-content: center;
}

/* Адаптив */
@media (max-width: 768px) {
  .search-card {
    margin-left: 20px;
    width: 90%;
  }
}

@keyframes animate-gradient{
  
  to{
    background-position: 200%;
  }
  // animation: name duration timing-function delay iteration-count direction fill-mode;
}
</style>
