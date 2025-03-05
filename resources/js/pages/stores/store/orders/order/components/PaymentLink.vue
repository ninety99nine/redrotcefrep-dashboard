<template>

    <div class="bg-white rounded-lg p-4 mb-4">

        <div class="flex items-center space-x-2 mb-4">

            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>

            <span class="text-gray-700 font-semibold">Payment Link</span>

        </div>

        <div class="flex space-x-1 items-stretch">

            <CopyToClipboard
                :text="paymentLink"
                :placeholder="`...`"
                :loading="isLoadingOrder">
            </CopyToClipboard>

            <a :href="paymentLink" target="_blank">
                <Button type="light" size="sm" icon="externalLink" wrapperClass="h-full" class="h-full"></Button>
            </a>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import CopyToClipboard from '@Partials/clipboards/CopyToClipboard.vue';

    export default {
        components: { Button, CopyToClipboard },
        props: {
            order: {
                type: Object
            },
            isLoadingOrder: {
                type: Boolean
            }
        },
        data() {
            return {
                storeState: useStoreState(),
            }
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            paymentLink() {
                return 'https://www.google.com';
            }
        }
    };

</script>
