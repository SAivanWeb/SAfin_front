<template>
  <n-config-provider :locale="ruRU" :date-locale="dateRuRU" :theme-overrides="themeOverrides">
    <n-message-provider>
      <div class="main">
        <HeaderBar v-if="showHeader"/>
        <div class="main__container">
          <MenuBar v-if="isAuth"/>
          <router-view
              @show-goals="showGoalsModal = true"
              @show-transaction="showTransactionModal = true"
              @show-amount-goal="openAmountGoal"
              @show-account="showAccountModal = true"
              @show-edit-account="openEditAccount"
              @show-category="showCategoryModal = true"
              @show-edit-category="openEditCategory"
          />
        </div>
        <FooterBar v-if="!isAuthPage && !isAuth"/>

        <GoalsModal v-if="showGoalsModal" @hide-modal="hideModal" :is-edit-mode="editGoalMode" :edit-goal="goalData"/>
        <TransactionModal v-if="showTransactionModal" @hide-modal="hideModal"/>
        <AmountGoalModal v-if="showAmountGoal" @hide-modal="hideModal" :goal="goalData"/>
        <AccountModal v-if="showAccountModal" @hide-modal="hideModal" :edit="editAccountMode" :account="accountData" :edit-type="accountEditType"/>
        <CategoryModal v-if="showCategoryModal" @hide-modal="hideModal" :category="categoryData" :edit="editCategoryMode"/>

        <Chat v-if="isAuth && !isChatPage && !isProfilePage" class="main__chat"/>

        <div v-show="showPreloader" class="main__preloader">
          <n-spin size="medium" />
        </div>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import HeaderBar from "@/components/template/HeaderBar.vue";
import FooterBar from "@/components/template/FooterBar.vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed, onMounted, ref, watch} from "vue";
import MenuBar from "@/components/template/MenuBar.vue";
import GoalsModal from "@/components/template/modal/GoalsModal.vue";
import { dateRuRU, NConfigProvider, ruRU } from 'naive-ui'
import TransactionModal from "@/components/template/modal/TransactionModal.vue";
import AmountGoalModal from "@/components/template/modal/AmountGoalModal.vue";
import Chat from "@/components/template/Chat.vue";
import AccountModal from "@/components/template/modal/AccountModal.vue";
import CategoryModal from "@/components/template/modal/CategoryModal.vue";
import { useMessage } from "naive-ui";

// const message = useMessage();

const themeOverrides = {
  common: {
    primaryColor: '#2E7D32',
    fontFamily: 'Oswald',
    borderRadius: '12px',
    fontSize: window.innerWidth < 768 ? '16px' : '18px',
  },
  Input: {
    heightLarge: window.innerWidth < 768 ? '46px' : '54px',
    paddingLarge: window.innerWidth < 768 ? '10px 16px' : '16px 20px',
    border: '1px solid rgba(46, 125, 50, 0.3)',
    borderFocus: '1px solid #2E7D32',
    boxShadowFocus: '0 0 0 3px rgba(46, 125, 50, 0.2)',
    iconSize: '18px',
    fontSizeLarge: window.innerWidth < 768 ? '16px' : '18px'
  },
  Checkbox: {
    sizeLarge: '20px'
  },
  Carousel: {
    dotColor: 'rgba(46, 125, 50, 0.4)',
    dotColorActive: 'rgba(46, 125, 50, 1)'
  },
  Result: {
    fontSizeMedium: '24px'
  },
  Alert: {
    closeIconSize: '20px',
    closeSize: '28px',
  },
  Button: {
    paddingTiny: '4px 8px',
    fontSizeTiny: '14px'
  },
  Collapse: {
    titleFontSize: '18px',
    fontSize: '18px'
  }
}

const route = useRoute();
const store = useStore();

const showGoalsModal = ref(false);
const showTransactionModal = ref(false);
const showAmountGoal = ref(false);
const showAccountModal = ref(false);
const showCategoryModal = ref(false);
const editGoalMode = ref(false);
const goalData = ref(null);
const categoryData = ref(null);
const editCategoryMode = ref(false);
const accountData = ref(null);
const accountEditType = ref('');
const editAccountMode = ref(false);

const hideModal = () => {
  showGoalsModal.value = false;
  showTransactionModal.value = false;
  showAmountGoal.value = false;
  showAccountModal.value = false;
  showCategoryModal.value = false;
  editCategoryMode.value = false;
  showCategoryModal.value = false;

  accountData.value = null;
  accountEditType.value = '';
  editAccountMode.value = false;
}

const openAmountGoal = (goal) => {
  goalData.value = goal;
  showAmountGoal.value = true;
}

const openEditAccount = (data) => {
  accountData.value = data.account;
  accountEditType.value = data.type;
  editAccountMode.value = true;
  showAccountModal.value = true;
}

const openEditCategory = (category) => {
  categoryData.value = category;
  editCategoryMode.value = true;
  showCategoryModal.value = true;
}

const isAuthPage = computed(() => {
  return route.path.startsWith('/auth');
})

const isChatPage = computed(() => {
  return route.path.startsWith('/chat');
})

const isProfilePage = computed(() => {
  return route.path.startsWith('/profile');
})

const isAuth = computed(() => {
  return store.getters['user/GET_IS_AUTH'];
})

const screenSize = computed(()=>{
  return window.innerWidth;
})

const showHeader = computed(() => {
  if(screenSize.value > 768) {
    return !isAuthPage.value;
  } else {
    return isProfilePage.value;
  }
})

const showPreloader = computed(() => {
  return store.getters['GET_PRELOADER']
})

// watch(
//     () => store.getters.GET_MESSAGE,
//     (msg) => {
//       if (msg && msg.text) {
//         if (msg.type && message[msg.type]) {
//           message[msg.type](msg.text)
//         } else {
//           message.info(msg.text)
//         }
//         store.commit('SET_MESSAGE', null)
//       }
//     },
//     { deep: true }
// )

onMounted(() => {
  store.dispatch('initAuth');
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

  &__chat{
    display: none;
    position: absolute;
    bottom: 100px;
    right: 80px;
    z-index: 100;
  }

  &__preloader{
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
  }
}
</style>