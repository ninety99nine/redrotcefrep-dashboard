<template>

    <div>

        <Button type="light" size="xs" :skeleton="isLoadingOrder" :action="showDownloadPdfModal" icon="download">
            <span>Download</span>
        </Button>

        <ConfirmModal ref="downloadPdfModal" approveText="Download PDF" :approveAction="downloadOrder" approveType="primary" approveIcon="download" :isLoading="isDownloadingOrder">

            <template #content>

                <p class="text-lg font-bold border-b border-dashed pb-4 mb-4">Download PDF</p>

                <div class="flex space-x-2 p-4 text-xs bg-blue-100 rounded-lg mb-8">

                    <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <span>Creating the PDF to download may take a moment. Please do not close this window.</span>

                </div>

            </template>

        </ConfirmModal>

    </div>

</template>

<script>

    import axios from 'axios';
    import { FormMixin } from '@Mixins/FormMixin.js';
    import Button from '@Partials/buttons/Button.vue';
    import { useApiState } from '@Stores/api-store.js';
    import { useStoreState } from '@Stores/store-store.js';
    import { useOrderState } from '@Stores/order-store.js';
    import ConfirmModal from '@Partials/modals/ConfirmModal.vue';

    export default {
        mixins: [FormMixin],
        components: { Button, ConfirmModal },
        data() {
            return {
                downloadPdfModal: null,
                apiState: useApiState(),
                isDownloadingOrder: false,
                storeState: useStoreState(),
                orderState: useOrderState(),
            }
        },
        computed: {
            order() {
                return this.orderState.order;
            },
            store() {
                return this.storeState.store;
            },
            isLoadingOrder() {
                return this.orderState.isLoadingOrder;
            }
        },
        methods: {
            showDownloadPdfModal() {
                this.downloadPdfModal.showModal();
            },

            async downloadOrder() {

                if(this.isDownloadingOrder) return;

                const data = {
                    store_id: this.store.id,
                    order_ids: [this.order.id]
                };

                const config = {
                    responseType: "blob"
                };

                this.isDownloadingOrder = true;

                await axios.post(this.apiState.apiHome['_links']['downloadOrders'], data, config).then(response => {

                    if (response.status === 200 && !response.data.hasOwnProperty('downloaded')) {

                        const blob = new Blob([response.data], { type: "application/pdf" });
                        const link = document.createElement("a");

                        link.href = window.URL.createObjectURL(blob);
                        link.download = `Order #${this.order._attributes.number}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                    }else{

                        this.setFormError('general', response.data.message);
                        this.showUnsuccessfulNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.setServerFormErrors(errorException);
                });

                this.isDownloadingOrder = false;

            },
        },
        mounted() {
            this.downloadPdfModal = this.$refs.downloadPdfModal;
        },
    };

</script>
