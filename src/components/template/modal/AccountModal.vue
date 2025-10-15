<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 v-if="!edit" class="modal__title">Создание счета</h2>
      <h2 v-else-if="edit && editType === 'all'" class="modal__title">Обновление счета</h2>
      <h2 v-else-if="edit && editType === 'part'" class="modal__title">Пополнение баланса</h2>
    </template>
    <template #body>
      <div class="modal__fields-container">
        <MainInput
            v-if="!edit || edit && editType !== 'part'"
            label="Наименование"
            placeholder="Введите название счета"
            v-model="accountData.title"
        />

        <MainInput
            v-if="editType !== 'part'"
            label="Описание"
            placeholder="Описание счета"
            v-model="accountData.description"
        />

        <MainInput
            label="Баланс"
            placeholder="Баланс"
            v-model="accountData.balance"
            type="number"
        />

      </div>
      <div class="modal__actions">
        <MainButton v-if="edit && editType === 'all'" title="Обновить" @click="updateAccount"/>
        <MainButton v-else-if="edit && editType === 'part'" title="Пополнить" @click="updateAccount"/>
        <MainButton v-else title="Создать" @click="createAccount"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import {ref, inject, onMounted, toRefs} from "vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useStore} from "vuex";

const store = useStore();

const emit = defineEmits('hide-modal');

const { api } = inject('plugins');

const props = defineProps({
  account: Object,
  edit: {
    type: Boolean,
    default: false
  },
  editType: String,
})

const accountData = ref({
  title: '',
  description: '',
  balance: 0
})

const {edit} = toRefs(props);

const clearData = () => {
  accountData.value.title = '';
  accountData.value.description = '';
  accountData.value.balance = 0;
}

async function createAccount() {
  const res = await api.accounts.createAccount(accountData.value);
  if (res.success) {
    store.commit('SET_MESSAGE',{
      text: 'Счет создан',
      type: 'success',
    });
    store.dispatch("getAccounts");
    clearData();
    emit('hide-modal');
  } else {
    store.commit('SET_MESSAGE',{
      text: 'Ошибка создания счета',
      type: 'error',
    });
  }
}

async function updateAccount() {
  const res = await api.accounts.updateAccount(props.account.id, accountData.value);
  if (res.success) {
    store.commit('SET_MESSAGE',{
      text: 'Счет обновлен',
      type: 'success',
    });
    store.dispatch("getAccounts");
    clearData();
    emit('hide-modal');
  } else {
    store.commit('SET_MESSAGE',{
      text: 'Ошибка обновления счета',
      type: 'error',
    });
  }
}

onMounted(() => {
  if (props.edit) {
    accountData.value.title = props.account.title;
    accountData.value.description = props.account.description;
    if (props.editType !== 'part') {
      accountData.value.balance = props.account.balance;
    } else {
      accountData.value.balance = 0;
    }
  }
})
</script>

<style scoped lang="scss">

</style>