<template>
  <MainWrapper>
    <MainTitle title="Главная" class="dashboard__title"/>

    <PageAlert class="dashboard__alert"/>

    <div class="dashboard__section dashboard__section_row dashboard__section_user">
      <div class="dashboard__user-info level">
        <h3 class="dashboard__sub-title">Уровень</h3>
        <p class="dashboard__user-value">Зеленый гоблин</p>
      </div>
      <div class="dashboard__user-img">
        <img src="/goblin.png">
      </div>
      <div class="dashboard__user-info balance">
        <h3 class="dashboard__sub-title">Баланс</h3>
        <p class="dashboard__user-value">{{ totalBalance }}₽</p>
      </div>
    </div>

    <div v-if="mainGoal" class="dashboard__section">
      <h3 class="dashboard__sub-title">Основная цель</h3>
      <GoalCard :editable="false" :goal="mainGoal" @show-amount-goal="(goal) => $emit('showAmountGoal', goal)"/>
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
import InputDate from "@/components/ui/input/InputDate.vue";
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";

const router = useRouter();
const store = useStore();

defineEmits(['showAmountGoal']);

const transactions = ref([]);

const toTransactions = () => {
  router.push('/transactions/')
}

async function fetchTransactions() {
  const res = await store.dispatch("getTransactions", {page: 1, perPage: 5});
  if (res.success) {
    transactions.value = res.data;
  }
}

const totalBalance = computed(() => {
  const accounts = store.getters.GET_ACCOUNTS || [];
  const total = accounts.find(acc => acc.id === "total");

  return total
      ? total.balance.toLocaleString("ru-RU", {
        useGrouping: true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).replace(/,/g, " ")
      : "0";
});

const mainGoal = computed(() => {
  const goals = store.getters.GET_GOALS || [];
  return goals.find(goal => goal.isMain === true);
})

onMounted(() => {
  store.dispatch("getAccounts");
  store.dispatch("getGoals");
  fetchTransactions();
})
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

    &:last-of-type {
      margin: 0 !important;
    }

    &_row{
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 24px;
    }

    &_user{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 'level img balance';

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
      grid-area: img;
      width: 40%;
      min-width: 400px;

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

      &:before{
        content: '';
        width: 100%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        filter: blur(60px);
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(95, 255, 100, 0.2), transparent 90%);
        z-index: -1;
      }

      &.level{
        grid-area: level;
      }

      &.balance{
        grid-area: balance;
        white-space: nowrap;
      }
    }

    &-value{
      font-size: 32px;
      font-weight: 700;
      line-height: 1.2;
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

@media (max-width: 1280px) {
  .dashboard {
    &__sub-title {
      font-size: 24px;
    }

    &__user{
      &-value{
        font-size: 28px;
        margin-top: 12px;
      }

      &-img{
        min-width: 350px;
      }
    }
  }
}

@media (max-width: 999px) {
  .dashboard {

    &__section{
      &_user{
        gap: 12px;
        grid-template-columns: 1fr 1fr;
        margin-top: 0;
        grid-template-areas: 'level balance'
                              'img img';
      }
    }

    &__user{
      &-img{
        margin: 0 auto;
      }
      &-value{
        font-size: 20px;
      }
    }

    &__cards{
      grid-template-columns: 1fr;
    }

  }
}

@media (max-width: 767px) {
  .dashboard {

  }
}
</style>