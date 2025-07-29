<template>
  <div class="chart-container">
    <Chart
        :size="{ width: chartWidth, height: 420 }"
        :data="chartData"
        :margin="margin"
        :direction="direction"
        :axis="axis">

      <template #layers>
        <Grid strokeDasharray="2,2" />
        <defs>
          <linearGradient id="balanceGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#2E7D32" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#2E7D32" stop-opacity="0" />
          </linearGradient>
        </defs>
        <Area
            :dataKeys="['date', 'balance']"
            type="monotone"
            :areaStyle="{ fill: 'url(#balanceGradient)' }"
        />
        <Line
            :dataKeys="['date', 'balance']"
            type="monotone"
            :lineStyle="{
              stroke: '#2E7D32',
              strokeWidth: 3
            }"
        />
      </template>

      <template #widgets>
        <Tooltip
            color="#2E7D32"
            :config="tooltipConfig"
            :hide-line="true"
        />
      </template>
    </Chart>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, toRefs } from 'vue'
import { Chart, Grid, Line, Area, Tooltip } from 'vue3-charts'

const props = defineProps({
  items: Array,
})

const { items } = toRefs(props)

const tooltipConfig = ref({
  id: { hide: true },
  date: { hide: true },
  balance: { hide: true },
  description: { hide: true },
  amount: { label: 'Cумма', color: '#2E7D32' },
  type: { hide: true },
  displayType: { label: 'Тип', color: '#2E7D32' },
  category: { label: 'Категория', color: '#2E7D32' },
})

const chartData = computed(() => {
  const sortedTransactions = [...items.value].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
  )

  let balance = 0
  return sortedTransactions.map(transaction => {
    if (transaction.type === 'income') {
      balance += transaction.amount
    } else {
      balance -= transaction.amount
    }

    return {
      ...transaction,
      date: new Date(transaction.date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }),
      balance,
    }
  })
})

const direction = ref('horizontal')
const chartWidth = ref(800)

const margin = ref({
  left: 40,
  top: 20,
  right: 20,
  bottom: 50
})

const axis = ref({
  primary: {
    type: 'band'
  },
  secondary: {
    type: 'linear',
    ticks: 8,
    format: (val) => `${val.toLocaleString()} ₽`
  }
})

const updateChartWidth = () => {
  const container = document.querySelector('.chart-container')
  if (container) {
    chartWidth.value = container.offsetWidth
  }
}

onMounted(() => {
  updateChartWidth()
  window.addEventListener('resize', updateChartWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateChartWidth)
})
</script>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  overflow: hidden;

  &:deep() svg {
    display: block;
  }
}
</style>