<template>
  <MainWrapper>
    <div class="transactions__header">
      <MainTitle title="Финансы" class="transactions__title"/>
      <MainButton v-if="activeTab === 'transactions'" class="transactions__button" action="add" title="создать транзакцию" type="secondary" @click="$emit('showTransaction')"/>
      <MainButton v-else class="transactions__button" action="add" title="создать счет" type="secondary" @click="$emit('showAccount')"/>
    </div>
    <PageAlert class="transactions__alert"/>
    <div class="transactions__container">
      <TabContainer :headers="tabHeadersMain" v-model:active="activeTab" :main="true">
          <template #transactions>
              <TabContainer :headers="tabHeadersTransactions">
                <template #chart>
                  <div class="transactions__statistic-item">
                    <Chart :items="transactionsEx"/>
                  </div>
                </template>
                <template #diagram>
                  <Diagram :items="transactionsEx"/>
                </template>
                <template #list>
                  <div class="transactions__statistic-item">
                    <Filter/>
                    <TransactionList :items="transactionsEx"/>
                  </div>
                </template>
              </TabContainer>
          </template>
          
          <template #accounts>
            <div class="transactions__accounts">
              <AccountCard v-for="item in accounts" :item="item"/>
            </div>
          </template>
      </TabContainer>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Filter from "@/components/template/Filter.vue";
import TransactionList from "@/components/transaction/TransactionList.vue";
import PageAlert from "@/components/template/PageAlert.vue";
import Chart from "@/components/ui/chart/Chart.vue";
import TabContainer from "@/components/ui/tabs/TabContainer.vue";
import Diagram from "@/components/ui/chart/ProgressList.vue";
import {computed, ref} from "vue";
import AccountCard from "@/components/ui/card/AccountCard.vue";
import {useStore} from "vuex";

const store = useStore();

const activeTab = ref('transactions');

const tabHeadersMain = ref([
  { name: 'transactions', value: 'Транзакции' },
  { name: 'accounts', value: 'Счета' }
])

const tabHeadersTransactions = ref([
  {
    name: 'list',
    value: 'Список'
  },
  {
    name: 'chart',
    value: 'График'
  },
  {
    name: 'diagram',
    value: 'Диаграмма'
  },
])

const transactions = computed(() => {
  const transactionsArr = store.getters.GET_TRANSACTIONS || [];
  if (transactionsArr.length === 0) {
    store.dispatch("getTransactions");
  }
  return store.getters.GET_TRANSACTIONS || [];
});

console.log(transactions.value)

const transactionsEx = [
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

const accounts = [
  { id: 1, name: 'Карта Тинькофф', balance: 50000},
  { id: 2, name: 'Наличные', balance: 20000},
];
</script>

<style scoped lang="scss">
.transactions{
  &__header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__alert{
    margin-bottom: 24px;
  }

  &__button{
    width: fit-content;
  }

  &__menu{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__container{
    
  }

  &__statistic {
    &-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
  
  &__accounts{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

}
</style>