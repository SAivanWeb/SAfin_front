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
            <RadioBox v-model="filters.categoryId" :items="categories"/>
          </div>
        </n-scrollbar>
      </div>
      <div v-if="accounts.length > 1" class="filter__item">
        <div class="filter__item-name">
          Счета
        </div>
        <n-scrollbar style="max-height: 84px">
          <div class="filter__item-options">
            <RadioBox v-model="filters.accountId" :items="accounts"/>
          </div>
        </n-scrollbar>
      </div>
      <div v-if="showDate" class="filter__item">
        <div class="filter__item-name">
          Дата начала
        </div>
        <div class="filter__item-options">
          <InputDate v-model="filters.dateStart" class="filter__item-input"/>
        </div>
      </div>
      <div v-if="showDate" class="filter__item">
        <div class="filter__item-name">
          Дата конца
        </div>
        <div class="filter__item-options">
          <InputDate v-model="filters.dateEnd" class="filter__item-input"/>
        </div>
      </div>
      <div v-if="showType" class="filter__item">
        <div class="filter__item-name">
          Тип
        </div>
        <div class="filter__item-options">
          <RadioBox v-model="filters.type" :items="transactionType"/>
        </div>
      </div>
      <div class="filter__footer">
        <MainButton class="filter__footer-button" title="Очистить" size="small" type="secondary" @click="clearFilters"/>
        <MainButton class="filter__footer-button" title="Применить" size="small" type="primary" @click="acceptFilters"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import FilterIcon from "@/assets/icons/filter-icon.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import InputDate from "@/components/ui/input/InputDate.vue";
import RadioBox from "@/components/ui/box/RadioBox.vue";
import {useStore} from "vuex";

const emit = defineEmits(["applyFilters"]);
const store = useStore();
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
  emit("applyFilters", { ...filters.value });
}

const clearFilters = () => {
  filters.value = {
    categoryId: null,
    dateStart: null,
    dateEnd: null,
    type: null,
    accountId: null
  };
  showFilters.value = false;
  emit("applyFilters", { ...filters.value });
};

const filters = ref({
  categoryId: null,
  dateStart: null,
  dateEnd: null,
  type: null,
  accountId: null,
})

const categories = computed(() => {
  let arr = store.getters['GET_CATEGORIES'];
  return arr.map((item) => ({
    ...item,
    group: 'categories',
    item_title: item.title
  }));
})

const accounts = computed(() => {
  let arr = store.getters['GET_ACCOUNTS'];

  return arr
      .filter(item => item.id !== 'total')
      .map(item => ({
        ...item,
        group: 'accounts',
        item_title: item.title
      }));
});

const transactionType = [
  { item_title: 'Пополнение', id: 'income', name: 'income', group: 'transaction-type' },
  { item_title: 'Списание', id: 'expense', name: 'expense', group: 'transaction-type' }
];
</script>

<style lang="scss">
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
    width: 100%;
    max-width: 500px;
    padding: 24px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (max-width: 550px) {
      width: 90vw;
    }
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

      & .radio{
        gap: 0;
      }

      & .radio__items{
        gap: 12px;
        flex-wrap: wrap;
      }
    }

    &-input{
      width: 100%;
    }
  }

  &__footer{
    display: flex;
    gap: 12px;
    margin-top: 12px;

    &-button{
      width: fit-content;
      margin-left: auto;
    }
  }
}
</style>