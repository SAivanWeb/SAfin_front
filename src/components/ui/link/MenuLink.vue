<template>
  <router-link :to="link" class="menu-link">
    <component :is="iconComponent" class="menu-link__icon"/>
    <span>{{ name }}</span>
  </router-link>
</template>

<script setup>
import {computed, toRefs} from "vue";
import categories from '@/assets/icons/menuIcons/categories.vue'
import dashboard from '@/assets/icons/menuIcons/dashboard.vue'
import goals from '@/assets/icons/menuIcons/goals.vue'
import profile from '@/assets/icons/menuIcons/profile.vue'
import transactions from '@/assets/icons/menuIcons/transactions.vue'

const props = defineProps({
  name: String,
  link: String,
  icon: String,
});

const icons = {
  categories: categories,
  dashboard: dashboard,
  goals: goals,
  profile: profile,
  transactions: transactions,
};

const iconComponent = computed(() => icons[props.icon]);
</script>

<style scoped lang="scss">
.menu-link{
  display: flex;
  align-items: center;
  width: 100%;
  gap: 24px;
  padding: 24px;
  border-bottom: 1px solid rgba(209, 213, 219, 0.3);
  font-weight: 500;
  font-size: 28px;

  &.router-link-active{
    color: #2E7D32;

    & .menu-link__icon{
      fill: #2E7D32;
    }
  }

  &:hover{
    color: #2E7D32;
    & .menu-link__icon{
      fill: #2E7D32;
    }
  }

  &__icon{
    width: 32px;
    fill: #212121;
  }
}

@media (max-width: 1280px) {
  .menu-link{
    font-size: 24px;
    gap: 12px;
    padding: 18px 24px;

    &__icon{
      width: 24px;
    }
  }
}

@media (max-width: 1280px) {
  .menu-link{

    &__icon{
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .menu-link{
    width: fit-content;
    padding: 14px 18px;
    &__icon{
      display: block;
    }
    & span{
      display: none;
    }
  }
}
</style>