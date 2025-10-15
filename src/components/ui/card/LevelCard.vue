<template>
  <div class="level-card" :class="{ 'level-card_done': isComplete }">
    <div class="level-card__header">
      <div class="level-card__title">{{ item.title }}</div>
      <div class="level-card__progress">{{ requiredPoints }} баллов</div>
    </div>
    <div class="level-card__body">
      <div class="level-card__level">Уровень {{ item.id }}</div>
      <n-progress
          type="line"
          :percentage="progress"
          :height="24"
          :border-radius="6"
          color="#2E7D32"
          :indicator-height="12"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: Object,
  balance: {
    type: Number,
    required: true
  }
});

const requiredPoints = computed(() => props.item.id * 100);

const progress = computed(() => {
  const percent = (props.balance / requiredPoints.value) * 100;
  return Math.min(Math.round(percent), 100);
});

const isComplete = computed(() => progress.value >= 100);
</script>

<style scoped lang="scss">
.level-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  border: 2px solid #2E7D32;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);

  &_done{
    background: rgba(219, 255, 222, 0.4);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 12px;
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    color: #2E7D32;
  }

  &__level {
    font-size: 18px;
    color: #000;
  }

  &__progress {
    font-size: 18px;
    color: #000;
    text-align: right;
  }
}

@media (max-width: 1280px) {
  .level-card {
    padding: 16px;
    &__header{
      margin-bottom: 12px;
    }
    &__body{
      gap: 12px;
    }
    
    &__title{
      font-size: 20px;
    }
    
    &__level {
      font-size: 16px;
    }

    &__progress {
      font-size: 16px;
    }
  }
}
</style>