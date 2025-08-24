<template>
 <div class="header">
   <div class="header__container" :class="{'header__container_dashboard' : isAuth}">
    <div class="header__logo" @click="logoRoute">
      <img src="@/assets/icons/logo.svg" alt="safin">
    </div>
    <div class="header__menu">
      <div class="header__menu-link" v-if="!isAuth">F&Q</div>
      <button class="header__menu-button" @click="toAuth" v-if="!isAuth">войти</button>
      <button class="header__menu-button" @click="logout" v-if="isAuth">выйти</button>
    </div>
   </div>
 </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";

const router = useRouter();
const store = useStore();

const isAuth = computed(() => {
  return store.getters['user/GET_IS_AUTH'];
})

const toAuth = () => {
  router.push("/auth/");
}

const logout = () => {
  store.dispatch("user/logout");
}

const logoRoute = () => {
  if(isAuth) {
    router.push("/dashboard/");
  } else {
    router.push("/");
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 12px 24px;
  backdrop-filter: blur(10px) saturate(168%);
  -webkit-backdrop-filter: blur(10px) saturate(168%);
  background-color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(209, 213, 219, 0.3);
  position: relative;
  overflow: hidden;
  height: 68px;
  z-index: 99;
  display: flex;
  align-items: center;

  &__container {
    width: 1440px;
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_dashboard {
      width: 100%;
    }
  }

  &__logo{
    height: 30px;
    cursor: pointer;

    & img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__menu{
    display: flex;
    align-items: center;
    gap: 48px;

    &-link{
      cursor: pointer;
      font-size: 18px;
      line-height: 21px;
      color: #2E7D32;
    }

    &-button{
      padding: 10px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 21px;
      background-color: #2E7D32;
      border-radius: 12px;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;

      &:hover{
        background: #81C784;
      }
    }
  }
}

@media (max-width: 768px) {
  .header{
    padding: 12px 10px;
    &__menu{
      gap: 24px;

      &-button{
        padding: 8px 16px;
      }
    }
  }
}
</style>