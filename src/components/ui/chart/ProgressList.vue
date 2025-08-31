<template>
  <div class="progress">
    <div
        v-for="(item, index) in chartData"
        :key="index"
        class="progress__item"
    >
      <div class="progress__label">
        <span class="category">{{ item.category }}</span>
        <span class="amount">{{ item.amount.toLocaleString() }} ₽</span>
      </div>
      <div class="progress__bar">
        <div
            class="progress__bar-fill"
            :style="{ width: (item.amount / totalExpense * 100) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const totalExpense = computed(() => {
  return props.items
      .filter(item => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
})

const chartData = computed(() => {
  const categories = {}

  props.items
      .filter(item => item.type === 'expense')
      .forEach(item => {
        if (!categories[item.category]) {
          categories[item.category] = 0
        }
        categories[item.category] += item.amount
      })

  return Object.entries(categories)
      .map(([category, amount]) => ({
        category,
        amount
      }))
      .sort((a, b) => b.amount - a.amount)
})

</script>

<style scoped lang="scss">
.progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__label {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
  }
  
  &__bar {
    background: #eee;
    border-radius: 12px;
    height: 24px;
    overflow: hidden;
    
    &-fill {
      background: #2E7D32;
      height: 100%;
      transition: width 0.3s ease;
    }
  }
}

@media (max-width: 767px) {
  .progress {
    &__label {
      font-size: 16px;
    }

    &__bar {
      height: 18px;
    }
  }
}
</style>