<template>
  <div class="transaction">
    <div class="transaction__text">
      {{ item.category.title }}
    </div>
    <div class="transaction__text">
      {{ item.account.title }}
    </div>
    <div class="transaction__text transaction__text_date">
      {{ formatDate(item.date) }}
    </div>
    <div class="transaction__amount" :class="item.type === 'income' ? 'transaction__amount_up' : 'transaction__amount_down'">
      <arrow class="transaction__amount-icon"/>
      {{ formatAmount(item.amount) }}₽
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";
import Arrow from "@/assets/icons/arrow.vue";

const props = defineProps({
  item: Object,
})

const {item} = toRefs(props);

const formatAmount = (value) => {
  return value.toLocaleString('ru-RU', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).replace(/,/g, ' ');
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('sv-SE', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).replace("T", " ");
}
</script>

<style scoped lang="scss">
.transaction {
  width: 100%;
  background-color: #fff;
  border: 1px solid rgba(209, 213, 219, 0.3);
  padding: 18px;
  border-radius: 12px;
  font-size: 18px;

  display: grid;
  grid-template-columns: 20% 1fr 1fr 1fr;
  align-items: center;
  gap: 6px;

  &__text{
    font-size: 18px;
  }

  &__amount{
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;

    &_up{
      color: #2E7D32;
    }

    &_down{
      color: red;
      & .transaction__amount-icon{
        transform: scale(1, -1);
      }
    }

    &-icon{
      width: 32px;
    }
  }
}

@media (max-width: 768px) {
  .transaction{
    padding: 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    &__text{
      font-size: 16px;
    }
    &__amount{
      font-size: 16px;

      &-icon{
        width: 24px;
      }
    }
  }
}
</style>