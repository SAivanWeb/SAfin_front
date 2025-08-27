<template>
  <div class="home">
    <div class="home__additional home__additional--1"></div>
    <div v-if="!hideAdditional" class="home__additional home__additional--2"></div>
    <div class="home__additional home__additional--3"></div>
    <div v-if="!hideAdditional" class="home__additional home__additional--4"></div>
    <div class="home__additional home__additional--5"></div>
    <div v-if="!hideAdditional" class="home__additional home__additional--6"></div>

    <div class="home__container">
      <!-- Hero секция -->
      <div class="home__promo">
        <div class="home__promo-container">
          <h1 class="home__promo-title">
            <span>Управляйте</span>
            <span>финансами</span>
            <span>легко</span>
          </h1>
          <p class="home__promo-description">Учет расходов, цели, аналитика — все в одном месте</p>
          <div class="home__promo-button">
            начать бесплатно
          </div>
        </div>
      </div>

      <!-- Преимущества -->
      <div class="home__section home__advantages-section">

        <h2 class="home__section-title">Преимущества</h2>
        <div class="home__advantages-container">
          <div class="home__advantages-item" v-for="(feature, index) in features" :key="index">
            <div class="home__advantages-icon-container">
              <img :src="`src/assets${feature.icon}`" :alt="feature.title">
            </div>
            <h3 class="home__advantages-title">{{ feature.title }}</h3>
            <p class="home__advantages-text">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Как это работает -->
      <div class="home__section home__steps-section">

        <h2 class="home__section-title">Как это работает?</h2>
        <div class="home__steps-container">
          <div class="home__step" v-for="(step, index) in steps" :key="index">
            <div class="home__step-number">{{ index + 1 }}</div>
            <div class="home__step-content">
              <h3 class="home__step-title">{{ step.title }}</h3>
              <p class="home__step-text">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="home__cta">
        <h2 class="home__section-title">Готовы взять финансы под контроль?</h2>
        <p class="home__cta-text">Начните прямо сейчас — это бесплатно и займет меньше минуты</p>
        <button class="home__promo-button">Зарегистрироваться</button>
        <div class="home__cta-pwa">
          <button class="home__cta-pwa-button">Установить приложение</button>
          <p class="home__cta-pwa-text">Доступно в браузере. Нажмите "Установить", затем "Добавить на главный экран"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const features = ref([
  {
    icon: '/icons/chart.svg',
    title: 'Автоматическая аналитика',
    description: 'Наш ИИ анализирует ваши траты и дает персональные рекомендации'
  },
  {
    icon: '/icons/goal.svg',
    title: 'Достижение целей',
    description: 'Ставьте финансовые цели и отслеживайте прогресс в реальном времени'
  },
  {
    icon: '/icons/download.svg',
    title: 'Доступность',
    description: 'Работает на всех устройствах без установки из магазинов приложений'
  }
]);

const steps = ref([
  {
    title: 'Добавьте транзакции',
    description: 'Просто введите сумму и категорию — система сделает все остальное'
  },
  {
    title: 'Настройте категории',
    description: 'Создайте собственные категории или используйте готовые'
  },
  {
    title: 'Создайте цели',
    description: 'Добавьте свои цели и фиксируйте результат по ним'
  },
  {
    title: 'Анализируйте статистику',
    description: 'Получайте детальные данные о ваших финансах в удобном формате'
  }
]);

const hideAdditional = window.innerWidth < 768
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  padding: 80px 20px;

  &__container {
    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 80px;
    position: relative;
    z-index: 10;
  }

  /* Общие стили секций */
  &__section {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    position: relative;

    &-title {
      font-size: 42px;
      text-transform: uppercase;
      font-weight: 500;
      color: #2E7D32;
      position: relative;
      z-index: 2;
      line-height: 1.2;

      &::after {
        content: '';
        display: block;
        width: 60px;
        height: 3px;
        background: #81C784;
        margin: 12px auto 0;
      }
    }
  }

  /* Hero секция */
  &__promo {
    display: flex;
    flex-direction: column;

    &-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
    }

    &-title {
      font-size: 160px;

      line-height: 1;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      width: 100%;
      margin-bottom: 24px;

      & span {
        &:nth-of-type(1) {
          font-weight: 600;
          text-align: left;
        }
        &:nth-of-type(2) {
          font-weight: 600;
          text-align: center;
        }
        &:nth-of-type(3) {
          font-weight: 700;
          color: #2E7D32;
          text-align: right;
        }
      }
    }

    &-description {
      font-size: 30px;
      line-height: 1.4;
      color: #4a5568;
      margin-bottom: 24px;
    }

    &-button {
      font-family: Oswald;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 50px 20px;
      cursor: pointer;
      background: #2E7D32;
      border-radius: 12px;
      color: #fff;
      font-size: 50px;
      line-height: 100%;
      font-weight: 500;
      text-transform: uppercase;
      transition: all 0.3s;

      &:hover{
        background: #81C784;
      }
    }
  }

  /* Декоративные элементы */
  &__additional {
    position: fixed;
    border-radius: 50%;
    z-index: 1;
    filter: blur(60px);
    transition: all 3s ease-in-out;
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

  /* Секция преимуществ */
  &__advantages {
    &-container {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      width: 100%;
      position: relative;
      z-index: 2;
    }

    &-item {
      padding: 24px;
      height: 100%;
      backdrop-filter: blur(10px) saturate(168%);
      -webkit-backdrop-filter: blur(10px) saturate(168%);
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 30px;
      border: 1px solid rgba(209, 213, 219, 0.3);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

        & .home__advantages-icon-container img{
          transform: scale(1.1);
        }
      }
    }

    &-icon-container {
      position: relative;
      width: 60px;
      height: 60px;
      margin-bottom: 12px;

      img {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }

    }

    &-title {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 12px;
      color: #2E7D32;
    }

    &-text {
      font-size: 22px;
      line-height: 1.5;
      color: #4a5568;
    }
  }

  /* Секция "Как это работает" */
  &__steps {
    &-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100%;
      max-width: 800px;
      position: relative;
      z-index: 2;
    }
  }

  &__step {
    display: flex;
    gap: 24px;
    padding: 32px;
    backdrop-filter: blur(10px) saturate(168%);
    -webkit-backdrop-filter: blur(10px) saturate(168%);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    transition: all 0.3s ease;
    align-items: flex-start;
    position: relative;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }

    &-number {
      width: 50px;
      height: 50px;
      background: #2E7D32;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      flex-shrink: 0;
    }

    &-title {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 12px;
      color: #2E7D32;
    }

    &-text {
      font-size: 22px;
      line-height: 1.5;
      color: #4a5568;
    }
  }

  /* CTA секция */
  &__cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    text-align: center;
    padding: 64px 32px;
    backdrop-filter: blur(10px) saturate(168%);
    -webkit-backdrop-filter: blur(10px) saturate(168%);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 30px;
    border: 1px solid rgba(209, 213, 219, 0.3);
    position: relative;
    overflow: hidden;

    &-title {
      font-size: 32px;
      font-weight: 700;
      color: #2E7D32;
      position: relative;
      z-index: 2;
    }

    &-text {
      font-size: 24px;
      color: #4a5568;
      max-width: 600px;
      line-height: 1.2;
      position: relative;
      z-index: 2;
    }

    &-pwa {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      position: relative;
      z-index: 2;

      &-button {
        font-family: Oswald;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px 24px 18px;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 12px;
        background: rgba(46, 125, 50, 0.1);
        color: #2E7D32;
        font-size: 24px;
        line-height: 100%;
        font-weight: 500;
        transition: all 0.3s;

      }
    }

    &-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 50px 20px;
      cursor: pointer;
      background: #2E7D32;
      border-radius: 12px;
      color: #fff;
      font-size: 36px;
      line-height: 100%;
      font-weight: 500;
      text-transform: uppercase;
      transition: all 0.3s;

      &:hover{
        background: #81C784;
      }
    }
  }


}

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

