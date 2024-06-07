<template>
    <PrimaryButton v-clipboard="content" :action="copyToClipboard" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
            <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
        </svg>
        <span v-if="showText">Copied!</span>
        <slot v-else></slot>
    </PrimaryButton>
</template>

  <script>

    import PrimaryButton from '@Partials/buttons/PrimaryButton.vue';

    export default {
        components: { PrimaryButton },
        props: {
            action: {
                type: Function
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'base',
                options: ['xs', 'sm', 'base', 'lg']
            },
            type: {
                type: String,
                default: 'dark',
                options: ['dark', 'success', 'light', 'primary', 'warning', 'danger']
            },
            content: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                showText: false,
                copyTimeout: null
            }
        },
        methods: {
            copyToClipboard() {

                this.showText = true;
                if(this.copyTimeout == null) clearInterval(this.copyTimeout);

                this.copyTimeout = setTimeout(() => {
                    this.showText = false;
                    clearInterval(this.copyTimeout);
                }, 1000);

                if(this.action) this.action();

            }
        }
    };

  </script>
