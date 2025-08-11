<template>
  <MainWrapper>
    <div class="categories__header">
      <MainTitle title="Категории" class="goals__title"/>
      <MainButton class="categories__button" action="add" title="создать категорию" type="secondary" @click="$emit('showCategory')"/>
    </div>
    <PageAlert class="categories__alert"/>
    <div class="categories__menu">
      <Filter/>
      <InputSearch class="categories__menu-search" placeholder="поиск категории" :items="categories" v-model="searchedValue"/>
    </div>
  </MainWrapper>
</template>

<script setup>

import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Filter from "@/components/template/Filter.vue";
import InputSearch from "@/components/ui/input/InputSearch.vue";
import {ref} from "vue";
import PageAlert from "@/components/template/PageAlert.vue";

const categories = [
  { id: 1, value: 1, label: 'Еда' },
  { id: 2, value: 2, label: 'Транспорт' },
  { id: 3, value: 3, label: 'Развлечение' }
]

const searchedValue = ref('');
</script>

<style scoped lang="scss">
.categories{
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

  &__menu{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &-search{
      width: 100%;
      max-width: 300px;
    }
  }
}
</style>