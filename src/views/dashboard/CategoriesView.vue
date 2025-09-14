<template>
  <MainWrapper>
    <div class="categories__header">
      <MainTitle title="Категории" class="categories__title"/>
      <MainButton class="categories__button" action="add" title="создать категорию" type="secondary" @click="$emit('showCategory')"/>
    </div>
    <PageAlert class="categories__alert"/>
    <div class="categories__menu">
      <Filter/>
      <InputSearch class="categories__menu-search" placeholder="поиск категории" :items="categories" v-model="searchedValue"/>
    </div>
    <div class="categories__container">
      <n-collapse :trigger-areas="triggerAreas">
        <n-collapse-item v-for="item in filteredCategories" :title="item.title" :name="item.id">
          <template #header-extra v-if="item.type !== 'system'">
            <div class="categories__item-menu" :class="{ active: showCategoryMenu === item.id }">
              <menu-vertical
                  class="categories__item-icon"
                  @click.stop="toggleMenu(item.id)"
              />
              <div
                  v-if="showCategoryMenu === item.id"
                  class="categories__item-menu-list"
              >
                <div class="categories__item-menu-item" @click="deleteCategory(item.id)">
                  <trash class="categories__item-menu-icon trash"/>
                  Удалить
                </div>
                <div class="categories__item-menu-item" @click="emitShowEditCategory(item)">
                  <edit class="categories__item-menu-icon"/>
                  Редактировать
                </div>
              </div>
            </div>
          </template>
          <div class="categories__item">
            <div v-if="item.description" class="categories__item-descripiton">
              Описание: {{ item.description }}
            </div>
            <div class="categories__item-statistic">
              <p>Потрачено в этом месяце: <span>20 000</span></p>
              <p>Лимит: <span>30 000</span></p>
              <p>15% от всех расходов</p>
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

const filteredCategories = computed(() => {
  const list = categories.value || [];
  if (!searchedValue.value.trim()) return list;
  return list.filter(item =>
      item.title.toLowerCase().includes(searchedValue.value.toLowerCase())
  );
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