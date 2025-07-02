<template>
  <MainWrapper>
    <div class="goals__header">
      <MainTitle title="Цели" class="goals__title"/>
      <MainButton class="goals__button" action="add" title="создать цель" type="secondary" @click="$emit('showGoals')"/>
    </div>


    <div class="goals__container">
      <GoalCard/>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import GoalCard from "@/components/ui/card/GoalCard.vue";
</script>

<style scoped lang="scss">
.goals{
  &__header{
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button{
    width: fit-content;
  }

  &__container{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}
</style>