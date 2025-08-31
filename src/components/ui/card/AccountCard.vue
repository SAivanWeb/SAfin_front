<template>
  <div class="account-card">
    <div class="account-card__header">
      <h4 class="account-card__name">{{ item.name }}</h4>
      <div class="account-card__icon-group">
        <div class="account-card__header-button" @click="">
          <Edit class="account-card__icon"/>
        </div>
        <div class="account-card__header-button" >
          <Plus class="account-card__icon"/>
        </div>
      </div>
    </div>
    <div class="account-card__body">
      <div class="account-card__body-value">
        Баланс: {{ formatAmount(item.balance) }}₽
      </div>
    </div>
  </div>
</template>

<script setup>
import Edit from "@/assets/icons/edit.vue";
import Plus from "@/assets/icons/plus.vue";

const props = defineProps({
  item: Object,
})

const formatAmount = (value) => {
  return value.toLocaleString('ru-RU', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).replace(/,/g, ' ');
}
</script>

<style scoped lang="scss">
.account-card{
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
    
    &-value{
      font-size: 18px;
    }
  }
  
}

@media (max-width: 1280px) {
  .account-card{
    &__name{
      font-size: 20px;
    }

  }
}

@media (max-width: 999px) {
  .account-card{
    padding: 16px;
    gap: 12px;

    &__body{
      gap: 12px;

      &-value{
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .account-card{
    &__name{
      font-size: 18px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-button{
        width: 32px;
        height: 32px;
        padding: 4px;
      }
    }
  }
}
</style>