<template>

    <div class="animated-border-cyan space-y-4 py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="space-x-2 text-sm text-gray-700 font-bold">
            Store QR Code
        </h1>

        <img src="/images/qr-code-example-use.jpg" alt="QR Code" class="w-full rounded-lg inset-shadow-sm inset-shadow-red-500">

        <p class="text-center text-xs text-gray-600">
            Download this QR code and add it to your flyers, business cards, packaging, t-shirts and more
        </p>

        <div class="w-full flex justify-between">

            <Button @click="downloadQR" type="primary" size="xs" :skeleton="isLoadingStore" icon="download">
                <span>Download</span>
            </Button>

            <Button @click="sendQrCodeToWhatsapp" type="success" size="xs" :skeleton="isLoadingStore" icon="whatsapp" spacing="space-x-1">
                <span>Send To WhatsApp</span>
            </button>

        </div>

        <a :href="isLoadingStore ? '#' : 'https://www.canva.com/templates/?query=qr-code'" target="_blank" class="w-full">
            <Button type="gradient" size="sm" :skeleton="isLoadingStore" class="w-full">
                <span>Create design with</span>
                <img class="h-4 ml-1.5" src="/images/canva-logo-white.png">
            </Button>
        </a>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';

    export default {
        components: {
            Button
        },
        data() {
            return {
                storeState: useStoreState()
            };
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            }
        },
        methods: {
            async downloadQR() {
                try {

                    // Fetch the image as a Blob
                    const response = await fetch(this.store.qrCodeFilePath);
                    const blob = await response.blob();

                    // Create an object URL for the Blob
                    const url = URL.createObjectURL(blob);

                    // Create a temporary anchor tag
                    const link = document.createElement('a');
                    link.download = `${this.store.name.replace(/[\s_]+/g, "-")}-qr-code.png`;
                    link.href = url;
                    link.click();

                    // Clean up the URL object
                    URL.revokeObjectURL(url);

                } catch (error) {
                    console.error('Error downloading the image:', error);
                }
            },
            async sendQrCodeToWhatsapp() {
                const previewUrl = `${this.store._links['showStoreQrCodeImagePreview']}`;
                const whatsappUrl = `https://wa.me/?text=Scan%20this%20QR%20code%20to%20access%20${encodeURIComponent(this.store.name)}%20${encodeURIComponent(previewUrl)}`;
                window.open(whatsappUrl, "_blank");
            }
        }
    };

</script>
