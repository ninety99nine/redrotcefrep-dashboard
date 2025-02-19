<template>

    <div class="animated-border-blue bg-white py-4 px-4 shadow-sm rounded-xl flex flex-col items-center">

        <h1 class="space-x-2 text-sm text-gray-700 font-bold mb-4">
            Store Link
        </h1>

        <!-- Instruction -->
        <p class="text-xs mb-4">Your store is ready to be shared. Copy your store link and share it anywhere you want</p>

        <div
            @click.stop="isLoadingStore ? copyToClipboardNotReady() : copyToClipboard(store._attributes.webLink)"
            :class="[{ 'hover:bg-blue-50' : !isLoadingStore}, 'cursor-pointer w-full flex justify-between items-center bg-gray-50 p-2 border rounded-md relative mb-4']">

            <!-- Copied Hint -->
            <div v-if="copied" class="absolute -top-8 right-0 bg-green-500 text-white text-xs px-4 py-1 rounded-md">
                Copied!
                <div class="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-500"></div>
            </div>

            <!-- Not Ready Hint -->
            <div v-if="notReady" class="absolute -top-8 right-0 bg-yellow-500 text-white text-xs px-4 py-1 rounded-md">
                Not Ready!
                <div class="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-yellow-500"></div>
            </div>

            <!-- Store Link -->
            <ShineEffect v-if="isLoadingStore" class="w-full">
                <div :class="[{ 'text-gray-300' : isLoadingStore}, 'text-xs w-4/5 truncate']">{{ `${currentDomain}/...` }}</div>
            </ShineEffect>

            <div v-else :class="[{ 'text-gray-300' : isLoadingStore}, 'text-xs w-4/5 truncate']">{{ store._attributes.webLink }}</div>

            <!-- Copy Icon -->
            <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                :class="[{ 'text-gray-300' : isLoadingStore }, 'w-5 h-5 cursor-pointer']"
                @click.stop="isLoadingStore ? copyToClipboardNotReady() : copyToClipboard(store._attributes.webLink)">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
            </svg>

        </div>

        <ShineEffect v-if="isLoadingStore" class="w-full">
            <ButtonSkeleton size="lg" class="w-full">
                <span class="text-sm">Visit Store</span>
                <svg class="w-5 h-5 ml-1 -mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="share">
                    <path fill="#cbcbcb" d="M6.54 55.08a1.91 1.91 0 0 1-.62-.1 2 2 0 0 1-1.38-2c0-.3 2.06-29.34 31.18-31.62V10.92a2 2 0 0 1 3.43-1.4l19.74 20.16a2 2 0 0 1 0 2.8L39.15 52.64a2 2 0 0 1-3.43-1.4V41c-19.44.74-27.41 13-27.49 13.15a2 2 0 0 1-1.69.93Zm33.18-39.26v7.41a2 2 0 0 1-1.93 2c-18.84.69-25.58 13.24-28 21.31 5-4.32 13.91-9.6 27.81-9.6h.09a2 2 0 0 1 2 2v7.41l15-15.26Z"></path>
                </svg>
            </ButtonSkeleton>
        </ShineEffect>

        <a v-else :href="this.store._attributes.webLink" target="_blank" class="w-full">
            <Button @click="downloadQR" type="primary" size="lg" class="w-full">
                <span class="text-sm">Visit Store</span>
                <svg class="w-5 h-5 ml-1 -mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="share">
                    <path fill="#fff" d="M6.54 55.08a1.91 1.91 0 0 1-.62-.1 2 2 0 0 1-1.38-2c0-.3 2.06-29.34 31.18-31.62V10.92a2 2 0 0 1 3.43-1.4l19.74 20.16a2 2 0 0 1 0 2.8L39.15 52.64a2 2 0 0 1-3.43-1.4V41c-19.44.74-27.41 13-27.49 13.15a2 2 0 0 1-1.69.93Zm33.18-39.26v7.41a2 2 0 0 1-1.93 2c-18.84.69-25.58 13.24-28 21.31 5-4.32 13.91-9.6 27.81-9.6h.09a2 2 0 0 1 2 2v7.41l15-15.26Z"></path>
                </svg>
            </Button>
        </a>

        <div class="w-full border-t border-dashed my-6"></div>

        <div class="flex flex-col items-center">

            <h2 class="text-sm text-gray-700 font-semibold mb-2">
                Prefer Your Own Domain?
            </h2>

            <!-- Instruction -->
            <p class="text-xs mb-4">You can buy a domain or connect an existing one</p>

            <ShineEffect v-if="isLoadingStore" class="w-full">
                <ButtonSkeleton size="xs" class="w-full flex space-x-1 px-4 py-2">
                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                    </svg>
                    <span>Connect Your Own Domain</span>
                </ButtonSkeleton>
            </ShineEffect>

            <Button v-else @click="downloadQR" type="success" size="xs" class="w-full">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
                <span>Connect Your Own Domain</span>
            </Button>

        </div>

    </div>

</template>

<script>

    import Button from '@Partials/buttons/Button.vue';
    import { useStoreState } from '@Stores/store-store.js';
    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';
    import ButtonSkeleton from '@Partials/skeletons/ButtonSkeleton.vue';

    export default {
        components: {
            Button, ShineEffect, ButtonSkeleton
        },
        data() {
            return {
                copied: false,
                notReady: false,
                storeState: useStoreState(),
                copyToClipboardTimeout: null,
                copyToClipboardNotReadyTimeout: null,
            };
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
        },
        methods: {
            async copyToClipboard(text) {
                try {

                    if (this.copyToClipboardTimeout) {
                        clearTimeout(this.copyToClipboardTimeout);
                    }

                    await navigator.clipboard.writeText(text);
                    this.copied = true;

                    this.copyToClipboardTimeout = setTimeout(() => {
                        this.copied = false;
                    }, 2000);

                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            },
            async copyToClipboardNotReady() {
                if (this.copyToClipboardNotReadyTimeout) {
                    clearTimeout(this.copyToClipboardNotReadyTimeout);
                }

                this.notReady = true;

                this.copyToClipboardNotReadyTimeout = setTimeout(() => {
                    this.notReady = false;
                }, 2000);
            }
        }
    };

</script>
