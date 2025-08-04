<template>
  <MainWrapper>
    <div class="chat__header">
      <MainTitle title="Финансовый отчет" class="chat__title"/>
    </div>
    <div class="chat__container">
      <n-result
          description="Для получения отчета укажите период"
          size="medium"
      >
        <template #icon>
          <ChatIconFilled class="chat__icon"/>
        </template>

        <template #footer>
          <MainSelect
              :items="periods"
              v-model="selectedPeriod"
              placeholder="Период"
              size="small"
              class="chat__select"
          />
          <MainButton title="Получить" size="small"/>
        </template>
      </n-result>
    </div>
  </MainWrapper>
</template>

<script setup>
import ChatIconFilled from "@/assets/icons/chat-icon-filled.vue";
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import {ref} from "vue";

const periods = [
  { value: 1, label: 'Месяц' },
  { value: 2, label: 'Неделя' },
];
const selectedPeriod = ref(null);

</script>

<style scoped lang="scss">
.chat{
    &__header{
      margin-bottom: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

  &__container{
    height: calc(100vh - 254px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon{
    color: #2E7D32;
    width: 224px;
    margin-bottom: 24px;
  }

  &__select{
    margin-top: -20px;
    margin-bottom: 24px;
  }
}
</style>