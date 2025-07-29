<template>
  <div class="chart-container">
    <Chart
        :size="{ width: chartWidth, height: 420 }"
        :data="chartData"
        :margin="{
          left: Math.round((chartWidth - 360)/2),
          top: 20,
          right: 0,
          bottom: 20
        }"
        direction="circular"
        :axis="axis"
        :config="{ controlHover: true }">

      <template #layers>
        <Pie
            :dataKeys="['category', 'amount']"
            :pieStyle="{
              innerRadius: 70,
              padAngle: 0.03,
              cornerRadius: 4,
              colors: ['#2E7D32', '#3aa040', '#1f5622', '#1f7e23']
            }"
        />
      </template>

      <template #widgets>
        <Tooltip
            color="#2E7D32"
            :hideLine="true"
            :config="{
              category: { label: 'Категория' },
              amount: {
                label: 'Сумма',
                format: (val) => `${val.toLocaleString('ru-RU')} ₽`
              }
            }"
        />
      </template>
    </Chart>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Chart, Pie, Tooltip } from 'vue3-charts'

const props = defineProps({
  items: Array,
})

const { items } = props

const chartData = computed(() => {
  const categories = {}

  items.filter(item => item.type === 'expense').forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = 0
    }
    categories[item.category] += item.amount
  })

  return Object.entries(categories).map(([category, amount]) => ({
    category,
    amount
  }))
})

const chartWidth = ref(800)

// Важное изменение - скрываем оси
const axis = ref({
  primary: {
    hide: true // Скрываем первичную ось
  },
  secondary: {
    hide: true // Скрываем вторичную ось
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

  &:deep() .vue3-charts-pie-arc {
    transition: opacity 0.3s ease;

  }
  &:deep() .vue3-charts-axis {
    display: none;
  }
}
</style>