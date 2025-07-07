<template>
  <MainWrapper>
    <MainTitle title="Профиль" class="profile__title"/>

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
          <div class="card__title">Профиль</div>
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
          <div class="card__title">Цели</div>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{userProfile.goals_count}}</span>
          </div>
        </template>
      </MainCard>
      <MainCard class="profile__container-item">
        <template #header>
          <div class="card__title">Транзакции</div>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{userProfile.transaction_count}}</span>
          </div>
        </template>
      </MainCard>
      <MainCard class="profile__container-item">
        <template #header>
          <div class="card__title">На проектe</div>
        </template>
        <template #body>
          <div class="card__body-row card__body-row_center">
            <span class="card__body-statistic">{{differenceDate(userProfile.registration_date)}}</span>
          </div>
        </template>
      </MainCard>
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
import {computed, ref, watch} from "vue";
import {useStore} from "vuex"
import LevelCard from "@/components/ui/card/LevelCard.vue";
const store = useStore();

const userProfile = computed(() => store.getters['user/GET_CURRENT_USER'] || {});

const profileData = ref({
  name: '',
  email: ''
});

watch(userProfile, (newVal) => {
  if (newVal) {
    profileData.value = {
      name: newVal.name || '',
      email: newVal.email || ''
    };
  }
}, { immediate: true });

function differenceDate(date) {
  if (!date) return 0;

  const now = new Date();
  const regDate = new Date(date);
  return Math.floor((now - regDate) / (1000 * 60 * 60 * 24));
}

const isFieldDisabled = ref(true);

const clearProfileData = () => {
  isFieldDisabled.value = true;
  profileData.value.name = userProfile.value.name;
  profileData.value.email = userProfile.value.email;
}

const editProfileData = async () => {
  console.log(profileData.value);
}
</script>

<style scoped lang="scss">
.profile {
  &__title {
    margin-bottom: 48px;
  }

  &__levels{
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    &-title{
      font-size: 24px;
      color: #2E7D32;
    }
  }

  &__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 24px;

    &-item:nth-of-type(1) {
      grid-column: span 3;
    }
  }

}
</style>