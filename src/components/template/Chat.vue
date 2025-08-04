<template>
  <div class="chat">
    <n-popover :overlap="overlap" placement="top-end" trigger="click" style="max-width: 500px">
      <template #trigger>
          <div class="chat__button">
            <ChatIcon class="chat__button-icon"/>
          </div>
      </template>
      <div class="chat__text">
        Получите полный финансовый отчет за текущий месяц – переходите в чат для детальной аналитики!
        <MainButton size="small" title="Перейти" @click="toChat"/>
      </div>
    </n-popover>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ChatIcon from "@/assets/icons/chat-icon.vue";
import MainButton from "@/components/ui/button/MainButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const overlap = ref(false);

const toChat = () => {
  router.push("/chat");
}

</script>

<style scoped lang="scss">
.chat{
  &__button{
    background-color: #2E7D32;
    padding: 12px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s;

    &-icon{
      color: #fff;
      width: 38px;
    }

    &:hover{
      transform: scale(1.1);
    }
  }

  &__text{
    padding: 12px;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>