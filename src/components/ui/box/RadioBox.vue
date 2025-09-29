<template>
  <div class="radio">
    <div class="radio__title">{{title}}</div>
    <div class="radio__items">
      <div v-for="item in items" :key="item.id" class="radio__item">
        <label :for="item.id">
          <input
              :id="item.id"
              :name="item.group"
              type="radio"
              :value="item.id"
              :checked="modelValue === item.id"
              class="radio__input"
              @change="emit('update:modelValue', item.id)"
          />
          <span class="radio__point"></span>
          {{ item.item_title }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  items: Array,
  id: [String, Number],
  title: String,
  modelValue: [String, Number]
})
</script>

<style scoped lang="scss">
.radio{
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

 &__items{
   display: flex;
   align-items: center;
   gap: 24px;
   height: 100%;
 }

  &__item {
    height: 24px;
    padding-left: 28px;
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
  }

  &__point {
    width: 24px;
    height: 24px;
    border: 2px solid #AFAFAF;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &__point:before {
    content: ' ';
    width: 14px;
    height: 14px;
    background: inherit;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
}

label input:checked ~ .radio__point:before {
  background: #2E7D32;
}

label input:checked ~ .radio__point {
  border-color: #2E7D32;
}
</style>