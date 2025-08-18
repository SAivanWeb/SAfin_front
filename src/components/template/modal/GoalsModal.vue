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

        <div class="modal__fields-container">
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
              v-if="goalsData.type === 'limiting'"
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
              v-model="goalsData.start_at"
              format="yyyy-MM-dd"
          />

          <InputDate
              :label="goalsData.type === 'saving' ? 'Дата завершения' : 'Ограничивающий срок'"
              v-model="goalsData.end_at"
              format="yyyy-MM-dd"
          />

          <MainInput
              type="number"
              :label="goalsData.type === 'saving' ? 'Текущая сумма' : 'Текущий расход'"
              placeholder="Введите сумму"
              v-model="goalsData.current_amount"
          />

          <MainInput
              type="number"
              :label="goalsData.type === 'saving' ? 'Желаемая сумма' : 'Лимит расходов'"
              placeholder="Введите сумму"
              v-model="goalsData.target_amount"
          />

        </div>

        <div class="modal__actions">
          <MainButton v-if="!isEditMode" title="Создать" @click="createGoal" :disabled="disableButton"/>
          <MainButton v-if="isEditMode" title="Удалить" @click="deleteGoal" type="secondary"/>
          <MainButton v-if="isEditMode" title="Обновить" @click=""/>
        </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import {ref, computed, onMounted, toRefs, inject} from "vue";
import RadioBox from "@/components/ui/box/RadioBox.vue";
import MainSelect from "@/components/ui/select/MainSelect.vue";
import InputDate from "@/components/ui/input/InputDate.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import CheckBox from "@/components/ui/box/CheckBox.vue";
import {useStore} from "vuex";

const store = useStore();

const props = defineProps({
  editGoal: {
    type: Object,
  },
  isEditMode: {
    type: Boolean,
    default: false
  },
});

const { api } = inject('plugins');

const emit = defineEmits('hide-modal');

const {isEditMode} = toRefs(props);

const goalsData = ref({
  name: '',
  description: '',
  type: 'saving',
  category_id: null,
  current_amount: null,
  target_amount: null,
  start_at: new Date().toISOString().split('T')[0],
  end_at: null,
  priority: 1,
  is_main: false,
});

const clearForm = () => {
  goalsData.value = {
    name: '',
    description: '',
    type: goalsData.value.type,
    category_id: null,
    current_amount: null,
    target_amount: null,
    start_at: new Date().toISOString().split('T')[0],
    end_at: null,
    priority: 1,
    is_main: false,
  };
};

const disableButton = computed(() => {
  if (goalsData.value.type === "saving") {
    return !goalsData.value.name ||
        (!goalsData.value.current_amount && goalsData.value.current_amount !== 0) ||
        !goalsData.value.target_amount ||
        !goalsData.value.start_at ||
        !goalsData.value.end_at ||
        !goalsData.value.priority;
  } else {
    return !goalsData.value.name ||
        !goalsData.value.category_id ||
        !goalsData.value.current_amount ||
        !goalsData.value.target_amount ||
        !goalsData.value.start_at ||
        !goalsData.value.end_at ||
        !goalsData.value.priority;
  }
})

const goalsType = [
  { item_title: 'Накопительная', id: 'saving', name: 'saving', group: 'goal-type' },
  { item_title: 'Лимитная', id: 'limiting', name: 'limiting', group: 'goal-type' }
];

const priorityOptions = [
  { value: 1, label: 'Низкий' },
  { value: 2, label: 'Средний' },
  { value: 3, label: 'Высокий' }
];

const categories = computed(() => {
  const raw = store.getters.GET_CATEGORIES || [];
  return raw.map(item => ({
    value: item.id,
    label: item.name
  }));
});

const handleTypeChange = (type) => {
  clearForm();
  goalsData.value.type = type;
};

async function createGoal() {
  const res = await api.goals.createGoal(goalsData.value);
  if (res.success) {
    emit('hide-modal');
    store.dispatch("getGoals");
  }
}

async function deleteGoal() {
  const res = await api.goals.deleteGoal(props.editGoal.id);
  if (res.success) {
    emit('hide-modal');
    store.dispatch("getGoals");
  }
}

onMounted(() => {
  if (isEditMode.value) {

  }
})
</script>
