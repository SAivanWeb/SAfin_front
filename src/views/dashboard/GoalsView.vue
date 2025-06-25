<template>
  <MainWrapper>
    <div class="goals__header">
      <MainTitle title="Цели" class="goals__title"/>
      <MainButton action="add" title="добавить цель" @click="$emit('showGoals')"/>
    </div>


    <div class="goals__container">

    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
</script>

<style scoped lang="scss">
.goals{
  &__header{
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>