import LZString from 'lz-string';
import { diff } from 'deep-diff';
import { defineStore } from 'pinia';
import debounce from 'lodash/debounce';

export const useChangeHistoryState = defineStore('change-history', {
    state: () => {
        return {
            history: {
                timeline: [],
                currentIndex: null
            }
        }
    },
    actions: {
        saveStateDebounced: debounce(function (actionName, data) {
            this.saveState(actionName, data);
        }, 500),
        saveState(actionName, data) {

            if (!actionName) {
                console.warn("Action name is required to save the state.");
                return;
            }

            //  Save to storage
            //  localStorage.setItem(`pageForm:${pageHref}`, data);

            if (this.history.timeline.length === 0) {
                this.history.timeline.unshift({
                    state: LZString.compress(JSON.stringify(data)),
                    timestamp: new Date().toISOString(),
                    name: actionName,
                });
                this.history.currentIndex = 0;
                return;
            }

            if (this.history.currentIndex > 0) {
                this.history.timeline = this.history.timeline.slice(this.history.currentIndex);
                this.history.currentIndex = 0;
            }

            const lastState = JSON.parse(LZString.decompress(this.history.timeline[0].state));
            const differences = diff(lastState, data);

            if (differences && differences.length > 0) {
                this.history.timeline.unshift({
                    state: LZString.compress(JSON.stringify(data)),
                    timestamp: new Date().toISOString(),
                    name: actionName,
                });
                this.history.currentIndex = 0;
            }
        },
        undo() {
            if (this.canUndo) {
                this.history.currentIndex += 1;
                const previousState = this.history.timeline[this.history.currentIndex];
                return JSON.parse(LZString.decompress(previousState.state));
            } else {
                console.warn("Cannot undo. Already at the earliest state.");
            }
        },
        redo() {
            if (this.canRedo) {
                this.history.currentIndex -= 1;
                const nextState = this.history.timeline[this.history.currentIndex];
                return JSON.parse(LZString.decompress(nextState.state));
            } else {
                console.warn("Cannot redo. Already at the latest state.");
            }
        },
        jumpToHistory(index) {
            if (index >= 0 && index < this.history.timeline.length) {
                this.history.currentIndex = index;
                const selectedState = this.history.timeline[index];
                return JSON.parse(LZString.decompress(selectedState.state));
            } else {
                console.warn("Invalid history index.");
            }
        },
        clearHistory() {
            if (this.history.timeline.length > 0) {
                this.history.currentIndex = 0;
                const currentState = this.history.timeline[0];
                this.history.timeline = [currentState];
            }
        },
        resetHistory() {
            this.history.currentIndex = null;
            this.history.timeline = [];
        },
        resetHistoryToOriginal() {
            if (this.history.timeline.length > 0) {
                this.history.currentIndex = 0;
                const originalState = this.history.timeline[this.history.timeline.length - 1];
                this.history.timeline = [originalState];
                return JSON.parse(LZString.decompress(originalState.state));
            }else{
                return null;
            }
        }
    },
    getters: {
        canUndo() {
            return this.history.currentIndex < this.history.timeline.length - 1;
        },
        canRedo() {
            return this.history.currentIndex > 0;
        },
        historyItems() {
            return this.history.timeline.map((item, index) => ({
                ...item,
                isActive: index === this.history.currentIndex
            }));
        },
        hasHistoryItems() {
            return this.historyItems.length > 0;
        },
    },
})
