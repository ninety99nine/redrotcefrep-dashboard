import { defineStore } from 'pinia';

export const useLoaderState = defineStore('loader', {
  state: () => ({
    isVisible: false,
    navigationCounter: 0,
  }),
  actions: {
    show() {
      this.navigationCounter++;
      this.isVisible = true;
    },
    hide() {
      this.navigationCounter--;
      if(this.navigationCounter <= 0) {
        this.navigationCounter = 0; // Prevent negative counter
        this.isVisible = false;
      }
    },
  },
});
