<template>
  <div class="transaction">
    <div class="transaction__text">
      {{ item.category }}
    </div>
    <div class="transaction__text transaction__text_date">
      {{ item.date }}
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
  grid-template-columns: 30% 1fr 1fr;
  align-items: center;

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
</style>