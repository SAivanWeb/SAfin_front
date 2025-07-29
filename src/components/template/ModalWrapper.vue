<template>
  <div class="modal__layout" @click.self="$emit('hideModal')">
    <div class="modal__container"  :style="{ 'max-width': size }">
      <button class="modal__close">
        <Cancel class="modal__close-icon" @click.stop="$emit('hideModal')"/>
      </button>
        <div class="modal__content">
          <div class="modal__header">
            <slot name="header"/>
          </div>
          <n-scrollbar style="max-height: calc(90vh - 96px)">
          <div class="modal__body">
            <slot name="body"/>
          </div>
          </n-scrollbar>
        </div>
    </div>
  </div>
</template>

<script setup>
import Cancel from "@/assets/icons/cancel.vue";

const props = defineProps({
  size: String,
})
</script>

<style lang="scss">
.modal{

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 12px;
    padding: 24px;
    max-height: 90vh;
    width: 100%;
    cursor: default;
    max-width: 50vw;
  }

  &__content{
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__layout{
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }

  &__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }

  &__close{
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: opacity 0.2s ease;
    z-index: 10;

    &-icon{
      width: 100%;
      pointer-events: auto;
    }
  }

  &__body{
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__goals{
    &-container{
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 0 4px;
    }
  }
}
</style>