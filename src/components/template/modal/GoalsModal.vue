<template>
  <ModalWrapper>
    <template #header>
      <h2 class="modal__title">Создание цели</h2>
    </template>

    <template #body>
      <div class="modal__goals-container">
        <MainInput label="Наименование" placeholder="Наименование" v-model="goalsData.name"/>
        <MainInput label="Описание" placeholder="Описание" v-model="goalsData.description"/>
        <MainInput label="Статус" placeholder="Статус"  v-model="goalsData.status" :disabled="true" model-value="Активна"/>
        <RadioBox/>
        <MainSelect/>
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
  status: '',
  description: '',
})

const goalsType = [
  {
    name: "Накопительная",
    value: "save",
  },
  {
    name: "Лимитная",
    value: "limit",
  },
]
</script>

<style scoped lang="scss">

</style>