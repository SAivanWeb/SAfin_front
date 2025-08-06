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
  line-height: 50px;
  font-weight: 500;
  color: #2E7D32;
}

@media (max-width: 992px) {
  .title{
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .title{
    font-size: 24px;
  }
}
</style>