<template>
    <PrimaryButton :action="action ?? goBack" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <span>&larr;</span>
        <slot></slot>
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
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    };

</script>
