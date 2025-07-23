<template>
  <div class="tabs">
    <div class="tabs__header">
      <h3 class="tabs__title" v-if="title">{{title}}</h3>
      <div class="tabs__menu">
        <TabItem
            v-for="item in headers"
            :key="item.name"
            :item="item"
            :is-active="item.name === activeTab"
            @click="activeTab = item.name"
        />
      </div>
    </div>
    <div class="tabs__content">
      <template v-for="item in headers" :key="item.name">
        <slot v-if="isTabVisible(item.name)" :name="item.name" />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import TabItem from "@/components/ui/tabs/TabItem.vue"

const props = defineProps({
  headers: {
    type: Array
  },
  title: String,
})

const activeTab = ref('')

watch(
    () => props.headers,
    (newHeaders) => {
      if (newHeaders?.[0]?.name) {
        activeTab.value = newHeaders[0].name
      }
    },
    { immediate: true }
)

const isTabVisible = (name) => activeTab.value === name
</script>

<style scoped lang="scss">
.tabs{
  &__header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
  }

  &__menu{
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title{
    font-size: 24px;
  }
}
</style>
