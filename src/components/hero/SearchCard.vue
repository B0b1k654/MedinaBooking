<template>
  <div class="search-card" ref="cardRef">
    <div class="input" @click="toggleCalendar('checkIn')">
      <span>{{ checkInLabel }}</span>
      <img src="/src/assets/calendar.svg" alt="Календарь даты заезда">
    </div>

    <div class="input" @click="toggleCalendar('checkOut')">
      <span>{{ checkOutLabel }}</span>
      <img src="/src/assets/calendar.svg" alt="Календарь даты выезда">
    </div>

    <div class="input guests-input">
      <input
        v-model.number="guests"
        type="number"
        min="1"
        placeholder="Гости"
        aria-label="Количество гостей"
        @click.stop
      >
      <img src="/src/assets/guest.svg" alt="Иконка гостей">
    </div>

    <div v-if="isCalendarOpen" class="calendar-popover" @click.stop>
      <div class="calendar-header">
        <button class="month-btn" @click="changeMonth(-1)" type="button">‹</button>
        <span>{{ monthYearLabel }}</span>
        <button class="month-btn" @click="changeMonth(1)" type="button">›</button>
      </div>
      <div class="weekdays">
        <span v-for="day in weekdays" :key="day">{{ day }}</span>
      </div>
      <div class="days-grid">
        <button
          v-for="day in calendarDays"
          :key="day.key"
          type="button"
          class="day-cell"
          :class="{
            muted: !day.inCurrentMonth,
            selected: isSelected(day.date),
            disabled: isDayDisabled(day.date)
          }"
          :disabled="isDayDisabled(day.date)"
          @click="selectDate(day.date)"
        >
          {{ day.date.getDate() }}
        </button>
      </div>
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
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

  type DateField = 'checkIn' | 'checkOut'

  const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]

  const cardRef = ref<HTMLElement | null>(null)
  const isCalendarOpen = ref(false)
  const activeField = ref<DateField>('checkIn')
  const currentMonthDate = ref(new Date())
  const checkInDate = ref<Date | null>(null)
  const checkOutDate = ref<Date | null>(null)
  const guests = ref<number | null>(null)

  const monthYearLabel = computed(() => {
    const date = currentMonthDate.value
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  })

  const checkInLabel = computed(() => formatDate(checkInDate.value, 'Дата заезда'))
  const checkOutLabel = computed(() => formatDate(checkOutDate.value, 'Дата выезда'))

  const calendarDays = computed(() => {
    const monthStart = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth(), 1)
    const firstDayIndex = (monthStart.getDay() + 6) % 7
    const calendarStart = new Date(monthStart)
    calendarStart.setDate(monthStart.getDate() - firstDayIndex)

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(calendarStart)
      date.setDate(calendarStart.getDate() + i)

      return {
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        date,
        inCurrentMonth: date.getMonth() === currentMonthDate.value.getMonth()
      }
    })
  })

  function formatDate(date: Date | null, placeholder: string): string {
    if (!date) {
      return placeholder
    }

    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  function toggleCalendar(field: DateField) {
    const previousField = activeField.value
    const shouldClose = isCalendarOpen.value && previousField === field

    activeField.value = field
    const selectedDate = field === 'checkIn' ? checkInDate.value : checkOutDate.value

    if (selectedDate) {
      currentMonthDate.value = new Date(selectedDate)
    }

    isCalendarOpen.value = !shouldClose
  }

  function changeMonth(step: number) {
    const next = new Date(currentMonthDate.value)
    next.setMonth(next.getMonth() + step)
    currentMonthDate.value = next
  }

  function selectDate(date: Date) {
    const selected = new Date(date.getFullYear(), date.getMonth(), date.getDate())

    if (activeField.value === 'checkIn') {
      checkInDate.value = selected

      if (checkOutDate.value && checkOutDate.value < selected) {
        checkOutDate.value = null
      }
    } else {
      checkOutDate.value = selected
    }

    isCalendarOpen.value = false
  }

  function isSelected(date: Date) {
    const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    const selectedDate = activeField.value === 'checkIn' ? checkInDate.value : checkOutDate.value

    return selectedDate ? selectedDate.getTime() === target : false
  }

  function isDayDisabled(date: Date) {
    if (activeField.value === 'checkOut' && checkInDate.value) {
      return date < checkInDate.value
    }

    return false
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node

    if (cardRef.value && !cardRef.value.contains(target)) {
      isCalendarOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
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
  position: relative;
  gap: 20px;
}

/* Инпут */
.input {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  height: 42px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.guests-input {
  cursor: default;
}

.guests-input input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-family: inherit;
  font-size: 12px;
  margin-right: 10px;
}

.guests-input input::placeholder {
  color: white;
}

.guests-input input::-webkit-inner-spin-button,
.guests-input input::-webkit-outer-spin-button {
  opacity: 1;
}

.calendar-popover {
  position: absolute;
  left: calc(100% + 12px);
  top: 25px;
  width: 260px;
  border-radius: 10px;
  padding: 14px;
  background: rgba(17, 17, 17, 0.92);
  border: 1px solid rgba(252, 228, 187, 0.35);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  z-index: 10;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #fce4bb;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}

.month-btn {
  border: none;
  background: transparent;
  color: #fce4bb;
  font-size: 18px;
  cursor: pointer;
}

.weekdays,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
  text-align: center;
}

.weekdays {
  color: rgba(252, 228, 187, 0.7);
  font-size: 11px;
  margin-bottom: 6px;
}

.day-cell {
  border: none;
  border-radius: 6px;
  height: 30px;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  font-size: 12px;
}

.day-cell.muted {
  opacity: 0.35;
}

.day-cell.selected {
  background: #c68a3a;
  color: #111;
  font-weight: 600;
}

.day-cell.disabled {
  opacity: 0.25;
  cursor: not-allowed;
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
@media (max-width: 1100px) {
  .calendar-popover {
    left: 0;
    top: calc(100% + 12px);
  }
}

@media (max-width: 768px) {
  .search-card {
    margin-left: 20px;
    width: 90%;
  }

  .calendar-popover {
    width: calc(100% - 10px);
  }
}

@keyframes animate-gradient{
  
  to{
    background-position: 200%;
  }
  // animation: name duration timing-function delay iteration-count direction fill-mode;
}
</style>
