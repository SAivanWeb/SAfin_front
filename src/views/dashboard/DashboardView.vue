<template>
  <MainWrapper>
    <MainTitle title="Главная" class="dashboard__title"/>

    <div class="dashboard__goal">
      <GoalCard :editable="false"/>
    </div>

    <div class="dashboard__statistic">
      <TabContainer :headers="tabHeaders" title="Статистика">
        <template #chart>
          <div class="dashboard__statistic-item">
            <Chart :items="transactions"/>
          </div>
        </template>
        <template #diagram>
          <div class="tasks__list">
            Диаграмма
          </div>
        </template>
        <template #list>
          <div class="tasks__list">
            Список
          </div>
        </template>
      </TabContainer>

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
.dashboard{
  &__title{
    margin-bottom: 48px;
  }

  &__goal{
    margin-bottom: 48px;
  }

  &__statistic{
    &-item{
      width: 100%;
    }
  }
}
</style>