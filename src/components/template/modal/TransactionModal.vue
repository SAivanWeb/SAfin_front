<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Создание транзакции</h2>
    </template>
    <template #body>
      <div class="modal__fields-container">
        <MainSelect
            title="Счет"
            :items="accounts"
            v-model="transactionData.account_id"
            placeholder="Выберите счет"
        />

        <MainSelect
            title="Категория"
            :items="categories"
            v-model="transactionData.category_id"
            placeholder="Выберите категорию"
        />

        <InputDate v-model="transactionData.date" label="Дата и время" type="datetime"/>

        <MainSelect
            title="Тип транзакции"
            :items="transactionTypes"
            v-model="transactionData.type"
        />

        <MainInput
            type="number"
            label="Сумма"
            placeholder="Введите сумму"
            v-model="transactionData.amount"
        />

        <MainInput
            label="Описание"
            placeholder="Введите описание транзакции"
            v-model="transactionData.description"
        />
      </div>
      <div class="modal__actions">
        <MainButton v-if="edit" title="Обновить" @click=""/>
        <MainButton v-else title="Создать" @click="createTransaction" :disabled="disableButton"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import {computed, inject, ref} from "vue";
import {useStore} from "vuex";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import InputDate from "@/components/ui/input/InputDate.vue";
import transactions from "@/api/modules/transactions.js";

const store = useStore();
const emit = defineEmits('hide-modal');
const { api } = inject('plugins');
const props = defineProps({
  editTransaction: Object,
  edit: {
    type: Boolean,
    default: false,
  },
})

const categories = computed(() => {
  const raw = store.getters.GET_CATEGORIES || [];
  return raw.map(item => ({
    value: item.id,
    label: item.title
  }));
});

const accounts = computed(() => {
  const raw = store.getters.GET_ACCOUNTS || [];
  return raw.map(item => ({
    value: item.id,
    label: item.title
  }));
});

const transactionData = ref({
  category_id: null,
  account_id: null,
  date: null,
  amount: 0,
  type: '',
  description: ''
})

const transactionTypes = [
  { value: 'income', label: 'Списание' },
  { value: 'expense', label: 'Пополнение' },
];

const disableButton = computed(() => {
  return !transactionData.value.type ||
  !transactionData.value.amount ||
  !transactionData.value.category_id ||
  !transactionData.value.account_id ||
  !transactionData.value.date;
})

async function createTransaction() {
  const res = await api.transactions.createTransaction(transactionData.value);
  console.log(res)
  if (res.success) {
    emit('hide-modal');
  }
}
</script>