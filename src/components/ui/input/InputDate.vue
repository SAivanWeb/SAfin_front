<template>
  <div class="datepicker">
    <div class="datepicker__title">{{ label }}</div>
    <n-date-picker
        v-model:value="timestampValue"
        type="date"
        clearable
        @update:value="handleDateUpdate"
        size="large"
    />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [Date, String, Number],
});

const emit = defineEmits(['update:modelValue']);

const timestampValue = ref(
    props.modelValue
        ? typeof props.modelValue === 'number'
            ? props.modelValue
            : new Date(props.modelValue).getTime()
        : null
);

const handleDateUpdate = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    emit('update:modelValue', date.toISOString());
  } else {
    emit('update:modelValue', null);
  }
};

watch(() => props.modelValue, (newVal) => {
  if (!newVal) {
    timestampValue.value = null;
    return;
  }

  const newTimestamp = typeof newVal === 'number'
      ? newVal
      : new Date(newVal).getTime();

  if (newTimestamp !== timestampValue.value) {
    timestampValue.value = newTimestamp;
  }
}, { immediate: true });
</script>

<style scoped lang="scss">
.datepicker {
  display: flex;
  flex-direction: column;
  gap: 8px;

}
</style>