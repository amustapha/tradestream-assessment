import { defineStore } from "pinia";

export const useLoaderStore = defineStore("loader", {
  state: () => ({
    loaders: [] as string[],
  }),

  getters: {
    isLoading: (state) => state.loaders.length > 0,
    currentLoader: (state) => state.loaders.at(-1),
  },

  actions: {
    addLoader(loader: string) {
      this.loaders.push(loader);
    },
    removeLoader(loader: string) {
      const index = this.loaders.indexOf(loader);
      if (index !== -1) {
        this.loaders.splice(index, 1);
      }
    },
  },
});
