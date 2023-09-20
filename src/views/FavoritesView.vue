<script setup lang="ts">
import {useFavoriteStore} from "@/stores/favorite";

const favorites = useFavoriteStore();
</script>

<template>
  <div class="favorites">
    <div class="favorites__results-block container">
      <div class="favorites__results-block__results">
        <RouterLink
            v-for="photo in favorites.getFavorites"
            :key="photo.id"
            :to="'/pictures/'.concat(photo.id)"
            class="favorites__results-block__results__item">
          <img :src="photo.urls.small" alt="PHOTO" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.favorites {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__results-block {
    width: 100%;
    &__results {
      margin: 5rem 0;
      display: grid;
      grid-template-columns: repeat(3, calc((100% - 60px) / 3));
      column-gap: 30px;
      row-gap: 30px;
      &__item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 440px;
        grid-column: span 1;
        grid-row: span 1;
        overflow: hidden;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    &__loading {
      margin: 5rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      & > * {
        animation: rotation 2s infinite linear;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .favorites {
    &__results-block {
      &__results {
        grid-template-columns: 50% 50%;
        &__item {
          height: auto;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .favorites {
    &__results-block {
      &__results {
        grid-template-columns: 100%;
        &__item {
          height: auto;
        }
      }
    }
  }
}
</style>
