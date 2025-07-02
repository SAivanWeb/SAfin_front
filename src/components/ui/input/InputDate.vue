<template>
  <div class="datepicker">
    <div class="datepicker__title">{{ label }}</div>
    <n-date-picker
        v-model:value="timestampValue"
        type="date"
        clearable
        @update:value="handleDateUpdate"
        size="large"
        value-format="yyyy-MM-dd"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Date, String],
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