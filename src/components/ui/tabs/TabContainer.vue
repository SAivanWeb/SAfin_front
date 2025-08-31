<template>
  <div class="tabs">
    <div class="tabs__header" :class="main ? 'tabs__header_main' : ''">
      <h3 class="tabs__title" v-if="title">{{title}}</h3>
      <div class="tabs__menu">
        <TabItem
            v-for="item in headers"
            :key="item.name"
            :item="item"
            :is-active="item.name === activeTab"
            @click="setActive(item.name)"
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
  active: {
    type: String,
    default: ''
  },
  main: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:active'])

const activeTab = ref(props.active || '')

watch(
    () => props.headers,
    (newHeaders) => {
      if (newHeaders?.[0]?.name) {
        activeTab.value = newHeaders[0].name
      }
    },
    { immediate: true }
)

watch(
    () => props.active,
    (val) => {
      if (val !== activeTab.value) {
        activeTab.value = val
      }
    }
)

const setActive = (name) => {
  activeTab.value = name
  emit('update:active', name)
}

const isTabVisible = (name) => activeTab.value === name
</script>

<style scoped lang="scss">
.tabs{
  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 24px;
    
    &_main{
      & .tabs__menu{
        width: 100%;
        
        & .tab-item{
          display: flex;
          justify-content: center;
          padding: 12px;
          font-size: 24px;
          
          &_active{
            background-color: rgba(46, 125, 50, 0.1);
            color: #2E7D32;
            padding: 12px;
          }
        }
      }
    }
  }

  &__menu{
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__title{
    font-size: 28px;
  }
}

@media (max-width: 767px) {
  .tabs {
    &__header {
      &_main {
        & .tabs__menu {
          & .tab-item {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
