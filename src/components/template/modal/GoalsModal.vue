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
          <MainInput
              label="Наименование"
              placeholder="Введите название цели"
              v-model="goalsData.name"
              required
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
          />

          <MainSelect
              title="Приоритет цели"
              :items="priorityOptions"
              v-model="goalsData.priority"
          />

          <InputDate
              label="Дата начала"
              v-model="goalsData.start_date"
              format="yyyy-MM-dd"
          />

          <InputDate
              :label="goalsData.type === 'save' ? 'Дата завершения' : 'Ограничивающий срок'"
              v-model="goalsData.end_date"
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
              required
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
import { ref, computed, onMounted } from "vue";
import RadioBox from "@/components/ui/box/RadioBox.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import InputDate from "@/components/ui/input/InputDate.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const props = defineProps({
  // goalData: {
  //   type: Object,
  //   default: () => ({})
  // },
  // isEditMode: {
  //   type: Boolean,
  //   default: false
  // },
  // categories: {
  //   type: Array,
  //   default: () => []
  // }
});

const emit = defineEmits('hide-modal');

const goalsData = ref({
  name: '',
  type: 'save',
  current_amount: 0,
  target_amount: null,
  start_date: new Date(),
  end_date: null,
  priority: 1,
  description: '',
  category_id: null
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

onMounted(() => {
  if (props.isEditMode) {
    goalsData.value = {
      ...goalsData.value,
      ...props.goalData
    };
  }
});

const handleTypeChange = (type) => {
  if (type === 'save') {
    goalsData.value.category_id = null;
  }
  if (type === 'limit') {
    goalsData.value.current_amount = 0;
  }
};

const handleSubmit = () => {
  console.log(goalsData.value);
};
</script>
