<template>
    <div class="input">
      <label v-if="label" :for="name" class="input__label">{{ label }}</label>
      <input
          v-model="inputValue"
          class="input__field"
          :class="{'input__field_disabled' : disabled}"
          :id="id"
          :type="type"
          :name="name"
          lang="ru-Ru"
          @input="emitValue(inputValue)"
          :placeholder="placeholder"
      >
    </div>
</template>

<script setup>

import {ref, watch, toRefs, onMounted} from "vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  label: String,
  placeholder: String,
  id: String,
  name: String,
  type: {
    type: String,
    default: 'text',
  },
  disabled: Boolean,
  modelValue: String,
})
const { modelValue, id, name, type, placeholder, disabled } = toRefs(props);

const inputValue = ref('');

watch(modelValue, (newVal) => {
  inputValue.value = newVal || '';
});

onMounted(() => {
  if(modelValue.value) {
    inputValue.value = modelValue.value;
  }
})

function emitValue(input) {
  emit('update:modelValue', input);
}
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__field {
    width: 100%;
    padding: 16px 20px;
    border: 1px solid rgba(46, 125, 50, 0.3);
    border-radius: 12px;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s;

    &:focus {
      outline: none;
      border-color: #2E7D32;
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
    }

    &_disabled {
      cursor: default;
      pointer-events: none;
      background-color: rgba(46, 125, 50, 0.3);
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0;
}

</style>