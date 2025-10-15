<template>
  <MainWrapper>
    <div class="goals__header">
      <MainTitle title="Цели" class="goals__title"/>
      <MainButton class="goals__button" action="add" title="создать цель" type="secondary" @click="$emit('showGoals')"/>
    </div>
<!--    <PageAlert class="goals__alert"/>-->
    <div class="goals__container">
      <GoalCard v-for="item in goals" :goal="item" @show-amount-goal="(goal) => $emit('showAmountGoal', goal)" @delete-goal="deletingGoal"/>
    </div>
  </MainWrapper>

  <ConfirmModal v-if="showDeleteGoal" @hide-modal="showDeleteGoal = false" @confirm="deleteGoal" :closable="false"/>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import GoalCard from "@/components/ui/card/GoalCard.vue";
import PageAlert from "@/components/template/PageAlert.vue";
import {onMounted, inject, ref, computed} from "vue";
import {useStore} from "vuex";
import ConfirmModal from "@/components/template/modal/ConfirmModal.vue";
const store = useStore();

defineEmits(['showAmountGoal']);
const { api } = inject('plugins');

const goals = computed(() => {
  return store.getters.GET_GOALS || [];
});

onMounted(() => {
  store.dispatch("getGoals");
})

const showDeleteGoal = ref(false);
const deletingGoalId = ref(null);

const deletingGoal = (id) => {
  deletingGoalId.value = id;
  showDeleteGoal.value = true;
}

async function deleteGoal() {
  const res = await api.goals.deleteGoal(deletingGoalId.value);
  if (res.success) {
    store.commit('SET_MESSAGE',{
      text: 'Цель удалена',
      type: 'success',
    });
    store.dispatch("getGoals");
    store.dispatch("getProfile");
  } else {
    store.commit('SET_MESSAGE',{
      text: 'Ошибка удаления цели',
      type: 'success',
    });
  }
  deletingGoalId.value = null;
  showDeleteGoal.value = false;
}

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

@media (max-width: 999px) {
  .goals{
    &__container{
      gap: 12px;
    }
  }
}

@media (max-width: 767px) {
  .goals{
    &__container{
      grid-template-columns: 1fr;
    }
  }
}
</style>