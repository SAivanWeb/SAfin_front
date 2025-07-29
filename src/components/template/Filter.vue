<template>
  <div class="filter">
    <div class="filter__button" @click="showFilters = !showFilters">
      <filter-icon class="filter__button-icon"/>
    </div>
    <div v-if="showFilters" class="filter__container">
      <div v-if="showCategory" class="filter__item">
        <div class="filter__item-name">
          Категории
        </div>
        <n-scrollbar style="max-height: 84px">
          <div class="filter__item-options">
            <CheckBox label="Еда"/>
            <CheckBox label="Транспорт"/>
            <CheckBox label="Вкусное"/>
            <CheckBox label="Соленое"/>
            <CheckBox label="Спорт"/>
            <CheckBox label="Для дома"/>
            <CheckBox label="Кафе"/>
          </div>
        </n-scrollbar>
      </div>
      <div v-if="showDate" class="filter__item">
        <div class="filter__item-name">
          Дата
        </div>
        <div class="filter__item-options">
          <InputDate class="filter__item-input" type="daterange"/>
        </div>
      </div>
      <div v-if="showType" class="filter__item">
        <div class="filter__item-name">
          Тип
        </div>
        <div class="filter__item-options">
          <CheckBox label="Списание"/>
          <CheckBox label="Пополнение"/>
        </div>
      </div>
      <div class="filter__footer">
        <MainButton class="filter__footer-button" title="Применить" size="small" type="secondary" @click="acceptFilters"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import FilterIcon from "@/assets/icons/filter-icon.vue";
import CheckBox from "@/components/ui/box/CheckBox.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import InputDate from "@/components/ui/input/InputDate.vue";

const props = defineProps({
  showCategory: {
    type: Boolean,
    default: true
  },
  showDate: {
    type: Boolean,
    default: true
  },
  showType: {
    type: Boolean,
    default: true
  },
})

const showFilters = ref(false);

const acceptFilters = () => {
  showFilters.value = false;
}
</script>

<style scoped lang="scss">
.filter {
  position: relative;

  &__button {
    color: #2E7D32;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.25s;
    width: fit-content;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover{
      background: rgba(46, 125, 50, 0.1);
    }
    &-icon{
      width: 28px;
    }
  }

  &__container{
    position: absolute;
    top: 110%;
    left: 0;
    width: 500px;
    padding: 24px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item{
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-name{
      font-size: 20px;
      color: #2E7D32;
      border-bottom: 1px solid rgba(203, 229, 203, 0.38);
      padding-bottom: 4px;
    }

    &-options{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 0 4px;
    }

    &-input{
      width: 100%;
    }
  }

  &__footer{
    &-button{
      width: fit-content;
      margin-left: auto;
    }
  }
}
</style>