<template>
  <MainWrapper>
    <div class="categories__header">
      <MainTitle title="Категории" class="categories__title"/>
      <MainButton
        class="categories__button"
        action="add"
        title="создать категорию"
        type="secondary"
        @click="$emit('showCategory')"
      />
    </div>

    <div class="categories__menu">
      <InputSearch
        class="categories__menu-search"
        placeholder="поиск категории"
        :items="categories"
        v-model="searchedValue"
      />
    </div>

    <div class="categories__container">
      <div
        v-for="item in filteredCategories"
        :key="item.id"
        :class="['categories__item', { 'favorite-category': item.isFavorite, 'active': expandedItem === item.id }]"
      >
        <div class="categories__item-header" @click="toggleAccordion(item.id)">
          <CollapseArrow class="categories__item-header-ico"
            :class="{ rotated: expandedItem === item.id }"
          />
          <div class="categories__item-title">{{ item.title }}</div>
          <div class="categories__item-menu" :class="{ active: showCategoryMenu === item.id }" @click.stop>
            <menu-vertical
              class="categories__item-icon"
              @click.stop="toggleMenu(item.id)"
            />
            <div
              v-if="showCategoryMenu === item.id"
              class="categories__item-menu-list"
            >
              <div v-if="item.type !== 'system'" class="categories__item-menu-item" @click.stop="deletingCategory(item.id)">
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
        </div>

        <div
          class="categories__item-body"
          :ref="el => bodyRefs[item.id] = el"
          :style="{ maxHeight: expandedItem === item.id ? bodyHeights[item.id] + 'px' : '0px' }"
        >
          <template v-if="categoryDetails[item.id]">
            <div class="categories__item-descripiton">
              Описание: {{ categoryDetails[item.id].description }}
            </div>
            <div class="categories__item-statistic">
              <p v-if="categoryDetails[item.id].stats.monthAmount !== 0">
                Потрачено в этом месяце: <span>{{categoryDetails[item.id].stats.monthAmount}}₽</span>
              </p>
              <p v-if="categoryDetails[item.id].stats.expenseLimit">
                Лимит: <span>{{ categoryDetails[item.id].stats.expenseLimit }}₽</span>
              </p>
              <p v-if="categoryDetails[item.id].stats.percent !== 0">
                {{ categoryDetails[item.id].stats.percent }}% от всех расходов
              </p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </MainWrapper>

  <ConfirmModal v-if="showDeleteCategory" @hide-modal="showDeleteCategory = false" @confirm="deleteCategory" :closable="false"/>
</template>

<script setup>
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainTitle from "@/components/ui/title/MainTitle.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import InputSearch from "@/components/ui/input/InputSearch.vue";
import {computed, ref, onMounted, onBeforeUnmount, inject, nextTick} from "vue";
import {useStore} from "vuex";
import MenuVertical from "@/assets/icons/menu-vertical.vue";
import Trash from "@/assets/icons/trash.vue";
import Edit from "@/assets/icons/edit.vue";
import Star from "@/assets/icons/star.vue";
import CollapseArrow from "@/assets/icons/collapse-arrow.vue";
import ConfirmModal from "@/components/template/modal/ConfirmModal.vue";

const store = useStore();
const { api } = inject('plugins');
const emit = defineEmits(["showEditCategory"]);

const searchedValue = ref('');
const showCategoryMenu = ref(null);
const expandedItem = ref(null);
const bodyRefs = ref({});
const bodyHeights = ref({});
const categoryDetails = ref({});

const categories = computed(() => {
  const arr = store.getters.GET_CATEGORIES || [];
  if (arr.length === 0) store.dispatch("getCategories");
  return arr;
});

const filteredCategories = computed(() => {
  let list = categories.value || [];
  if (searchedValue.value.trim()) {
    list = list.filter(item =>
      item.title.toLowerCase().includes(searchedValue.value.toLowerCase())
    );
  }
  return list.sort((a, b) => (a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1));
});

