<template>
  <div class="datepicker">
    <div class="datepicker__title" v-if="label">{{ label }}</div>
    <n-date-picker
        v-model:value="timestampValue"
        :type="type"
        clearable
        @update:value="handleDateUpdate"
        size="large"
        :format="format"
        :value-format="format"
        :month-format="monthFormat"
    />
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Date, String],
  type: {
    type: String,
    default: 'date',
  }
});

const emit = defineEmits(['update:modelValue']);

const timestampValue = ref(
    props.modelValue ? new Date(props.modelValue).getTime() : null
);

const formatDateToYMD = (date) => {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const handleDateUpdate = (timestamp) => {
  if (!timestamp) {
    emit('update:modelValue', null);
    return;
  }

  const date = new Date(timestamp);

  if (props.type === 'datetime') {
    emit('update:modelValue', date.toISOString());
  } else {
    emit('update:modelValue', formatDateToYMD(date));
  }
};

watch(
    () => props.modelValue,
    (newVal) => {
      timestampValue.value = newVal ? new Date(newVal).getTime() : null;
    }
);

const format = computed(() => {
  if (props.type === 'month') {
    return 'y MMM';
  } else if (props.type === 'datetime') {
    return 'yyyy-MM-dd HH:mm:ss';
  } else {
    return 'yyyy-MM-dd';
  }
});

const monthFormat = computed(() => {
  if (props.type === 'month') {
    return 'MMMM';
  } else {
    return 'MMM';
  }
});
</script>

<style lang="scss">
.datepicker {
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > .n-button{
    border-radius: 6px;
    font-weight: 300;
  }
}
</style>