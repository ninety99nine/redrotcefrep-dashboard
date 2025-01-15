<template>

    <div>

        <!-- General -->
        <General></General>

        <!-- Communication -->
        <Communication></Communication>

        <!-- Localization -->
        <Localization></Localization>

        <!-- Tax -->
        <Tax></Tax>

        <!-- Opening Hours -->
        <OpeningHours></OpeningHours>

        <!-- Delete Store -->
        <DeleteStore></DeleteStore>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import Tax from '@Pages/stores/store/settings/general/components/Tax.vue';
    import General from '@Pages/stores/store/settings/general/components/General.vue';
    import DeleteStore from '@Pages/stores/store/settings/general/components/DeleteStore.vue';
    import OpeningHours from '@Pages/stores/store/settings/general/components/OpeningHours.vue';
    import Localization from '@Pages/stores/store/settings/general/components/Localization.vue';
    import Communication from '@Pages/stores/store/settings/general/components/Communication.vue';

    export default {
        components: {
            Tax, General, DeleteStore, OpeningHours, Localization, Communication
        },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            }
        },
        methods: {
            setStoreForm() {
                this.storeState.setStoreForm(this.store);
            }
        },
        created() {
            this.setStoreForm();
        }
    };

</script>
