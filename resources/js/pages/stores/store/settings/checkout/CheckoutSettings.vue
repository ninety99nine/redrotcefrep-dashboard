<template>

    <div>

        <div :class="['flex flex-wrap gap-2 justify-center bg-blue-50 py-4', selectedTab == 'settings' ? 'rounded-lg mb-4' : 'rounded-t-lg']">

            <Pill
                :text="tab"
                :key="index"
                size="px-4 py-2"
                :showDot="false"
                :clickable="true"
                v-for="(tab, index) in tabs"
                :action="() => selectedTab = tab"
                :type="selectedTab == tab ? 'primary' : 'info'">

                <svg v-if="tab == 'settings'" class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <svg v-else class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

            </Pill>

        </div>

        <div v-show="selectedTab == 'settings'">

            <!-- Customer Section -->
            <CustomerSection></CustomerSection>

            <!-- Items Section -->
            <ItemsSection></ItemsSection>

            <!-- Delivery Methods Section -->
            <DeliveryMethodsSection></DeliveryMethodsSection>

            <!-- Tips Section -->
            <TipsSection></TipsSection>

            <!-- Promotions Section -->
            <PromotionsSection></PromotionsSection>

            <!-- Cost Breakdown Section -->
            <CostBreakdownSection></CostBreakdownSection>

        </div>

        <div v-show="selectedTab == 'preview'">
            <iframe :src="'/'+store.alias+'/checkout'" class="w-full h-screen rounded-b-lg"></iframe>
        </div>

    </div>

</template>

<script>

    import { useStoreState } from '@Stores/store-store.js';
    import Pill from '@Partials/pills/Pill.vue';
    import TipsSection from '@Pages/stores/store/settings/checkout/sections/TipsSection.vue';
    import ItemsSection from '@Pages/stores/store/settings/checkout/sections/ItemsSection.vue';
    import CustomerSection from '@Pages/stores/store/settings/checkout/sections/CustomerSection.vue';
    import PromotionsSection from '@Pages/stores/store/settings/checkout/sections/PromotionsSection.vue';
    import CostBreakdownSection from '@Pages/stores/store/settings/checkout/sections/CostBreakdownSection.vue';
    import DeliveryMethodsSection from '@Pages/stores/store/settings/checkout/sections/DeliveryMethodsSection.vue';

    export default {
        components: {
            Pill, TipsSection, ItemsSection, CustomerSection, PromotionsSection,
            CostBreakdownSection, DeliveryMethodsSection
        },
        data() {
            return {
                selectedTab: 'settings',
                storeState: useStoreState(),
                tabs: ['settings', 'preview'],
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
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
