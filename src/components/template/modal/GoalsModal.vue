<template>
  <ModalWrapper size="650px">
    <template #header>
      <h2 class="modal__title">Создание цели</h2>
    </template>

    <template #body>
        <RadioBox
            :items="goalsType"
            v-model="goalsData.type"
            title="Тип цели"
            @update:modelValue="handleTypeChange"
        />

        <div class="modal__goals-container">
          <CheckBox title="Основная цель" label="Основная цель" v-model="goalsData.is_main"/>

          <MainInput
              label="Наименование"
              placeholder="Введите название цели"
              v-model="goalsData.name"
          />

          <MainInput
              label="Описание"
              placeholder="Опишите вашу цель"
              v-model="goalsData.description"
          />

          <MainSelect
              v-if="goalsData.type === 'limit'"
              title="Категория расходов"
              :items="categories"
              v-model="goalsData.category_id"
              placeholder="Выберите категорию"
              :is-category="true"
          />

          <MainSelect
              title="Приоритет цели"
              :items="priorityOptions"
              v-model="goalsData.priority"
          />

          <InputDate
              label="Дата начала"
              v-model="goalsData.start_at"
              format="yyyy-MM-dd"
          />

          <InputDate
              :label="goalsData.type === 'save' ? 'Дата завершения' : 'Ограничивающий срок'"
              v-model="goalsData.end_at"
              format="yyyy-MM-dd"
          />

          <MainInput
              type="number"
              :label="goalsData.type === 'save' ? 'Текущая сумма' : 'Текущий расход'"
              placeholder="0"
              v-model="goalsData.current_amount"
              min="0"
          />

          <MainInput
              type="number"
              :label="goalsData.type === 'save' ? 'Желаемая сумма' : 'Лимит расходов'"
              placeholder="Введите сумму"
              v-model="goalsData.target_amount"
              :min="goalsData.type === 'save' ? goalsData.current_amount + 1 : 0"
          />

        </div>

        <div class="modal__actions">
          <MainButton title="Создать" @click="handleSubmit"/>
        </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import {ref, computed, onMounted, toRefs} from "vue";
import RadioBox from "@/components/ui/box/RadioBox.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import InputDate from "@/components/ui/input/InputDate.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import CheckBox from "@/components/ui/box/CheckBox.vue";

const props = defineProps({
  isEditMode: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits('hide-modal');

const {isEditMode} = toRefs(props);

const goalsData = ref({
  is_main: false,
  name: '',
  description: '',
  type: 'save',
  category_id: null,
  target_amount: null,
  current_amount: 0,
  start_at: new Date().toISOString().split('T')[0],
  end_at: null,
  priority: 1,
});

const goalsType = [
  { item_title: 'Накопительная', id: 'save', name: 'save', group: 'goal-type' },
  { item_title: 'Лимитная', id: 'limit', name: 'limit', group: 'goal-type' }
];

const priorityOptions = [
  { value: 1, label: 'Низкий' },
  { value: 2, label: 'Средний' },
  { value: 3, label: 'Высокий' }
];

const categories = [
  { value: 1, label: 'Низкий' },
  { value: 2, label: 'Средний' },
  { value: 3, label: 'Высокий' }
];

const handleTypeChange = (type) => {
  if (type === 'save') {
    goalsData.value.category_id = null;
  }
  if (type === 'limit') {
    goalsData.value.current_amount = 0;
  }
};

const handleSubmit = () => {
  goalsData.value.target_amount*=10
  goalsData.value.current_amount*=10

  console.log(goalsData.value);
};

onMounted(() => {
  if (isEditMode.value) {
    console.log('редактирование')
  }
})
</script>
