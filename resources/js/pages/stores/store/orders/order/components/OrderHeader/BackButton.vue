<template>

    <Button type="light" size="xs" icon="short-left-arrow" :action="goBack">
        <span>Back</span>
    </Button>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';

    export default {
        components: { Button },
        data() {
            return {
                storeState: useStoreState()
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            goBack() {
                this.$router.replace({
                    name: 'show-store-orders',
                    params: {
                        'store_href': this.store._links.showStore
                    }
                });
            }
        }
    };

</script>
