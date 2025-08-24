<template>
  <div class="menu">
    <MenuLink v-for="item in sortedMenu" :name="item.name" :link="item.link" :icon="item.icon"/>
  </div>
</template>

<script setup>
import MenuLink from "@/components/ui/link/MenuLink.vue";
import {MENU} from "@/assets/static/static.js";
import {computed} from "vue";

const sortedMenu = computed(() => {
  let newMenu = [];
  MENU.forEach((item) => {
    if (window.innerWidth > 768 && item.name.toLowerCase() === "главная") {
      return;
    }
    newMenu.push(item);
  })
  return newMenu;
})

</script>

<style scoped lang="scss">
.menu{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 68px);
  width: 100%;
  max-width: 20vw;
  border-right: 1px solid rgba(209, 213, 219, 0.3);
}

@media (max-width: 767px) {
  .menu{
    position: fixed;
    bottom: 0;
    width: 100%;
    flex-direction: row;
    height: fit-content;
    max-width: 100%;
    justify-content: space-between;
    z-index: 100;
    background-color: #fff;
    border-top: 1px solid rgba(209, 213, 219, 0.3);

  }
}
</style>