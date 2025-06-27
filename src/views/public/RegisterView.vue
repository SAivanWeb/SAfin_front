<template>
  <div class="auth">
    <div class="auth__additional auth__additional--1"></div>
    <div class="auth__additional auth__additional--2"></div>
    <div class="auth__additional auth__additional--3"></div>
    <div class="auth__additional auth__additional--4"></div>
    <div class="auth__additional auth__additional--5"></div>
    <div class="auth__additional auth__additional--6"></div>

    <div class="auth__container">
      <!-- Форма авторизации -->
      <div class="auth__form" v-if="isLoginForm">
        <h1 class="auth__title">Вход в аккаунт</h1>

        <form @submit.prevent="handleLogin">
          <div class="auth__input-group">
            <MainInput label="Почта" id="login-email" type="email" v-model="loginForm.email" placeholder="Почта"/>
          </div>

          <div class="auth__input-group">
            <MainInput label="Пароль" id="login-password" type="password" v-model="loginForm.password" placeholder="Пароль"/>
          </div>

          <MainButton title="Войти" @click="handleLogin" :disabled="disableLogin"/>

          <div class="auth__footer">
            <p class="auth__footer-text">Нет аккаунта?</p>
            <button
                type="button"
                class="auth__footer-link"
                @click="toggleForm"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>

      <!-- Форма регистрации -->
      <div class="auth__form" v-else>
        <h1 class="auth__title">Создание аккаунта</h1>

        <form @submit.prevent="handleRegister">
          <div class="auth__input-group">
            <MainInput label="Имя" id="reg-name" type="text" v-model="registerForm.name" placeholder="Имя"/>
          </div>

          <div class="auth__input-group">
            <MainInput label="Почта" id="reg-email" type="email" v-model="registerForm.email" placeholder="Почта"/>
          </div>

          <div class="auth__input-group">
            <MainInput label="Пароль" id="reg-password" type="password" v-model="registerForm.password" placeholder="Пароль"/>
          </div>

          <div class="auth__input-group">
            <MainInput label="Подтвердите пароль" id="reg-confirm" type="password" v-model="registerForm.password_confirmation" placeholder="Подтвердите пароль"/>
          </div>

          <MainButton title="Зарегистрироваться" @click="handleRegister" :disabled="disableRegister"/>

          <div class="auth__footer">
            <p class="auth__footer-text">Уже есть аккаунт?</p>
            <button
                type="button"
                class="auth__footer-link"
                @click="toggleForm"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const store = useStore();
const router = useRouter();

const isLoginForm = ref(true);
const loginForm = ref({
  email: '',
  password: ''
});
const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
  loginForm.value = {
    email: '',
    password: '',
  };

  registerForm.value = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }
}

const errors = computed(() => {
  return store.getters['user/GET_ERROR'];
})

const disableLogin = computed(() => {
  return !loginForm.value.email || !loginForm.value.password;
})

const disableRegister = computed(() => {
  return !registerForm.value.name ||
      !registerForm.value.email ||
      !registerForm.value.password ||
      !registerForm.value.password_confirmation ||
      registerForm.value.password_confirmation !== registerForm.value.password;
})

async function handleLogin() {
  await store.dispatch('user/login', loginForm.value);
  if(!errors.value){
    router.push('/dashboard/');
  }
};

async function handleRegister() {
  store.dispatch('user/register', registerForm.value);
};
</script>

<style scoped lang="scss">
.auth {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  &__container {
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 10;
  }

  &__form {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    padding: 40px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  &__title {
    font-size: 42px;
    font-weight: 500;
    color: #2E7D32;
    margin-bottom: 32px;
    text-align: center;
  }

  &__input-group {
    margin-bottom: 24px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }

  &__footer-text {
    font-size: 16px;
    color: #4a5568;
  }

  &__footer-link {
    background: none;
    border: none;
    color: #2E7D32;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
      color: #81C784;
    }
  }

  /* Декоративные элементы (аналогичные главной странице) */
  &__additional {
    position: fixed;
    border-radius: 50%;
    z-index: 1;
    filter: blur(60px);
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    &--1 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, #2E7D32, transparent 90%);
      opacity: 0.6;
      animation: float-1 25s infinite;
    }

    &--2 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, #81C784, transparent 90%);
      opacity: 0.4;
      animation: float-2 30s infinite;
    }

    &--3 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, #FFA726, transparent 90%);
      opacity: 0.3;
      animation: float-3 35s infinite;
    }

    &--4 {
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, #2E7D32, transparent 90%);
      opacity: 0.4;
      animation: float-4 40s infinite;
    }

    &--5 {
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, #2E7D32, transparent 90%);
      opacity: 0.3;
      animation: float-5 45s infinite;
    }

    &--6 {
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, #FFA726, transparent 90%);
      opacity: 0.2;
      animation: float-6 50s infinite;
    }
  }
}

/* Анимации (аналогичные главной странице) */
@keyframes float-1 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  25% { transform: translate(40vw, -10vh) scale(1.2); opacity: 0.8; }
  50% { transform: translate(60vw, 30vh) scale(0.8); opacity: 0.4; }
  75% { transform: translate(10vw, 60vh) scale(1.1); opacity: 0.7; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
}

@keyframes float-2 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  25% { transform: translate(50vw, 20vh) scale(1.3); opacity: 0.6; }
  50% { transform: translate(10vw, 65vh) scale(0.9); opacity: 0.3; }
  75% { transform: translate(85vw, 25vh) scale(1.1); opacity: 0.5; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
}

@keyframes float-3 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
  25% { transform: translate(95vw, 25vh) scale(1.4); opacity: 0.8; }
  50% { transform: translate(60vw, 50vh) scale(0.7); opacity: 0.5; }
  75% { transform: translate(10vw, 30vh) scale(1.2); opacity: 1; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
}

@keyframes float-4 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
  25% { transform: translate(25vw, 15vh) scale(1.1); opacity: 0.6; }
  50% { transform: translate(80vw, 50vh) scale(0.9); opacity: 0.3; }
  75% { transform: translate(25vw, 90vh) scale(1.3); opacity: 0.5; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
}

@keyframes float-5 {
  0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  50% { transform: translate(35vw, 25vh) scale(1.5); opacity: 1; }
  100% { transform: translate(5vw, 80vh) scale(1); opacity: 0.6; }
}

@keyframes float-6 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  25% { transform: translate(40vw, 0) scale(1.2); opacity: 0.8; }
  50% { transform: translate(1vw, 10vh) scale(0.8); opacity: 0.4; }
  75% { transform: translate(80vw, 80vh) scale(1.1); opacity: 1; }
}

@media (max-width: 768px) {
  .auth {
    padding: 20px;

    &__form {
      padding: 30px 20px;
    }

    &__title {
      font-size: 32px;
      margin-bottom: 24px;
    }

    &__additional {
      display: none;
    }
  }
}
</style>