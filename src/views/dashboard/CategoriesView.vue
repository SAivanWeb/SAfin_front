<template>
  <MainWrapper>
    <MainTitle title="Категории" class="categories__title"/>

  </MainWrapper>
</template>

<script setup>

import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
</script>

<style scoped lang="scss">
.categories{
  &__title{
    margin-bottom: 48px;
  }
}
</style>