<template>
  <div class="select" v-click-outside="closeSelect">
    <div class="select__title">{{ title }}</div>
    <div class="select__container">
      <div
          class="select__field"
          :class="{
          'select__field_clear': !internalValue,
          'select__field_opened': showOptions
        }"
          @click="toggleOptions"
      >
        {{ selectedLabel || placeholder }}
      </div>
      <div v-if="showOptions" class="select__options">
        <div
            v-for="item in items"
            class="select__option"
            @click="selectOption(item)"
            :class="{'select__option--selected': item.value === internalValue}"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => 'value' in item && 'label' in item);
    }
  },
  title: String,
  modelValue: [String, Number],
  placeholder: {
    type: String,
    default: 'Не выбрано'
  }
});

const showOptions = ref(false);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal;
});

const selectedLabel = computed(() => {
  const selected = props.items.find(item => item.value === internalValue.value);
  return selected ? selected.label : '';
});

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const closeSelect = () => {
  showOptions.value = false;
};

const selectOption = (item) => {
  internalValue.value = item.value;
  emit('update:modelValue', item.value);
  closeSelect();
};

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
</script>

<style scoped lang="scss">
.select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;

  &__field {
    width: 100%;
    padding: 16px 20px;
    border: 1px solid rgba(46, 125, 50, 0.3);
    border-radius: 12px;
    font-size: 16px;
    line-height: 1.5;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s;
    cursor: pointer;

    &:hover{
      border-color: #2E7D32;
    }

    &_clear {
      color: #757575;
    }

    &_opened {
      border-color: #2E7D32;
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
    }

    &:focus {
      outline: none;
      border-color: #2E7D32;
      box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.2);
    }
  }

  &__container {
    position: relative;
  }

  &__options {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    max-height: 240px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    padding: 6px 0;
    background-color: #fff;
    box-shadow: 0px 8px 12px 0px rgba(34, 60, 80, 0.11);
    z-index: 10;
  }

  &__option {
    padding: 12px 24px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background: rgba(46, 125, 50, 0.1);
    }

    &--selected {
      background: rgba(46, 125, 50, 0.1);
      color: #2E7D32;
    }
  }
}
</style>