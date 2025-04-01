<template>

    <Button
        size="sm"
        icon="print"
        type="outline"
        :action="downloadOrder"
        :skeleton="isLoadingOrder"
        :loading="isDownloadingOrder">
    </Button>

</template>

<script>

    import axios from 'axios';
    import Button from '@Partials/buttons/Button.vue';

    export default {
        inject: ['apiState', 'formState', 'orderState', 'storeState'],
        components: { Button },
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
                        const blobUrl = window.URL.createObjectURL(blob);

                        const printWindow = window.open(blobUrl);

                        if (printWindow) {
                            printWindow.onload = () => {
                                printWindow.focus();
                                printWindow.print();
                            };
                        }

                    }else{

                        this.formState.setFormError('general', response.data.message);
                        this.notificationState.showWarningNotification(response.data.message);

                    }

                }).catch(errorException => {
                    this.formState.setServerFormErrors(errorException);
                });

                this.isDownloadingOrder = false;

            }
        }
    };

</script>
