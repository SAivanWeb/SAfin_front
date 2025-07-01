<template>
  <n-config-provider :locale="ruRU" :date-locale="dateRuRU" :theme-overrides="themeOverrides">
    <div class="main">
      <HeaderBar v-if="!isAuthPage"/>
      <div class="main__container">
        <MenuBar v-if="isAuth"/>
        <router-view
            @show-goals="showGoalsModal = true"
            @show-transaction="showTransactionModal = true"
        />
      </div>
      <FooterBar v-if="!isAuthPage && !isAuth"/>

      <GoalsModal v-if="showGoalsModal" @hide-modal="hideModal"/>
      <TransactionModal v-if="showTransactionModal" @hide-modal="hideModal"/>
    </div>
  </n-config-provider>
</template>

<script setup>
import HeaderBar from "@/components/template/HeaderBar.vue";
import FooterBar from "@/components/template/FooterBar.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import MenuBar from "@/components/template/MenuBar.vue";
import GoalsModal from "@/components/template/modal/GoalsModal.vue";
import { dateRuRU, NConfigProvider, ruRU } from 'naive-ui'
import TransactionModal from "@/components/template/modal/TransactionModal.vue";

const themeOverrides = {
  common: {
    primaryColor: '#2E7D32',
    fontFamily: 'Oswald',
    borderRadius: '12px',
    fontSize: '16px',
  },
  Input: {
    heightLarge: '54px',
    paddingLarge: '16px 20px',
    border: '1px solid rgba(46, 125, 50, 0.3)',
    borderFocus: '1px solid #2E7D32',
    boxShadowFocus: '0 0 0 3px rgba(46, 125, 50, 0.2)',
    iconSize: '18px',
  }
}

const route = useRoute();
const store = useStore();

const showGoalsModal = ref(false);
const showTransactionModal = ref(false);

const hideModal = () => {
  showGoalsModal.value = false;
  showTransactionModal.value = false;
}

const isAuthPage = computed(() => {
  return route.path.startsWith('/auth');
})

const isAuth = computed(() => {
  return store.getters['user/GET_IS_AUTH'];
})

onMounted(() => {
  store.dispatch('user/initAuth');
});
</script>

<style scoped lang="scss">
* {
  font-family: "Oswald";
  color: #212121;
}
.main{
  width: 100%;
  min-height: 100vh;
  position: relative;

  &__container {
    width: 100%;
    height: 100%;
    display: flex;
  }
}
</style>