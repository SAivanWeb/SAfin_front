<template>
  <div
      class="tab-item"
      :class="{ 'tab-item_active': isActive }"
      @click="$emit('click')"
  >
    <list-chart class="tab-item__icon" v-if="item.name === 'list'"/>
    <chart-tab class="tab-item__icon" v-if="item.name === 'chart'"/>
    <diagram-tab class="tab-item__icon" v-if="item.name === 'progress'"/>
    {{ item.value }}
  </div>
</template>

<script setup>
import ListChart from "@/assets/icons/list-chart.vue";
import ChartTab from "@/assets/icons/chart-tab.vue";
import DiagramTab from "@/assets/icons/diagram-tab.vue";

const props = defineProps({
  item: Object,
  isActive: Boolean
})
</script>

<style scoped lang="scss">
.tab-item{
  width: 100%;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  cursor: pointer;
  text-align: center;
  padding: 6px 12px;
  border-radius: 12px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 100%;
  white-space: nowrap;

  &_active{
    color: #2E7D32;
  }

  &:hover{
    background-color: rgba(46, 125, 50, 0.1);
    color: #2E7D32;
  }

  &__icon{
    width: 32px;
    min-width: 32px;
  }
}

@media (max-width: 767px) {
  .tab-item{
    font-size: 16px;
    padding: 6px 8px;
  }
}
</style>
