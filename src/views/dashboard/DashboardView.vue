<template>
  <MainWrapper>
    <MainTitle title="Статистика" class="dashboard__title"/>

    <n-alert class="dashboard__section" :show-icon="false" type="success" closable>
      <div class="dashboard__alert">
<!--          <info class="dashboard__alert-icon"/>-->
        <question class="dashboard__alert-icon"/>
        <div class="dashboard__alert-content">
          <div class="dashboard__alert-title">Финансовая подушка безопасности</div>
          <div class="dashboard__alert-text">Накопите 3 месячных дохода для защиты от неожиданностей</div>
          <div class="dashboard__alert-button-group">
            <MainButton size="small" title="Уже есть" type="secondary" />
            <MainButton size="small" title="Создать подушку" />
          </div>
        </div>
      </div>
    </n-alert>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Основная цель</h3>
      <GoalCard :editable="false"/>
    </div>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Период</h3>
      <div class="dashboard__period">
        <MainCard>
          <template #header>
            <div class="card__title">Текущий месяц</div>
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
            <div class="card__title">Текущая неделя</div>
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
      <TabContainer :headers="tabHeaders" title="Транзакции">
        <template #chart>
          <div class="dashboard__statistic-item">
            <Chart :items="transactions"/>
          </div>
        </template>
        <template #diagram>
          <Diagram :items="transactions"/>
        </template>
        <template #list>
          <div class="dashboard__statistic-item">
            <Filter/>
            <TransactionList :items="transactions" :height="420"/>
          </div>
        </template>
      </TabContainer>
    </div>

    <div class="dashboard__section">
      <h3 class="dashboard__sub-title">Категории</h3>
      <div class="dashboard__categories">
        <MainCard>
          <template #header>
            <div class="card__title">Самая затратная категория</div>
          </template>
          <template #body>
            <div class="card__category">
              <div class="card__category-name">Название: Еда</div>
              <div class="card__category-amount">Количество транзакций: 100</div>
              <div class="card__category-count">Потрачено: 10 000</div>
            </div>
          </template>
        </MainCard>
        <MainCard>
          <template #header>
            <div class="card__title">Самая прибыльная категория</div>
          </template>
          <template #body>
            <div class="card__category">
              <div class="card__category-name">Название: Зарплата</div>
              <div class="card__category-amount">Количество транзакций: 2</div>
              <div class="card__category-count">Прибыль: 100 000</div>
            </div>
          </template>
        </MainCard>
      </div>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import GoalCard from "@/components/ui/card/GoalCard.vue";
import TabContainer from "@/components/ui/tabs/TabContainer.vue";
import TabItem from "@/components/ui/tabs/TabItem.vue";
import {ref} from "vue";
import Chart from "@/components/ui/chart/Chart.vue";
import TransactionList from "@/components/transaction/TransactionList.vue";
import Diagram from "@/components/ui/chart/Diagram.vue";
import Filter from "@/components/template/Filter.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import Info from "@/assets/icons/info.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Question from "@/assets/icons/question.vue";

const tabHeaders = ref([
  {
    name: 'chart',
    value: 'График'
  },
  {
    name: 'diagram',
    value: 'Диаграмма'
  },
  {
    name: 'list',
    value: 'Список'
  },
])

const transactions = [
  { id: 1, displayType: 'Списание', type: 'expense', amount: 1500, date: '2023-01-05', category: 'Еда', description: 'Продукты' },
  { id: 2, displayType: 'Списание', type: 'expense', amount: 500, date: '2023-01-10', category: 'Транспорт', description: 'Такси' },
  { id: 3, displayType: 'Пополнение', type: 'income', amount: 45000, date: '2023-01-15', category: 'Зарплата', description: 'Зарплата за январь' },
  { id: 4, displayType: 'Списание', type: 'expense', amount: 12000, date: '2023-01-20', category: 'Жилье', description: 'Аренда' },
  { id: 5, displayType: 'Списание', type: 'expense', amount: 3000, date: '2023-01-25', category: 'Развлечения', description: 'Кино' },
  { id: 6, displayType: 'Списание', type: 'expense', amount: 2000, date: '2023-02-03', category: 'Еда', description: 'Ресторан' },
  { id: 7, displayType: 'Пополнение', type: 'income', amount: 8000, date: '2023-02-10', category: 'Фриланс', description: 'Проект' },
  { id: 8, displayType: 'Списание', type: 'expense', amount: 700, date: '2023-02-15', category: 'Транспорт', description: 'Метро' },
  { id: 9, displayType: 'Списание', type: 'expense', amount: 2500, date: '2023-02-20', category: 'Здоровье', description: 'Аптека' },
  { id: 10, displayType: 'Списание', type: 'expense', amount: 4000, date: '2023-02-25', category: 'Одежда', description: 'Куртка' },
  { id: 11, displayType: 'Пополнение', type: 'income', amount: 45000, date: '2023-03-05', category: 'Зарплата', description: 'Зарплата за март' },
  { id: 12, displayType: 'Списание', type: 'expense', amount: 12000, date: '2023-03-10', category: 'Жилье', description: 'Аренда' },
  { id: 13, displayType: 'Списание', type: 'expense', amount: 1500, date: '2023-03-15', category: 'Еда', description: 'Продукты' },
  { id: 14, displayType: 'Списание', type: 'expense', amount: 1000, date: '2023-03-20', category: 'Транспорт', description: 'Бензин' },
  { id: 15, displayType: 'Списание', type: 'expense', amount: 5000, date: '2023-03-25', category: 'Развлечения', description: 'Концерт' },
  { id: 16, displayType: 'Пополнение', type: 'income', amount: 10000, date: '2023-04-05', category: 'Премия', description: 'Квартальная премия' },
  { id: 17, displayType: 'Списание', type: 'expense', amount: 8000, date: '2023-04-10', category: 'Жилье', description: 'Коммунальные' },
  { id: 18, displayType: 'Списание', type: 'expense', amount: 2000, date: '2023-04-15', category: 'Еда', description: 'Продукты' },
  { id: 19, displayType: 'Списание', type: 'expense', amount: 3000, date: '2023-04-20', category: 'Одежда', description: 'Обувь' },
  { id: 20, displayType: 'Списание', type: 'expense', amount: 1500, date: '2023-04-25', category: 'Здоровье', description: 'Витамины' }
]
</script>

<style scoped lang="scss">
.dashboard {
  &__title {
    margin-bottom: 48px;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 48px;
  }

  &__sub-title {
    font-size: 28px;
  }

  &__goal {
    margin-bottom: 48px;
  }

  &__statistic {
    &-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  &__categories{
    display: flex;
    gap: 24px;
    width: 100%;
  }

  &__period{
    display: flex;
    gap: 24px;
    width: 100%;
  }

  &__alert{
    display: flex;
    align-items: start;
    gap: 12px;
    width: 100%;

    &-icon{
      color: #2E7D32;
      width: 48px;
    }

    &-content{
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &-title{
      font-size: 24px;
      font-weight: 500;

    }

    &-text{
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 12px;
    }

    &-button-group{
      display: flex;
      gap: 12px;
    }
  }
}
</style>