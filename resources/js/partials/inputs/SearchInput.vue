<template>

    <div class="relative">

        <!-- Spinning Loader -->
        <SpinningLoader v-if="isSearching" class="absolute top-3.5 left-3" size="sm"></SpinningLoader>

        <template v-else>
            <div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>

            <div @click="clearSearch" v-if="clearable && hasSearchTerm && !isSearching" class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-90 active:opacity-80 active:scale-90 transition-all">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </div>
        </template>

        <input ref="searchInput" v-model="localModelValue" @keyup.enter="onEnter" :placeholder="placeholder" class="w-full block p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    </div>

</template>

<script>

    import debounce from 'lodash.debounce';
    import TextInput from '@Partials/inputs/TextInput.vue';
    import SpinningLoader from '@Partials/loaders/SpinningLoader.vue';

    export default {
        props: {
            modelValue: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: true
            },
            isSearching: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Search'
            }
        },
        emits: ['beforeSearch', 'update:modelValue'],
        components: { TextInput, SpinningLoader },
        data() {
            return {
                debouncedSearch: null,
                localModelValue: this.modelValue
            };
        },
        watch: {
            modelValue(newValue, oldValue) {
                this.updateValue(newValue);
            },
            localModelValue(newValue, oldValue) {
                this.$emit('beforeSearch', newValue);
                this.debouncedSearch(newValue);
            },
            isSearching(newValue, oldValue) {

                //  Once we stop searching
                if(newValue == false) {

                    this.focusInput();

                }

            }
        },
        computed: {
            hasSearchTerm() {
                return this.localModelValue != null && this.localModelValue != '';
            }
        },
        methods: {
            updateValue(newValue) {
                this.localModelValue = newValue;
            },
            onEnter(event) {
                this.localModelValue = event.target.value;
            },
            focusInput() {
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            },
            clearSearch() {
                this.localModelValue = '';
                this.$emit('update:modelValue', this.localModelValue );
            },
        },
        created() {
            this.debouncedSearch = debounce((searchTerm) => {
                this.$emit('update:modelValue', searchTerm);
            }, 1000);
        },
    };
</script>
