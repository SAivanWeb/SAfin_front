<template>
  <div class="main-wrapper">
    <div class="main-wrapper__container">
      <slot/>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.main-wrapper{
  width: 100%;
  padding: 48px;

  &__container{
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>