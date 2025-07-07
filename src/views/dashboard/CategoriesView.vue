<template>
  <MainWrapper>
    <div class="categories__header">
      <MainTitle title="Категории" class="goals__title"/>
    </div>
  </MainWrapper>
</template>

<script setup>

import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
</script>

<style scoped lang="scss">
.categories{
  &__header{
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>