<template>

    <div class="min-h-screen flex flex-col items-center pt-20 pb-40">

        <div class="w-full max-w-lg">

            <!-- Store Logo -->
            <StoreLogo :showButton="false" class="flex justify-center mb-4"></StoreLogo>

            <!-- Heading -->
            <h2 class="text-2xl font-semibold text-center mb-2">Share & Grow</h2>

            <!-- Instruction -->
            <p class="text-gray-500 text-center mb-6">Share your store link and start selling everywhere!</p>

        </div>

        <div class="w-full max-w-md">

            <div class="mb-4">

                <!-- Share -->
                <div class="space-y-3 mb-4">

                    <div class="bg-white space-y-4 py-8 px-4 shadow-sm rounded-xl flex flex-col items-center">
                        <img :src="store.qrCodeFilePath" alt="QR Code" class="w-32 h-32">
                        <div>
                            <p class="text-center text-xs text-gray-600">
                                Customers can scan this QR code to visit your store instantly. Download it and add it to your marketing materials, such as flyers, business cards, t-shirts, and more, to make it easy for them to find your store.
                            </p>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="downloadQR" class="flex items-center space-x-1 px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 text-xs active:scale-95 transition-all">
                                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span>Download</span>
                            </button>
                            <button @click="sendQrCodeToWhatsapp" class="flex items-center px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 text-xs active:scale-95 transition-all">
                                <span>Send To WhatsApp</span>
                                <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="share">
                                    <path fill="#fff" d="M6.54 55.08a1.91 1.91 0 0 1-.62-.1 2 2 0 0 1-1.38-2c0-.3 2.06-29.34 31.18-31.62V10.92a2 2 0 0 1 3.43-1.4l19.74 20.16a2 2 0 0 1 0 2.8L39.15 52.64a2 2 0 0 1-3.43-1.4V41c-19.44.74-27.41 13-27.49 13.15a2 2 0 0 1-1.69.93Zm33.18-39.26v7.41a2 2 0 0 1-1.93 2c-18.84.69-25.58 13.24-28 21.31 5-4.32 13.91-9.6 27.81-9.6h.09a2 2 0 0 1 2 2v7.41l15-15.26Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Copy & Share Link -->
                    <div
                        @click="copyToClipboard(store._attributes.webLink)"
                        class="bg-white space-y-4 py-3 px-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer relative">

                        <div class="flex items-center gap-8">

                            <!-- Link Icon -->
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                            </svg>

                            <div class="w-full space-y-2">

                                <!-- Store Name -->
                                <p class="text-sm font-bold">{{ store.name }}</p>

                                <!-- Instruction -->
                                <p class="text-xs">Copy your store link and share it anywhere you want</p>

                                <div class="w-full flex justify-between items-center p-2 border rounded-md">

                                    <!-- Store Link -->
                                    <div class="text-xs w-4/5 truncate">{{ store._attributes.webLink }}</div>

                                    <!-- Copy Icon -->
                                    <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-5 h-5 cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        @click.stop="copyToClipboard(store._attributes.webLink)">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
                                    </svg>

                                </div>

                            </div>

                            <!-- Copied Hint -->
                            <div v-if="copied" class="absolute top-2 right-4 bg-green-500 text-white text-xs px-4 py-1 rounded-md">
                                Copied!
                                <div class="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-500"></div>
                            </div>

                        </div>

                        <!--  -->
                        <div class="flex space-x-1 p-2 bg-blue-50 text-xs rounded-lg">
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            <span>You can change to your own domain later</span>
                        </div>

                    </div>

                    <!-- Share On Social Platforms -->
                    <a
                        :key="index"
                        target="_blank"
                        :href="socialPlatform.link"
                        v-for="(socialPlatform, index) in socialPlatforms"
                        :class="['block', { 'hidden': !showMore && index >= 5 }]">

                        <div class="social-item flex justify-between items-center gap-8 bg-white py-3 px-4 shadow-sm rounded-xl transition-all duration-300 border border-transparent hover:border-gray-300 hover:shadow-lg cursor-pointer">

                            <div class="flex items-center space-x-4">

                                <!-- Logo -->
                                <img :src="`/images/social-icons/${socialPlatform.name}.png`" :alt="`${socialPlatform.name} Logo`" class="w-8 h-8" />

                                <!-- Name -->
                                <div class="space-y-1 text-sm">
                                    <p class="font-bold">{{ socialPlatform.name }}</p>
                                    <p class="text-xs">{{ socialPlatform.description }}</p>
                                </div>

                            </div>

                            <div class="rounded-md border p-1 border-transparent hover:border-gray-300 hover:bg-gray-50">
                                <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </div>

                        </div>
                    </a>

                </div>

            </div>

            <div
                @click="showMore = !showMore"
                class="cursor-pointer flex justify-center items-center gap-2 p-3 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 mb-8">

                <span
                    class="text-xs font-semibold text-gray-700">
                    {{ showMore ? 'Show less' : 'Show more' }}
                </span>

                <svg
                    fill="none"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="['w-4 h-4 text-gray-700 transition-transform duration-300', { 'transform rotate-180': showMore }]">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 9l-7.5 7.5L4.5 9" />
                </svg>

            </div>

            <!-- Continue -->
            <PrimaryButton
                class="w-full"
                :action="navigateToStoreHome">
                Continue
            </PrimaryButton>
        </div>

    </div>

