<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Picture} from "@/types/picture.types";
import api from "@/api";
import {examples} from "@/api/examples";

const isResultsLoading = ref(true);
let searchTimeout: number | undefined = undefined;
const searchText = ref("");

const results = ref<Picture[]>(examples);

async function loadRandomPhotos() {
  try {
    const res = await api.get(`/photos/random`, {
      params: {
        count: 9,
      }
    });
    results.value = res.data;
    isResultsLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}
async function loadSearchResults() {
  try {
    const res = await api.get(`/search/photos`, {
      params: {
        query: searchText.value,
      },
    });
    results.value = res.data.results;
    isResultsLoading.value = false;
  } catch (err) {
    console.log(err);
  }
}
function onSearchType() {
  clearTimeout(searchTimeout);
  isResultsLoading.value = true;
  if (searchText.value !== "")
    searchTimeout = setTimeout(loadSearchResults, 1000);
  else
    loadRandomPhotos();
}
onMounted(() => {
  loadRandomPhotos();
})
</script>

<template>
  <div class="home">
    <div class="home__search-block">
      <label class="home__search-block__search container">
        <input
            class="home__search-block__search__input"
            placeholder="Поиск" @input="onSearchType"
            v-model="searchText"
        />
        <span class="home__search-block__search__icon">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.8596 22.1821L15.8614 15.1838C17.315 13.5699 18.2084 11.442 18.2084 9.10414C18.2083 4.08416
              14.1242 0 9.10418 0C4.08416 0 0 4.08416 0 9.10418C0 14.1242 4.08416 18.2084 9.10418 18.2084C11.442 18.2084
              13.5699 17.315 15.1839 15.8614L22.1821 22.8596C22.2756 22.9532 22.3983 23 22.5209 23C22.6435 23 22.766
              22.9532 22.8597 22.8596C23.0468 22.6724 23.0468 22.3692 22.8596 22.1821ZM9.10418 17.25C4.61294 17.25
              0.958363 13.5959 0.958363 9.10418C0.958363 4.61249 4.61294 0.958318 9.10418 0.958318C13.5954 0.958318
              17.25 4.61244 17.25 9.10418C17.25 13.5959 13.5954 17.25 9.10418 17.25Z" fill="black"/>
          </svg>
        </span>
      </label>
    </div>
    <div class="home__results-block container">
      <div class="home__results-block__results">
        <RouterLink
            v-for="photo in results"
            :key="photo.id"
            :to="'/pictures/'.concat(photo.id)"
            class="home__results-block__results__item">
          <img :src="photo.urls.small" alt="PHOTO" />
        </RouterLink>
      </div>
      <div v-if="isResultsLoading" class="home__results-block__loading">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 1.25C15.6904 1.25 16.25 1.80964 16.25 2.5V7.5C16.25 8.19036 15.6904 8.75 15 8.75C14.3096 8.75 13.75 8.19036 13.75 7.5V2.5C13.75 1.80964 14.3096 1.25 15 1.25Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 21.25C15.6904 21.25 16.25 21.8096 16.25 22.5V27.5C16.25 28.1904 15.6904 28.75 15 28.75C14.3096 28.75 13.75 28.1904 13.75 27.5V22.5C13.75 21.8096 14.3096 21.25 15 21.25Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.27871 5.27859C5.76687 4.79044 6.55833 4.79044 7.04648 5.27859L10.584 8.81609C11.0721 9.30425 11.0721 10.0957 10.584 10.5839C10.0958 11.072 9.30437 11.072 8.81621 10.5839L5.27871 7.04636C4.79056 6.5582 4.79056 5.76675 5.27871 5.27859Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M19.4159 19.4161C19.9041 18.9279 20.6955 18.9279 21.1837 19.4161L24.7212 22.9536C25.2093 23.4418 25.2093 24.2332 24.7212 24.7214C24.233 25.2095 23.4416 25.2095 22.9534 24.7214L19.4159 21.1839C18.9278 20.6957 18.9278 19.9043 19.4159 19.4161Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 15C1.25 14.3096 1.80964 13.75 2.5 13.75H7.5C8.19036 13.75 8.75 14.3096 8.75 15C8.75 15.6904 8.19036 16.25 7.5 16.25H2.5C1.80964 16.25 1.25 15.6904 1.25 15Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.25 15C21.25 14.3096 21.8096 13.75 22.5 13.75H27.5C28.1904 13.75 28.75 14.3096 28.75 15C28.75 15.6904 28.1904 16.25 27.5 16.25H22.5C21.8096 16.25 21.25 15.6904 21.25 15Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.584 19.4161C11.0721 19.9043 11.0721 20.6957 10.584 21.1839L7.04648 24.7214C6.55833 25.2095 5.76687 25.2095 5.27871 24.7214C4.79056 24.2332 4.79056 23.4418 5.27871 22.9536L8.81621 19.4161C9.30437 18.9279 10.0958 18.9279 10.584 19.4161Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7212 5.27859C25.2093 5.76675 25.2093 6.5582 24.7212 7.04636L21.1837 10.5839C20.6955 11.072 19.9041 11.072 19.4159 10.5839C18.9278 10.0957 18.9278 9.30425 19.4159 8.81609L22.9534 5.27859C23.4416 4.79044 24.233 4.79044 24.7212 5.27859Z" fill="black"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__search-block {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("/search-bg.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    &__search {
      width: 865px;
      margin: 3rem 0;
      padding: 0 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      &__input {
        flex-grow: 1;
        padding: 0.75rem 0.75rem;
        background-color: #fff;
        background-clip: padding-box;
        border: none;
        font-size: 24px;
        font-weight: 300;
        &:focus {
          border: none;
          outline: none;
        }
      }
      &__icon {
        height: 23px;
      }
    }
  }
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
  .home {
    &__search-block {
      &__search {
        width: 600px;
      }
    }
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
  .home {
    &__search-block {
      &__search {
        width: 500px;
        &__input {
          font-size: 20px;
        }
        &__icon {
          height: 20px;
          & > svg {
            height: 20px;
          }
        }
      }
    }
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
@media screen and (max-width: 600px) {
  .home {
    &__search-block {
      &__search {
        width: 400px;
      }
    }
  }
}
@media screen and (max-width: 475px) {
  .home {
    &__search-block {
      &__search {
        width: 300px;
        &__input {
          font-size: 18px;
        }
        &__icon {
          height: 18px;
          & > svg {
            height: 18px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 330px) {
  .home {
    &__search-block {
      &__search {
        padding: 0 0.5rem;
        width: 280px;
        &__input {
          padding: 0.4rem 0.5rem;
          font-size: 16px;
        }
        &__icon {
          height: 16px;
          & > svg {
            height: 16px;
          }
        }
      }
    }
  }
}
</style>
