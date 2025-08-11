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
              <div class="card__category-count">Потрачено: 10 000₽</div>
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
              <div class="card__category-count">Прибыль: 100 000₽</div>
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
import PageAlert from "@/components/template/PageAlert.vue";

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
    margin-bottom: 24px;
  }

  &__alert{
    margin-bottom: 24px;
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
        width: 60%;
        height: 60%;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        border-image: linear-gradient(to top, rgba(46, 125, 50, 0.2) 0%, rgba(58, 78, 213, 0) 100%) 1;
        border-width: 10px;
        border-style: solid;
      }
    }

    &-value{
      font-size: 24px;
      margin-top: 24px;
    }
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


}
</style>