<template>

    <div
        @click.stop="loading ? copyToClipboardNotReady() : copyToClipboard()"
        :class="
            showText
                ? [
                    { 'hover:bg-blue-50' : !loading},
                    'w-full flex justify-between items-center bg-gray-50 p-2 border rounded-md cursor-pointer relative']
                : ['relative']">

        <!-- Copied Hint -->
        <div v-if="copied" :class="[showText ? '-top-8 right-0' : '-top-8 -right-7', 'absolute bg-green-500 text-white text-xs px-4 py-1 rounded-md']">
            Copied!
            <div class="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-green-500"></div>
        </div>

        <!-- Not Ready Hint -->
        <div v-if="notReady" :class="[showText ? '-top-8 -right-2' : '-top-8 -right-9', 'whitespace-nowrap absolute bg-yellow-500 text-white text-xs px-4 py-1 rounded-md']">
            Not Ready!
            <div class="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-yellow-500"></div>
        </div>

        <template v-if="showText">

            <!-- Store Link -->
            <ShineEffect v-if="loading" class="w-full">
                <div :class="[{ 'text-gray-300' : loading}, 'text-xs w-4/5 truncate']">{{ placeholder }}</div>
            </ShineEffect>

            <div v-else :class="[{ 'text-gray-300' : loading}, 'text-xs w-4/5 truncate']">{{ text }}</div>

        </template>

        <!-- Copy Icon -->
        <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            :class="[{ 'text-gray-300' : loading }, 'w-5 h-5 cursor-pointer hover:opacity-50 active:scale-95 active:opacity-25']"
            @click.stop="loading ? copyToClipboardNotReady() : copyToClipboard()">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
        </svg>

    </div>

</template>

<script>

    import ShineEffect from '@Partials/skeletons/ShineEffect.vue';

    export default {
        components: {
            ShineEffect
        },
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: [String, null],
                default: '...'
            },
            text: {
                type: [String, Number],
            },
            showText: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                copied: false,
                notReady: false,
                copyToClipboardTimeout: null,
                copyToClipboardNotReadyTimeout: null,
            };
        },
        methods: {
            async copyToClipboard() {
                try {

                    if (this.copyToClipboardTimeout) {
                        clearTimeout(this.copyToClipboardTimeout);
                    }

                    await navigator.clipboard.writeText(this.text);
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
