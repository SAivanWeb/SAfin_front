<template>
  <ModalWrapper size="450px">
    <template #header>
      <h2 class="modal__title">Подтверждение</h2>
    </template>
    <template #body>
      <div class="modal__info-container">
        <div class="modal__info-container-text">
          Уверены, что хотите удалить?
        </div>
        <div class="modal__info-btn-group">
          <MainButton size="small" type="secondary" title="Нет" @click="emit('hideModal')" />
          <MainButton size="small" title="Да" @click="emit('confirm')" />
        </div>
      </div>
    </template>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from "@/components/template/ModalWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits(['hideModal', 'confirm']);
</script>

<style scoped lang="scss">

</style>