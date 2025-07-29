<template>
  <div class="transactions">
    <n-scrollbar v-if="height" :style="{maxHeight: height + 'px'}" content-class="transactions">
      <div class="transactions__container-scroll">
        <TransactionItem v-for="item in items" :key="item.id" :item="item"/>
      </div>
    </n-scrollbar>
    <template v-else>
      <TransactionItem v-for="item in items" :key="item.id" :item="item"/>
    </template>
  </div>
</template>

<script setup>
import TransactionItem from "@/components/transaction/TransactionItem.vue";

const props = defineProps({
  items: Array,
  height: Number,
})
</script>

<style scoped lang="scss">
.transactions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  &__container-scroll{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>