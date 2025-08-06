<template>
  <div class="level-card">
    <div class="level-card__header">
      <div class="level-card__title">Финансовый головастик</div>
      <div class="level-card__progress">25/150 баллов</div>
    </div>
    <div class="level-card__body">
      <div class="level-card__level">Уровень 1</div>
      <n-progress
          type="line"
          :percentage="35"
          :height="24"
          :border-radius="6"
          color="#2E7D32"
          :indicator-height="12"
          processing
      />
    </div>
  </div>
</template>

<script setup>

import Calendar from "@/assets/icons/calendar.vue";
</script>

<style scoped lang="scss">
.level-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  border: 2px solid #2E7D32;
  height: 192px;
  box-shadow: 0 4px 12px rgba(46, 125, 50, 0.1);

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
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    color: #2E7D32;
  }

  &__level {
    font-size: 18px;
    color: #616161;
  }

  &__progress {
    font-size: 18px;
    color: #757575;
    text-align: right;
  }
}
</style>