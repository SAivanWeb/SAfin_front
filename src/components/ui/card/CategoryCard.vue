<template>
  <div class="category-card">
    <div class="category-card__header">
      <div class="category-card__name">{{category.name}}</div>
    </div>
    <div class="category-card__body">
      <div v-if="category.description" class="category-card__description">{{category.description}}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  category: Object,
})
</script>

<style scoped lang="scss">
.category-card{
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name{
    font-size: 24px;
  }
}
</style>