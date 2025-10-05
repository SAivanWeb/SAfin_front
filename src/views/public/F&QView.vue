<template>
  <MainWrapper>
    <MainTitle title="Инструкция" class="instruction__title"/>
    <n-collapse :trigger-areas="triggerAreas" accordion>
      <n-collapse-item v-for="item in instructions" :title="item.title" :name="item.id">
      </n-collapse-item>
    </n-collapse>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import {ref} from "vue";

const triggerAreas = ['main', 'arrow']

const instructions = [
  {
    title: "Главная",
    content: [
      {
        title: "Первая секция",
        text: "Отображается уровень пользователя с соответствующим уровню изображением, а так же баланс - сумма всех счетов.",
      },
      {
        title: "Основная цель",
        text: "Данная секция отображается, если пользователь создал цель и указал ее основной.",
      },
      {
        title: "Статистика за период",
        text: "В данной секции выводится основная статистика за выбранный месяц, по умолчанию текущий, а так же в скобках указана разница по этой метрике за предыдущий от указанного месяц.",
      },
      {
        title: "Последние транзакции",
        text: "В данной секции выводятся последние 5 транзакций без фильтрации по счетам и категориям. Предусмотрена кнопка для перехода ко всем транзакциям",
      },
    ],
  },
  {
    title: "Финансы",
  },
  {
    title: "Цели",
  },
  {
    title: "Категории",
  },
  {
    title: "Профиль",
  },
];
</script>

<style scoped lang="scss">
.instruction{
  &__title{
    margin-bottom: 24px;
  }
}
</style>