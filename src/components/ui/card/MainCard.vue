<template>
  <div class="card">
    <div class="card__header">
      <slot name="header"/>
    </div>
    <div class="card__body">
      <slot name="body"/>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.card{
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  border: 1px solid rgba(209, 213, 219, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  &__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-buttons{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

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

      &:hover{
        background: rgba(46, 125, 50, 0.1);
      }
    }
  }

  &__body{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &-row{
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 12px;

      &_center{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &-statistic{
      font-size: 80px;
      font-weight: 600;
      color: #2E7D32;
    }
  }

  &__title{
    font-size: 24px;
    color: #2E7D32;
  }

  &__category{
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 20px;
  }

  &__period{
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 20px;

    &_empty{
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    & span{
      &.default{
        &.up{
          color: #2E7D32;
        }

        &.down{
          color: red;
        }
      }
      &.reverse{
        &.up{
          color: red;
        }

        &.down{
          color: #2E7D32;
        }
      }
    }
  }
}

@media (max-width: 1280px) {
  .card{
    &__title{
      font-size: 20px;
    }
    
    &__body{
      &-statistic{
        font-size: 64px;
      }
    }
  }
}

@media (max-width: 999px) {
  .card{
    padding: 16px;
    gap: 12px;
    &__period{
      font-size: 18px;

      & span{
        font-size: 16px;
      }
    }

    &__body{
      &-statistic{
        font-size: 36px;
      }
    }
  }
}

@media (max-width: 768px) {
  .card{

    &__period{
      font-size: 16px;
      gap: 8px;

      & span{
        font-size: 14px;
      }
    }
    
    &__body{
      &-row{
        flex-direction: column;
      }
    }
  }
}
</style>