<template>
  <div class="goal-card" :class="[
    goal.status,
    { 'goal-card_main': goal.isMain }
  ]">
    <div class="goal-card__header">
      <h4 class="goal-card__name">{{goal.title}}</h4>
      <div class="goal-card__icon-group">
        <div v-if="editable" class="goal-card__header-button" @click="emitDeleteGoal(goal.id)">
          <Trash class="goal-card__icon trash"/>
        </div>
        <div v-if="goal.status === 'process'" class="goal-card__header-button" @click="emitShowAmountGoal">
          <Plus class="goal-card__icon"/>
        </div>
      </div>
    </div>
    <div class="goal-card__body">
      <div class="goal-card__container">
        <div v-if="goal.description" class="goal-card__description">
          {{goal.description}}
        </div>
        <div class="goal-card__amount">
          <span class="goal-card__amount-label">
            {{ goal.type === 'saving' ? 'Накоплено' : 'Потрачено' }}:
          </span>
                  <span class="goal-card__amount-value">
            {{ formatNum(goal.currentAmount) }}₽
          </span>
                  <span class="goal-card__amount-separator">/</span>
                  <span class="goal-card__amount-target">
            {{ formatNum(goal.targetAmount) }}₽
          </span>
        </div>
        <div class="goal-card__statistic">
          <img src="@/assets/icons/money.svg" class="goal-card__statistic-icon">
          <n-progress
              type="line"
              :height="24"
              :percentage="progressMoney"
              indicator-placement="inside"
              color='#2E7D32'
          />
        </div>
        <div class="goal-card__statistic">
          <img src="@/assets/icons/calendar.svg" class="goal-card__statistic-icon">
          <n-progress
              type="line"
              :height="24"
              :percentage="progressTime"
              indicator-placement="inside"
              color='#FFA726'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Edit from "@/assets/icons/edit.vue";
import Plus from "@/assets/icons/plus.vue";
import {computed, inject} from "vue";
import {useStore} from "vuex";
import Trash from "@/assets/icons/trash.vue";

const store = useStore();
const { api } = inject('plugins');

const props = defineProps({
  goal: Object,
  editable: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['showAmountGoal', 'showEditGoal', 'deleteGoal']);

const emitShowAmountGoal = () => {
  emit('showAmountGoal', props.goal);
};

const progressMoney = computed(() => {
  const current = props.goal.currentAmount || 0
  const target = props.goal.targetAmount || 0
  if (target <= 0) return 0
  return Math.min(((current / target) * 100).toFixed(2), 100)
})

const progressTime = computed(() => {
  const start = props.goal.startDate ? new Date(props.goal.startDate) : new Date()
  const end = props.goal.endDate ? new Date(props.goal.endDate) : null
  if (!end) return 0

  const total = end.getTime() - start.getTime()
  const elapsed = Date.now() - start.getTime()
  if (total <= 0) return 0

  return Math.min(((elapsed / total) * 100).toFixed(2), 100)
})

const emitDeleteGoal = (id) => {
  emit('deleteGoal', id);
};

const formatNum = (num) => {
  if (num == null) return '0'
  return Number(num)
    .toLocaleString('ru-RU', {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
    .replace(/,/g, ' ')
}


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
  gap: 12px;

  &_main {
    border: 2px solid #2E7D32;
    box-shadow: 0 0 10px rgba(46, 125, 50, 0.2);
    position: relative;

    &::before {
      content: '★ Основная цель';
      position: absolute;
      top: -12px;
      left: 20px;
      background: #2E7D32;
      color: #fff;
      padding: 2px 8px;
      font-size: 14px;
      font-weight: 300;
      border-radius: 8px;
      letter-spacing: 1.2px;

      @media (max-width: 767px) {
        left: 12px;
      }
    }
  }

  &.complete{
    border-color: #2E7D32;
  }

  &.failed{
    border-color: #ff2626;
  }

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

  &__icon{
    &-group{
      display: flex;
      align-items: center;
      gap: 12px;
    }

    &.trash{
      width: 16px;
    }
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
    gap: 12px;
  }

  &__statistic{
    display: flex;
    align-items: center;
    gap: 12px;

    &-icon{
      width: 32px;
    }
  }

  .goal-card {
    &__amount {
      font-size: 18px;
      display: flex;
      align-items: baseline;
      gap: 4px;
      flex-wrap: wrap;

      &-label {
        color: #757575;
        font-weight: 400;
      }

      &-value {
        font-weight: 600;
      }

      &-separator {
        color: #9e9e9e;
      }

      &-target {
        font-weight: 600;
      }
    }
  }


  &__button{
    width: fit-content;
    margin-left: auto;
  }
}

@media (max-width: 1280px) {
  .goal-card{
    &__name{
      font-size: 20px;
    }

    &__body{
      &-statistic{
        font-size: 64px;
      }
    }
  }
}

  @media (max-width: 999px) {
    .goal-card{
      padding: 16px;
      gap: 12px;

      &__icon-group{
        gap: 12px;
      }

      &__header {
        &-button {
          width: 20px;
          height: 24px;
          padding: 0;
        }
      }
      &__body{
        gap: 12px;
      }

      &__statistic{
        gap: 6px;

        &-icon{
          width: 24px;
        }
      }
    }
  }
</style>