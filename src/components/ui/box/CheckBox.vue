<template>
  <div class="checkbox">
    <div class="checkbox__title">{{title}}</div>
    <div class="checkbox__container">
      <n-checkbox
          v-model:checked="internalValue"
          size="large"
          :label="label"
          @update:checked="handleChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: String,
  label: String,
  modelValue: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue || false);

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});

const handleChange = (newValue) => {
  emit('update:modelValue', newValue);
};
</script>

<style scoped lang="scss">
.checkbox{
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>