<template>

    <div class="flex justify-center">

        <CustomModal
            ref="modal"
            :onShow="onShow"
            triggerSize="sm"
            triggerIcon="add"
            contentClass="px-4"
            triggerType="light"
            header="Add Promotion"
            :scrollOnContent="false"
            :showApproveButton="false"
            triggerText="Add Promotion"
            :triggerLoading="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)">

            <template #content>

                <div v-if="hasLoadedInitialPromotions" class="flex justify-center items-center space-x-4">

                    <CustomInput
                        type="search"
                        class="w-full"
                        :debounced="true"
                        v-model="searchTerm"
                        placeholder="Search promotions"
                        @input="isLoadingPromotions = true"
                        :skeleton="isLoadingStore || isLoadingOrder || (isEditting && !hasOrder)">
                    </CustomInput>

                    <Button :action="addNew" type="light" size="xs" icon="add" class="my-2">
                        <span>Add New</span>
                    </Button>

                </div>

                <template v-if="isLoadingPromotions">

                    <div
                        class="space-y-2 mb-4">

                        <div
                            :key="index"
                            v-for="(_, index) in [1, 2, 3]"
                            class="flex items-center space-x-2 border-b shadow-sm rounded-lg p-2 bg-gray-50 w-full">

                            <!-- Skeleton Loading -->
                            <LineSkeleton width="w-10" height="h-10" rounded="rounded-lg" :shine="true" class="flex-shrink-0"></LineSkeleton>

                            <div class="w-full space-y-2">
                                <LineSkeleton width="w-2/3" :shine="true"></LineSkeleton>
                                <LineSkeleton width="w-1/3" :shine="true"></LineSkeleton>
                            </div>

                        </div>

                    </div>

                </template>

                <PromotionOptions
                    v-if="hasPromotions"
                    :promotions="promotions"
                    :onSelectPromotion=onSelectPromotion>
                </PromotionOptions>

                <p v-else class="text-sm text-center p-4 rounded-lg bg-gray-50 mb-4">
                    No promotions found
                </p>

            </template>

        </CustomModal>

    </div>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';
    import CustomInput from '@Partials/inputs/CustomInput.vue';
    import CustomModal from '@Partials/inputs/CustomModal.vue';
    import LineSkeleton from '@Partials/skeletons/LineSkeleton.vue';
    import PromotionOptions from '@Pages/stores/store/orders/order/editable/components/promotions/add-promotion/promotion-options/PromotionOptions.vue';

    export default {
        inject: ['formState', 'orderState', 'storeState'],
        components: { Button, CustomInput, CustomModal, LineSkeleton, PromotionOptions },
        data() {
            return {
                promotions: [],
                searchTerm: null,
                lastSearchTerm: null,
                isLoadingPromotions: false,
                hasLoadedInitialPromotions: false
            }
        },
        watch: {
            searchTerm() {
                this.getPromotions();
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            order() {
                return this.orderState.order;
            },
            hasOrder() {
                return this.orderState.hasOrder;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            },
            isEditting() {
                return this.$route.name === 'edit-store-order';
            },
            hasSearchTerm() {
                return this.searchTerm != null && this.searchTerm.trim() != '';
            },
            hasPromotions() {
                return this.promotions.length > 0;
            },
        },
        methods: {
            onShow() {
                this.hasLoadedInitialPromotions = false;
                this.lastSearchTerm = null;
                this.searchTerm = null;
                this.promotions = [];
                this.getPromotions();
            },
            async getPromotions() {

                this.isLoadingPromotions = true;

                const url = this.store._links.showStorePromotions;

                let config = {
                    params: {
                        'store_id': this.store.id
                    }
                };

                if (this.hasSearchTerm) {
                    config.params['search'] = this.searchTerm;
                }

                this.lastSearchTerm = this.searchTerm;

                try {
                    const response = await axios.get(url, config);

                    if (response.status === 200) {

                        if (this.searchTerm === this.lastSearchTerm) {
                            const pagination = response.data;
                            this.promotions = pagination.data;
                        }

                    } else {
                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);
                    }
                } catch (errorException) {
                    this.formState.setServerFormErrors(errorException);
                }

                if (this.searchTerm === this.lastSearchTerm) {
                    this.isLoadingPromotions = false;
                    this.hasLoadedInitialPromotions = true;
                }
            },
            onSelectPromotion(promotion) {
                this.$refs.modal.hideModal();
                this.orderState.addCartPromotionUsingPromotion(promotion);
            },
            addNew() {
                this.$refs.modal.hideModal();
                this.orderState.addCartPromotion();
            },
        }
    };

</script>
