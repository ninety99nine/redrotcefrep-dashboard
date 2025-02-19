<template>

    <div class="pt-16 min-h-screen">

        <!-- Right Side Alerts -->
        <RightSideAlerts></RightSideAlerts>

        <!-- -->
        <div v-if="isLoadingStore">Loading...</div>

        <!-- Dashboard Content -->
        <router-view v-else></router-view>

    </div>

</template>

<script>

    import { FormMixin } from '@Mixins/FormMixin.js';
    import { useStoreState } from '@Stores/store-store.js';
    import RightSideAlerts from '@Partials/alerts/RightSideAlerts.vue';

    export default {
        mixins: [FormMixin],
        components: { RightSideAlerts },
        data() {
            return {
                storeHref: null,
                storeState: useStoreState()
            }
        },
        watch: {
            '$route'() {
                this.storeHref = this.$route.params.store_href;
            }
        },
        computed: {
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        created() {
            this.storeHref = this.$route.params.store_href;
        }
    };

</script>
