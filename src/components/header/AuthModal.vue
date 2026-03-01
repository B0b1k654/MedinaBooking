<template>
  <div v-if="modelValue" class="auth-modal-overlay" @click="close">
    <div class="auth-modal" @click.stop>
      <button class="close-btn" type="button" @click="close">×</button>

      <div class="tabs">
        <button
          class="tab"
          :class="{ active: mode === 'login' }"
          type="button"
          @click="mode = 'login'"
        >
          Вход
        </button>
        <button
          class="tab"
          :class="{ active: mode === 'register' }"
          type="button"
          @click="mode = 'register'"
        >
          Регистрация
        </button>
      </div>

      <form class="auth-form" @submit.prevent="submitForm">
        <label v-if="mode === 'register'">
          Имя
          <input v-model.trim="name" type="text" required placeholder="Введите имя" >
        </label>

        <label>
          Email
          <input v-model.trim="email" type="email" required placeholder="Введите email" >
        </label>

        <label>
          Пароль
          <input v-model="password" type="password" required minlength="6" placeholder="Минимум 6 символов" >
        </label>

        <p v-if="errorMessage" class="message error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="message success">{{ successMessage }}</p>

        <button class="submit-btn" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Подождите...' : mode === 'login' ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type User = {
  id: number
  name: string
  email: string
}

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  authenticated: [user: User]
}>()

const mode = ref<'login' | 'register'>('login')
const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function parseResponse(response: Response): Promise<Record<string, unknown>> {
  const raw = await response.text()

  if (!raw) {
    return {}
  }

  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return {}
  }
}

function close() {
  emit('update:modelValue', false)
}

async function submitForm() {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const endpoint = mode.value === 'login' ? '/api/auth/login' : '/api/auth/register'

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await parseResponse(response)

    if (!response.ok) {
      const message = typeof data.message === 'string'
        ? data.message
        : 'Сервер вернул некорректный ответ. Попробуйте снова.'
      throw new Error(message)
    }

    if (!data.user || typeof data.user !== 'object') {
      throw new Error('Не удалось получить данные пользователя. Попробуйте снова.')
    }

    successMessage.value = mode.value === 'login' ? 'Вы успешно вошли.' : 'Регистрация прошла успешно.'
    emit('authenticated', data.user as User)

    name.value = ''
    email.value = ''
    password.value = ''

    setTimeout(() => {
      close()
    }, 400)
  } catch (error) {
    if (error instanceof TypeError) {
      errorMessage.value = 'Не удалось подключиться к API. Запустите фронтенд через `npm run dev`, чтобы поднять и сервер авторизации.'
    } else {
      errorMessage.value = error instanceof Error ? error.message : 'Неизвестная ошибка'
    }
  } finally {
    isLoading.value = false
  }
}

</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.auth-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
}

.auth-modal {
  width: min(420px, 92vw);
  border-radius: 12px;
  padding: 24px;
  background: #0f0f0f;
  border: 1px solid $gold-light;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 12px;
  top: 8px;
  font-size: 24px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.tab {
  flex: 1;
  padding: 10px;
  border: 1px solid $gold-light;
  background: transparent;
  color: #fff;
  cursor: pointer;

  &.active {
    @include gold-text;
    @include glow;
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;
  }

  input {
    height: 40px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 0 12px;
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
  }
}

.message {
  font-size: 13px;
  margin: 0;
}

.error {
  color: #ff8f8f;
}

.success {
  color: #92f0a3;
}

.submit-btn {
  margin-top: 4px;
  height: 42px;
  border: 1px solid $gold-light;
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: $transition;

  &:hover:not(:disabled) {
    @include gold-text;
    @include glow;
  }

  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }
}
</style>