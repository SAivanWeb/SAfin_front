<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Добавить к цели</h2>
    </template>
    <template #body>
      <MainInput
          type="number"
          label="Сумма"
          placeholder="Сумма"
          v-model="newCurrentAmount"
      />
      <MainButton title="Добавить" @click="updateCurrent"/>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {ref, toRefs, inject} from "vue";
import {useStore} from "vuex";

const store = useStore();
const { api } = inject('plugins');

const emit = defineEmits('hide-modal');

const props = defineProps({
  goal: Object,
})

const newCurrentAmount = ref(null)

const updateCurrent = async () => {
    const res = await api.goals.addToGoal(props.goal.id, newCurrentAmount.value);
    if (res.success) {
      store.commit('SET_MESSAGE',{
        text: 'Цель пополнена',
        type: 'success',
      });
      emit('hide-modal');
      store.dispatch("getGoals");
    }
};
</script>

<style scoped lang="scss">

</style>