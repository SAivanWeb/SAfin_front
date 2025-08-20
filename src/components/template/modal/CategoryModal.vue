<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">{{ edit ? 'Обновление категории' : 'Создание категории' }}</h2>
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
        <MainButton v-if="edit" title="Обновить" @click="updateCategory"/>
        <MainButton v-else title="Создать" @click="createCategory"/>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import {ref, inject, onMounted} from "vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useStore} from "vuex";

const store = useStore();

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

const clearData = () => {
  categoryData.value.name = '';
  categoryData.value.description = '';
}

async function createCategory() {
  const res = await api.category.createCategory(categoryData.value);
  if (res.success) {
    store.dispatch("getCategories");
    clearData();
    emit('hide-modal');
  }
}

async function updateCategory() {
  const res = await api.category.updateCategory(categoryData.value, props.category.id);
  if (res.success) {
    store.dispatch("getCategories");
    clearData();
    emit('hide-modal');
  }
}

onMounted(() => {
  if (props.edit) {
    categoryData.value.name = props.category.name;
    categoryData.value.description = props.category.description;
  }
})
</script>

<style scoped lang="scss">

</style>