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
    classes.push(`button_disabled`);
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  padding: 18px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 500;
  color: #2E7D32;
  transition: 0.2s;

  &_primary {
    background: #2E7D32;
    color: white;

    &:hover {
      background: #81C784;
    }
  }

  &_secondary {
    padding: 12px 24px;
    &:hover{
      background: rgba(46, 125, 50, 0.1);
    }

    &:active{
      background: rgba(46, 125, 50, 0.3);
    }
  }

  &_disabled{
    pointer-events: none;
    background: rgba(46, 125, 50, 0.3);
  }

  &_add{

    & .button__icon{

    }
  }

  &__icon{
    width: 28px;
  }
}
</style>