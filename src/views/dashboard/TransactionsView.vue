<template>
  <MainWrapper>
    <div class="transactions__header">
      <MainTitle title="Транзакции" class="transactions__title"/>
      <MainButton class="transactions__button" action="add" title="создать транзакцию" type="secondary" @click="$emit('showTransaction')"/>
    </div>
  </MainWrapper>
</template>

<script setup>

import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
</script>

<style scoped lang="scss">
.transactions{
  &__header{
    margin-bottom: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__button{
    width: fit-content;
  }
}
</style>