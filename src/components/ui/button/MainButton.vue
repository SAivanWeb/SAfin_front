<template>
  <button class="button" :class="classes" @click="$emit('click')">
    <plus v-if="action && action === 'add'" class="button__icon"/>
    {{ title }}
  </button>
</template>

<script setup>
import plus from "@/assets/icons/plus.vue"
import {computed, toRefs} from "vue";
defineEmits(["click"]);

const props = defineProps({
  title: String,
  disabled: Boolean,
  type: {
    type: String,
    default: 'primary',
  },
  action: String,
})

const {disabled, type, action} = toRefs(props)

const classes = computed(() => {
  let classes = [];

  if (disabled.value) {
    classes.push(`button_disabled}`);
  }
  if (type.value) {
    classes.push(`button_${type.value}`);
  }
  if (action.value) {
    classes.push(`button_${action.value}`);
  }
  return classes;
})
</script>

<style scoped lang="scss">
.button{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  padding: 8px 12px;
  color: #2E7D32;
  border-radius: 12px;
  transition: 0.2s;

  &_disabled{
    pointer-events: none;
  }

  &_add{

    & .button__icon{

    }
  }

  &__icon{
    width: 28px;
  }

  &:hover{
    background: rgba(46, 125, 50, 0.1);
  }

  &:active{
    background: rgba(46, 125, 50, 0.3);
  }
}
</style>