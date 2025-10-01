<template>
  <MainWrapper>
    <div class="profile__header">
      <MainTitle title="Профиль" class="profile__title"/>
      <MainButton class="profile__button" title="получить отчет" type="secondary" @click="toChat"/>
    </div>
<!--    <PageAlert class="profile__alert"/>-->

    <div class="profile__levels">
      <h3 class="profile__levels-title">Уровни</h3>
      <n-carousel draggable :space-between="12" :show-dots="true">
        <LevelCard/>
        <LevelCard/>
      </n-carousel>
    </div>

    <div v-if="profileData" class="profile__container">
      <MainCard class="profile__container-item">
        <template #header>
          <h4 class="card__title">Персональные данные</h4>
          <div class="card__header-buttons">
            <div v-if="isFieldDisabled" class="card__header-button" @click="isFieldDisabled = false">
              <Edit class="card__header-icon"/>
            </div>

            <div v-if="!isFieldDisabled" class="card__header-button" @click="clearProfileData">
              <Cancel class="card__header-icon"/>
            </div>

            <div v-if="!isFieldDisabled" class="card__header-button" @click="editProfileData">
              <Check class="card__header-icon"/>
            </div>
          </div>
        </template>
        <template #body>
          <div class="card__body-row">
            <MainInput label="Имя" placeholder="Имя" :disabled="isFieldDisabled" v-model="profileData.name" :model-value="profileData.name"/>
            <MainInput label="Почта" placeholder="Почта" :disabled="isFieldDisabled" v-model="profileData.email" :model-value="profileData.email"/>
          </div>
        </template>
      </MainCard>
      <MainCard class="profile__container-item">
        <template #header>
          <h4 class="card__title">Цели</h4>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{userProfile.goalsCount}}</span>
          </div>
        </template>
      </MainCard>
      <MainCard class="profile__container-item">
        <template #header>
          <h4 class="card__title">Транзакции</h4>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{userProfile.transactionsCount}}</span>
          </div>
        </template>
      </MainCard>
      <MainCard class="profile__container-item">
        <template #header>
          <h4 class="card__title">Баллы</h4>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{userProfile.points}}</span>
          </div>
        </template>
      </MainCard>
    </div>

    <div class="profile__levels">
      <h3 class="profile__levels-title">Задания</h3>
      <n-scrollbar style="max-height: 340px">
        <div class="profile__tasks">
          <n-alert v-for="task in tasks" :title="task.status === 'done' ? 'Завершено' : 'В процессе'" :type="task.status === 'done' ? 'success' : 'default'">
            <template #icon v-if="task.status === 'processing'">
              <n-icon>
                <process/>
              </n-icon>
            </template>
            <div class="profile__tasks-content">
              {{ task.name }}<br/>
              Баллы: {{ task.points }}
            </div>
          </n-alert>
        </div>
      </n-scrollbar>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainCard from "@/components/ui/card/MainCard.vue";
import MainInput from "@/components/ui/input/MainInput.vue";
import Edit from "@/assets/icons/edit.vue"
import Cancel from "@/assets/icons/cancel.vue";
import Check from "@/assets/icons/check.vue";
import {computed, inject, ref, watch} from "vue";
import {useStore} from "vuex"
import LevelCard from "@/components/ui/card/LevelCard.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useRouter} from "vue-router";
import Process from "@/assets/icons/process.vue";
import PageAlert from "@/components/template/PageAlert.vue";
const { api } = inject('plugins');
const router = useRouter();
const store = useStore();

const userProfile = computed(() => {
  console.log(store.getters['user/GET_CURRENT_USER'])
    return store.getters['user/GET_CURRENT_USER'] || {}
  }
);

const profileData = ref({
  name: '',
  email: ''
});

const tasks = [
  {
    name: 'Выполнить 1 цель',
    status: 'processing',
    points: '50'
  },
  {
    name: 'Выполнить 3 цели',
    status: 'processing',
    points: '30'
  },
  {
    name: 'Добавить 50 транзакций',
    status: 'done',
    points: '10'
  },
  {
    name: 'Вести статистику 3 дня подряд',
    status: 'done',
    points: '20'
  },
]

const levels = ref([]);

const toChat = () => {
  router.push("/chat");
}

watch(userProfile, (newVal) => {
  if (newVal) {
    profileData.value = {
      name: newVal.name || '',
      email: newVal.email || ''
    };
  }
}, { immediate: true });

const isFieldDisabled = ref(true);

const clearProfileData = () => {
  isFieldDisabled.value = true;
  profileData.value.name = userProfile.value.name;
  profileData.value.email = userProfile.value.email;
}

const editProfileData = async () => {
  profileData.value.cushion = userProfile.value.cushion;
  const res = await api.user.updateProfile(profileData.value);

  if(res.success){
    store.dispatch('getProfile');
    isFieldDisabled.value = true;
  }
}
</script>

<style lang="scss">
.profile {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__alert{
    margin-bottom: 24px;
  }

  &__button{
    width: fit-content !important;
  }

  &__levels{
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-title{
      font-size: 28px;
      color: #2E7D32;
    }
  }

  &__tasks{
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .n-alert-body__title{
      font-size: 24px !important;
    }

    &-content{
      font-size: 18px;
    }
  }

  &__container {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 24px;
    margin-bottom: 24px;

    &-item:nth-of-type(1) {
      grid-column: span 3;
    }
  }

}

@media (max-width: 1280px) {
  .profile {
    &__levels{
      &-title{
        font-size: 24px;
      }
    }

    &__tasks{

      & .n-alert-body__title{
        font-size: 20px !important;
      }

      &-content{
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .profile {
    &__container {
      grid-template-columns: 1fr;
      grid-template-rows: initial;
      grid-gap: 12px;

      &-item:nth-of-type(1) {
        grid-column: initial;
      }
    }
  }
}
</style>