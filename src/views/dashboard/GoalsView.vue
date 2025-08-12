<template>
  <MainWrapper>
    <div class="goals__header">
      <MainTitle title="Цели" class="goals__title"/>
      <MainButton class="goals__button" action="add" title="создать цель" type="secondary" @click="$emit('showGoals')"/>
    </div>
    <PageAlert class="goals__alert"/>
    <div class="goals__container">
      <GoalCard v-for="item in goals" :goal="item" @show-amount-goal="(goal) => $emit('showAmountGoal', goal)"/>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import GoalCard from "@/components/ui/card/GoalCard.vue";
import PageAlert from "@/components/template/PageAlert.vue";
import {onMounted, inject, ref} from "vue";

const { api } = inject('plugins');

defineEmits(['showAmountGoal']);

const goals = ref(null);

async function getGoals() {
  const res = await api.goals.getGoals();
  if (res.success) {
    goals.value = res;
  }
}

onMounted(() => {
  getGoals()
})
</script>

<style scoped lang="scss">
.goals{
  &__header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__alert{
    margin-bottom: 24px;
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