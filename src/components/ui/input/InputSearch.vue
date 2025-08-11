<template>
  <div class="input">
    <div class="input__wrapper">
      <input
          v-model="inputValue"
          class="input__field"
          lang="ru-Ru"
          @input="filterValue(inputValue)"
          :placeholder="placeholder"
          @click="showOptions = true"
      >
      <search-ico class="input__ico"/>

    </div>
    <div v-if="showOptions" class="input__options">
      <div v-for="item in searchOptions" class="input__options-option" @click="selectOption(item.label)">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, toRefs, watch, computed} from "vue";
import SearchIco from "@/assets/icons/search-ico.vue";
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  items: Array,
  placeholder: String,
  modelValue: String | Number,
})

const { modelValue, placeholder, items } = toRefs(props);

const inputValue = ref('');
const showOptions = ref(false);

const searchOptions = computed(() => {
  if (!inputValue.value) return props.items || [];
  return (props.items || []).filter(item =>
      item.label.toLowerCase().includes(inputValue.value.toLowerCase())
  );
});

watch(modelValue, (newVal) => {
  inputValue.value = newVal || '';
});

onMounted(() => {
  if(modelValue.value) {
    inputValue.value = modelValue.value;
  }
})

function filterValue(input) {
  searchOptions.value = items.value.filter((item) => {
    return item.label.toLowerCase().indexOf(input.toLowerCase()) > -1;
  })
  return searchOptions.value;
}

const selectOption = (label) => {
  inputValue.value = label;
  showOptions.value = false;
  emitValue();
}

function emitValue() {
  emit('update:modelValue', inputValue.value);
}
</script>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;

  &__wrapper{
    position: relative;
  }

  &__ico{
    color: #2E7D32;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    width: 24px;
  }

  &__field {
    width: 100%;
    padding: 10px 48px 10px 20px;
    border: 1px solid rgba(46, 125, 50, 0.3);
    border-radius: 12px;
    font-size: 18px;
    background: rgba(255, 255, 255, 0.6);
    transition: all 0.3s;
    font-family: 'Oswald';

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

    &:hover{
      border-color: #2E7D32;
    }
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

    &-option {
      padding: 12px 24px;
      cursor: pointer;
      transition: 0.2s;
      font-size: 18px;

      &:hover {
        background: rgba(46, 125, 50, 0.1);
      }

      &--selected {
        background: rgba(46, 125, 50, 0.1);
        color: #2E7D32;
      }

      &_button{
        &:hover {
          background: transparent;
        }
      }
    }
  }
}

</style>