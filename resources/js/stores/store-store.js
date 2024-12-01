import { defineStore } from 'pinia'

export const useStoreState = defineStore('store', {
    state: () => {
        return {
            store: null,
            shouldUpdate: false,
            quickStartGuide: null,
            isLoadingQuickStartGuide: false
        }
    },
    getters: {
        completedQuickStartGuide(state) {
            if(state.quickStartGuide == null) return false;
            return state.quickStartGuide.completedMilestones == this.quickStartGuide.totalMilestones;
        }
    },
})
