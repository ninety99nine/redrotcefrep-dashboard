<template>
    <PrimaryButton :action="action" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <span :class="iconClass">&#65291;</span>
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
        computed: {
            iconClass() {
                let classes = ['leading-none'];

                if(this.size == 'xs') {
                    classes.push('text-sm');
                }else if(this.size == 'sm') {
                    classes.push('text-sm');
                }else if(this.size == 'base') {
                    classes.push('text-xl');
                }else if(this.size == 'lg') {
                    classes.push('text-xl');
                }

                return classes;
            }
        }
    };

</script>
