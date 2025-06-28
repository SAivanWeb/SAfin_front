<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Создание цели</h2>
    </template>

    <template #body>
      <RadioBox :items="goalsType" :model-value="goalTypeOption" title="Тип цели"/>
      <div class="modal__goals-container">
        <MainInput label="Наименование" placeholder="Наименование" v-model="goalsData.name"/>
        <MainInput label="Описание" placeholder="Описание" v-model="goalsData.description"/>
        <MainSelect title="Приоритет цели" :items="goalsPriority" :model-value="goalTypeOption"/>
        <InputDate/>
        <InputDate/>
        <MainInput type="number" label="Начальная сумма" placeholder="Начальная сумма" v-model="goalsData.current_amount"/>
        <MainInput type="number" label="Желаемая сумма" placeholder="Желаемая сумма" v-model="goalsData.target_amount"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import {ref} from "vue";
import RadioBox from "@/components/ui/box/RadioBox.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import InputDate from "@/components/ui/input/InputDate.vue";

const goalsData = ref({
  name: '',
  type: '',
  current_amount: 0,
  target_amount: null,
  start_date: null,
  end_date: null,
  priority: 1,
  description: '',
})

const goalTypeOption = ref(goalsData.value.type);
const goalPriority = ref(goalsData.value.priority);

const goalsType = [
  { item_title: 'Накопительная', id: 'save', name: 'save', group: 'goal-type' },
  { item_title: 'Лимитная', id: 'limit', name: 'limit', group: 'goal-type' }
];

const goalsPriority = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
]

</script>

<style scoped lang="scss">

</style>