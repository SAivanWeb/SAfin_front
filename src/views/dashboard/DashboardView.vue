<template>
  <MainWrapper>
    <MainTitle title="Главная" class="dashboard__title"/>

<!--    <PageAlert class="dashboard__alert"/>-->

    <div class="dashboard__section dashboard__section_row dashboard__section_user">
      <div class="dashboard__user-info level">
        <h3 class="dashboard__sub-title">Уровень</h3>
        <p class="dashboard__user-value">{{userLevelTitle}}</p>
      </div>
      <div class="dashboard__user-img">
        <img :src="userImage" alt="User level image" />
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

    <div v-if="stats" class="dashboard__section">
      <h3 class="dashboard__sub-title">Статистика за период</h3>
      <InputDate v-model="statsPeriod" type="month"/>
      <div class="dashboard__cards">
        <MainCard>
          <template #header>
            <div class="card__title">Общая</div>
          </template>
          <template v-if="stats.current.general" #body>
            <div class="card__period">
              <div>
                Количество транзакций: {{ stats.current.general.count }}
              </div>
              <div>
                Потрачено: {{ stats.current.general.spent }}
                <span class="reverse" v-if="stats.previous.general" :class="diffInfo('general','spent').class">({{ diffInfo('general','spent').text }})</span>
              </div>
              <div>
                Заработано: {{ stats.current.general.earned }}
                <span class="default" v-if="stats.previous.general" :class="diffInfo('general','earned').class">({{ diffInfo('general','earned').text }})</span>
              </div>
            </div>
          </template>
          <template v-else #body>
            <div class="card__period card__period_empty">
              Нет данных
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Популярная категория</div>
          </template>
          <template v-if="stats.current.popular_category" #body>
            <div class="card__period">
              <div>
                Название: {{ stats.current.popular_category.title }}
              </div>
              <div>
                Количество транзакций: {{ stats.current.popular_category.count }}
              </div>
              <div>
                {{ stats.current.popular_category.type === 'income' ? 'Заработано' : 'Потрачено' }}: {{ stats.current.popular_category.amount }}
                <span v-if="stats.previous.popular_category" :class="[diffInfo('popular_category','amount').class , stats.current.popular_category.type === 'income' ? 'default' : 'reverse' ]">
                  ({{ diffInfo('popular_category','amount').text }})
                </span>
              </div>
            </div>
          </template>
          <template v-else #body>
            <div class="card__period card__period_empty">
              Нет данных
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Затратная категория</div>
          </template>
          <template v-if="stats.current.expensive_category" #body>
            <div class="card__period">
              <div>
                Название: {{ stats.current.expensive_category.title }}</div>
              <div>
                Количество транзакций: {{ stats.current.expensive_category.count }}
              </div>
              <div>
                Потрачено: {{ stats.current.expensive_category.amount }}
                <span class="reverse" v-if="stats.previous.expensive_category" :class="diffInfo('expensive_category','amount').class">({{ diffInfo('expensive_category','amount').text }})</span>
              </div>
            </div>
          </template>
          <template v-else #body>
            <div class="card__period card__period_empty">
              Нет данных
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Прибыльная категория</div>
          </template>
          <template v-if="stats.current.profitable_category" #body>
            <div class="card__period">
              <div>
                Название: {{ stats.current.profitable_category.title }}</div>
              <div>
                Количество транзакций: {{ stats.current.profitable_category.count }}
              </div>
              <div>
                Заработано: {{ stats.current.profitable_category.amount }}
                <span class="default" v-if="stats.previous.profitable_category" :class="diffInfo('profitable_category','amount').class">({{ diffInfo('profitable_category','amount').text }})</span>
              </div>
            </div>
          </template>
          <template v-else #body>
            <div class="card__period card__period_empty">
              Нет данных
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
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import generalApi from "@/api/modules/general.js";

const router = useRouter();
const store = useStore();

defineEmits(['showAmountGoal']);

const transactions = ref([]);
const stats = ref(null);
const now = new Date()
const statsPeriod = ref(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`)

watch(statsPeriod, (newVal) => {
  if (newVal) {
    getGeneralStats(newVal);
  }
})

const toTransactions = () => {
  router.push('/transactions/')
}

const userProfile = computed(() => {
      return store.getters['user/GET_CURRENT_USER'] || {}
    }
);

const levels = ref([
  {
    id: 1,
    title: "Гоблин"
  },
  {
    id: 2,
    title: "Собиратель"
  },
  {
    id: 3,
    title: "Планировщик"
  },
  {
    id: 4,
    title: "Инвестор"
  },
  {
    id: 5,
    title: "Финансист"
  },
]);

const userLevelTitle = computed(() => {
  const points = userProfile.value?.points || 0;

  if (points < 100) return levels.value[0].title;
  if (points < 200) return levels.value[1].title;
  if (points < 300) return levels.value[2].title;
  if (points < 400) return levels.value[3].title;
  if (points < 500) return levels.value[4].title;

  return levels.value[4].title;
});

const userImage = computed(() => {
  const points = userProfile.value?.points || 0;

  if (points < 100) return '/first.webp';
  if (points < 200) return '/second.webp';
  if (points < 300) return '/third.webp';
  if (points < 400) return '/fourth.webp';
  if (points < 500) return '/fifth.webp';

  return '/fifth.webp';
});

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

async function getGeneralStats(period) {
  if (!period) return;

  const date = new Date(period);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const res = await generalApi.getStats({ month, year });

  if (res.success) {
    stats.value = res.data;
  }
}

const diffInfo = (key, field) => {
  const prev = stats.value?.previous?.[key]?.[field];
  const curr = stats.value?.current?.[key]?.[field];

  if (prev == null || curr == null || typeof prev !== 'number' || typeof curr !== 'number') {
    return { text: '', class: '' };
  }

  if (prev === 0) {
    return curr > 0
        ? { text: 'выросло с 0', class: 'up' }
        : { text: '', class: '' };
  }

  const diff = Math.round(((curr - prev) / prev) * 100);

  if (diff === 0) return { text: 'без изменений', class: 'neutral' };
  if (diff > 0) return { text: `на ${diff}% больше`, class: 'up' };
  return { text: `на ${Math.abs(diff)}% меньше`, class: 'down' };
};

onMounted(() => {
  store.dispatch("getAccounts");
  store.dispatch("getGoals");
  fetchTransactions();
  getGeneralStats(statsPeriod.value);
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

    & .card{
      min-height: 192px;
    }
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