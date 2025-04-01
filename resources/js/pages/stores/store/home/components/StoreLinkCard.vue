<template>

    <div class="animated-border-blue bg-white py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="space-x-2 text-sm text-gray-700 font-bold mb-4">
            Store Link
        </h1>

        <!-- Instruction -->
        <p class="text-xs mb-4">Your store is ready to be shared. Copy your store link and share it anywhere you want</p>

        <CopyToClipboard
            class="mb-4"
            :loading="isLoadingStore"
            :text="store?._attributes?.webLink"
            :placeholder="`${currentDomain}/...`">
        </CopyToClipboard>

        <a :href="this.isLoadingStore ? '#' : this.store._attributes.webLink" target="_blank" class="w-full">
            <Button type="primary" size="lg" :skeleton="isLoadingStore" icon="share-arrow" class="w-full">
                <span class="text-sm">Visit Store</span>
            </Button>
        </a>

        <div class="w-full border-t border-dashed my-6"></div>

        <div class="flex flex-col items-center">

            <h2 class="text-sm text-gray-700 font-semibold mb-2">
                Prefer Your Own Domain?
            </h2>

            <!-- Instruction -->
            <p class="text-xs mb-4">You can buy a domain or connect an existing one</p>

            <Button type="success" size="xs" :skeleton="isLoadingStore" icon="earth" class="w-full">
                <span>Connect Your Own Domain</span>
            </Button>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import CopyToClipboard from '@Partials/clipboards/CopyToClipboard.vue';

    export default {
        inject: ['storeState'],
        components: {
            Button, CopyToClipboard
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            isLoadingStore() {
                return this.storeState.isLoadingStore;
            },
            currentDomain() {
                return typeof window !== "undefined" ? window.location.origin : "";
            }
        }
    };

</script>
