<template>

   <div class="flex justify-end space-x-1">

        <PrintButton></PrintButton>
        <DownloadButton></DownloadButton>
        <VisitButton></VisitButton>

   </div>

</template>

<script>

    import VisitButton from  '@Pages/shopping/order/show/components/order-details/header/components/VisitButton.vue';
    import PrintButton from  '@Pages/shopping/order/show/components/order-details/header/components/PrintButton.vue';
    import DownloadButton from '@Pages/shopping/order/show/components/order-details/header/components/DownloadButton.vue';

    export default {
        components: { VisitButton, PrintButton, DownloadButton }
    };

</script>
