<template>
  <div class="goal-card">
    <div class="goal-card__header">
      <div class="goal-card__name">Машина</div>
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
              :percentage="percentage"
              indicator-placement="inside"
              color='#2E7D32'
          />
        </div>
        <div class="goal-card__statistic">
          <img src="@/assets/icons/calendar.svg" class="goal-card__statistic-icon">
          <n-progress
              type="line"
              :height="24"
              :percentage="percentage"
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

const percentage = 20;

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
  gap: 24px;

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
    font-size: 28px;
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