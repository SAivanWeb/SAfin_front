<template>
  <n-alert :show-icon="false" type="success" closable>
    <div class="alert">
      <!--          <info class="dashboard__alert-icon"/>-->
      <question class="alert__icon"/>
      <div class="alert__content">
        <div class="alert__title">Финансовая подушка безопасности</div>
        <div class="alert__text">Накопите 3 месячных дохода для защиты от неожиданностей</div>
        <div class="alert__button-group">
          <MainButton size="small" title="Уже есть" type="secondary" />
          <MainButton size="small" title="Создать подушку" />
        </div>
      </div>
    </div>
  </n-alert>
</template>

<script setup>
import MainButton from "@/components/ui/button/MainButton.vue";
import Question from "@/assets/icons/question.vue";
</script>

<style lang="scss">
.alert{
  display: flex;
  align-items: start;
  gap: 12px;
  width: 100%;

  &__icon{
    color: #2E7D32;
    width: 48px;
  }

  &__content{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__title{
    font-size: 24px;
    font-weight: 500;
    line-height: 1.2;
  }

  &__text{
    margin-bottom: 12px;
  }

  &__button-group{
    display: flex;
    gap: 12px;
  }
}

@media (max-width: 1280px) {
  .alert{
    &__icon{
      width: 34px;
    }
    &__title{
      font-size: 24px;
    }
    &__text{
      font-size: 18px;
    }
  }
}

@media (max-width: 999px) {
  .alert{
    gap: 6px;
    &__icon{
      width: 28px;
    }
    &__title{
      font-size: 20px;
    }
    &__text{
      font-size: 18px;
    }
  }

  .n-alert.n-alert--right-adjust .n-alert-body{
    padding-right: 24px !important;
  }

  .n-alert .n-alert__close{
    right: -12px !important;
  }
}

@media (max-width: 767px) {
  .alert {
    &__icon {
      display: none;
    }

    &__title{
      font-size: 18px;
    }
    &__text{
      font-size: 16px;
    }
  }
}
</style>