<template>
  <MainWrapper>
    <div class="transactions__header">
      <MainTitle title="Финансы" class="transactions__title"/>
      <MainButton v-if="activeTab === 'transactions'" class="transactions__button" action="add" title="создать транзакцию" type="secondary" @click="$emit('showTransaction')"/>
      <MainButton v-else class="transactions__button" action="add" title="создать счет" type="secondary" @click="$emit('showAccount')"/>
    </div>
<!--    <PageAlert class="transactions__alert"/>-->
    <div class="transactions__container">
      <TabContainer :headers="tabHeadersMain" v-model:active="activeTab" :main="true">
          <template #transactions>
              <TabContainer :headers="tabHeadersTransactions" v-model:active="activeTransactionsTab">
<!--                <template #chart>-->
<!--                  <div class="transactions__statistic-item">-->
<!--                    <Chart :items="transactionsMonth"/>-->
<!--                  </div>-->
<!--                </template>-->
                <template #progress>
                  <ProgressList :items="transactionsMonth"/>
                </template>
                <template #list>
                  <div class="transactions__statistic-item">
                    <Filter @apply-filters="fetchTransactionsList"/>
                    <TransactionList :items="transactionsList"/>
                    <n-pagination v-if="transactionsList.length > transactionListPerPage" class="transactions__pagination" v-model:page="transactionListPage" :page-count="transactionListTotalPage" />
                  </div>
                </template>
              </TabContainer>
          </template>
          
          <template #accounts>
            <div class="transactions__accounts">
              <AccountCard v-for="item in accounts" :item="item" @show-edit-account="(data) => $emit('showEditAccount', data)"/>
            </div>
          </template>
      </TabContainer>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Filter from "@/components/template/Filter.vue";
import TransactionList from "@/components/transaction/TransactionList.vue";
import PageAlert from "@/components/template/PageAlert.vue";
import Chart from "@/components/ui/chart/Chart.vue";
import TabContainer from "@/components/ui/tabs/TabContainer.vue";
import ProgressList from "@/components/ui/chart/ProgressList.vue";
import {computed, inject, onMounted, ref, watch, nextTick} from "vue";
import AccountCard from "@/components/ui/card/AccountCard.vue";
import {useStore} from "vuex";

const store = useStore();

const activeTab = ref('transactions');

const tabHeadersMain = ref([
  { name: 'transactions', value: 'Транзакции' },
  { name: 'accounts', value: 'Счета' }
])

const tabHeadersTransactions = ref([
  {
    name: 'list',
    value: 'Список'
  },
  // {
  //   name: 'chart',
  //   value: 'График'
  // },
  {
    name: 'progress',
    value: 'Прогресс'
  },
])

const transactionsList = ref([]);
const transactionsMonth = ref([]);
const transactionListPage = ref(1);
const transactionListPerPage = ref(10);
const transactionListTotalPage = ref(1);

const accounts = computed(() => {
  return store.getters.GET_ACCOUNTS || [];
});

const isReset = computed(() => store.state.resetTransaction);

watch(isReset, (newValue) => {
  if (newValue) {
    transactionListPage.value = 1;
    fetchTransactionsList(transactionListPage.value, transactionListPerPage.value);
    nextTick(() => {
      store.commit("SET_RESET_TRANSACTIONS", false);
    });
  }
});

const activeTransactionsTab = ref('list');

watch(activeTransactionsTab, (newVal) => {
  if (newVal === 'progress') {
    fetchTransactionsMonth();
  }
});

async function fetchTransactionsList(filters) {
  let config = {
    page: transactionListPage.value,
    perPage: transactionListPerPage.value,
    ...filters
  }
  const res = await store.dispatch("getTransactions", config);
  if(res.success) {
    transactionsList.value = res.data;
    transactionListTotalPage.value = res.pagination.totalPages;
  }
}

async function fetchTransactionsMonth() {
  const now = new Date();
  const dateStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];

  const dateEnd = now.toISOString().split("T")[0];
  const config = {
    dateStart,
    dateEnd,
  };

  const res = await store.dispatch("getTransactions", config);
  if (res.success) {
    transactionsMonth.value = res.data;
    store.commit("SET_PRELOADER", false);
  }
}

watch(transactionListPage, (newPage) => {
  transactionListPage.value = newPage;
  fetchTransactionsList(transactionListPage.value, transactionListPerPage.value);
  }
)

onMounted(() => {
  store.dispatch("getAccounts");
  fetchTransactionsList(transactionListPerPage.value, transactionListPerPage.value);
})
</script>

<style lang="scss">
.transactions{
  &__header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  &__alert{
    margin-bottom: 24px;
  }

  &__button{
    width: fit-content !important;
  }

  &__menu{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__container{
    
  }

  &__statistic {
    &-item {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
  
  &__accounts{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  &__pagination{
    margin: 0 auto;
    & .n-pagination-item.n-pagination-item--button{
      border-radius: 6px !important;
    }

    & .n-pagination-item{
      border-radius: 6px !important;
    }
  }

}

@media (max-width: 767px) {
  .transactions{
    &__header{
      flex-direction: column;
      align-items: start;

      & button{
        margin-left: auto;
      }
    }

    &__accounts{
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
}
</style>