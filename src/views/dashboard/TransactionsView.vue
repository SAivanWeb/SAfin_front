<template>
  <MainWrapper>
    <div class="transactions__header">
      <MainTitle title="Транзакции" class="transactions__title"/>
      <MainButton class="transactions__button" action="add" title="создать транзакцию" type="secondary" @click="$emit('showTransaction')"/>
    </div>
    <div class="transactions__container">
      <Filter/>
      <TransactionList :items="transactions"/>
    </div>
  </MainWrapper>
</template>

<script setup>

import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Filter from "@/components/template/Filter.vue";
import TransactionList from "@/components/transaction/TransactionList.vue";

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
.transactions{
  &__header{
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button{
    width: fit-content;
  }

  &__container{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>