async function toggleAccordion(id) {
  if (expandedItem.value === id) {
    expandedItem.value = null;
    return;
  }

  if (categoryDetails.value[id]) {
    expandedItem.value = id;
    setBodyHeight(id);
    return;
  }

  const res = await api.category.getCategory(id);
  if (res.success) {
    categoryDetails.value[id] = res.data;
    expandedItem.value = id;
    await nextTick();
    setBodyHeight(id);
  }
}

function setBodyHeight(id) {
  const el = bodyRefs.value[id];
  if (el) {
    bodyHeights.value[id] = el.scrollHeight;
  }
}

function toggleMenu(id) {
  showCategoryMenu.value = showCategoryMenu.value === id ? null : id;
}

function handleClickOutside(e) {
  const menu = e.target.closest(".categories__item-menu");
  if (!menu) showCategoryMenu.value = null;
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

const emitShowEditCategory = (category) => {
  showCategoryMenu.value = null;
  emit('showEditCategory', category);
};

const showDeleteCategory = ref(false);
const deletingCategoryId = ref(null);

const deletingCategory = (id) => {
  deletingCategoryId.value = id;
  showDeleteCategory.value = true;
}

async function deleteCategory() {
  const res = await api.category.deleteCategory(deletingCategoryId.value);
  if (res.success) {
    store.commit('SET_MESSAGE',{ text: 'Категория удалена', type: 'success' });
    store.dispatch("getCategories");
  } else {
    store.commit('SET_MESSAGE',{ text: 'Ошибка удаления категории', type: 'error' });
  }
  deletingCategoryId.value = null;
  showDeleteCategory.value = false;
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
    store.commit('SET_MESSAGE',{ text: 'Изменения сохранены', type: 'success' });
    store.dispatch("getCategories");
  }
}
</script>

<style lang="scss">
.categories {
  &__header{
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .button{
      width: fit-content;
    }

    @media (max-width: 767px) {
      flex-direction: column;

      & .title{
        margin-right: auto;
      }

      & .button{
        margin-left: auto;
      }
    }
  }

  &__menu{
    max-width: 340px;
    margin-left: auto;
    margin-bottom: 24px;

    @media (max-width: 767px) {
      max-width: 100%;
    }
  }

  &__item {
    border-bottom: 1px solid rgba(204, 204, 204, 0.4);
    padding: 8px 0;
    transition: 0.3s;
    display: flex;
    flex-direction: column;

    &.active{
      gap: 6px;
    }

    &-icon {
      color: #2E7D32;
    }

    &.favorite-category{
      border-bottom: 1px solid rgba(46, 125, 50, 0.4);
      & .categories__item-title{
          color: #2E7D32;
      }
      & .categories__item-header {
        &-ico {
          color: #2E7D32;
        }
      }
    }

    &-header {
      display: flex;
      gap: 8px;
      align-items: center;
      cursor: pointer;
      position: relative;

      &-ico {
        width: 18px;
        transform: rotate(180deg);
        transition: transform 0.3s ease;
      }

      &-ico.rotated {
        transform: rotate(270deg);
      }

      & .categories__item-title {
        font-size: 18px;
      }
    }

    &-body {
      overflow: hidden;
      transition: max-height 0.3s ease;
      padding-left: 26px;
    }

    &-menu {
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
      margin-left: auto;

      &:hover {
        background: rgba(46, 125, 50, 0.1);
      }

      &.active {
        background: rgba(46, 125, 50, 0.1);
      }

      &-list {
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

      &-item {
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;

        &:hover {
          color: #2E7D32;
        }
      }

      &-icon {
        width: 24px;
        color: #2E7D32;
      }

      &-icon.trash {
        width: 18px;
        margin-right: 6px;
      }
    }

    &-statistic {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 6px;
    }
  }

}
</style>