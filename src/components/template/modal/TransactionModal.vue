<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Создание транзакции</h2>
    </template>
    <template #body>
      <div class="modal__fields-container">
        <MainSelect
            title="Тип транзакции"
            :items="transactionTypes"
            v-model="transactionData.type"
        />

        <MainSelect
            title="Категория"
            :items="categories"
            v-model="transactionData.category_id"
            placeholder="Выберите категорию"
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
    label: item.name
  }));
});

const transactionData = ref({
  type: '',
  amount: 0,
  category_id: '',
  description: '',
})

const transactionTypes = [
  { value: 'income', label: 'Списаине' },
  { value: 'expense', label: 'Пополнение' },
];

const disableButton = computed(() => {
  return !transactionData.value.type ||
  !transactionData.value.amount ||
  !transactionData.value.category_id
})

async function createTransaction() {
  const res = await api.transactions.createTransaction(transactionData.value);
  if (res.success) {
    emit('hide-modal');
  }
}
</script>