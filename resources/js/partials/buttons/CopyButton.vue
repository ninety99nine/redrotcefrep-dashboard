<template>
    <PrimaryButton v-clipboard="content" :action="copyToClipboard" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <svg v-if="!showText" class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
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