@media (max-width: 1280px) {
  .home{
    padding: 60px 20px;

    &__container{
      gap: 60px;
    }

    &__promo{
      &-title{
        font-size: 130px;
      }

      &-button{
        font-size: 32px;
      }
    }

    &__section{
      gap: 24px;
      &-title{
        font-size: 38px;
      }
    }

    &__advantages{
      &-container{
        gap: 18px;
      }

      &-item{
        padding: 18px;
      }

      &-icon-container{
        width: 60px;
        height: 60px;
        margin-bottom: 12px;
      }

      &-title{
        font-size: 24px;
      }

      &-text{
        font-size: 18px;
      }
    }

    &__steps{
      &-container{
        gap: 18px;
      }
    }

    &__step{
      gap: 18px;
      padding: 18px;

      &-title{
        font-size: 24px;
      }

      &-text{
        font-size: 18px;
      }
    }

    &__cta{
      gap: 18px;
      padding: 40px 20px;

      &-text{
        font-size: 20px;
      }

      &-pwa{
        gap: 12px;
        &-button{
          font-size: 18px;
        }

        &-text{
          font-size: 16px;
        }
      }
    }
  }
}

@media (max-width: 999px) {
  .home{
    padding: 40px 20px;
    &__container{
      gap: 40px;
    }

    &__promo{
      &-title{
        font-size: 100px;
      }

      &-description{
        font-size: 24px;
      }

      &-button{
        font-size: 24px;
        padding: 16px 32px !important;
      }
    }

    &__section{
      gap: 24px;
      &-title{
        font-size: 32px;
      }
    }

    &__advantages{
      &-container{
        gap: 12px;
      }

      &-item{
        padding: 18px;
      }

      &-icon-container{
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
      }

      &-title{
        font-size: 20px;
      }

      &-text{
        font-size: 16px;
      }
    }

    &__steps{
      &-container{
        gap: 12px;
        max-width: 100%;
      }
    }

    &__step{
      gap: 12px;
      padding: 18px;

      &-number{
        width: 40px;
        height: 40px;
        font-size: 20px;
      }

      &-title{
        font-size: 20px;
      }

      &-text{
        font-size: 16px;
      }
    }

    &__cta{
      gap: 16px;
      padding: 20px 18px;

      &-text{
        font-size: 20px;
      }

      &-pwa{
        gap: 12px;
        &-button{
          font-size: 16px;
          padding: 14px;
        }

        &-text{
          font-size: 16px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .home{
    padding: 40px 10px;
    &__promo{
      &-title{
        font-size: 80px;
        margin-bottom: 18px;
      }

      &-description{
        font-size: 18px;
        margin-bottom: 18px;
      }

      &-button{
        font-size: 20px;
        padding: 14px 20px !important;
      }
    }

    &__section{
      gap: 24px;

      &-title{
        font-size: 26px;
      }
    }

    &__advantages{
      &-container{
        flex-direction: column;
      }

      &-item{
        padding: 18px;
      }

      &-icon-container{
        width: 40px;
        height: 40px;
        margin-bottom: 12px;
      }

      &-title{
        font-size: 20px;
      }

      &-text{
        font-size: 18px;
      }
    }

    &__cta{
      padding: 16px;
      & button{
        width: 100% !important;
      }
    }
  }
}

@media (max-width: 520px) {
  .home{
    &__promo{
      &-title{
        font-size: 54px;
      }

      &-description{
        font-size: 16px;
      }

      &-button{
        font-size: 18px;
      }
    }
  }
}
</style>