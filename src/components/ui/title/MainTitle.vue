<template>
  <h2 class="title">
    {{title}}
  </h2>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>

<style scoped lang="scss">
.title{
  font-size: 42px;
  font-weight: 500;
  color: #2E7D32;
  line-height: 1.2;
}

@media (max-width: 992px) {
  .title{
    font-size: 32px;
  }
}
</style>