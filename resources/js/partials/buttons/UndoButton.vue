<template>
    <Button :action="action" :disabled="disabled" :loading="loading" :size="size" :type="type">
        <span :class="iconClass">&#10226;</span>
        <slot></slot>
    </Button>
</template>

<script>

    import Button from '@Partials/buttons/Button.vue';

    export default {
        components: { Button },
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
                let classes = ['leading-none -mt-1'];

                if(this.size == 'xs') {
                    classes.push('text-xl');
                }else if(this.size == 'sm') {
                    classes.push('text-xl');
                }else if(this.size == 'base') {
                    classes.push('text-2xl');
                }else if(this.size == 'lg') {
                    classes.push('text-2xl');
                }

                return classes;
            }
        }
    };

</script>
