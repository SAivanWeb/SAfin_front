<template>
  <div class="main">
    <HeaderBar v-if="!isAuthPage"/>
    <div class="main__container">
      <MenuBar v-if="isAuth"/>
      <router-view @show-goals="showGoalsModal = true"/>
    </div>
    <FooterBar v-if="!isAuthPage && !isAuth"/>

    <GoalsModal v-if="showGoalsModal" @hide-modal="hideModal"/>
  </div>
</template>

<script setup>
import HeaderBar from "@/components/template/HeaderBar.vue";
import FooterBar from "@/components/template/FooterBar.vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import MenuBar from "@/components/template/MenuBar.vue";
import GoalsModal from "@/components/template/modal/GoalsModal.vue";

const router = useRouter();
const store = useStore();

const showGoalsModal = ref(false);

const hideModal = () => {
  showGoalsModal.value = false;
}

const isAuthPage = computed(() => {
  return router.currentRoute.value.path === "/auth/";
})

const isAuth = computed(() => {
  return store.getters['user/GET_IS_AUTH'];
})
onMounted(() => {
  store.dispatch('user/initializeAuth');
})
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