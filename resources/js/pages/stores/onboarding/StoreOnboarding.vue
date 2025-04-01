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

    import RightSideAlerts from '@Partials/alerts/RightSideAlerts.vue';

    export default {
        inject: ['formState', 'storeState'],
        components: { RightSideAlerts },
        data() {
            return {
                storeHref: null
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
