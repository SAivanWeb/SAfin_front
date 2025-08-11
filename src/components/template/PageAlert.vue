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

<style scoped lang="scss">
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

  }

  &__text{
    margin-bottom: 12px;
  }

  &__button-group{
    display: flex;
    gap: 12px;
  }
}
</style>