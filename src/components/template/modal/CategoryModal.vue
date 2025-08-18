<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Создание категории</h2>
    </template>
    <template #body>
      <div class="modal__fields-container">
        <MainInput
            label="Наименование"
            placeholder="Введите название категории"
            v-model="categoryData.name"
        />

        <MainInput
            label="Описание"
            placeholder="Опишите вашу категорию"
            v-model="categoryData.description"
        />
        
      </div>
      <div class="modal__actions">
        <MainButton v-if="edit" title="Обновить" @click="updateGoal"/>
        <MainButton v-else title="Создать" @click="createGoal"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import {ref, inject} from "vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits('hide-modal');

const { api } = inject('plugins');

const props = defineProps({
  category: Object,
  edit: {
    type: Boolean,
    default: false
  },
})

const categoryData = ref({
  name: '',
  description: '',
})

async function createGoal() {
  const res = await api.category.createCategory(categoryData.value);
  if (res.success) {
    emit('hide-modal');
  }
}

async function updateGoal() {
  
}

</script>

<style scoped lang="scss">

</style>