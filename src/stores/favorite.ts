import { defineStore } from "pinia";
import type { Picture } from "@/types/picture.types";

export const useFavoriteStore = defineStore({
    id: "favoriteStore",
    state: () => ({
        favoritePictures: [] as Picture[],
    }),
    getters: {
        getFavorites: (state): Picture[] => state.favoritePictures,
        isInFavorites: (state): (tempPicture: Picture) => boolean => (tempPicture: Picture): boolean => {
            for (const picture of state.favoritePictures) {
                if (picture.id === tempPicture.id)
                    return true;
            }
            return false;
        },
    },
    actions: {
        addToFavorites(picture: Picture) {
            this.favoritePictures.push(picture);
        },
        removeFromFavorites(picture: Picture) {
            for (let i = 0; i < this.favoritePictures.length; i++) {
                const iterPicture = this.favoritePictures[i];
                if (picture.id === iterPicture.id) {
                    this.favoritePictures.splice(i, 1);
                    break;
                }
            }
        }
    },
    persist: true,
});
