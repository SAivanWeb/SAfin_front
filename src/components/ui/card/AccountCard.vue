<template>
  <div class="account-card">
    <div class="account-card__header">
      <h4 class="account-card__name">{{ item.title }}</h4>
      <div v-if="item.id !== 'total'" class="account-card__menu" :class="{ active: showMenu }">
        <menu-vertical
            class="account-card__menu-icon"
            @click.stop="showMenu = !showMenu"
        />
        <div
            v-if="showMenu"
            class="account-card__menu-list"
        >
          <div class="account-card__menu-item" @click="emitShowEditAccount('all')">
            <edit class="account-card__menu-icon"/>
            Редактировать
          </div>
          <div class="account-card__menu-item" @click="emitDeleteAccount(item.id)">
            <trash class="account-card__menu-icon trash"/>
            Удалить
          </div>
        </div>
      </div>
    </div>
    <div class="account-card__body">
      <div v-if="item.description" class="account-card__body-value">
        {{item.description}}
      </div>
      <div class="account-card__body-value">
        Баланс: {{ formatAmount(item.balance) }}₽
      </div>
    </div>
  </div>

</template>

<script setup>
import Edit from "@/assets/icons/edit.vue";
import Plus from "@/assets/icons/plus.vue";
import MenuVertical from "@/assets/icons/menu-vertical.vue";
import Trash from "@/assets/icons/trash.vue";
import { onBeforeUnmount, onMounted, ref} from "vue";

const props = defineProps({
  item: Object,
})

const showMenu = ref(false);

const formatAmount = (value) => {
  return value.toLocaleString('ru-RU', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).replace(/,/g, ' ');
}

const emit = defineEmits(['showEditAccount', 'deleteAccount']);

const emitShowEditAccount = type => {
  emit('showEditAccount', {account: props.item, type: type});
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (e) => {
  const menu = e.target.closest(".account-card__menu");
  if (!menu) {
    showMenu.value = false;
  }
};

const emitDeleteAccount = (id) => {
  showMenu.value = false;
  emit('deleteAccount', id);
};

</script>

<style scoped lang="scss">
.account-card{
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-button{
      width: 36px;
      height: 36px;
      padding: 6px;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      color: #2E7D32;

      &:hover{
        background: rgba(46, 125, 50, 0.1);
      }
    }
  }

  &__menu{
    width: 36px;
    height: 36px;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    position: relative;
    z-index: 10;

    &:hover{
      background: rgba(46, 125, 50, 0.1);
    }

    &.active{
      background: rgba(46, 125, 50, 0.1);
    }

    &-list{
      position: absolute;
      top: 0px;
      right: 115%;
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #fff;
      padding: 18px;
      border: 1px solid rgba(209, 213, 219, 0.3);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      z-index: 10;
    }

    &-item{
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;

      &:hover{
        color: #2E7D32;
      }
    }

    &-icon{
      width: 24px;
      color: #2E7D32;
    }

    &-icon.trash{
      width: 18px;
      margin-right: 6px;
    }
  }

  &__name{
    font-size: 24px;
  }

  &__body{
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    &-value{
      font-size: 18px;
    }
  }
  
}

@media (max-width: 1280px) {
  .account-card{
    &__name{
      font-size: 20px;
    }

  }
}

@media (max-width: 999px) {
  .account-card{
    padding: 16px;
    gap: 12px;

    &__body{
      gap: 12px;

      &-value{
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .account-card{
    &__name{
      font-size: 18px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-button{
        width: 32px;
        height: 32px;
        padding: 4px;
      }
    }
  }
}
</style>