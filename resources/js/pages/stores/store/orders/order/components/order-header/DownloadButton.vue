<template>

    <CustomModal
        triggerSize="xs"
        triggerType="light"
        header="Download PDF"
        triggerText="Download"
        triggerIcon="download"
        approveType="primary"
        approveIcon="download"
        approveText="Download PDF"
        :approveAction="downloadOrder"
        :approveLoading="isDownloadingOrder"
        :triggerLoading="isLoadingStore || isLoadingOrder">

        <template #content>

            <div class="flex space-x-2 p-4 text-xs bg-blue-100 rounded-lg">

                <svg class="w-6 h-6 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

                <span>Creating the PDF to download may take a moment. Please do not close this window.</span>

            </div>

        </template>

    </CustomModal>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';
    import CustomModal from '@Partials/inputs/CustomModal.vue';

    export default {
        inject: ['apiState', 'formState', 'orderState', 'storeState'],
        components: { Button, CustomModal },
        data() {
            return {
                isDownloadingOrder: false
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
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        methods: {
            async downloadOrder(hideModal) {

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
                        hideModal();

                    }else{

                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isDownloadingOrder = false;

            },
        }
    };

</script>
