<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Обновление цели</h2>
    </template>
    <template #body>
<!--      <MainInput-->
<!--          type="number"-->
<!--          label="Текущая сумма"-->
<!--          :placeholder="goal.currentAmount"-->
<!--          v-model="newCurrentAmount"-->
<!--          min="0"-->
<!--      />-->
      <MainButton title="Добавить" @click="updateCurrent"/>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {ref, toRefs} from "vue";

const emit = defineEmits('hide-modal');
const props = defineProps({
  goal: Object,
})

const newCurrentAmount = ref(null)

const updateCurrent = async () => {
  console.log(newCurrentAmount)
}

const {goal} = toRefs(props);
</script>

<style scoped lang="scss">

</style>