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
  padding: 48px 24px;
  overflow-y: auto;
  height: calc(100vh - 68px);

  @media (max-width: 767px) {
    height: calc(100vh - 59px);
    scrollbar-width: none;
  }

  &__container{
    max-width: 1200px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .main-wrapper{
    padding: 24px 10px 74px;

  }
}
</style>