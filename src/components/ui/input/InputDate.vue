<template>
  <div class="datepicker">
    <div class="datepicker__title" v-if="label">{{ label }}</div>
    <n-date-picker
        v-model:value="timestampValue"
        :type="type"
        clearable
        @update:value="handleDateUpdate"
        :size="type === 'daterange' ? 'medium' : 'large'"
        :format="type === 'month' ? 'y MMMM' : 'yyyy-MM-dd'"
        :value-format="type === 'month' ? 'y MMM' : 'yyyy-MM-dd'"
        :month-format="type === 'month' ? 'MMMM' : 'MMM'"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Date, String],
  type: {
    type: String,
    default: 'date',
  }
});

const emit = defineEmits(['update:modelValue']);

const formatDateToYMD = (date) => {
  if (!date) return null;
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const timestampValue = ref(
    props.modelValue
        ? new Date(props.modelValue).getTime()
        : null
);

if (props.modelValue) {
  emit('update:modelValue', formatDateToYMD(props.modelValue));
}

const handleDateUpdate = (timestamp) => {
  emit('update:modelValue',
      timestamp ? formatDateToYMD(new Date(timestamp)) : null
  );
};

watch(() => props.modelValue, (newVal) => {
  timestampValue.value = newVal ? new Date(newVal).getTime() : null;
});
</script>

<style scoped lang="scss">
.datepicker {
  display: flex;
  flex-direction: column;
  gap: 8px;

}
</style>