</template>

<script>
    import { useStoreState } from '@Stores/store-store.js';
    import StoreLogo from '@Components/store/StoreLogo.vue';
    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        components: {
            StoreLogo, PrimaryButton
        },
        data() {
            return {
                copied: false,
                showMore: false,
                storeState: useStoreState(),
                copyToClipboardTimeout: null
            };
        },
        watch: {
            showMore(newValue) {
                const socialItems = this.$el.querySelectorAll('.social-item');

                if (newValue) {

                    const startIndex = 5;
                    const lastItems = Array.from(socialItems).slice(startIndex);

                    lastItems.forEach(item => {
                        item.classList.remove('bg-white');
                        item.classList.add('bg-yellow-100');
                    });

                    // Remove the highlight after 2 seconds
                    setTimeout(() => {
                        lastItems.forEach(item => {
                            item.classList.add('bg-white');
                            item.classList.remove('bg-yellow-100');
                        });
                    }, 1000);

                }
            },
        },
        computed: {
            store() {
                return this.storeState.store;
            },
            socialPlatforms() {

                return [
                    {
                        name: 'Facebook',
                        description: 'Post your store link on Facebook and reach your customers',
                        link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.store._attributes.webLink)}`
                    },
                    {
                        name: 'Whatsapp',
                        description: 'Share your store with friends, family, and customers via WhatsApp',
                        link: `https://wa.me/?text=${encodeURIComponent(
                            `${this.store.name}\n\nVisit our store: ${this.store._attributes.webLink}`
                        )}`
                    },
                    {
                        name: 'Instagram',
                        description: 'Add your store link to your Instagram bio and attract more visitors',
                        link: 'https://www.instagram.com/accounts/edit'
                    },
                    {
                        name: 'LinkedIn',
                        description: 'Share your store link on LinkedIn for professional connections',
                        link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.store._attributes.webLink)}`
                    },
                    {
                        name: 'X',
                        description: 'Post your store link on X (formerly Twitter) and reach more customers',
                        link: `https://x.com/intent/post?text=${encodeURIComponent(
                            `Check out my store: ${this.store._attributes.webLink}`
                        )}`
                    },
                    {
                        name: 'TikTok',
                        description: 'Add your store link to your TikTok bio and drive traffic',
                        link: 'https://www.tiktok.com'
                    },
                    {
                        name: 'Snapchat',
                        description: 'Share your store link in Snapchat stories or messages',
                        link: `https://www.snapchat.com/scan?attachmentUrl=${encodeURIComponent(this.store._attributes.webLink)}`
                    },
                    {
                        name: 'Telegram',
                        description: 'Share your store link with your Telegram contacts and groups',
                        link: `https://t.me/share/url?url=${encodeURIComponent(this.store._attributes.webLink)}`
                    }
                ];

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
            },
            navigateToStoreHome() {
                this.$router.push({
                    name: 'show-store-home',
                    params: { 'store_href': this.store._links.showStore }
                });
            }
        }
    };
</script>
