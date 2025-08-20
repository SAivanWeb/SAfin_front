<template>
  <MainWrapper>
    <MainTitle title="Главная" class="dashboard__title"/>

    <PageAlert class="dashboard__alert"/>

    <div class="dashboard__section dashboard__section_row dashboard__section_user">
      <div class="dashboard__user-info">
        <h3 class="dashboard__sub-title">Уровень</h3>
        <p class="dashboard__user-value">Зеленый гоблин</p>
      </div>
      <div class="dashboard__user-img">
        <img src="/goblin.png">
      </div>
      <div class="dashboard__user-info">
        <h3 class="dashboard__sub-title">Баланс</h3>
        <p class="dashboard__user-value">100 000₽</p>
      </div>
    </div>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Основная цель</h3>
<!--      <GoalCard :editable="false"/>-->
    </div>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Статистика</h3>
      <InputDate type="month"/>
      <div class="dashboard__cards">
        <MainCard>
          <template #header>
            <div class="card__title">Доход</div>
          </template>
          <template #body>
            <div class="card__period">
              <div>Количество транзакций: 100</div>
              <div class="card__period_worse">Потрачено: 100 000 <span>(на 10% больше)</span></div>
              <div class="card__period_better">Заработано: 110 000 <span>(на 20% больше)</span></div>
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Расход</div>
          </template>
          <template #body>
            <div class="card__period">
              <div>Количество транзакций: 40</div>
              <div class="card__period_worse">Потрачено: 20 000 <span>(на 20% больше)</span></div>
              <div class="card__period_better">Заработано: 0</div>
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Разница</div>
          </template>
          <template #body>
            <div class="card__period">
              <div>Количество транзакций: 100</div>
              <div class="card__period_worse">Потрачено: 100 000 <span>(на 10% больше)</span></div>
              <div class="card__period_better">Заработано: 110 000 <span>(на 20% больше)</span></div>
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Категория</div>
          </template>
          <template #body>
            <div class="card__period">
              <div>Количество транзакций: 40</div>
              <div class="card__period_worse">Потрачено: 20 000 <span>(на 20% больше)</span></div>
              <div class="card__period_better">Заработано: 0</div>
            </div>
          </template>
        </MainCard>
      </div>
    </div>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Последние транзакции</h3>
      <TransactionList :items="transactions"/>
      <MainButton title="Показать все" type="secondary" size="small" @click="toTransactions"/>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import GoalCard from "@/components/ui/card/GoalCard.vue";
import TransactionList from "@/components/transaction/TransactionList.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import PageAlert from "@/components/template/PageAlert.vue";
import {useRouter} from "vue-router";
import Filter from "@/components/template/Filter.vue";
import InputDate from "@/components/ui/input/InputDate.vue";

const router = useRouter();

const transactions = [
  { id: 1, displayType: 'Списание', type: 'expense', amount: 1500, date: '2023-01-05', category: 'Еда', description: 'Продукты' },
  { id: 2, displayType: 'Списание', type: 'expense', amount: 500, date: '2023-01-10', category: 'Транспорт', description: 'Такси' },
  { id: 3, displayType: 'Пополнение', type: 'income', amount: 45000, date: '2023-01-15', category: 'Зарплата', description: 'Зарплата за январь' },
  { id: 4, displayType: 'Списание', type: 'expense', amount: 12000, date: '2023-01-20', category: 'Жилье', description: 'Аренда' },
  { id: 5, displayType: 'Списание', type: 'expense', amount: 3000, date: '2023-01-25', category: 'Развлечения', description: 'Кино' },
]

const toTransactions = () => {
  router.push('/transactions/')
}
</script>

<style scoped lang="scss">
.dashboard {
  &__title {
    margin-bottom: 24px;
  }

  &__alert{
    margin-bottom: 24px;
    position: relative;
    z-index: 100;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
    position: relative;
    z-index: 10;

    &_row{
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 24px;
    }

    &_user{
      margin-top: -80px;
      &:before{
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        filter: blur(60px);
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(95, 255, 100, 0.2), transparent 90%);
        z-index: -1;
      }
    }
  }

  &__user{
    &-img{
      width: 40%;
      min-width: 400px;
      height: 500px;

      & img{
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: center;
      width: 100%;
      position: relative;
      aspect-ratio: 1/1;

      &:before{
        content: '';
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        filter: blur(60px);
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(95, 255, 100, 0.2), transparent 90%);
        z-index: -1;
      }
    }

    &-value{
      font-size: 32px;
      font-weight: 700;
      color: #2E7D32;
      text-transform: uppercase;
      margin-top: 24px;
      
    }
  }

  &__sub-title {
    font-size: 28px;
  }

  &__goal {
    margin-bottom: 48px;
  }
  
  &__cards{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  }
  
}
</style>