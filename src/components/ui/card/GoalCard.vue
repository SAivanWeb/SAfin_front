<template>
  <div class="goal-card">
    <div class="goal-card__header">
      <h4 class="goal-card__name">Машина</h4>
      <div class="goal-card__icon-group">
        <div v-if="editable" class="goal-card__header-button" @click="">
          <Edit class="goal-card__icon"/>
        </div>
        <div class="goal-card__header-button" @click="emitShowAmountGoal">
          <Plus class="goal-card__icon"/>
        </div>
      </div>
    </div>
    <div class="goal-card__body">
      <div class="goal-card__container">
        <div class="goal-card__statistic">
          <img src="@/assets/icons/money.svg" class="goal-card__statistic-icon">
          <n-progress
              type="line"
              :height="24"
              :percentage="20"
              indicator-placement="inside"
              color='#2E7D32'
          />
        </div>
        <div class="goal-card__statistic">
          <img src="@/assets/icons/calendar.svg" class="goal-card__statistic-icon">
          <n-progress
              type="line"
              :height="24"
              :percentage="20"
              indicator-placement="inside"
              color='#FFA726'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainButton from "@/components/ui/button/MainButton.vue";
import Edit from "@/assets/icons/edit.vue";
import Plus from "@/assets/icons/plus.vue";
import {computed, ref, inject} from "vue";

const props = defineProps({
  goal: Object,
  editable: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['showAmountGoal']);

const emitShowAmountGoal = () => {
  emit('showAmountGoal', props.goal);
};

const progressMoney = computed(() => {
  const current = props.goal.current_amount || 0
  const target = props.goal.target_amount || 0
  if (target <= 0) return 0
  return Math.min(((current / target) * 100).toFixed(2), 100)
})

const progressTime = computed(() => {
  const start = props.goal.start_at ? new Date(props.goal.start_at) : new Date()
  const end = props.goal.end_at ? new Date(props.goal.end_at) : null
  if (!end) return 0

  const total = end.getTime() - start.getTime()
  const elapsed = Date.now() - start.getTime()
  if (total <= 0) return 0

  return Math.min(((elapsed / total) * 100).toFixed(2), 100)
})

</script>

<style scoped lang="scss">
.goal-card{
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

    &-button{
      width: 36px;
      height: 36px;
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      color: #2E7D32;

      &:hover{
        background: rgba(46, 125, 50, 0.1);
      }
    }
  }

  &__icon-group{
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__name{
    font-size: 24px;
  }

  &__body{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__container{
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__statistic{
    display: flex;
    align-items: center;
    gap: 12px;

    &-icon{
      width: 32px;
    }
  }

  &__button{
    width: fit-content;
    margin-left: auto;
  }
}
</style>