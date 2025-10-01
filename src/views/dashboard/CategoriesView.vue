<template>
  <MainWrapper>
    <div class="categories__header">
      <MainTitle title="Категории" class="categories__title"/>
      <MainButton class="categories__button" action="add" title="создать категорию" type="secondary" @click="$emit('showCategory')"/>
    </div>
<!--    <PageAlert class="categories__alert"/>-->
    <div class="categories__menu">
      <InputSearch class="categories__menu-search" placeholder="поиск категории" :items="categories" v-model="searchedValue"/>
    </div>
    <div class="categories__container">
      <n-collapse :trigger-areas="triggerAreas" @update:expanded-names="fetchCategoryData" accordion>
        <n-collapse-item v-for="item in filteredCategories" :title="item.title" :name="item.id" :class="{ 'favorite-category': item.isFavorite }">
          <template #header-extra >
            <div class="categories__item-menu" :class="{ active: showCategoryMenu === item.id }">
              <menu-vertical
                  class="categories__item-icon"
                  @click.stop="toggleMenu(item.id)"
              />
              <div
                  v-if="showCategoryMenu === item.id"
                  class="categories__item-menu-list"
              >
                <div v-if="item.type !== 'system'" class="categories__item-menu-item" @click.stop="deleteCategory(item.id)">
                  <trash class="categories__item-menu-icon trash"/>
                  Удалить
                </div>
                <div v-if="item.type !== 'system'" class="categories__item-menu-item" @click.stop="emitShowEditCategory(item)">
                  <edit class="categories__item-menu-icon"/>
                  Редактировать
                </div>
                <div class="categories__item-menu-item" @click.stop="favoriteCategory(item)">
                  <star class="categories__item-menu-icon"/>
                  Избранное
                </div>
              </div>
            </div>
          </template>
          <div v-if="activeCategory" class="categories__item">
            <div class="categories__item-descripiton">
              Описание: {{ activeCategory.description }}
            </div>
            <div class="categories__item-statistic">
              <p v-if="activeCategory.stats.monthAmount !== 0">Потрачено в этом месяце: <span>{{activeCategory.stats.monthAmount}}₽</span></p>
              <p v-if="activeCategory.stats.expenseLimit">Лимит: <span>{{ activeCategory.stats.expenseLimit }}₽</span></p>
              <p v-if="activeCategory.stats.percent !== 0">{{ activeCategory.stats.percent }}% от всех расходов</p>
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </div>
  </MainWrapper>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import Filter from "@/components/template/Filter.vue";
import InputSearch from "@/components/ui/input/InputSearch.vue";
import {computed, ref, onMounted, onBeforeUnmount, inject} from "vue";
import PageAlert from "@/components/template/PageAlert.vue";
import {useStore} from "vuex";
import MenuVertical from "@/assets/icons/menu-vertical.vue";
import Trash from "@/assets/icons/trash.vue";
import Edit from "@/assets/icons/edit.vue";
import Star from "@/assets/icons/star.vue";

const store = useStore();
const { api } = inject('plugins');
const emit = defineEmits(["showEditCategory"]);

const emitShowEditCategory = (category) => {
  showCategoryMenu.value = null;
  emit('showEditCategory', category);
};

const categories = computed(() => {
    const categoriesArr = store.getters.GET_CATEGORIES || [];
    if (categoriesArr.length === 0) {
      store.dispatch("getCategories");
    }
    return store.getters.GET_CATEGORIES || [];
});

const triggerAreas = ['main', 'arrow']
const searchedValue = ref('');
const showCategoryMenu = ref(null);
const activeCategory = ref(null);

const filteredCategories = computed(() => {
  let list = categories.value || [];

  if (searchedValue.value.trim()) {
    list = list.filter(item =>
        item.title.toLowerCase().includes(searchedValue.value.toLowerCase())
    );
  }

  return list.sort((a, b) => {
    if (a.isFavorite === b.isFavorite) return 0;
    return a.isFavorite ? -1 : 1;
  });
});

const toggleMenu = (id) => {
  showCategoryMenu.value = showCategoryMenu.value === id ? null : id;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleClickOutside = (e) => {
  const menu = e.target.closest(".categories__item-menu");
  if (!menu) {
    showCategoryMenu.value = null;
  }
};

async function deleteCategory(id) {
  const res = await api.category.deleteCategory(id);
  if (res.success) {
    store.dispatch("getCategories");
  }
}

async function favoriteCategory(category) {
  let res;
  showCategoryMenu.value = null;
  if (!category.isFavorite) {
    res = await api.category.addFavoriteCategory(category.id);
  } else {
    res = await api.category.deleteFavoriteCategory(category.id);
  }
  if (res.success) {
    store.dispatch("getCategories");
  }
}

async function fetchCategoryData (id) {
  const res = await api.category.getCategory(id[0]);
  if (res.success) {
    activeCategory.value = res.data;
  }
}
</script>

<style lang="scss">
.categories{
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

    &-search{
      width: 100%;
      max-width: 300px;
      margin-left: auto;
    }
  }

  &__item{
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 22px;

    &-menu{
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

      &:hover{
        background: rgba(46, 125, 50, 0.1);
      }

      &.active{
        background: rgba(46, 125, 50, 0.1);
      }

      &-list{
        position: absolute;
        top: 105%;
        right: calc(100% - 36px);
        z-index: 100;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: #fff;
        padding: 18px;
        border: 1px solid rgba(209, 213, 219, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
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

    &-icon{
      color: #2E7D32;
    }

    &-statistic{
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

  }
}

.favorite-category .n-collapse-item__header-main,
.favorite-category .n-collapse-item__header-main .n-collapse-item-arrow{
  color: #2E7D32 !important;
}

@media (max-width: 767px) {
  .categories{
    &__header{
      flex-direction: column;
      align-items: start;
      
      & button{
        margin-left: auto;
      }
    }

    &__item{
      &-statistic{
        font-size: 16px;
        gap: 8px;
      }

      &-menu{
        &-item{
          font-size: 16px;
        }
        &-icon{
          width: 20px;
          
          &.trash{
            width: 16px;
          }
        }
      }
    }
  }
}
</style>